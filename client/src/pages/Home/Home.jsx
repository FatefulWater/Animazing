import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";
//

const Home = ({ searchResults }) => {

  return(
    <div className="home">
      <MainCarousel />
      <ShoppingList searchResults={searchResults} /> 
    </div>
  );
};

export default Home;