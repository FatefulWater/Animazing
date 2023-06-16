import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import CartMenu from "./pages/Global/CartMenu";
import Footer from "./pages/Global/Footer";
import Navbar from "./pages/Global/Navbar";
import LoginPage from "./pages/Login/index";
import { getProducts } from "./requestMethods";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [products, setProducts] = useState([]) //
  const [searchResults, setSearchResults] = useState([]) //

  useEffect(() => {
    getProducts().then(json => {
      setProducts(json)
      setSearchResults(json)
    })
  }, []) //

  return (
    <div className="app">
      <Navbar products={products} setSearchResults={setSearchResults} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home searchResults={searchResults} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="product/:productId" element={<ProductDetail />} />
      </Routes>
      <CartMenu />
      <Footer />
    </div>
  );
}

export default App;
