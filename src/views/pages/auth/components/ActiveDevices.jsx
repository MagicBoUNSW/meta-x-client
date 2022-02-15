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
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import { Col, Row } from 'reactstrap';
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { registerVehicle } from 'reducers/vehicle';
import { IRootState } from 'reducers';

const useStyles = makeStyles(styles);

export function ActiveDevices(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [device, setDevice] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

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

  const renderActiveDevice = () => {
    return (
      <>
        <form>
              <Row style={{ marginBottom: "82px"}}>
                <div className={ classes.authMainTitle }>Activate Devices.</div>
                <div className={ classes.authSubTitle }>To activate a device and associate it with account, enter its serial number below. Activate multiple devices by copying and pasting their serial numbers from your order confirmation email. Each device's serial number can also be found on its label or packaging.</div>
              </Row>
              <Row>
                  { errorMessage && <div style={{color: 'red'}}><ErrorOutlineIcon className="mr-2" /> { errorMessage}</div> }
              </Row>
              <Row>
                <CustomInput
                  labelText="Activate Devices"
                  id="active-device"
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
                      setDevice(event.target.value);
                    },
                  }}
                />
              </Row>
              <Row className="mt-5">
                <Button disabled={ device ? false : true } round className="btn-round-active w-150 mr-4" onClick={handleSubmitActiveDevice}>
                Activate Devices
                </Button>
              </Row>

              <Row className="mt-5">
                <Button className="btn-feedback w-98 mr-4">
                Feedback
                </Button>
              </Row>
        </form>
      </>
    );
  }

  const handleSubmitActiveDevice = async () => {
    setErrorMessage("");
    console.log(`handleSubmitActiveDevice`);

    let result = await registerVehicle(device);
    if (result.success) {
      props.callBack();
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <>
      { renderActiveDevice()}
    </>
  );
}

export default connect(
  ({ authentication, vehicle }: IRootState) => ({
    isAuthenticated: authentication.isAuthenticated,
    user: authentication.user,
  }),
  {
  }
)(ActiveDevices);