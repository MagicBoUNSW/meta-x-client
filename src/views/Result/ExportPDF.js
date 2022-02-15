import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PDFIcon from "../../components/Icons/PDFIcon";
import Button from "@material-ui/core/Button";
import VectorIcon from "../../components/Icons/VectorIcon";
import Criteria from "components/Criteria/Criteria.js";
//redux
import { connect } from "react-redux";
import { getUserTrialMockTestById } from "../../reducers/result";
import axios from "axios";

import { useReactToPrint } from "react-to-print";
import Box from "./Box";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "7%",
    marginRight: "7%",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 13px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    height: "100%",
    width: "85%",
    [theme.breakpoints.down(321)]: {
      marginLeft: "0px",
      marginRight: "0px",
      width: "95%",
    },
  },
  title: {
    borderRadius: "20px 20px 0px 0px",
  },
  titleItem: {},
  heading: {
    paddingLeft: "10%",
    letterSpacing: "-0.01em",
    fontSize: "24px",
    color: "#000000",
    [theme.breakpoints.down(400)]: {
      paddingLeft: "0",
    },
  },
  // result : {
  //   paddingLeft: "7%",
  //   paddingRight: "7%",
  // },
  line: {
    border: "1px solid #C4C5C7",
    height: 1,
    marginLeft: "7%",
    marginRight: "7%",
    // marginRight: "7%",
    width: "100%",
  },
  resultItem: {
    textAlign: "start",
    color: "#000000",
    [theme.breakpoints.down(601)]: {
      padding: "0px",
    },
  },
  header: {
    fontWeight: "600",
    fontSize: "20px",
    color: "#FFDA40",
    marginTop: "10%",
  },
  score: {
    fontWeight: "600",
    lineHeight: "100px",
    fontSize: "70px",
    padding: "4%",
    borderRight: "1px solid #B9B9B9",
    display: "inline-table",
    [theme.breakpoints.down(727)]: {
      borderRight: "none",
    },
  },
  resultStatus: {
    fontSize: "20px",
    lineHeight: "27px",
    textTransform: "uppercase",
  },
  info: {
    marginTop: "14%",
    border: "1px solid #8D91A0",
  },
  container: {
    marginLeft: "7%",
    marginRight: "7%",
    marginBottom: "1%",
    marginTop: "1%",
  },
  buttonContainer: {
    marginLeft: "20%",
    marginRight: "20%",
    alignItem: "center",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down(727)]: {
      flexDirection: "column",
      marginLeft: "10%",
      marginRight: "10%",
    },
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: theme.spacing(2),
    maxWidth: "160px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "26px",
    fontWeight: "500",
    fontSize: "14px",
    padding: "11px",
  },
  comment: {
    fontSize: "20px",
    lineHeight: "27px",
    letterSpacing: "-0.01em",
    color: "#000000",
  },
}));
function ExportPDF() {
  const classes = useStyles();
  const handleSendEmail = async () => {
    const email = props.data.email;
    const result = await axios.post(`/api/account/email`, { email });
    if (result.success) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <Box ref={componentRef} />
      <Grid item xs={12} className={classes.buttonContainer}>
        <Button
          className={classes.button}
          style={{ background: "#FFFFFF" }}
          endIcon={<PDFIcon />}
          onClick={handlePrint}
          typy="primary"
        >
          Export PDF
        </Button>
        <Button
          className={classes.button}
          style={{ background: "#F9DB01" }}
          endIcon={<VectorIcon />}
          onClick={handleSendEmail}
        >
          Send via email
        </Button>
      </Grid>
    </>
  );
}

export default ExportPDF;
