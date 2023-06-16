import { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [pageType, setPageType] = useState("login")
  return (
    <Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="7rem"
        m="2rem auto"
        borderRadius="1.5rem"
      >
        {pageType === "login" ? <LoginForm /> : <RegisterForm />}
        <Typography 
          onClick={() => {setPageType(pageType === "login" ? "register" : "login")}}
          sx={{textDecoration: "underline", "&:hover": {cursor: "pointer"}}}
        >
          {pageType === "login" ? "Don't have an account ? Sign Up here." : "Already have an account? Login here."}
        </Typography>
      </Box>
    </Box>
  );
};


export default LoginPage;