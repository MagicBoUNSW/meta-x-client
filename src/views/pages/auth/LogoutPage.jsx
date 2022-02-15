import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import bgLogin from "assets/img/bgLogin.png";

const useStyles = makeStyles((theme) => ({
  loginPage: {
    backgroundImage: `url(${bgLogin})`,
    height: "100vh",
    width: "100vw",
    backgroundPosition: "50% center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    // paddingTop: "25%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily: "Roboto",
    "& *": {
      fontFamily: "Roboto",
    },
    // [theme.breakpoints.down(340)]: {
    //   paddingTop: "50%",
    // },
  },
  authMainTitle: {
    fontSize: "45px",
    marginBottom: "15px",
    [theme.breakpoints.down(340)]: {
      fontSize: "30px",
    },
  },
}));

export default function LogoutPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  React.useEffect(() => {
    let id = setTimeout(function () {
      setCardAnimation("");
    }, 700);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id);
    };
  });
  const classes = useStyles();

  return (
    <div className={classes.loginPage}>
      <div>
        <div className={classes.authMainTitle}>Log out success !</div>
        <Link to={`/auth/sign-in`}>
          <Button round className="btn-round-active w-150">
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}


{/* <div className={classes.loginPage}>
  <div className={classes.authMainTitle}>Log out success !</div>
  <Link to={`/auth/sign-in`}>
    <Button round className="btn-round-active w-150">
      Sign In
    </Button>
  </Link>
</div>; */}