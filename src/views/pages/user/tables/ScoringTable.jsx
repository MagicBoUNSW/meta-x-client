import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TabPanel from "@material-ui/lab/TabPanel";
import MaterialTable from "material-table";
import Button from "components/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { getAllScoring } from "../../../../reducers/table";
const styles = {
  tableRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "#fbfbfb",
    },
  },
  onHeaderRow: {
    background: "#ECEEF0",
  },
  onHeaderCell: {
    fontWeight: "bold",
  },
  alignItemsCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textTable: {
    fontSize: "16px",
    lineHeight: "21px",
    color: "#25345C",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
  },
  textStatusInProgress: {
    fontSize: "16px",
    lineHeight: "21px",
    color: "#008189",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
  },
  textStatusDone: {
    ontSize: "16px",
    lineHeight: "21px",
    color: "#D37479",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
  },
  cardIconTitle: {
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "30px",
    lineHeight: "27px",
    padding: "14px 14px 35px 0px",
  },
  btn: {
    borderRadius: "6px",
    height: "25px",
    marginRight: "5px",
  },
  btnTitle: {
    fontSize: "10px",
    paddingTop: "10px",
  },
  tableContainer: {
    padding: "30px",
  },
};
const useStyles = makeStyles(styles);

const ScoringTable = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const reverseString = (str) => str.split("-").reverse().join("-");

  const handleRedirectScore = (id) => {
    history.push(`score/${id}`);
  };

  const columns = [
    {
      title: "FULL NAME",
      key: "fullName",
      onHeaderCell: { className: classes.onHeaderCell },
      render: (record) => (
        <div>
          <span className={classes.textTable}>{record.first_name}</span>
          &nbsp;
          <span className={classes.textTable}>{record.last_name}</span>
        </div>
      ),
    },
    {
      title: "MOCK ID",
      key: "mockid",
      onHeaderCell: { className: classes.onHeaderCell },
      render: (record) => (
        <div className={classes.alignItemsCenter}>
          <div className={classes.textTable}>{record.mock_id}</div>
        </div>
      ),
    },
    {
      title: "EMAIL",
      key: "email",
      onHeaderCell: { className: classes.onHeaderCell },
      render: (record) => (
        <div className={classes.alignItemsCenter}>
          <div className={classes.textTable}>{record.email}</div>
        </div>
      ),
    },
    {
      title: "MOCK STATUS",
      key: "mockstatus",
      onHeaderCell: { className: classes.onHeaderCell },
      render: (record) => (
        <div className={classes.alignItemsCenter}>
          <div className={classes.textTable}>{record.mock_status}</div>
        </div>
      ),
    },
    {
      title: "SCORE",
      key: "score",
      onHeaderCell: { className: classes.onHeaderCell },
      render: (record) => (
        <div className={classes.alignItemsCenter}>
          {record.score === null ? (
            <>
              <div className={classes.textStatusInProgress}>Unscore</div>
            </>
          ) : (
            <>
              <div className={classes.textStatusDone}>{record.score}</div>
            </>
          )}
        </div>
      ),
    },
    {
      title: "DATE",
      key: "date",
      onHeaderCell: { className: classes.onHeaderCell },
      render: (record) => (
        <div className={classes.alignItemsCenter}>
          <div className={classes.textTable}>
            {reverseString(record.created_at.substring(0, 10))}
          </div>
        </div>
      ),
    },
    {
      title: "ACTIONS",
      key: "action",
      onHeaderCell: { className: classes.onHeaderCell },
      render: (record) => {
        return (
          <div className={classes.actionButton} style={{ display: "flex" }}>
            {record.mock_status === "SCORING" ? (
              <>
                <div style={{ color: "#03D7E4" }}>
                  <Button
                    justIcon
                    color="google"
                    simple
                    className={classes.btn}
                    style={{ background: "rgba(228, 3, 16, 0.2)" }}
                    onClick={() => handleRedirectScore(record.id)}
                  >
                    <p
                      className={classes.btnTitle}
                      style={{ color: "#A3010B" }}
                    >
                      Score
                    </p>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div style={{ color: "#03D7E4" }}>
                  <Button
                    justIcon
                    color="google"
                    simple
                    className={classes.btn}
                    style={{ background: " rgba(3, 215, 228, 0.2)" }}
                  >
                    <p
                      className={classes.btnTitle}
                      style={{ color: "#008189" }}
                    >
                      View
                    </p>
                  </Button>
                </div>
              </>
            )}
          </div>
        );
      },
    },
  ];
  const onChangePage = (page, size) => {
    props.getAllScoring(page + 1, size);
  };

  useEffect(() => {
    props.getAllScoring();
  }, []);

  return (
    <MaterialTable
      title={null}
      columns={columns}
      data={props.data}
      page={props.page - 1}
      totalCount={props.total}
      options={{
        search: false,
        toolbar: false,
        pageSize: props.size || 10,
        pageSizeOptions: [10, 20, 30],
      }}
      onChangePage={onChangePage}
      style={{ boxShadow: "none", border: "1px solid black", padding: "10px" }}
    />
  );
};

const mapStateToProps = ({ table }) => {
  return {
    data: table.tablesData,
    page: table.page,
    total: table.total,
    size: table.size,
  };
};
const mapDispatchToProps = {
  getAllScoring,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoringTable);
