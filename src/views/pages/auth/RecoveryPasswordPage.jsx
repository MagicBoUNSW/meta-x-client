import React from "react";
import { useState } from "react";
// material ui library
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import bgLogin from "../../../assets/img/bgLogin.png";

import Amplify from "aws-amplify";
import awsconfig from "config/aws-export";
import { resetPassword } from "reducers/authentication";
import { useHistory } from "react-router-dom";
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
  passwordNotice: {
    color: "#dc3545",
    margin: "0px",
    paddingLeft: "10px",
    textAlign: "start",
    fontSize: "12px",
  }
}));

const ResetPassword = (props) => {
  const classes = useStyles();
  //Show password handle
  const [resetToken, setResetToken] = useState("")
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSuccessfully, setResetSuccessfully] = useState(false)

  //Check if email is valid
  const [validEmail, setValidEmail] = useState(true)

  //Check if the password is valid
  const [containLowerChar, setContainLowerChar] = useState(true)
  const [containUpperChar, setContainUpperChar] = useState(true)
  const [eightChar, setEightChar] = useState(true)
  const [containNumber, setContainNumber] = useState(true)
  const [containSpecialChar, setContainSpecialChar] = useState(true)
  
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


  const handleSubmit = async () => {
    setErrorMessage("");
    const result = await resetPassword(resetToken, email, password);
    if (result.success) {
      setResetSuccessfully(true)
    } else {
      setErrorMessage(result.message);
    }
  };
  

  const ResetSuccessfully = () => {
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
          <h1 className={classes.heading}>Reset password successfully!</h1>
          <p className={classes.register}><span onClick={() => history.push("/auth/login")}>Return to login page</span></p>
          <p></p>
        </Grid>       
      </Grid>
    </div>
  );
  };

  if (resetSuccessfully) {
    return <ResetSuccessfully/>
  } else {
  return (
    <div className={classes.loginPage}>
      <Grid
        container
        spacing={3}
        className={classes.loginContainer}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <h1 className={classes.heading}>Reset your password</h1>
        </Grid>
        {/* INPUT FIELD */}
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <Grid container spacing={1}>

          <Grid item container direction="column" alignItems="flex-start">
              <h2 className={classes.title}>Reset token</h2>
              <InputField
                type="resetToken"
                id="resetToken"
                variant="outlined"
                fullWidth="true"
                placeholder="Reset Token"
                inputProps={{
                  onChange: (event) => {
                    setResetToken(event.target.value);
                  },
                }}
              />
            </Grid>

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
                    console.log(validEmail)
                  },
                }}
              />
              <div><p className={classes.passwordNotice} style={{color: "red", display: validEmail ? "none" : "block"}}>Email is invalid</p></div>
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
          </Grid>
          <Button
            variant="outlined"
            disabled={!(passwordMatch && validEmail && containSpecialChar && containUpperChar && containLowerChar && containNumber && eightChar)} 
            fullWidth="true"
            className={classes.btn}
            onClick={handleSubmit}
          >
            Reset password
          </Button>
        </Grid>
        <p className={classes.register}><span onClick={()=> history.push("/auth/login")}>Return to login page</span></p>
      </Grid>
    </div>
  );
};}

export default ResetPassword;
