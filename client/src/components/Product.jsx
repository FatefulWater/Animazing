import { useState } from "react";
import {Box, Typography, Button } from "@mui/material";
import { useNavigate,} from "react-router-dom";

const Product = ({ product, width}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box width={width}>
      <Box 
        position="relative" 
        onMouseOver={() => setIsHovered(true)} 
        onMouseOut={() => setIsHovered(false)} 
      >
        <img 
          alt={product.name}
          width="300px"
          height="400px"
          src={product.image}
          onClick={() => navigate(`/product/${product._id}`)}
          style={{ cursor: "pointer", objectFit: "contain"}}
        />
        <Box 
          display={isHovered ? "block": "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-evenly">
            <Button
              sx={{
                border: "none",
                borderRadius: "5px",
                color: "white",
                fontSize: "10px",
                padding: "1px 9px",
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
        </Box>
      </Box>

      <Box mt="3px">
        <Typography>{product.name}</Typography>
        <Typography fontWeight="bold">€{product.price}</Typography>
      </Box>
    </Box>
  )
}

export default Product;