import { Box, Button, IconButton, Typography } from "@mui/material";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "../../components/Product";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";
import { publicRequest } from "../../requestMethods";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try{
        const res = await publicRequest.get(`/products/find/` + id);
        dispatch(setProduct(res.data));
      }catch(err){}
    };
    getProduct();
  },[id]); // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    const getProducts = async () => {
      try{
        const res = await publicRequest.get(`http://localhost:5000/api/products`);
        dispatch(setProducts(res.data));
      }catch(err){}
    };
    getProducts();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return(
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={product.name}
            width="100%"
            height="100%"
            src={product.image}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" >
          <Box display="flex" justifyContent="space-evenly">
            <Button
              sx={{
                border: "none",
                borderRadius: "5px",
                color: "white",
                fontSize: "24px",
                padding: "7px 24px",
                cursor: "pointer",
                backgroundColor: "aqua",
                "&:hover": { backgroundColor: "aqua"}
              }}
            >
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <Typography>Release date</Typography>
                <Typography>{product.releaseDate}</Typography>
              </Box>
            </Button>
            <Button
              sx={{
                border: "none",
                borderRadius: "5px",
                color: "white",
                fontSize: "24px",
                padding: "7px 24px",
                cursor: "pointer",
                backgroundColor: "rgb(81, 241, 66)",
                "&:hover": { backgroundColor: "rgb(81, 241, 66)"}
              }}
            >
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <Typography>Price</Typography>
                <Typography>€{product.price}</Typography>
              </Box>
            </Button>
          </Box>

          <Box m="25px 0 25px 0">
            <Typography variant="h3">{product.name}</Typography>
          </Box>

          <Box sx={{
            m:"25px 0 25px 0",
            display:"grid",
            gridTemplateColumns:"repeat(auto-fill, 100px)",
            justifyContent:"space-around",
            rowGap:"20px",
            columnGap:"1.33%",
          }}>
            <Box sx={{
              paddingTop: "20px",
              paddingBottom: "20px",
              color: "rgba(0, 0, 0, 0.5)"
            }}>
              <Typography>Franchise</Typography>
              <Typography>{product.franchise}</Typography>
            </Box>
            <Box sx={{
              paddingTop: "20px",
              paddingBottom: "20px",
              color: "rgba(0, 0, 0, 0.5)"
            }}>
              <Typography>Brand</Typography>
              <Typography>{product.brand}</Typography>
            </Box>
            <Box sx={{
              paddingTop: "20px",
              paddingBottom: "20px",
              color: "rgba(0, 0, 0, 0.5)"
            }}>
              <Typography>Release Date</Typography>
              <Typography>{product.releaseDate}</Typography>
            </Box>
            <Box sx={{
              paddingTop: "20px",
              paddingBottom: "20px",
              color: "rgba(0, 0, 0, 0.5)"
            }}>
              <Typography>Type</Typography>
              <Typography>General</Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-evenly" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "aquamarine",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
                "&:hover": { background: "aquamarine"}
              }}
              onClick={() => dispatch(addToCart({ product: { ...product, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
        </Box>
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {products.slice(0, 4).map((product, i) => (
            <Product key={`${product.name}-${i}`} product={product} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetail;