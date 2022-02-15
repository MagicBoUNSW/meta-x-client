import React, {useEffect, useState} from "react";
// material ui library
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";


import Amplify from "aws-amplify";
import awsconfig from "config/aws-export";
import { changeName } from "reducers/authentication";
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
    height: "130vh",
    width: "100vw",
    backgroundPosition: "50% center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    fontFamily: "Roboto",
    padding: "20px",
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
    color: "#FFFFFF !important",
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
  }, 
  sendTokenButton: {
    textDecoration: "underline",
    cursor: "pointer",
    "&:hover": {
      color: "blue",
    },
  }
}));

const ResetPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  //Show password handle
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSuccessfully, setResetSuccessfully] = useState(false);

  //Check if email is valid
  const [validEmail, setValidEmail] = useState(true)

  //Check if the password is valid
  const validateEmail = (email) => {
      setValidEmail(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    };

  const handleSubmit = async () => {
    setErrorMessage("");
    const result = await changeName(email, fullName);
    if (result.success) {
      setResetSuccessfully(true)
    } else {
      setErrorMessage(result.message);
    }
  };

  const ChangeNameSuccessfully = () => {
    const classes = useStyles();
    const history = useHistory();
  
  return (
    <div className={classes.loginPage} style={{height:"fit-content"}}>
      <Grid
        container
        spacing={3}
        className={classes.loginContainer}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <h1 className={classes.heading}>Change name successfully!</h1>
          <p className={classes.register}><span 
            onClick={() => {
              history.push("/user/tables")
              window.location.reload()
              }}>
              Return to dashboard
              </span>
          </p>
          <p></p>
        </Grid>       
      </Grid>
    </div>
  );
  };

  if (resetSuccessfully) {
    return <ChangeNameSuccessfully/>
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
              <h2 className={classes.title}>New Full Name</h2>
              <InputField
                type="fullName"
                id="fullName"
                variant="outlined"
                fullWidth="true"
                placeholder="admin"
                inputProps={{
                  onChange: (event) => {
                    setFullName(event.target.value);
                  },
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            disabled={!(validEmail)} 
            fullWidth="true"
            className={classes.btn}
            onClick={handleSubmit}
          >
            Change Name
          </Button>
          <p className={classes.register}><span onClick={() => history.push("/user/tables")}>Return to dashboard</span></p>
        </Grid>
      </Grid>
    </div>
  );
};}

export default ResetPassword;
