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

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import { Col, Row } from 'reactstrap';
import { Link } from "react-router-dom";

import { loginByCognito } from "reducers/authentication";
const useStyles = makeStyles(styles);

export default function RegisterPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameState, setUsernameState] = React.useState("success");
  const [passwordState, setPasswordState] = React.useState("success");
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

  const handleSubmit = async () => {
    // if (minLengthState === "") {
    //   setminLengthState("error");
    // }
    // if (maxLengthState === "") {
    //   setmaxLengthState("error");
    // }
    console.log(`handleSubmit: ${username} - ${password}`);
    const token = await loginByCognito(username, password);
    if (token) {
      history.push("/#");
    }
  };

  return (
    <div className={classes.container}>
      <Row className="justify-content-center">
          <form>
            <div className={classes[cardAnimaton]} style={{ width : "400px" }}>
                <Row style={{ marginBottom: "82px"}}>
                  <div className={ classes.authMainTitle }>Welcome to Nauvus.</div>
                  <div className={ `${classes.authMainTitle} mb-2` }>Sign In to see latest updates.</div>
                  <div className={ classes.authSubTitle }>Enter your details to proceed further</div>
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
                        setUsername(event.target.value);
                      },
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
                        (password.length < 8) ? (
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
                        setPassword(event.target.value);
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
                          // onClick={() => handleToggle(2)}
                          checkedIcon={<Check className={classes.checkedIcon} />}
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot
                      }}
                      label="Remember me"
                    />
                  </div>
                  <Link to={ `/auth/recovery-password` } className={classes.customRecoveryLink}>Recovery password</Link>
                </Row>
                <Row>
                  <Button round className="btn-round-active w-150 mr-4" onClick={handleSubmit}>
                    Sign In
                  </Button>
                  <Link to={`/#`}>
                    <Button round className="btn-round-active-2">
                      Sign up
                    </Button>
                  </Link>
                </Row>
            </div>
          </form>
      </Row>
    </div>
  );
}
