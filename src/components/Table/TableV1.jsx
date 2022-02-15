import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
import { hexToRgb, blackColor, primaryColor } from "assets/jss/material-dashboard-pro-react.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Card from "components/Card/Card.js";
import TableRow from '@material-ui/core/TableRow';
import CheckSquareOutlined from 'components/Icons/CheckSquareOutlined';
import MinusSquareOutlined from 'components/Icons/MinusSquareOutlined';
import DropDownIcon from "components/Icons/DropDownIcon";
import GenPaginationV1 from 'components/Pagination/GenPaginationV1';

const styles = {
  table: {
    minWidth: 500,
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "9px",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
    borderRadius: "3px"
  },
  checked: {
    color: primaryColor[0] + "!important"
  },
  checkRoot: {
    padding: "0px",
    "&:hover": {
      backgroundColor: "unset"
    }
  },
  cardTable: {
    paddingBottom: "40px",
    maxWidth: "calc(100vw - 30px)",
    overflow: "unset",
    overflowY: "unset",
  },
  checkbox: {
    textAlign: 'center'
  },
  dataEmpty: {
    border: "none",
    color: "rgba(0, 0, 0, 0.25)",
    textAlign: "center"
  },
  dropDownIconDate: {
    color: "#C4C4C4",
    cursor: "pointer",
    marginLeft: "10px"
  },
  tableWrapper: {
    overflowX: "auto"
  },
  pointer: {
    cursor: "pointer"
  }
}

const useStyles = makeStyles(styles);

