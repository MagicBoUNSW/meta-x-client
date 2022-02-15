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
import InfoIcon from '@material-ui/icons/Info';
import { STEP_SIGN_UP } from "config/constants";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import { Col, Row } from 'reactstrap';
import { Link } from "react-router-dom";

import { resendConfirmationCode, confirmSignUp } from "reducers/authentication";
const useStyles = makeStyles(styles);

// components
export default function ConfirmRegister(props) {
  const [step, setStep] = React.useState(STEP_SIGN_UP.CHOOSE_COUNTRY); // CHOOSE_COUNTRY

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [activeCode, setActiveCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
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

  const renderConfirm = () => {
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
                  { successMessage && <div style={{color: '#17a2b8'}}><InfoIcon className="mr-2" /> { successMessage}</div> }
            </Row>
            <Row className="mb-3">
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
            </Row>
            <Row style={{ position: 'relative'}}>
              <a href="#" onClick={ resendConfirmationCodeOnBrowser } className={classes.customRecoveryLink}>Resend Confirmation Code</a>
            </Row>
            <Row className="mt-5">
              <Button disabled={ activeCode ? false : true }    round className="btn-round-active w-150 mr-4" onClick={handleSubmitConfirm}>
                Confirm
              </Button>
            </Row>
      </form>
    );
  }

  const resendConfirmationCodeOnBrowser = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    console.log(`resendConfirmationCode: ${props.username}`);
    let result = await resendConfirmationCode(props.username);
    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleSubmitConfirm = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    console.log(`handleSubmitConfirm: ${props.username}`);
    const result = await confirmSignUp(props.username, activeCode);
    if (result.success) {
      props.callBack();
    } else {
      setErrorMessage(result.message)
    }
  };
  
  return (
    <>
      { renderConfirm()}
    </>
  );
}
