import React from "react";
import propTypes from "prop-types";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

const Table = (props) => {
  return (
    <table className="table">
        <TableHead
          columns={props.columns}
          onSort={props.onSort}
          currentSort={props.currentSort}
          />
        <TableBody
          columns={props.columns}
          data={props.data}
        />
    </table>
  );
};

Table.propTypes = {
  data: propTypes.array.isRequired,
  columns: propTypes.array.isRequired,
  onSort: propTypes.func.isRequired,
  currentSort: propTypes.object.isRequired

};

export default Table;