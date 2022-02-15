import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PDFIcon from "../../components/Icons/PDFIcon";
import Button from "@material-ui/core/Button";
import VectorIcon from "../../components/Icons/VectorIcon";
import Criteria from "components/Criteria/Criteria.js";
import logo from "src/assets/img/logo.png";
import CircularProgress from '@material-ui/core/CircularProgress';
//redux
import { connect } from "react-redux";
import { getUserTrialMockTestById } from "../../reducers/result";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "30px",
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
  img: {
    width: "150px",
    height: "75px",
    marginLeft: "40px",
  },
  titleItem: {},
  heading: {
    paddingLeft: "10%",
    letterSpacing: "-0.01em",
    fontSize: "24px",
    color: "#000000",
    [theme.breakpoints.down(550)]: {
      paddingLeft: "0",
      display: "flex",
      justifyContent: "center",
      lineHeight: "60px",
    },
  },
  line: {
    border: "1px solid #C4C5C7",
    height: "0px",
    marginLeft: "7%",
    marginRight: "7%",
    marginTop: "20px",
    // marginRight: "7%",
    width: "87%",
    [theme.breakpoints.down("md")]: {
      width: "88%",
      marginLeft: "5%",
      marginTop: "20px",
      border: "1px solid #C4C5C7",
      marginRight: "7%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "87%",
      marginLeft: "7%",
      marginTop: "15px",
      border: "1px solid #C4C5C7",
      marginRight: "7%",
    },
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
    fontSize: "18px",
    color: "#000",
    marginTop: "10%",
  },
  score: {
    fontWeight: "600",
    lineHeight: "100px",
    fontSize: "60px",
    borderRight: "1px solid #B9B9B9",
    display: "inline-table",
    [theme.breakpoints.down(727)]: {
      borderRight: "none",
    },
  },
  resultStatus: {
    fontSize: "18px",
    lineHeight: "27px",
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
    fontSize: "18px",
    lineHeight: "27px",
    letterSpacing: "-0.01em",
    color: "#000000",
    fontWeight: "bold",
  },
  buttonProgress: {
    color: "#E15300",
    position: 'absolute',
  },
}));

function Box(props) {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const id = window.location.pathname.split("/")[3];
    props.getUserTrialMockTestById(id);
  }, []);
  const handleSendEmail = async () => {
    if (!loading) {
      setLoading(true);
      const email = props.data.email;
      const result = await axios.post(`/api/account/email`, { email });
      if (result.success) {
        setSuccess(false);
        setLoading(true);
        toast.error("Error while sending email!");
      } else {
        setSuccess(true);
        setLoading(false);
        toast.success("Email has been sent successfully!");
      }
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const id = window.location.pathname.split("/")[3];

  return (
    <div>
      {props.data && (
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={12} ref={componentRef}>
            <Grid item xs={12}>
              <Grid container spacing={3} className={classes.title}>
                <Grid
                  item
                  xs={9}
                  md={10}
                  className={classes.titleItem}
                  style={{
                    background: "#fbe521",
                    borderRadius: "20px 0px 0px 0px",
                  }}
                >
                  <img className={classes.img} src={logo} />
                </Grid>
                <Grid
                  item
                  xs={3}
                  md={2}
                  className={classes.titleItem}
                  style={{
                    background: "#000000",
                    borderRadius: "0px 20px 0px 0px",
                    color: "#FFFFFF",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <h3>Result</h3>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.container}>
              <Grid container spacing={8} className={classes.result}>
                <Grid
                  item
                  xs={4}
                  sm={6}
                  lg={3}
                  xl={4}
                  className={classes.resultItem}
                >
                  <Grid
                    container
                    spacing={3}
                    className={classes.scoreContainer}
                  >
                    <Grid
                      item
                      xs={12}
                      className={classes.header}
                      style={{ marginTop: "25px" }}
                    >
                      Your Overall Mark
                    </Grid>
                    <Grid item xs={12} className={classes.score}>
                      {props.data.score}/90
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={6}
                  lg={4}
                  xl={4}
                  className={classes.resultItem}
                >
                  <Grid
                    container
                    spacing={3}
                    className={classes.resultContainer}
                  >
                    <Grid item xs={12} className={classes.header}>
                      Result
                    </Grid>
                    {props.data.score >= 63 ? (
                      <Grid item className={classes.resultStatus}>
                        Congratulations,
                        <div>
                          <span> You have </span>
                          <span style={{ fontWeight: "800", color: "#39ab26" }}>
                            {" "}
                            PASSED{" "}
                          </span>{" "}
                          the test!
                        </div>
                      </Grid>
                    ) : (
                      <Grid item className={classes.resultStatus}>
                        Unfortunately,
                        <div>
                          <span> You have </span>
                          <span style={{ fontWeight: "800", color: "red" }}>
                            {" "}
                            FAILED{" "}
                          </span>{" "}
                          the test!
                        </div>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={6}
                  lg={5}
                  xl={4}
                  className={classes.resultItem}
                >
                  <Grid container spacing={3} className={classes.info}>
                    <Grid item className={classes.infoDetail}>
                      <span style={{ fontWeight: "800" }}>ID</span>:{" "}
                      {props.data.id}
                    </Grid>
                    <Grid item className={classes.infoDetail}>
                      <span style={{ fontWeight: "800" }}>Email</span>:
                      {props.data.email}
                    </Grid>
                    <Grid item className={classes.infoDetail}>
                      <span style={{ fontWeight: "800" }}>Test date</span>:{""}
                      {props.data.created_at}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.line}></Grid>
            <Grid item xs={12} className={classes.container}>
              <div className={classes.comment}>Criteria:</div>
              <Grid item xs={12} lg={12}>
                <Criteria data={props.data.score_criteria} />
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.container}>
              <div className={classes.comment}>
                Examiner comments:{" "}
                <i style={{ fontWeight: 400, fontSize: "16px" }}>
                  {props.data.comment}
                </i>
              </div>
            </Grid>
          </Grid>

          {/* button export pdf and send email */}
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
              disabled={loading}
              onClick={handleSendEmail}
            >
              Send via email
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            <Link to={`/user/score/${id}`}>
              <Button
                className={classes.button}
                style={{ background: "#fb7821" }}
                endIcon={<RefreshIcon />}
              >
                Re-Score
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

const mapStateToProps = ({ result }) => {
  return {
    data: result.tablesDataResult,
  };
};

const mapDispatchToProps = {
  getUserTrialMockTestById,
};
export default connect(mapStateToProps, mapDispatchToProps)(Box);
