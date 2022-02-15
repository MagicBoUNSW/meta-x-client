import React from "react";
import { useState } from "react";
// material ui library
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'

import bgLogin from "../../../assets/img/bgLogin.png";

import Amplify from "aws-amplify";
import awsconfig from "config/aws-export";
import { login } from "reducers/authentication";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props' 
Amplify.configure(awsconfig());

const InputField = withStyles((theme) => ({
  root: {
    background: "#FFFFFF",
    borderRadius: "80px",
    "& .MuiInputBase-root": {
      borderRadius: "80px",
      color: "#444B59",
      background: "#FFFFFF",
    },
    "& fieldset": {
      borderRadius: "80px",
    },
  },
}))(TextField);

const useStyles = makeStyles((theme) => ({
  loginPage: {
    backgroundImage: `url(${bgLogin})`,
    height: "100vh",
    width: "100vw",
    backgroundPosition: "50% center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily: "Roboto",
    "& *": {
      fontFamily: "Roboto",
    },
  },
  loginContainer: {
    width: "100%",
    maxWidth: "550px",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "800",
    lineHeight: "49px",
    letterSpacing: "0.1em",
    color: "#444B59",
  },
  title: {
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "38px",
    letterSpacing: "0.1em",
    color: "#444B59",
  },
  formControl: {
    height: "100%",
  },
  forgot: {
    fontSize: "16px",
    color: "#444B59",
    textAlign: "right",
    marginTop: "auto",
    marginBottom: "auto",
    width: "100%",
    marginRight: 10,
    fontWeight: "600",
    "&:hover": {
      color: "#FFFFFF",
    },
    [theme.breakpoints.down(340)]: {
      fontSize: "14px",
    },
  },
  register: {
    fontSize: "16px",
    color: "#444B59",
    marginTop: "auto",
    marginBottom: "auto",
    width: "100%",
    marginRight: 10,
    fontWeight: "600",
    "& span": {
      color: "#9c27b0",
      "&:hover": {
        textDecoration: "underline",
        cursor: "pointer",
      },
      [theme.breakpoints.down(340)]: {
        fontSize: "14px",
      },
    }
  },
  rememberMe: {
    color: "#444B59",
    letterSpacing: "0.1em",
    textAlign: "center",
    alignItems: "center",
    margin: 0,
    fontSize: "16px",
    height: "100%",
    fontWeight: "600",
    [theme.breakpoints.down(340)]: {
      fontSize: "14px",
    },
  },
  checkedIconRemember: {
    color: "#000000",
  },
  btn: {
    borderRadius: 80,
    background: "#000000",
    color: "#FFFFFF",
    fontSize: "20px",
    textTransform: "none",
    marginTop: 20,
    "&:hover": {
      backgroundColor: "#000000",
    },
  },
}));

const googleClientId = "798819892923-c4731e7b6s8qh33un9s4juc6k824kopj.apps.googleusercontent.com"
const facebookAppId = "1244955502975037"

const google = require("assets/img/google.svg")
const facebook = require("assets/img/facebook.png")

const ProcessLogin = (props) => {
  const classes = useStyles();
  //Show password handle
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false)
  const history = useHistory();


  const handleSubmit = async () => {
    setErrorMessage("");
    const userData = {username, password}
    const result = await login(userData);
    if (result.success) {
      history.push("/#");
      window.localStorage.setItem("method", "incognito")
    } else {
      setErrorMessage(result.message);
      setOpen(true)
    }
  };

  const responseFacebook = async response => {
    
    FB.login(function(data) {
      console.log(data)
    }, {scope: 'public_profile,email'});
    FB.api('/me?fields=email,name,first_name,last_name', async function(test){
      const username = test.email
      const password = 'no-password';
      const socialNetwork = 'facebook';
      const userData = {
        username,
        password,
        socialNetwork
      };
      localStorage.clear();
      const result = await login(userData);
      if (result.success) {
        history.push("/#");
        window.localStorage.setItem("method", "facebook")
      } else {
        setErrorMessage(result.message);
        setOpen(true)
      }
    });
  };


  const responseGoogleSuccess = async response => {
    const email = response.profileObj.email;
    const username = email;
    const password = 'no-password';
    const socialNetwork = "google"
    const userData = {
      username,
      password,
      socialNetwork
    };
    localStorage.clear();
    const result = await login(userData);
    if (result.success) {
      window.localStorage.setItem("method", "google")
      history.push("/#");
    } else {
      setErrorMessage(result.message);
      setOpen(true)
    }
  }

  const responseGoogleFail = (response) => {
    console.log(response);
  }

  const handleClose = () => {
    setOpen(false)
  }

    
  return (
    <div className={classes.loginPage}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Grid
        container
        spacing={3}
        className={classes.loginContainer}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <h1 className={classes.heading}>WELCOME BACK</h1>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Grid container spacing={1}>
            <Grid item container direction="column" alignItems="flex-start">
              <h2 className={classes.title}>Username</h2>
              <InputField
                type="username"
                id="username"
                variant="outlined"
                fullWidth="true"
                placeholder="admin@gmail.com"
                inputProps={{
                  onChange: (event) => {
                    setUserName(event.target.value);
                  },
                }}
              />
            </Grid>
            <Grid item container direction="column" alignItems="flex-start">
              <h2 className={classes.title}>Password</h2>
              <InputField
                variant="outlined"
                id="password"
                type={showPassword ? "text" : "password"}
                fullWidth="true"
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  onChange: (event) => {
                    setPassword(event.target.value);
                  },
                }}
              />
            </Grid>

            <Grid item container direction="row">
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                item
                xs={6}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={
                        <RadioButtonCheckedIcon
                          className={classes.checkedIconRemember}
                        />
                      }
                    />
                  }
                  label={<p className={classes.rememberMe}>Remember me</p>}
                  labelPlacement="end"
                  className={classes.formControl}
                />
              </Grid>
              <Grid
                item
                xs={6}
                container
                display= "flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <span className={classes.forgot} onClick={()=> history.push("/auth/forgot-password")}> Forgot password?</span>
              </Grid>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            fullWidth="true"
            className={classes.btn}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <p className={classes.register} style={{padding:"20px 0px"}}>Or sign in using</p>
          <Grid container className="btn-wrapper text-center" direction="row" spacing={1} justifyContent="flex-start">
              <Grid item>
                <FacebookLogin
                  appId={facebookAppId}
                  autoLoad={false}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      fields="email"
                      className="login-account"
                      style={{width: "16rem", height: "3.75rem", border: "none", fontSize: "16px", fontWeight: 700, backgroundColor:"#4c69ba", color:"#FFF"}}
                    >
                      LOGIN USING FACEBOOK
                    </button>
                  )}
                  callback={responseFacebook}
                  isMobile={false}
                />
              </Grid>
              <Grid item>
                <GoogleLogin
                  clientId={googleClientId}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="login-account"
                      style={{width: "16rem", height: "3.75rem", border: "none", fontSize: "16px", fontWeight: 700}}
                    >
                        LOGIN USING GOOGLE
                    </button>
                  )}
                  onSuccess={responseGoogleSuccess}
                  onFailure={responseGoogleFail}
                />
              </Grid>
          </Grid>
        </Grid>
        
        <p className={classes.register}>Do not have account? <span onClick={()=> history.push("/auth/register-page")}> Sign up here!</span></p>
      </Grid>
    </div>
  );
};

export default ProcessLogin;
