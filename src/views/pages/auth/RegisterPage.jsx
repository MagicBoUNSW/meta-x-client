import React from "react";
import { useState } from "react";
// material ui library
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
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
import { registerByCognito } from "reducers/authentication";
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
    height: "120vh",
    width: "100vw",
    backgroundPosition: "50% center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "20px",
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
    color: "#FFFFFF",
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
    color: "#FFFFFF !important",
    fontSize: "20px",
    textTransform: "none",
    marginTop: 20,
    "&:hover": {
      backgroundColor: "#FFF",
      color: "#000 !important"
    },
  },
  passwordNotice: {
    color: "#dc3545",
    margin: "0px",
    paddingLeft: "10px",
    textAlign: "start",
    fontSize: "12px",
  }
}));

const RegisterSuccessfully = (props) => {
  const classes = useStyles();
  const history = useHistory();

return (
  <div className={classes.loginPage} style={{height:"100vh"}}>
    <Grid
      container
      spacing={3}
      className={classes.loginContainer}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={12} sm={12} lg={12}>
        <h1 className={classes.heading}>Register Successfully!</h1>
        {props.method === "google" || props.method === "facebook" ? <p></p> : <p className={classes.title}>Check your email for verification link</p>}
        <p className={classes.register}>Go to <span onClick={() => history.push("/auth/login")}>Login Page</span></p>
        <p></p>
      </Grid>       
    </Grid>
  </div>
);
};


const googleClientId = "798819892923-c4731e7b6s8qh33un9s4juc6k824kopj.apps.googleusercontent.com"

const facebookAppId = "1244955502975037"

