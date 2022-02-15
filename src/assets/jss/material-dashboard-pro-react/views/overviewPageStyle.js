import {
  container,
  cardTitle,
  whiteColor,
  grayColor,
  successColor,
  dangerColor,
  primaryColor,
  primaryBoxShadow,
  hexToRgb,
  blackColor 
} from "assets/jss/material-dashboard-pro-react.js";

const drawerWidth = 387;
const overviewPageStyle = theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: "relative"
  },
  drawerPaper: {
    width: drawerWidth,
    position: "absolute",
    marginLeft: "1px",
    marginTop: "1px",
    overflow: "hidden",
    zIndex: "99"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  searchMapContainer: {
    position: "absolute",
    top: "10px",
    left: "10px"
  },
  btnSearchOnMap: {
    background: "white",
    padding: "3px 20px 0px 20px",
    borderRadius: "36px",
    height: "40px"
  },
  inputAdornmentIcon: {
    color: "#8181A5",
    fontSize: "18px",
    marginLeft: "0 !important;"
  },
  toogleDrawer: {
    color: "#25345C !important",
    background: "white",
    width: '40px !important',
    height: '40px !important',
    minWidth: '40px !important',
    marginTop: "-10px",
    marginRight: "10px"
  }
});

export default overviewPageStyle;
