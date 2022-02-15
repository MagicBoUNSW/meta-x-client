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
import Loading from "components/Loading/Loading";
// components
import CompletedRegister from "./components/CompletedRegister";
import ActiveDevices from "./components/ActiveDevices";
import ChooseCountry from "./components/ChooseCountry";
import ConfirmRegister from "./components/ConfirmRegister";
import RegisterAccount from "./components/RegisterAccount";

import { connect } from 'react-redux';
import { registerVehicle } from 'reducers/vehicle';
import { getUserInfo } from 'reducers/authentication';
import { IRootState } from 'reducers';

export function VehicleRegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const history = useHistory();
  const [fetchSession, setFetchSession] = React.useState(false);

  React.useEffect(() => {
    console.log(`fetchSession: ${fetchSession}`);
    async function fetchUserInfo() {
      try {
        await props.getUserInfo();
        setFetchSession(true);
        console.log(fetchSession)
      } catch (e) {
      } finally {
        // setFetchSession(true);
      }
    }
    fetchUserInfo();
  }, [1]);
  const classes = useStyles();

  
  const callbackActiveDevice = async () => {
    history.push("/#");
  }

  const redirectLogin = () => {
    history.push("/auth/sign-in");
  }

  return (
    <>
      { fetchSession ?
        <>
          { props.isAuthenticated ?
            <>
              <ActiveDevices callBack={ callbackActiveDevice } />
            </> :
            <>
              { redirectLogin() }
            </>
          }
        </> :
        <>
          <Loading />
        </>
      }
    </>
  );
}

export default connect(
  ({ authentication, vehicle }: IRootState) => ({
    isAuthenticated: authentication.isAuthenticated,
    user: authentication.user,
  }),
  {
    getUserInfo
  }
)(VehicleRegisterPage);
