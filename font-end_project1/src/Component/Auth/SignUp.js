import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import * as yup from "yup";
import { Link ,useHistory} from "react-router-dom";
import URL from "../../Config/URL";
import { Form, ErrorMessage } from "formik";
import axios from "axios";

import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { signupFailse, signupSuccess } from "../../features/auth/authSlice";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Project1"}
      <Link to="#" color="inherit">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const history = useHistory(); 
  const classes = useStyles();
  const dispath = useDispatch();
  const validationSchema = yup.object().shape({
    email: yup
      .string("Nhập email cá nhân ")
      .email("*Email không hợp lệ ")
      .required("Nhập email bắt buộc "),
    first_name: yup.string("First name ").required("*Bắt buộc"),
    last_name: yup.string("Last name").required("*Bắt buộc"),
    password: yup
      .string("Nhập mật khẩu")
      .required("*Nhập mật khẩu bắt buộc ")
      .min(8, "*Mật khẩu yêu cầu 8 kí tự trở lên "),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password")], "*Password's not match")
      .required("*Required!"),
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
            first_name: "",
            last_name: "",
          }}
          onSubmit={(values) => {
            axios({
              method: "post",
              data: values,
              url: URL.signup,
            })
              .then((data) => {
                console.log(data);
                if (data.data.payload.token) {
                  const cookies = new Cookies();
                  cookies.set("user", data.data.payload.token, { path: "/" });
                  dispath(signupSuccess(data.data.payload.userInfo));
               
                  const user =data.data.payload.userInfo; 
                  console.log(user);
                  sessionStorage.setItem("email",user.email); 
                  sessionStorage.setItem("first_name",user.first_name); 
                  sessionStorage.setItem("last_name",user.last_name); 
                  history.push("/home");
                } else {
                  dispath(signupFailse(data.data.payload.error));
                }
              })
              .catch((error) => console.log(error));
          }} 
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form className={classes.form} noValidate>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="first_name"
                    label="first_name"
                    type="string"
                    id="firstname"
                    error={
                      props.touched.name && Boolean(props.errors.first_name)
                    }
                    onChange={props.handleChange}
                    helperText={
                      props.touched.first_name && props.errors.first_name
                    }
                  />
                  {/* <Typography variant="caption" style={{ color: "red" }}>
                    <ErrorMessage name="first_name" />
                  </Typography> */}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="last_name"
                    label="last_name"
                    type="string"
                    id="last_name"
                    error={
                      props.touched.last_name && Boolean(props.errors.last_name)
                    }
                    onChange={props.handleChange}
                    helperText={
                      props.touched.last_name && props.errors.last_name
                    }
                  />
                  {/* <Typography variant="caption" style={{ color: "red" }}>
                    <ErrorMessage name="last_name" />
                  </Typography> */}
                </Grid>
              </Grid>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={props.touched.name && Boolean(props.errors.email)}
                onChange={props.handleChange}
                helperText={props.touched.name && props.errors.email}
              />
              <Typography variant="caption" style={{ color: "red" }}>
                <ErrorMessage name="email" />
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={props.touched.name && Boolean(props.errors.password)}
                onChange={props.handleChange}
                helperText={props.touched.name && props.errors.password}
              />
              <Typography variant="caption" style={{ color: "red" }}>
                <ErrorMessage name="password" />
              </Typography>

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm_password"
                label="Comfirm Password "
                type="password"
                id="password-comfirm"
                autoComplete="current-password"
                error={
                  props.touched.name && Boolean(props.errors.confirm_password)
                }
                onChange={props.handleChange}
                helperText={props.touched.name && props.errors.confirm_password}
              />

              <Typography variant="caption" style={{ color: "red" }}>
                <ErrorMessage name="confirm_password" />
              </Typography>
              <CssBaseline />
              <div></div>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Typography variant="body2">
                <Link to="/login"> Have you an account? Sign In ? </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