const Register = (props) => {
  const classes = useStyles();
  //Show password handle
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registerMethod, setMethod] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false)

    //Check if email is valid
    const [validEmail, setValidEmail] = useState(true)

    //Check if the password is valid
    const [containLowerChar, setContainLowerChar] = useState(true)
    const [containUpperChar, setContainUpperChar] = useState(true)
    const [eightChar, setEightChar] = useState(true)
    const [containNumber, setContainNumber] = useState(true)
    const [containSpecialChar, setContainSpecialChar] = useState(true)
    const [registerSuccessfully, setRegisterSuccessfully] = useState(false)
  const history = useHistory();



  const validateEmail = (email) => {
      setValidEmail(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    };

  const handlePassword = (password) => {
      if (password.length >= 8) {
          setEightChar(true)
      } else {setEightChar(false)}
      if (password !== password.toLowerCase()) {
          setContainUpperChar(true)
      } else {setContainUpperChar(false)}
      if (password !== password.toUpperCase()) {
          setContainLowerChar(true)
      } else {setContainLowerChar(false)}
      setContainNumber(/\d/.test(password))
      setContainSpecialChar(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))
  }

  const handleConfirmedPassword = (value) => {
      if (password === value) {
          setPasswordMatch(true)
      } else {
          setPasswordMatch(false)
      }
  }

  const responseFacebook = async response => {
    
    FB.login(function(data) {
      console.log(data)
    }, {scope: 'public_profile,email'});
    FB.api('/me?fields=email,name,first_name,last_name', async function(test){
      const username = test.email.split("@")[0]
      const email = test.email
      const password = 'no-password';
      const socialNetwork = 'facebook';
      const fullName = test.name;
      const userData = {
        email,
        username,
        password,
        socialNetwork, 
        fullName
      };
      localStorage.clear();
      const result = await registerByCognito(userData);
      if (result.success) {
        setRegisterSuccessfully(true)
        setMethod("facebook")
      } else {
        setErrorMessage(result.message);
      }
    });
  };


  const responseGoogleSuccess = async response => {
    const email = response.profileObj.email;
    const username = email.split("@")[0];
    const password = 'no-password';
    const tokenId = response.tokenId;
    const imageUrl = response.profileObj.imageUrl;
    const fullName = response.profileObj.name;
    const socialNetwork = "google"
    const userData = {
      email,
      username,
      password,
      socialNetwork,
      fullName,
      imageUrl,  
    };
    const result = await registerByCognito(userData);
    if (result.success) {
      setRegisterSuccessfully(true)
      setMethod("google")
    } else {
      setErrorMessage(result.message);
    }
  }

  const responseGoogleFail = (response) => {
    console.log(response);
  }

  const handleSubmit = async () => {
    setErrorMessage("");
    const userData = {email, username, password}
    const result = await registerByCognito(userData);
    if (result.success) {
      setRegisterSuccessfully(true)
      setMethod("incognito")
      window.localStorage.setItem("activation", result.message)
    } else {
      setErrorMessage(result.message);
      setOpen(true)
    }
  };

  const handleClose = () => {
    setOpen(false)
  }

  if (registerSuccessfully) {
    return <RegisterSuccessfully method={registerMethod}/>
  } else {
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
          <h1 className={classes.heading}>WELCOME</h1>
        </Grid>
        {/* INPUT FIELD */}
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Grid container spacing={1}>
            <Grid item container direction="column" alignItems="flex-start">
              <h2 className={classes.title}>Email</h2>
              <InputField
                type="email"
                id="email"
                variant="outlined"
                fullWidth="true"
                placeholder="admin@gmail.com"
                inputProps={{
                  onChange: (event) => {
                    setEmail(event.target.value);
                    validateEmail(event.target.value);
                  },
                }}
              />
              <div><p className={classes.passwordNotice} style={{color: "red", display: validEmail ? "none" : "block"}}>Email is invalid</p></div>
            </Grid>

            <Grid item container direction="column" alignItems="flex-start">
              <h2 className={classes.title}>Username</h2>
              <InputField
                type="username"
                id="username"
                variant="outlined"
                fullWidth="true"
                placeholder="Username"
                inputProps={{
                  onChange: (event) => {
                    setUsername(event.target.value);
                  },
                }}
              />
            </Grid>


            <Grid item container direction="column" alignItems="flex-start">
              <h2 className={classes.title}>Password</h2>
              <InputField
                variant="outlined"
                id="password"
                placeholder="********"
                type={showPassword ? "text" : "password"}
                fullWidth="true"
                InputProps={{
                  // <-- This is where the toggle button is added.
                  onChange: (event) => {
                    setPassword(event.target.value);
                    handlePassword(event.target.value)
                  },
                }}
              />
              <div><p className={classes.passwordNotice} style={{display: containLowerChar ? "none" : "block"}}>contains at least one lower character</p></div>
              <div><p className={classes.passwordNotice} style={{display: containUpperChar ? "none" : "block"}}>contains at least one upper character</p></div>
              <div><p className={classes.passwordNotice} style={{display: containNumber ? "none" : "block"}}>contains at least one digit character</p></div>
              <div><p className={classes.passwordNotice} style={{display: containSpecialChar ? "none" : "block"}}>contains at least one special character</p></div>
              <div><p className={classes.passwordNotice} style={{display: eightChar ? "none" : "block"}}>contains at least 8 characters</p></div>
            </Grid>

            <Grid item container direction="column" alignItems="flex-start">
              <h2 className={classes.title}> Confirmed Password</h2>
              <InputField
                placeholder="********"
                variant="outlined"
                id="comfirmed-password"
                type={showPassword ? "text" : "password"}
                fullWidth="true"
                InputProps={{
                  // <-- This is where the toggle button is added.
                  onChange: (event) => {
                    handleConfirmedPassword(event.target.value);
                  },
                }}
              />
              <div><p className={classes.passwordNotice} style={{display: passwordMatch ? "none" : "block"}}>Does not match the password above</p></div>
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
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            fullWidth="true"
            className={classes.btn}
            onClick={handleSubmit}
            disabled={!(passwordMatch && validEmail && containSpecialChar && containUpperChar && containLowerChar && containNumber && eightChar)} 

          >
            Sign Up
          </Button>
          <p className={classes.register} style={{padding:"20px 0px"}}>Or sign up using</p>
          <Grid container className="btn-wrapper text-center" direction="row" spacing={1} justifyContent="flex-start">
            <Grid item>
              <FacebookLogin
                appId={facebookAppId}
                autoLoad={false}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    fields="email"
                    className="login-account"
                    textButton={"Continue with facebook"}
                    style={{width: "16rem", height: "3.75rem", border: "none", fontSize: "16px", fontWeight: 700, backgroundColor:"#4c69ba", color:"#FFF"}}
                  >
                    REGISTER USING FACEBOOK
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
                    REGISTER USING GOOGLE
                </button>

                )}
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFail}
              />
            </Grid>
          </Grid>   
        </Grid>
        <p className={classes.register}>Already have an account? <span onClick={() => history.push("/auth/login")}>Sign in here!</span></p>
      </Grid>
    </div>
  );
};}

export default Register;
