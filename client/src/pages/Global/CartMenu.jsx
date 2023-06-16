import { useState, useEffect } from "react";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../redux/cartRedux";
import { useNavigate, } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { publicRequest } from "../../requestMethods";

const KEY = process.env.REACT_APP_STRIPE;

const FlexBox =styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, product) => {
    return total + product.count * product.price;
  }, 0);

  const Total = (Math.floor(totalPrice * 100) / 100).toFixed(2);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await publicRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate("/success", {
          stripeData: res.data,
          products: cart, });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, navigate]);

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          <FlexBox mb="15px">
            <Typography> SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* Cart List */}
          <Box>
            {cart.map((product) => (
              <Box key={`${product.name}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={product._id}
                      width="123px"
                      height="164px"
                      src={product.image}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {product.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ _id: product._id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{product.description}</Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ _id: product._id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{product.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ _id: product._id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography fontWeight="bold">
                        ${product.price}
                      </Typography>
                    </FlexBox>
                    </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${Total}</Typography>
            </FlexBox>
            <StripeCheckout
              name="Animazing"
              billingAddress
              shippingAddress
              description={`Your total is €${Total}`}
              amount={Total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button
                sx={{
                  backgroundColor: shades.primary[400],
                  color: "white",
                  borderRadius: 0,
                  minWidth: "100%",
                  padding: "20px 40px",
                  m: "20px 0",
                }}
                onClick={() => {
                  dispatch(setIsCartOpen({}));
                }}
              >
                CHECKOUT
              </Button>
            </StripeCheckout>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CartMenu;