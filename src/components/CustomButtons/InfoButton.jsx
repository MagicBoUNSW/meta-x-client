import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
    infoColor,
    blackColor,
    hexToRgb
  } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
    root: {
        background: '#25345C',
        borderRadius: '28px',
        width: props => props.width,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '17px',
        height: '45px',
        "&:hover,&:focus": {
            background: '#25345C',
            boxShadow:
              "0 14px 26px -12px rgba(" +
              hexToRgb(infoColor[0]) +
              ", 0.42), 0 4px 23px 0px rgba(" +
              hexToRgb(blackColor) +
              ", 0.12), 0 8px 10px -5px rgba(" +
              hexToRgb(infoColor[0]) +
              ", 0.2)"
        },
        textTransform: 'none',
    },
    label: {
        textTransform: 'none',
    },
};

const InfoButton = withStyles(styles)(({ classes, width, ...other }) => (
    <Button className={classes.root} {...other} />
));

export default InfoButton;