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
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import URL from "../../Config/URL";
import { Form } from "formik";
import { Formik } from "formik";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { login, loginFailse } from "../../features/auth/authSlice";
import GoogleButton from "react-google-button";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="">Your Website</Link> {new Date().getFullYear()}
      {"."}
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

export default function SignIn(props) {
  const classes = useStyles();
  const history =  useHistory(); 
  const dispath = useDispatch();
   const LoginGoogle = ()=>{
     window.open("http://localhost:3000/auth/google","_self");

   }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            axios({
              method: "post",
              data: values,
              url: URL.login,
            }).then((data) => {
              if (data.data.payload.token) {
                const cookies = new Cookies();
                cookies.set("user", data.data.payload.token, { path: "/" });
                const user = data.data.payload.userInfo;
                sessionStorage.setItem("email", user.email);
                sessionStorage.setItem("first_name", user.first_name);
                sessionStorage.setItem("last_name", user.last_name);
                dispath(login(data.data.payload.userInfo));
                history.push("/home");
              } else {
                console.log(data.data.payload.error);
                dispath(loginFailse(data.data.payload.error));
              }
            });
          }}
        >
          {(props) => (
            <Form className={classes.form}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={props.handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={props.handleChange}
              />
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>
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
