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
import { forgotPasswordByCognito } from "reducers/authentication";
import { useHistory } from "react-router-dom";
import RecoveryPasswordPage from "views/pages/auth/RecoveryPasswordPage";

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
    alignSelf: "center"
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
}));

const ForgotPassword = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [sentTokenSuccessful,setSentTokenSuccessful] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const history = useHistory();


  const handleSubmit = async () => {
    setErrorMessage("");
    const result = await forgotPasswordByCognito(email);
    if (result.success) {
      setSentTokenSuccessful(true)
    } else {
      setErrorMessage(result.message);
    }
  };
    
  if (sentTokenSuccessful) {
    return <RecoveryPasswordPage/>
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
            <h2>Reset your password</h2>
            <h5>Enter your email address and we will send you a token to reset your password</h5>
            </Grid>
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
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                fullWidth="true"
                className={classes.btn}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </Grid>
            
            <p className={classes.register}><span onClick={()=> history.push("/auth/login")}>Return to login page</span></p>
          </Grid>
        </div>
      );
  }
};

export default ForgotPassword;
