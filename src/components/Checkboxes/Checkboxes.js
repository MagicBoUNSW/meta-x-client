import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
//redux
import { connect } from "react-redux";
import { getUserTrialMockTestById } from "../../reducers/result";

const useStyles = makeStyles((theme) => ({
  styleCheckbox: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    "& p": {
      width: "80%",
      [theme.breakpoints.down(600)]: {
        width: 100,
      },
    },
  },
  styleFormLabel: {
    width: 20,
    height: 20,
  },
}));

export let letters;
let preCheck;

function Checkboxes(props) {
  const [color, setColor] = React.useState("grey");

  const mockStatus = props.data.mock_status
  if (mockStatus === "DONE") {
    let initialCriteria = props.data.score_criteria
    if (letters === undefined || letters ===  null) {
      if (initialCriteria !== undefined && initialCriteria !== null && initialCriteria.length !== 0) {
        letters = initialCriteria;
      } else {letters = []}
    }
  } else {letters = []}

  if ( letters !==  null) {
    preCheck = letters.includes(props.value) ? true : false
  } else {preCheck = false}
  const [check, setCheck] = React.useState(preCheck)

  const handleChange = (e) => {
    if (e.target.checked) {
      if (!letters.includes(e.target.value)) {
        letters.push(e.target.value)
      }
    } else {
      const data = e.target.value;
      const newArray = letters.filter(item => item!== data)
      letters = newArray
    }
  }

  const classes = useStyles();

  const handleClick = () => {
    setCheck(!check)
  }

  const page = window.location.pathname.split("/")[2];
  return (
    <>
      {props.data &&
      props.data.score !== null &&
      props.data.score_criteria.length > 0 ? (
        <>
          {props.loading && (
            <div className={classes.styleCheckbox}>
              <FormControlLabel
                onChange={handleChange}
                value={props.value}
                control={
                  page === "score" ?
                  <Checkbox
                    checked={check}
                    onClick={handleClick}
                    name="checkedA"
                    className={classes.styleButtonCheckbox}
                  /> :
                  <Checkbox
                    style={
                      props.data.score_criteria.includes(props.value)
                        ? { color: "red" }
                        : { color: "gray" }
                    }
                    name="checkedA"
                    checked={props.data.score_criteria.includes(props.value)}
                    disabled={true}
                    className={classes.styleButtonCheckbox}
                  />
                }
                className={classes.styleFormLabel}
              />
              {letters.includes(props.value)
                ? ( <del style={{ color:"red" }}>{props.title}</del>)
                : (<p style={{ color: color }}>{props.title}</p>)}
              
            </div>
          )}
        </>
      ) : (
        <div className={classes.styleCheckbox}>
          <FormControlLabel
            onChange={handleChange}
            value={props.value}
            control={<Checkbox name="checkedA" />}
            className={classes.styleFormLabel}
          />
          <p style={{ color: color }}>{props.title}</p>
        </div>
      )}
    </>
  );
}
const mapStateToProps = ({ result }) => {
  return {
    data: result.tablesDataResult,
    loading: result.loading,
  };
};

const mapDispatchToProps = {
  getUserTrialMockTestById,
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkboxes);
