import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/");
    }
  };

  const handleFormSubmit = async(values, onSubmitProps) => {
    await login(values, onSubmitProps);
  }

  return(
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* Button */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                background: "linear-gradient(90deg, rgb(255, 255, 43) 20%, rgb(81, 241, 66) 60%)",
                color: "black",
                "&:hover": { background: "linear-gradient(90deg, rgb(81, 241, 66) 20%, aqua 90%)", color: "black" },
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default LoginForm;