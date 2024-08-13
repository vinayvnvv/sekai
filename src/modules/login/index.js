import { Box, Button, Paper, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import MuiField from "../invoice/form/MuiField";
import { _SECRET, saveAuth, verifyAuth } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../firebase";

const FormSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    verifyAuth();
  }, []);
  const navigate = useNavigate();
  return (
    <Stack
      sx={{ height: "100vh", width: "100%", backgroundColor: "#f3f7fd" }}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Paper
        variant="outlined"
        sx={{
          maxWidth: "320px",
          width: "60%",
          p: 4,
          px: 6,
          textAlign: "center",
        }}
      >
        <img
          src="https://sekaiholidays.in/wp-content/uploads/2022/12/home-page-top-logo-with-circle.png"
          width={110}
        />
        <Box>
          <Formik
            validationSchema={FormSchema}
            initialValues={{}}
            onSubmit={async (values) => {
              setLoading(true);
              await getUser(values.username, values.password).then((a) => {
                if (a.empty) {
                  enqueueSnackbar("Username or password is incorrect", {
                    variant: "error",
                  });
                  setLoading(false);
                } else {
                  setLoading(false);
                  saveAuth(values.username, () => {
                    navigate("/");
                  });
                }
              });
            }}
          >
            {({ values, setFieldValue, errors, touched, submitCount }) => (
              <Form>
                <Stack
                  sx={{ mt: 3 }}
                  direction={"column"}
                  alignItems={"center"}
                  spacing={1}
                >
                  <MuiField
                    label={"Username"}
                    defaultLabelStyle
                    submitCount={submitCount}
                    errors={errors}
                    name="username"
                    values={values}
                    touched={touched}
                    size={"large"}
                    setFieldValue={setFieldValue}
                    fullWidth
                  />
                  <MuiField
                    defaultLabelStyle
                    label={"Password"}
                    submitCount={submitCount}
                    errors={errors}
                    name="password"
                    values={values}
                    touched={touched}
                    type={"password"}
                    size={"large"}
                    setFieldValue={setFieldValue}
                    fullWidth
                  />
                  <Button
                    fullWidth
                    disabled={loading}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Login
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </Stack>
  );
};

export default Login;
