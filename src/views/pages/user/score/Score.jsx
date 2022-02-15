/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Criteria from "components/Criteria/Criteria.js";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar'
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { useHistory } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


//redux
import { connect } from "react-redux";
import { scoreTest, getAudioList, getTestById } from "reducers/score";
import { getUserTrialMockTestById } from "reducers/result";
import { letters } from "components/Checkboxes/Checkboxes";
import ReactAudioPlayer from "react-audio-player";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    width: "90%",
    margin: "20px auto 20px auto",
    padding: 0,
    background: "white",
    borderRadius: 20,
    boxShadow: "0px 4px 13px 0px #00000040",
  },
  mainContainer: {
    paddingTop: 20,
    fontFamily: "Roboto",
  },
  root: {
    flexGrow: 1,
    marginTop: 20,
    padding: "0px 10px",
  },
  gridContainer: {
    paddingLeft: 20,
    margin: 0,
    width: "100%",
    borderBottom: "1px solid #F9DB01",
    "& h3": {
      fontSize: 16,
      fontWeight: 700,
      [theme.breakpoints.down(600)]: {
        width: "100%",
      },
    },
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: "0 !important",
  },
  stepper: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
    width: "100%",
    background: "#EAC439",
    borderRadius: "20px 20px 0 0 ",
    [theme.breakpoints.down(600)]: {
      padding: "20px  10px 20px 10px",
    },
    "& h3": {
      fontSize: 16,
      fontWeight: 700,
      [theme.breakpoints.down(600)]: {
        width: "100%",
      },
    },
  },

  stepperdiv: {
    alignItems: "center",
    textAlign: "center",
  },

  endContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: "20px 20px 30px 0",
    "& Button": {
      padding: "10px 20px 10px 20px",
      fontSize: "14px",
      fontWeight: 700,
      fontFamily: "Roboto",
    },
    "& p": {
      margin: "0 30px 0 0",
      fontSize: 22,
      fontWeight: 700,
    },
  },
  endContainerleft: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: "0px 0px 0px 20px",
  },
  styleButton: {
    background: "#F9DB01",
    borderRadius: "26px",
    marginLeft: 20,
  },
  criteriaContainer: {
    padding: "0px 20px 20px 20px",
    "& h4": {
      fontWeight: 700,
    },
  },
  styleInputfield: {
    width: "20%",
    boxShadow: "0px 4px 4px 0px #00000040",
    padding: 0,
    [theme.breakpoints.down(600)]: {
      width: "40%",
    },
    color: "red",
  },
  styleInputfieldComment: {
    width: "60%",
    boxShadow: "0px 4px 4px 0px #00000040",
    padding: 0,
    [theme.breakpoints.down(600)]: {
      width: "40%",
    },
    color: "red",
  },
  doneText: {
    color: "#D37479",
  },
  scoreText: {
    fontWeight: 700,
    fontSize: 20,
    marginLeft: 30,
  },
  audioText: {
    marginLeft: 100,
    [theme.breakpoints.down(600)]: {
      marginLeft: 0,
      paddingLeft: "0 !important",
    },
  },
  answerSeg: {
    paddingTop: 0,
    margin: 0,
  },
  multilineColor: {
    color: "red",
    fontSize: 22,
  },
  multilineColorComment: {
    color: "black",
    fontSize: 22,
    minHeight:"40px",
    borderRadius:"5px"
  },
  styleInput: {
    margin: "0 !important",
    color: "red",
  },
  userAnswer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "10px",
  },
  columnTitle: {
    justifyContent: "center",
    display: "flex",
    fontWeight: "bold",
  },
  userAnswerDiv: {
    justifyContent: "center",
    display: "flex",
  },
  skeleton: {
    width: "100%",
    height: "80px",
    marginTop: "-10px",
    marginLeft: "30px",
    marginRight: "30px"
  },
}));

let scoreInput = 0;
var commentInput;

