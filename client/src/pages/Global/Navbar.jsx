import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, InputBase, useMediaQuery } from "@mui/material";
import {
  LoginOutlined,
  LogoutOutlined,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
  Menu,
  Close,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../redux/cartRedux";
import { setLogout } from "../../redux/userRedux";
import { useState } from "react";

const Navbar = ({ products, setSearchResults }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 600px)");
  const handleSubmit = (e) => e.preventDefault() //

    const handleSearchChange = (e) => { //
      if (!e.target.value) return setSearchResults(products)
      const resultsArray = products.filter(product => product.name?.includes(e.target.value) || product.category?.includes(e.target.value))
      setSearchResults(resultsArray)
    }

  return(
    <Box 
      display="flex"
      position="fixed"
      alignItems="center"
      width="100%"
      height="60px"
      top="0"
      left="0"
      zIndex="100"
      color="white"
      sx={{
        background: "linear-gradient(90deg, rgb(81, 241, 66) 20%, aqua 90%)"
      }}
    >
      <Box
        display="flex"
        margin="auto"
        justifyContent="center"
        alignItems="center"
        flex="1"
      >
        <Box
          fontFamily="Water Brush"
          fontSize="32px"
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer"} }}
          color={shades.primary[500]}
        >
          Animazing
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flex="3"
      >
      <form className="form-nav" onSubmit={handleSubmit}> 
      <IconButton type="submit" sx={{ 
      color: "white",
      borderBottom: "2px solid white",
      borderBottomRightRadius: "1px",
      marginBottom: "2px",
    }}>
      <SearchOutlined />
    </IconButton>
    <InputBase
      placeholder="Search for Product"
      type="text"
      onChange={handleSearchChange} //
      sx={{
        fontFamily: "sans-serif",
        width: "90%",
        background: "transparent",
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none",
        borderBottom: "2px solid white",
        borderRadius: "5px",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "20px",
        fontSize: "20px",
        textAlign: "center",
        color: "white",
        margin: "0px",
      }}
    />
      </form>
      </Box>
      {/* Desktop Navbar */}
      {isNonMobileScreen ? (
      <Box
        display="flex"
        justifyContent="space-between"
        columnGap="20px"
        zIndex="2"
      >
        {user?.user === null ? (
        <IconButton onClick={() => navigate("/login")} sx={{ color: "white"}}>
          <LoginOutlined />
        </IconButton>
        ) : (
        <IconButton onClick={() => dispatch(setLogout())} sx={{ color: "white"}}>
          <LogoutOutlined />
        </IconButton>
        )}
        <Badge
          badgeContent={cart.length}
          color="secondary"
          invisible={cart.length === 0}
          sx={{
            "& .MuiBadge-badge": {
              right: 5,
              top: 5,
              padding: "0 4px",
              height: "14px",
              minWidth: "13px",
            },
          }}
        >
          <IconButton 
          onClick={() => dispatch(setIsCartOpen({}))}
          sx={{ color: "white"}}
          >
            <ShoppingBagOutlined />
          </IconButton>
        </Badge>
        <IconButton sx={{ color: "white"}}>
          <MenuOutlined />
        </IconButton>
      </Box>
      ) : (
      <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
        <Menu sx={{color: "white"}}/>
      </IconButton>
      )}

      {/* Mobile Nav */}
      {!isNonMobileScreen && isMobileMenuToggled && (
        <Box 
          position="fixed" 
          right="0" 
          bottom="0" 
          height="100%" 
          zIndex="100" 
          maxWidth="500px" 
          minWidth="200px" 
          sx={{background: "linear-gradient(0deg, rgb(81, 241, 66) 20%, aqua 90%)"}}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
              <Close sx={{color: "white"}}/>
            </IconButton>
          </Box>

          {/* Menu Items */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            {user?.user === null ? (
              <IconButton onClick={() => navigate("/login")} sx={{ color: "white"}}>
                <LoginOutlined />
              </IconButton>
              ) : (
              <IconButton onClick={() => dispatch(setLogout())} sx={{ color: "white"}}>
                <LogoutOutlined />
              </IconButton>
              )}
            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  height: "14px",
                  minWidth: "13px",
                },
              }}
            >
              <IconButton 
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "white"}}
              >
                <ShoppingBagOutlined />
              </IconButton>
            </Badge>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Navbar;