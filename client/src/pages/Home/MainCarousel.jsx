import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { slider } from "../../data";


const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return(
  <Box display={isNonMobile ? "flex" : "none"}>
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            background: "linear-gradient(90deg, aqua 20%, rgb(81, 241, 66) 90%)",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            background: "linear-gradient(90deg, rgb(81, 241, 66) 20%, aqua 90%)",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {slider.map((product, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={product.image}
            alt={`carousel-${index}`}
            style={{
              marginRight: "50%",
              marginTop: "60px",
              height: "25%",
              width: "25%",
              objectFit:"contain",
              backgroundAttachment: "fixed",
            }}
          />
          <Box
            marginLeft="40%"
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="center"
            position="absolute"
            top="30%"
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? "10%" : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "none"}
            sx={{
              background: "linear-gradient(90deg, rgb(81, 241, 66) 20%, aqua 90%)"
            }}
          >
            <Typography color= "white" fontSize="32px">{product.title}</Typography>
            <Typography>{product.desc}</Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  </Box>
  )

}

export default MainCarousel;