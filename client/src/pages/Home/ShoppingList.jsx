import { useState, useEffect} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Product from "../../components/Product";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/cartRedux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { publicRequest } from "../../requestMethods";


const ShoppingList = ({ searchResults }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("Anime");
  const products = useSelector((state) => state.cart.products);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  
  useEffect(() => {
    const getProducts = async () => {
      try{
        const res = await publicRequest.get(`products?category=${value}`);
        dispatch(setProducts(res.data));
      }catch(err){}
    };
    getProducts();
  },[value]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const results = searchResults.map(product => <Product key={product._id} product={product} />) 
  const content = results?.length ? results : <Typography> No Matching Product </Typography>
  
  const Figure = products.filter(product =>{
    return product.category.includes("Figure");
  })
  const Dakimakura = products.filter(product =>{
    return product.category.includes("Dakimakura");
  })
  const Manga = products.filter(product =>{
    return product.category.includes("Manga");
  })

   
  
  return(
    <Box width="100%" margin="60px auto" >
      <Typography variant="h3" textAlign="center" display={"block"} sx={{
        background: "linear-gradient(90deg, rgb(81, 241, 66) 20%, aqua 90%)"
      }}>
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="secondary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="Anime" value="Anime" />
        <Tab label="Figure" value="Figure" />
        <Tab label="Dakimakura" value="Dakimakura" />
        <Tab label="Manga" value="Manga" />
      </Tabs>
      {value === "Anime" ? ( //
      <Box
        width="90%"
        paddingTop="20px"
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%" 
      >
        {content}
      </Box>
      ) : ( //
        <Box
        width="90%"
        paddingTop="20px"
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%" 
        >
          {value === "Figure" &&
          Figure?.map((product) => (
            <Product product={product} key={`${product.name}-${product.id}`} />
          ))}
        {value === "Dakimakura" &&
          Dakimakura?.map((product) => (
            <Product product={product} key={`${product.name}-${product.id}`} />
          ))}
        {value === "Manga" &&
          Manga?.map((product) => (
            <Product product={product} key={`${product.name}-${product.id}`} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ShoppingList;