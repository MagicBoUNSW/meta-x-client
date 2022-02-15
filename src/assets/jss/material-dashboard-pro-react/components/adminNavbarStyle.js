import {
  containerFluid,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  blackColor,
} from "assets/jss/material-dashboard-pro-react.js";

const headerStyle = () => ({
  appBar: {
    backgroundColor: blackColor,
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    // paddingTop: "8px",
    zIndex: "1029",
    color: "#1C1D21",
    border: "0",
    borderRadius: "3px",
    // padding: "8px 0",
    transition: "all 150ms ease 0s",
    minHeight: "68px",
    display: "block"
  },
  container: {
    ...containerFluid,
    minHeight: "68px"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "32px",
    fontSize: "20px",
    fontWeight: "700",
    borderRadius: "3px",
    textTransform: "uppercase",
    color: "#fff",
    paddingTop: "0.625rem",
    paddingBottom: "0.625rem",
    margin: "0 !important",
    letterSpacing: "unset",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  sidebarMinimize: {
    float: "left",
    padding: "0 0 0 15px",
    display: "block",
    color: grayColor[6]
  },
  sidebarMinimizeRTL: {
    padding: "0 15px 0 0 !important"
  },
  sidebarMiniIcon: {
    width: "20px",
    height: "17px",
    color: "#fff !important"
  }
});

export default headerStyle;