const TableRowExpandable = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { record, columns, rowSelection, checked, index, onBodyRow } = props;
  return (
    <React.Fragment>
      <TableRow key={index} {...onBodyRow} onClick={() => onBodyRow.onClick && onBodyRow.onClick(record.id)} >
        {rowSelection && (
          <TableCell className={classes.checkbox}>
            <Checkbox
              tabIndex={-1}
              checked={checked}
              onChange={() => props.onSelectChange(record, index)}
              checkedIcon={<CheckSquareOutlined />}
              classes={{
                checked: classes.checked,
                root: classes.checkRoot
              }}
            />
          </TableCell>
        )}
        {columns.map(column => {
          if (column.render) {
            if (column.showExpandable) {
              return (
                <TableCell
                  key={column.key}
                  {...column.onCell}
                >
                  <div style={{ display: "flex" }}>
                    {column.render(record[column.key], record, index)}
                    <DropDownIcon className={classes.dropDownIconDate} onClick={() => setOpen(!open)} />
                  </div>
                </TableCell>
              )
            }
            return <TableCell key={column.key} {...column.onCell} >{column.render(record[column.key], record, index)}</TableCell>
          }
          return <TableCell key={column.key} {...column.onCell}>{record[column.key]} </TableCell>
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {props.expandedRowRender(record)}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

class TableV1 extends React.Component {

  state = {
    dataSource: [],
    columns: [],
    current: 1,
    total: 0,
    pageSize: 10,
    rowSelection: false,
    showPagination: true,
    selectedRows: [],
    selectedRowKeys: []
  }

  static getDerivedStateFromProps(props, state) {
    let newState = null

    if (props.dataSource) {
      newState = { ...newState, dataSource: props.dataSource }
    }

    if (props.rowSelection) {
      if (props.rowSelection.selectedRowKeys) {
        newState = { ...newState, selectedRowKeys: props.rowSelection.selectedRowKeys || [] }
      }
    }

    if (props.showPagination) {
      newState = { ...newState, showPagination: props.showPagination }
    }

    if (props.pagination && props.pagination.total) {
      newState = { ...newState, total: props.pagination.total }
    }
    if (props.pagination && props.pagination.current) {
      newState = { ...newState, current: props.pagination.current }
    }
    if (props.pagination && props.pagination.pageSize) {
      newState = { ...newState, pageSize: props.pagination.pageSize }
    }
    return newState
  }

  onSelectAll = () => {
    let { selectedRowKeys, selectedRows, dataSource } = this.state;
    if (selectedRowKeys.length == dataSource.length) {
      selectedRows = [];
      selectedRowKeys = [];
    } else {
      selectedRows = [];
      selectedRowKeys = [];
      dataSource.forEach((record, index) => {
        if (record.key) {
          selectedRows.push(record);
          selectedRowKeys.push(record.key);
        } else {
          selectedRows.push(record);
          selectedRowKeys.push(index);
        }
      })
    }
    this.setState({ selectedRows, selectedRowKeys })
    if (this.props.rowSelection && this.props.rowSelection.onChange) {
      this.props.rowSelection.onChange(selectedRowKeys, selectedRows)
    }
  }

  onSelectChange = (record, index) => {
    let { selectedRowKeys, selectedRows } = this.state;
    if (record.key) {
      if (selectedRowKeys.includes(record.key)) {
        let selectIndex = selectedRowKeys.findIndex(ele => ele == record.key);
        selectedRows.splice(selectIndex, 1)
        selectedRowKeys.splice(selectIndex, 1)
      } else {
        selectedRows.push(record);
        selectedRowKeys.push(record.key);
      }
    } else {
      if (selectedRowKeys.includes(record.key)) {
        let selectIndex = selectedRowKeys.findIndex(ele => ele == index);
        selectedRows.splice(selectIndex, 1)
        selectedRowKeys.splice(selectIndex, 1)
      } else {
        selectedRows.push(record);
        selectedRowKeys.push(index);
      }
    }
    this.setState({ selectedRows, selectedRowKeys })
    if (this.props.rowSelection && this.props.rowSelection.onChange) {
      this.props.rowSelection.onChange(selectedRowKeys, selectedRows)
    }
  }

  onSelect = () => {

  }
  onChangePagination = (event, current) => {
    if (this.props.pagination && this.props.pagination.onChange) {
      const pageSize = this.props.pagination.pageSize || 10;
      this.props.pagination.onChange(current, pageSize)
    }
  }
  onShowSizeChange = (pageSize) => {
    let total = this.props.pagination.total || 0;
    let current = this.props.pagination.current || 1;
    if (Math.ceil(total / pageSize) < current) current = Math.ceil(total / pageSize);
    if (this.props.pagination && this.props.pagination.onShowSizeChange) {
      this.props.pagination.onShowSizeChange(current, Number(pageSize))
    }
  }


  render() {

    const { classes } = this.props;
    const { renderTitle, onHeaderRow, onBodyRow, columns, expandedRowRender, rowSelection, renderFooter } = this.props;
    const data = this.state.dataSource || [];
    const total = this.state.total || 0;
    const current = this.state.current || 1;
    const pageSize = this.state.pageSize || 10;
    const selectedRowKeys = this.state.selectedRowKeys || [];
    const showPagination = this.props.showPagination == false ? false : true;

    return (

      <div>
        <Card testimonial className={classes.cardTable}>
          {renderTitle && renderTitle}
          <div className={classes.tableWrapper}>
            <Table >
              <TableHead {...onHeaderRow}>
                <TableRow>
                  {rowSelection && (
                    <TableCell className={classes.checkbox}>
                      <Checkbox
                        tabIndex={-1}
                        checked={selectedRowKeys.length > 0 ? true : false}
                        checkedIcon={data.length == selectedRowKeys.length ? <CheckSquareOutlined /> : <MinusSquareOutlined />}
                        onChange={this.onSelectAll}
                        classes={{
                          checked: classes.checked,
                          root: classes.checkRoot
                        }}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.key} {...column.onHeaderCell}>
                        {(column.title ? column.title : null)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length <= 0 ? (
                  <TableRow>
                    <TableCell className={classes.dataEmpty} colSpan={columns.length + 1}>No Data</TableCell>
                  </TableRow>
                ) : data.map((record, index) => {
                  let checked = false;
                  if (rowSelection) {
                    if (record.key) checked = selectedRowKeys.includes(record.key);
                    else checked = selectedRowKeys.includes(index);
                  }
                  return (

                    <React.Fragment>
                      {expandedRowRender ? (
                        <TableRowExpandable
                          index={index}
                          onBodyRow={onBodyRow}
                          checked={checked}
                          record={record}
                          columns={columns}
                          rowSelection={rowSelection}
                          onSelectChange={this.onSelectChange}
                          expandedRowRender={expandedRowRender}
                          className={ onBodyRow.onClick ? classes.pointer : '' }
                        />
                      ) : (
                        <TableRow key={index} {...onBodyRow} 
                        className={ onBodyRow?.onClick ? classes.pointer : '' }
                        onClick={() => onBodyRow?.onClick && onBodyRow?.onClick(record.id)}>
                          {rowSelection && (
                            <TableCell className={classes.checkbox}>
                              <Checkbox
                                tabIndex={-1}
                                checked={checked}
                                onChange={() => this.onSelectChange(record, index)}
                                checkedIcon={<CheckSquareOutlined />}
                                classes={{
                                  checked: classes.checked,
                                  root: classes.checkRoot
                                }}
                              />
                            </TableCell>
                          )}
                          { columns.map(column => {
                            if (column.render) {
                              return <TableCell key={column.key} {...column.onCell} >{column.render(record[column.key], record, index)}</TableCell>
                            }
                            return <TableCell key={column.key} {...column.onCell}>{record[column.key]} </TableCell>
                          })}
                        </TableRow>
                      )}

                    </React.Fragment>

                  )
                })}
              </TableBody>
            </Table>
          </div>
          {renderFooter && renderFooter}
        </Card>

        {showPagination && total > 0 && (
          <GenPaginationV1
            total={total}
            current={current}
            pageSize={pageSize}
            showSizeChanger
            onChange={this.onChangePagination}
            onShowSizeChange={this.onShowSizeChange}
            pageSizeOptions={[10, 20, 30, 40]}
          />
        )}

      </div>
    )
  }
}

export default withStyles(styles)(TableV1);