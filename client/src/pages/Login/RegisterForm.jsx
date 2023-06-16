import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

    const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      navigate("/");
    }
  };

  const handleFormSubmit = async(values, onSubmitProps) => {
    await register(values, onSubmitProps);
  }

  return(
    <Formik
    onSubmit={handleFormSubmit}
    initialValues={initialValuesRegister}
    validationSchema={registerSchema}
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
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
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
              Register
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default RegisterForm