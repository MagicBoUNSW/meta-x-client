import React from "react";
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

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

const useStyles = makeStyles(styles);

export default function CompletedRegister() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

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

  const renderCompleted = () => {
    return (
      <>
        <form>
              <Row style={{ marginBottom: "82px"}}>
                <div className={ classes.authMainTitle }>Registration complete.</div>
                <div className={ `${classes.authMainTitle} mb-2` }>Devices successfully activated.</div>
                <div className={ classes.authSubTitle }>Now you can setup your projects and teams</div>
              </Row>
              <Row>
                <Link to={`/#`}>
                  <Button round className="btn-round-active w-150 mr-4" style={{ minWidth : '200px' }}>
                    Continue to dashboard
                  </Button>
                </Link>
              </Row>
        </form>
      </>
    );
  }

  return (
    <>
      { renderCompleted()}
    </>
  );
}
