import React from "react";
import { useState } from "react";
import axios from "axios";
// material ui library
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'

import bgLogin from "../../../assets/img/bgLogin.png";

import Amplify from "aws-amplify";
import awsconfig from "config/aws-export";
import { useHistory } from "react-router-dom";
Amplify.configure(awsconfig());

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
  resend: {
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "16px",
    padding:"20px",
    "&:hover": {
        color: "blue",
    },
    }

}));


const RegisterSuccessfully = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [tokenSent, setTokenSent] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [open, setOpen] = useState(false)

    const activateAccount = async () => {
        const token = window.localStorage.getItem("activation")
        const link = "https://metax.benit.io/api/auth/confirm/" + token
        setTokenSent(true)
        try {
            const json = await axios.get(link);
            let message = json.data
            if (message !== "Thank you for your registration. Your email has been verified successfully!") {
              setOpen(true)
              setErrorMessage(message)
            }
        } catch (error) {
            let messageError = error && error.message ? error.message : "NotAuthorizedException";
        }
    }    

    const resendToken = async () => {
        const token = window.localStorage.getItem("activation")
        const link = "https://metax.benit.io/api/auth/resend/" + token
        setTokenSent(true)
        try {
            const json = await axios.get(link);
            let message = json.data
            window.localStorage.setItem("activation", message)
        } catch (error) {
            let messageError = error && error.message ? error.message : "NotAuthorizedException";
        }
    }

    const handleClose = () => {
      setOpen(false)
    }  
  
  return (
    <div className={classes.loginPage} style={{height:"100vh"}}>
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
          <h1 className={classes.heading}>Activate your account</h1>
          <h2 className={classes.title}>Thank you for your register</h2>
          <h2 className={classes.title}>To activate your account, click the button below</h2>

          <Button
            variant="outlined"
            fullWidth="true"
            className={classes.btn}
            onClick={activateAccount}
          >
            Activate
          </Button>
          {tokenSent ?  <p className={classes.resend} onClick={resendToken}>Resend Token</p> : <p></p>}
          <p className={classes.register}><span onClick={() => history.push("/auth/login")}>Return to login page</span></p>
        </Grid>       
      </Grid>
    </div>
  );
  };
  
export default RegisterSuccessfully;
