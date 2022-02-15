import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// import Weekend from "@material-ui/icons/Weekend";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import CustomSearchInput from "components/CustomInput/CustomSearchInput";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon18 from "components/Icons/SearchIcon18";

import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// import PerfectScrollbar from "react-perfect-scrollbar";

import { Col, Row } from 'reactstrap';
import {
  cardTitle,
  roseColor
} from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  extraSidebarContainer: {
    padding: '0 18px'
  },
  extraSidebarSearchContainer: {
    height: '68px',
    borderBottom: '1px solid #25345c1f'
  },
  btnSearch: {
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '17px'
  },
  txtListItemPrimary: {
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '21px',
    fontFamily: '"Lato", sans-serif'
  },
  txtListItemPrimarySub: {
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '21px',
    fontFamily: '"Lato", sans-serif',
    color: '#25345C'
  }
};

import { connect } from 'react-redux';
import { loadVehicles } from 'reducers/vehicle';
import { IRootState } from 'reducers';
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);
var ps;
export function ExtraSideBar(props) {
  const classes = useStyles();
  const mainPanelVehicleSideBar = React.createRef();

  const [open, setOpen] = React.useState(true);
  const [currentTab, setCurrentTab] = React.useState("General");

  const handleClick = (tabName) => {
    console.log(`on click tab: ${tabName}`)
    if (tabName === currentTab) {
      setOpen(!open);
    } else {
      setOpen(true);
      setCurrentTab(tabName);
    }
  };

  const isOpenList = (tabName) => {
    return open && currentTab === tabName;
  }

  return (
    <>
      <div className={ classes.extraSidebarContainer }>
        <Row className={ classes.extraSidebarSearchContainer }>
          <Col>
            <CustomSearchInput />
          </Col>
        </Row>
        
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              ORGANISATION
            </ListSubheader>
          }
          className={classes.root}
        >
          {/* General */}
          <ListItem button onClick={() => handleClick(`General`)}>
            <ListItemText primary="General" classes={ {primary: classes.txtListItemPrimary} } />
            {isOpenList(`General`) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpenList(`General`)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/setting/general">
                <ListItem button className={classes.nested}>
                  <ListItemText primary="General Setting" classes={ {primary: classes.txtListItemPrimarySub} }/> 
                </ListItem>
              </Link>
              <Link to="/setting/user-roles">
                <ListItem button className={classes.nested}>
                  <ListItemText primary="User & Role" classes={ {primary: classes.txtListItemPrimarySub} }/> 
                </ListItem>
              </Link>
              <Link to="/setting/drivers">
                <ListItem button className={classes.nested}>
                  <ListItemText primary="Drivers" classes={ {primary: classes.txtListItemPrimarySub} }/> 
                </ListItem>
              </Link>
            </List>
          </Collapse>

          {/* Devices */}
          <ListItem button onClick={() => handleClick(`Devices`)}>
            <ListItemText primary="Devices" classes={ {primary: classes.txtListItemPrimary} } />
            {isOpenList(`Devices`) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpenList(`Devices`)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <Link to="/auth/register-vehicle">
                  <ListItemText primary="Device" classes={ {primary: classes.txtListItemPrimarySub} }/>
                </Link>
              </ListItem>
            </List>
          </Collapse>

          {/* Fleet */}
          <ListItem button onClick={() => handleClick(`Fleet`)}>
            <ListItemText primary="Fleet" classes={ {primary: classes.txtListItemPrimary} }  />
            {isOpenList(`Fleet`) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpenList(`Fleet`)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            </List>
          </Collapse>

          {/* Links & Sharing */}
          <ListItem button onClick={() => handleClick(`LinksSharing`)}>
            <ListItemText primary="Links & Sharing" classes={ {primary: classes.txtListItemPrimary} }  />
            {isOpenList(`LinksSharing`) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpenList(`LinksSharing`)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            </List>
          </Collapse>

          {/* Developer */}
          <ListItem button onClick={() => handleClick(`Developer`)}>
            <ListItemText primary="Developer" classes={ {primary: classes.txtListItemPrimary} } />
            {isOpenList(`Developer`) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpenList(`Developer`)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            </List>
          </Collapse>

          {/* SuperUser */}
          <ListItem button onClick={() => handleClick(`SuperUser`)}>
            <ListItemText primary="SuperUser" classes={ {primary: classes.txtListItemPrimary} } />
            {isOpenList(`SuperUser`) ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpenList(`SuperUser`)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            </List>
          </Collapse>
        </List>
      </div>
    </>
  );
}

export default connect(
  ({ vehicle }: IRootState) => ({
    vehicles: vehicle.vehicles
  }),
  {
  }
)(ExtraSideBar);