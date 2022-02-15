import React from "react";
import { toast } from 'react-toastify';

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

export default function ChooseCountry(props) {
  const [step, setStep] = React.useState(STEP_SIGN_UP.CHOOSE_COUNTRY); // CHOOSE_COUNTRY
  const [country, setCountry] = React.useState("");

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

  const renderChooseCountry = () => {
    return (
      <form>
            <Row style={{ marginBottom: "82px"}}>
              <div className={ classes.authMainTitle }>Welcome to Nauvus.</div>
              <div className={ `${classes.authMainTitle} mb-2` }>Sign Up to getting started.</div>
              <div className={ classes.authSubTitle }>Enter your details to proceed further</div>
            </Row>
            <Row>
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel}
                >
                  Select a country
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={country}
                  onChange={e => {
                    setCountry(e.target.value)
                  }}
                  inputProps={{
                    name: "simpleSelect",
                    id: "simple-select"
                  }}
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                  >
                    Select a country
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="US"
                  >
                    United States
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="FR"
                  >
                    France
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="CA"
                  >
                    Canada
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="BE"
                  >
                    Belgium
                  </MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className="mt-5">
              <Button disabled={ country ? false : true } round className="btn-round-active w-150 mr-4" onClick={ handleSubmit }>
                Continue
              </Button>
              <Link to={`/auth/sign-in`}>
                <Button round className="btn-round-active-2">
                  Sign In
                </Button>
              </Link>
            </Row>
      </form>
    );
  }

  const handleSubmit = async () => {
    console.log(`handleSubmit choose country`);
    props.callBack();
  };

  return (
    <>
      { renderChooseCountry()}
    </>
  );
}
