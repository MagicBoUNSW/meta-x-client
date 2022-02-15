import React from "react";
import { Tab, Tabs, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
const styles = {
  tabStyles: {
    centered: {
      alignItems: "center",
      justifyContent: "center",
    },
  },
  tabContainer: {
    background: "#FFFFFF",
    width: "98.9%",
    margin: "24px 0px",
  },
  indicator: {
    background: "#E26740",
    minWidth: "75px",
    position: "absolute",
    bottom: "10px",
  },
  tabItemStyles: {
    minWidth: "75px",
    textTransform: "none",
  },
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(styles);

export default function CustomTabs(props) {
  const [value, setValue] = React.useState(props.value || 1);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleChange = (event, newValue) => {
    props.tabValue(newValue);
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <div className={classes.tabContainer}>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabStyles}
        classes={{
          indicator: classes.indicator,
        }}
        position="static"
        variant="scrollable"
      >
        {props.tabs.map((tab) => {
          let tabName = tab;
          let tabLabel = tabName.replace(/\s/g, "");
          return (
            <Tab
              className={classes.tabItemStyles}
              label={tabName}
              {...a11yProps(tabLabel)}
              disableRipple={"true"}
            >
              {tabName}
            </Tab>
          );
        })}
      </Tabs>
    </div>
  );
}
// import React from "react";
// // nodejs library that concatenates classes
// import classNames from "classnames";
// // nodejs library to set properties for components
// import PropTypes from "prop-types";

// // material-ui components
// import { makeStyles } from "@material-ui/core/styles";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// // core components
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardHeader from "components/Card/CardHeader.js";

// import styles from "assets/jss/material-dashboard-pro-react/components/customTabsStyle.js";

// const useStyles = makeStyles(styles);

// export default function CustomTabs(props) {
//   const [value, setValue] = React.useState(props.value);
//   const handleChange = (event, value) => {
//     setValue(value);
//   };
//   const classes = useStyles();
//   const { headerColor, plainTabs, tabs, title, rtlActive } = props;
//   const cardTitle = classNames({
//     [classes.cardTitle]: true,
//     [classes.cardTitleRTL]: rtlActive
//   });
//   return (
//     <Card plain={plainTabs}>
//       <CardHeader color={headerColor} plain={plainTabs}>
//         {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
//         <Tabs
//           value={value}
//           onChange={props.changeValue ? props.changeValue : handleChange}
//           classes={{
//             root: classes.tabsRoot,
//             indicator: classes.displayNone
//           }}
//           variant="scrollable"
//           scrollButtons="auto"
//         >
//           {tabs.map((prop, key) => {
//             var icon = {};
//             if (prop.tabIcon) {
//               icon = {
//                 icon: <prop.tabIcon />
//               };
//             }
//             return (
//               <Tab
//                 classes={{
//                   root: classes.tabRootButton,
//                   selected: classes.tabSelected,
//                   wrapper: classes.tabWrapper
//                 }}
//                 key={key}
//                 label={prop.tabName}
//                 {...icon}
//               />
//             );
//           })}
//         </Tabs>
//       </CardHeader>
//       <CardBody>
//         {tabs.map((prop, key) => {
//           if (key === value) {
//             return <div key={key}>{prop.tabContent}</div>;
//           }
//           return null;
//         })}
//       </CardBody>
//     </Card>
//   );
// }

// CustomTabs.defaultProps = {
//   value: 0
// };

// CustomTabs.propTypes = {
//   // the default opened tab - index starts at 0
//   value: PropTypes.number,
//   // function for changing the value
//   // note, if you pass this function,
//   // the default function that changes the tabs will no longer work,
//   // so you need to create the changing functionality as well
//   changeValue: PropTypes.func,
//   headerColor: PropTypes.oneOf([
//     "warning",
//     "success",
//     "danger",
//     "info",
//     "primary",
//     "rose"
//   ]),
//   title: PropTypes.string,
//   tabs: PropTypes.arrayOf(
//     PropTypes.shape({
//       tabName: PropTypes.string.isRequired,
//       tabIcon: PropTypes.object,
//       tabContent: PropTypes.node.isRequired
//     })
//   ),
//   rtlActive: PropTypes.bool,
//   plainTabs: PropTypes.bool
// };
