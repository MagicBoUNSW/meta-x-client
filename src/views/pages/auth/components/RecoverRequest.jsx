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

import { forgotPasswordByCognito } from "reducers/authentication";
const useStyles = makeStyles(styles);

// components

export default function RecoverRequest(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [username, setUsername] = React.useState("");
  const [usernameState, setUsernameState] = React.useState("success");
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

  const renderContent = () => {
    return (
      <form>
            <Row style={{ marginBottom: "82px"}}>
              <div className={ classes.authMainTitle }>Lost your password?</div>
              <div className={ `${classes.authMainTitle} mb-2` }>Enter your details to recover.</div>
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
            </Row>
            <Row className="mt-4">
              <Button disabled={ username ? false : true }  
                round className="btn-round-active w-150 mr-4" onClick={handleSubmitRequest}>
                Recover
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

  const handleSubmitRequest = async () => {
    setErrorMessage("");

    const result = await forgotPasswordByCognito(username);
    if (result.success) {
      props.callBack(username);
    } else {
      setErrorMessage(result.message);
    }
  };
  
  return (
    <>
      { renderContent()}
    </>
  );
}
