import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles,withStyles } from "@material-ui/core/styles";
import { Button, TextField} from "@material-ui/core";
import { connect } from "react-redux";
import { getUserInfo, logout } from "../../../../reducers/authentication";
// core components
import Grid from "@material-ui/core/Grid";


const styles = {
  tableContainer: {
    padding: "30px",
    display: "flex"
  },
  tableItem: {
    direction: "column",
    alignItems: "flex-start",
    margin: "30px"
  },
};
const InputField = withStyles((theme) => ({
  root: {
    background: "#FFFFFF",
    width: "150%",
    "& .MuiInputBase-root": {
      color: "#444B59",
      background: "#FFFFFF",
    },
    
  },
}))(TextField);

const useStyles = makeStyles(styles);


const Tables = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getUserInfo;
  }, [props.fullName]);

  const history = useHistory();
  const handleLogout = () => {
    props.logout();
    history.push("/auth/logout");
  };

  const handleChangePassword = () => {
    history.push("/user/change-password")
  }

  const handleChangeName = () => {
    history.push("/user/change-name")
  }

  const method = window.localStorage.getItem("method")

  return (
    <Grid className={classes.tableContainer}>
      <Grid xs={6} className={classes.tableItem} style={{alignSelf: "center"}}>
        <h1>Hello, {props.fullName}</h1>
        <h3>It's nice to see you again!</h3>
      </Grid>
      <Grid >
          <Grid spacing={1} className={classes.tableItem}>
            <Grid><h3>User information</h3></Grid>
              <Grid>
                <h4 className={classes.title}>Email</h4>
                <InputField
                  type="email"
                  id="email"
                  variant="outlined"
                  fullWidth="false"
                  placeholder={props.email}
                  disabled={true}
                  style={{width: "300px"}}
                />
              </Grid>

              <Grid>
                <h4 className={classes.title}>Username</h4>
                <InputField
                  type="username"
                  id="username"
                  variant="outlined"
                  fullWidth="true"
                  placeholder={props.username}
                  disabled={true}
                  style={{width: "300px"}}
                />
              </Grid>

              <Grid>
                <h4 className={classes.title}>Full Name</h4>
                <InputField
                  type="fullName"
                  id="fullname"
                  variant="outlined"
                  fullWidth="true"
                  placeholder={props.fullName}
                  disabled={true}
                  style={{width: "300px"}}
                />
              </Grid>
            </Grid>
            <Grid className={classes.tableItem} style={{display: "flex"}}>
              <Button onClick={handleLogout} style={{backgroundColor: "grey", color: "white", marginRight: "20px"}}>Log out</Button>
              {method === "incognito" ?<Button onClick={handleChangePassword} style={{backgroundColor: "black", color: "white"}}>Change Password</Button> : <div></div>}
              <Button onClick={handleChangeName} style={{backgroundColor: "darkblue", color: "white", marginLeft: "20px"}}>Change name</Button>
            </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = ({ authentication }) => {
  return {
    email: authentication.user.email,
    username: authentication.user.username,
    fullName: authentication.user.fullName
  };
};
const mapDispatchToProps = {
  getUserInfo,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
