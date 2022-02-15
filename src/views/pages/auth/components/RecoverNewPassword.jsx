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

import { forgotPasswordSubmit } from "reducers/authentication";
const useStyles = makeStyles(styles);

// components

export default function RecoverNewPassword(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [activeCode, setActiveCode] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordState, setPasswordState] = React.useState("success");
  const [errorMessage, setErrorMessage] = React.useState("");


  const history = useHistory();

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
            <Row>
              <div className={ classes.authMainTitle }>New password.</div>
            </Row>
            <Row style={{ marginBottom: "82px"}}>
              <div className={ classes.authSubTitle }>Enter your details to proceed further</div>
            </Row>
            <Row>
                  { errorMessage && <div style={{color: 'red'}}><ErrorOutlineIcon className="mr-2" /> { errorMessage}</div> }
            </Row>
            <Row>
              <CustomInput
                labelText="Code"
                id="confirmation-code"
                formControlProps={{
                  fullWidth: true,
                  maxLength: 6
                }}
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Face className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  ),
                  onChange: event => {
                    setActiveCode(event.target.value);
                  },
                }}
              />
              <CustomInput
                labelText="New Password"
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
                  },
                }}
              />
            </Row>
            <Row>
              <ul style={{ marginLeft: '-25px'}}>
                <li className={ classes.liDescription }>One uppercase character </li>
                <li className={ classes.liDescription }>8 characters minimum</li>
                <li className={ classes.liDescription }>One lowercase character</li>
              </ul>
            </Row>
            <Row>
              <Button disabled={ activeCode && password ? false : true }  
                round className="btn-round-active w-150 mr-4" onClick={handleSubmit}>
                Change password
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

  const handleSubmit = async () => {
    setErrorMessage("");

    console.log(`handleSubmit`);
    const result = await forgotPasswordSubmit(props.username, activeCode, password);
    if (result.success) {
      props.callBack();
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
