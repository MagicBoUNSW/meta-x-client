import React from "react";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import { STEP_SIGN_UP } from "config/constants";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import { Col, Row } from 'reactstrap';
import { Link } from "react-router-dom";

import { registerByCognito } from "reducers/authentication";
const useStyles = makeStyles(styles);

// components

export default function RegisterAccount(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [email, setEmail] = React.useState("");
  const [emailState, setEmailState] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [usernameState, setUsernameState] = React.useState("success");
  const [password, setPassword] = React.useState("");
  const [passwordState, setPasswordState] = React.useState("success");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [acceptPolicy, setAcceptPolicy] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [comparePassword, setComparePassword] = React.useState(false);


  const history = useHistory();

  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    let id = setTimeout(function() {
      setCardAnimation("");
    }, 700);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id);
    };
  });
  const classes = useStyles();

  const renderRegister = () => {
    return (
      <form>
            <Row style={{ marginBottom: "82px"}}>
              <div className={ classes.authMainTitle }>Welcome to Nauvus.</div>
              <div className={ `${classes.authMainTitle} mb-2` }>Sign Up to getting started.</div>
              <div className={ classes.authSubTitle }>Enter your details to proceed further</div>
            </Row>
            <Row>
                  { errorMessage && <div style={{color: 'red'}}><ErrorOutlineIcon className="mr-2" /> { errorMessage}</div> }
            </Row>
            <Row>
              <CustomInput
                labelText="Username"
                id="username"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Face className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  ),
                  onChange: event => {
                    setErrorMessage("");
                    setUsername(event.target.value);
                  },
                }}
              />
              <CustomInput
                labelText="Email"
                error={emailState === "error"}
                id="email"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event => {
                    setErrorMessage("");
                    if (verifyEmail(event.target.value)) {
                      setEmailState("success");
                    } else {
                      setEmailState("error");
                    }
                    setEmail(event.target.value);
                  },
                  type: "email",
                  endAdornment:
                    emailState === "error" ? (
                      <InputAdornment position="end">
                        <Close className={classes.danger} />
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                }}
              />
              <CustomInput
                labelText="Password"
                id="password"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: 
                    (password.length < 8)  ? (
                      <InputAdornment position="end">
                        <Close className={classes.danger} />
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    )
                  ,
                  type: "password",
                  autoComplete: "off",
                  onChange: event => {
                    setErrorMessage("");
                    setPassword(event.target.value);
                    if (password !== confirmPassword) {
                      setPasswordState("error");
                      setComparePassword(false);
                    } else {
                      setPasswordState("success");
                      setComparePassword(true);
                    }
                  },
                }}
              />
              <CustomInput
                labelText="Confirm Password"
                id="confirm-password"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  endAdornment: 
                    (confirmPassword.length < 8) ? (
                      <InputAdornment position="end">
                        <Close className={classes.danger} />
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    )
                  ,
                  type: "password",
                  autoComplete: "off",
                  onChange: event => {
                    setErrorMessage("");
                    setConfirmPassword(event.target.value);
                    if (password !== confirmPassword) {
                      setPasswordState("error");
                      setComparePassword(false);
                    } else {
                      setPasswordState("success");
                      setComparePassword(true);
                    }
                  },
                }}
              />
            </Row>
            <Row style={{ position: 'relative'}}>
              <div className={classes.checkboxAndRadio}>
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={(e) => handleToggleConditon(e)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                      }}
                    />
                  }
                  classes={{
                    label: `${classes.label} auth-label`,
                    root: classes.labelRoot
                  }}
                  label="I agree with terms & conditions"
                />
              </div>
            </Row>
            <Row>
              <Button disabled={ username && email && confirmPassword
                  && password && acceptPolicy ? false : true }  
                round className="btn-round-active w-150 mr-4" onClick={handleSubmitRegister}>
                Sign Up
              </Button>
              <Link to={`/auth/sign-in`}>
                <Button round className="btn-round-active-2">
                  Sign in
                </Button>
              </Link>
            </Row>
      </form>
    );
  }

  const handleToggleConditon = (e) => {
    setAcceptPolicy(e.target.checked)
  }
  const handleSubmitRegister = async () => {
    setErrorMessage("");
    if (password !== confirmPassword) {
      setErrorMessage("Password not equal");
      return;
    }

    const result = await registerByCognito(username, password, email);
    if (result.success) {
      props.callBack(username, password);
    } else {
      setErrorMessage(result.message);
    }
  };
  
  return (
    <>
      { renderRegister()}
    </>
  );
}
