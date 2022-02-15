import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer";
import Checkboxes from "../Checkboxes/Checkboxes.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridcontainer: {
    display: "flex",
    "& h3": {
      fontSize: 20,
      color: "#000",
      fontWeight: "bold"
    },
  },
  flexContain: {
    display: "flex",
    flexDirection: "column",
  },
  flexBox: {
    display: "flex",
    [theme.breakpoints.down(600)]: {
      flexDirection: "column",
    },
  },
  qualityLang: {
    [theme.breakpoints.down(600)]: {
      marginRight: "50%",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "0%",
    },
  },
  accuracy: {
    [theme.breakpoints.down(600)]: {
      marginRight: "50%",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "0%",
    },
  },
}));

function Criteria(props) {
  const classes = useStyles();
  const { data } = props;
  return (
    <div className={classes.root}>
      <GridContainer spacing={8} className={classes.gridcontainer}>
        <Grid
          item
          xs={4}
          sm={6}
          lg={3}
          className={`classes.flexContain ${classes.accuracy}`}
        >
          <h3>Accuracy</h3>
          <Checkboxes value="A" title="A. Major omissions" />
          <Checkboxes value="B" title="B. Major distortions" />
          <Checkboxes value="C" title="C. Major unjustified insertions" />
          <Checkboxes value="D" title="D. Excessive requests for prepetition" />
        </Grid>
        <Grid
          item
          xs={4}
          sm={6}
          lg={5}
          className={`classes.flexContain ${classes.qualityLang}`}
        >
          <h3>Quality of Language</h3>
          <div className={classes.flexBox}>
            <div className={classes.flexContain}>
              <Checkboxes
                value="E"
                title="E. Inappropriate  choice of register in English"
              />
              <Checkboxes value="F" title="F. Unidiomatic usage in English" />
              <Checkboxes
                value="G"
                title="G. Incorrect sentence structures in English"
              />
              <Checkboxes value="H" title="H. Grammatical errors  in English" />
              <Checkboxes
                value="I"
                title="I. Unsatisfactory pronunciation in English"
              />
            </div>
            <div className={classes.flexContain}>
              <Checkboxes
                value="J"
                title="J. Inappropriate choice of register in LOTE"
              />
              <Checkboxes value="K" title="K. Unidiomatic usage in LOTE" />
              <Checkboxes
                value="L"
                title="L. Incorrect sentence strutures in LOTE"
              />
              <Checkboxes value="M" title="M. Grammatical errors in LOTE" />
            </div>
          </div>
        </Grid>
        <Grid Grid item xs={4} sm={6} lg={4} className={classes.flexContain}>
          <h3 style={{ textAlign: "center" }}>Quality of Delivery</h3>
          <Checkboxes
            value="N"
            title="N. Unsatisfactory pronunciation in English"
          />
          <Checkboxes value="P" title="P. Excessive hesitations" />
          <Checkboxes value="Q" title="Q. Excessive self-corrections" />
        </Grid>
      </GridContainer>
    </div>
  );
}
export default Criteria;