function ShowQuestionAnswer(props) {
  const classes = useStyles();

  const questionTitle = [];
  const audioList = [];
  const objects = [];

  props.audio &&
    props.audio.map((item) => {
      questionTitle.push(item.question_title);
      audioList.push(item.audio_link);
    });

  for (let i = 0; i < questionTitle.length; i++) {
    const title = questionTitle[i];
    const audioLink = audioList[i];
    let answer;
    if (props.answer[title]) {
      answer = props.answer[title];
    } else {
      answer = "Not Answered";
    }
    let attempt;
    if (props.attempt[title]) {
      attempt = props.attempt[title];
    } else {
      attempt = 0;
    }
    objects.push([title, audioLink, answer, attempt]);
  }

  return (
    <>
      {props.answer && objects.length > 0 ? (
        objects.map((item) => {
          return (
            <Grid container className={classes.userAnswer}>
              <Grid xs={2} item className={classes.userAnswerDiv}>
                <p>{item[0]}</p>
              </Grid>
              <Grid xs={4} item className={classes.userAnswerDiv}>
                <ReactAudioPlayer src={item[1]} controls />
              </Grid>
              {item[2] == "Not Answered" ? (
                <Grid xs={4} item className={classes.userAnswerDiv}>
                  <p style={{ color: "red", fontWeight: "bold" }}>{item[2]}</p>
                </Grid>
              ) : (
                <Grid xs={4} item className={classes.userAnswerDiv}>
                  <ReactAudioPlayer src={item[2]} controls />
                </Grid>
              )}
              <Grid xs={2} item className={classes.userAnswerDiv}>
                <p>{item[3]}</p>
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Grid container spacing={2}>
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
          <Skeleton className={classes.skeleton} />
        </Grid>
      )}
    </>
  );
}

function Score(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = window.location.pathname.split("/")[3];
    props.getUserTrialMockTestById(id);
    props.getAudioList(id);
  }, []);

  const handleSubmitScore = (id, scoreCriteria, score, comment) => {
    if (scoreInput > 90 || scoreInput < 0) {
      setOpen(true)
    } else {
      id = window.location.pathname.split("/")[3];
      scoreCriteria = letters;
      score = scoreInput;
      comment = commentInput;
      props.scoreTest(id, scoreCriteria, score, comment);

      window.location.href = "/user/result/" + id;
    }
  };

  const handleScoreScore = () => {
    history.push("/");
  };

  const handleInput = (e) => {
    scoreInput = parseFloat(e.target.value);
  };

  const handleInputComment = (e) => {
    var a = e.target.value;
    commentInput = a.toString();
  };

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {props.data && (
        <div className={classes.mainContainer}>
          <React.Fragment>
            <CssBaseline />
            <Container className={classes.cardContainer}>
              <div className={classes.stepper}>
                <div></div>
                <div className={classes.stepperdiv}>
                  <h3>Email</h3>
                  <p>{props.data.email}</p>
                </div>
                <div className={classes.stepperdiv}>
                  <h3>Mock ID</h3>
                  <span>Mock</span>&nbsp;<span>{props.data.mock_id}</span>
                </div>
                <div className={classes.stepperdiv}>
                  <h3>Mock Status</h3>
                  <p>{props.data.mock_status}</p>
                </div>
                <div></div>
              </div>
              <div className={classes.root}>
                <Grid container className={classes.userAnswer}>
                  <Grid xs={2} item className={classes.columnTitle}>
                    <p>Title</p>
                  </Grid>
                  <Grid xs={4} item className={classes.columnTitle}>
                    <p>Question Audio</p>
                  </Grid>
                  <Grid xs={4} item className={classes.columnTitle}>
                    <p>Answer</p>
                  </Grid>
                  <Grid xs={2} item className={classes.columnTitle}>
                    <p>Attempts</p>
                  </Grid>
                </Grid>
                <ShowQuestionAnswer
                  answer={props.data.answer}
                  attempt={props.data.attempt}
                  audio={props.audioLink}
                />
              </div>
              <div className={classes.criteriaContainer}>
                <h4>Criteria to score the test</h4>
                <Criteria />
                <div className={classes.endContainer}>
                  <div className={classes.endContainerleft}>
                    <p>Comment</p>
                    <FormControl
                      variant="outlined"
                      className={classes.styleInputfieldComment}
                    >
                      {/* <OutlinedInput
                        inputProps={{ maxLength: 70 }}
                        maxlength="70"
                        placeholder="Add Comment"
                        onChange={handleInputComment}
                        className={classes.multilineColorComment}
                        endAdornment={
                          <InputAdornment position="end">
                            <p className={classes.styleInput}></p>
                          </InputAdornment>
                        }
                      /> */}
                      <TextareaAutosize
                        maxRows={4}
                        aria-label="maximum height"
                        placeholder="Add Comment"
                        onChange={handleInputComment}
                        className={classes.multilineColorComment}
                        style={{padding:"5px"}}
                        // endAdornment={
                        //   <InputAdornment position="end">
                        //     <p className={classes.styleInput}></p>
                        //   </InputAdornment>
                        // }
                      />
                    </FormControl>
                  </div>  
                  <p>Score</p>
                  <FormControl
                    variant="outlined"
                    className={classes.styleInputfield}
                  >
                    <OutlinedInput
                      onChange={handleInput}
                      className={classes.multilineColor}
                      endAdornment={
                        <InputAdornment position="end">
                          <p className={classes.styleInput}>/90</p>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className={classes.endContainer}>
                  <Button
                    variant="contained"
                    className={classes.styleButton}
                    onClick={handleScoreScore}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.styleButton}
                    onClick={handleSubmitScore}
                  >
                    Submit
                  </Button>
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                      Score must be between 0 and 90
                    </Alert>
                  </Snackbar>
                </div>
              </div>
            </Container>
          </React.Fragment>
        </div>
      )}
    </>
  );
}

// component will receive: props.todoList
const mapStateToProps = ({ score, result }) => {
  return {
    testInfo: score.test,
    data: result.tablesDataResult,
    audioLink: score.audio,
  };
};

const mapDispatchToProps = {
  getTestById,
  getUserTrialMockTestById,
  scoreTest,
  getAudioList,
};
export default connect(mapStateToProps, mapDispatchToProps)(Score);
