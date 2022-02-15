import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footer/Footer.js";

import routes from "routes";

import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle.js";

import register from "assets/img/register.jpeg";
import login from "assets/img/login.jpeg";
import lock from "assets/img/lock.jpeg";
import error from "assets/img/clint-mckoy.jpg";
import pricing from "assets/img/bg-pricing.jpeg";
import bgLogin from "assets/img/bg-login.jpg";
import bgRegister from "assets/img/bg-register.jpg";
import bgVehicle from "assets/img/bg-vehicle.jpg";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Grid from "@material-ui/core/Grid";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import { Col, Row } from "reactstrap";

const useStyles = makeStyles(styles);
import "assets/css/auth.css";

export default function Pages(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const { ...rest } = props;
  //handle page login
  const notLoginPage = [];
  // ref for the wrapper div
  const wrapper = React.createRef();
  // styles
  const classes = useStyles();
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBgImage = () => {
    if (window.location.pathname.indexOf("/auth/login") !== -1) {
      return bgLogin;
    } else if (window.location.pathname.indexOf("/auth/login") !== -1) {
      return bgRegister;
    } else if (
      window.location.pathname.indexOf("/auth/register-vehicle") !== -1
    ) {
      return bgVehicle;
    }
    //   window.location.pathname.indexOf("/auth/lock-screen-page") !== -1
    // ) {
    //   return lock;
    // } else if (window.location.pathname.indexOf("/auth/error-page") !== -1) {
    //   return error;
    // }
    return;
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  notLoginPage.push(
    <Row className="margin-0">
      <Col xs={12} sm={12} md={12} lg={12} className="padding-0">
        <Switch>
          {getRoutes(routes)}
          <Redirect from="/auth" to="/auth/login" />
        </Switch>

        {/* <div className="">
          <div
            className={classes.wrapper}
            ref={wrapper}
            // style={{
            //   backgroundColor: "white",
            //   borderRadius: "0px 20px 20px 0px",
            //   zIndex: "1",
            // }}
          >
            <div className={classes.fullPage}>
              <div
                className={classes.container}
                // style={{ width: "100%", zIndex: "9", padding: "20px" }}
              >
                <Row className="justify-content-center">
                  <Card
                    className={classes[cardAnimaton]}
                    style={{ boxShadow: "none", maxWidth: "465px" }}
                  >
                    <CardBody>
                      <Switch>
                        {getRoutes(routes)}
                        <Redirect from="/auth" to="/auth/login" />
                      </Switch>
                    </CardBody>
                  </Card>
                </Row>
              </div>
              <Footer />
            </div>
          </div>
        </div> */}
      </Col>
      {/* <Col
        xs={12}
        sm={12}
        md={12}
        lg={6}
        className="padding-0 d-none d-lg-block"
        style={{ marginLeft: "-20px" }}
      >
        <div
          className={classes.fullPage}
          style={{
            backgroundImage: "url(" + getBgImage() + ")",
            width: "calc(100% + 20px)",
          }}
        ></div>
      </Col> */}
    </Row>
  );
  return (
    <div>
      {/* <AuthNavbar brandText={getActiveRoute(routes)} {...rest} /> */}
      {window.location.pathname.indexOf("/auth/login") === -1 ? (
        notLoginPage
      ) : (
        <div>{getRoutes(routes)}</div>
      )}
      {/* <Row className="margin-0">
        <Col xs={12} sm={12} md={12} lg={6} className="padding-0">
          <div className="">
            <div className={classes.wrapper} ref={wrapper} 
              style={{ backgroundColor: "white", borderRadius: "0px 20px 20px 0px", zIndex: "1" }}> 
              <div
                className={classes.}
              >
                <div className={classes.container} style={{ width: '100%', zIndex: '9', padding: '20px'}}>
                  <Row className="justify-content-center">
                    <Card className={classes[cardAnimaton]} style={{ boxShadow: 'none', maxWidth: '465px'}}>
                    <CardBody>
                      <Switch>
                        {getRoutes(routes)}
                        <Redirect from="/auth" to="/auth/sign-in" />
                      </Switch>
                    </CardBody>
                    </Card>
                  </Row>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="padding-0 d-none d-lg-block" style={{ marginLeft: '-20px'}}>
          <div
            className={classes.fullPage}
            style={{ backgroundImage: "url(" + getBgImage() + ")", width: "calc(100% + 20px)" }}
          >
          </div>
        </Col>
      </Row> */}
    </div>
  );
}
