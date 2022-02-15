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

import { forgotPasswordByCognito } from "reducers/authentication";
const useStyles = makeStyles(styles);

// components

export default function RecoverConfirmmationSent(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
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

  const renderContent = () => {
    return (
      <form>
            <Row style={{ marginBottom: "82px", width: "490px"}}>
              <div className={ classes.authMainTitle }>Password reset confirmation sent!</div>
              <div className={ classes.authSubTitle }>We've sent you an email containing a link that will allow you to reset your password for the next 24 hours. Please check your spam folder if the email doesn't appear within a few minutes.</div>
            </Row>
            <Row>
                  { errorMessage && <div style={{color: 'red'}}><ErrorOutlineIcon className="mr-2" /> { errorMessage}</div> }
                  { successMessage && <div style={{color: '#17a2b8'}}><InfoIcon className="mr-2" /> { successMessage}</div> }
            </Row>
            <Row className="mt-1">
              <Button round className="btn-round-active-2" onClick={handleSubmitRequest}>
                New password
              </Button>
            </Row>

            <Row style={{ marginTop : "20px"}}>
              <div className={ classes.authSubTitle }>Didn’t receive the link? <a href="#" onClick={ resendForgetCode }><span style={{ color: "#25345C"}}>Resend</span></a></div>
            </Row>
      </form>
    );
  }

  const resendForgetCode = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    console.log(`resendForgetCode`);
    const result = await forgotPasswordByCognito(props.username);
    if (result.success) {
      setSuccessMessage("Sent forget code success")
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleSubmitRequest = async () => {
    setErrorMessage("");

    props.callBack();
  };
  
  return (
    <>
      { renderContent()}
    </>
  );
}
