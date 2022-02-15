import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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

import TrashIcon from "components/Icons/TrashIcon";

const styles = {
    icons: {
        width: "22px",
        height: "22px",
        color: "#C4C4C4",
        "&:hover": {
            color: "#25345C"
        }
    },
    root: {
        width: '100%',
        // display: flex;
        alignItems: "center",
        padding: "14px 16px",
        width: "288px",
        height: "65px",
        background: "#FFFFFF",
        border: "1px solid #ECEEF0",
        boxSizing: "border-box",
        borderRadius: "28px",
    },
    itemTextRoot: {
        marginTop: '-6px'
    },
    primaryText: {
        fontFamily: "Lato",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "17px",
        color: "#25345C",
    },
    secondaryText: {
        fontFamily: "Lato",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "18px",
        color: "#C4C4C4",
    },
    iconRoot: {
        marginTop: "-16px",
        marginLeft: "-7px",
        minWidth: "34px",
    },
    listItemButton: {
        "&:hover": {
            background: 'none !important'
        }
    }
};

const useStyles = makeStyles(styles);

export default function DeleteButton() {
    const classes = useStyles();

    return (
        <List className={classes.root} style={{ float: 'right', marginRight: '-14px' }}>
            <ListItem button classes={{ button: classes.listItemButton }}>
                <ListItemIcon classes={{ root: classes.iconRoot }}>
                    <TrashIcon className={classes.icons} />
                </ListItemIcon>
                <ListItemText classes={{ root: classes.itemTextRoot, primary: classes.primaryText, secondary: classes.secondaryText }} primary="Delete Organisation" secondary="Hide & disable current organisation" />
            </ListItem>
        </List>
    );
};