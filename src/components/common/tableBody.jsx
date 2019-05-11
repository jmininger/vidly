import React from "react";
import propTypes from "prop-types";
import _ from "lodash";

const TableBody = (props) => {
  const {data, columns} = props;
  const renderCell = (elem, col) =>
    col.content ?
      col.content(elem) :
      _.get(elem, col.path);

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  return (
    <tbody>
    {
      data.map(elem => {
        return (
          <tr key={elem._id}>
            { columns.map(col =>
                <td key={createKey(elem, col)}> {renderCell(elem, col)} </td>)
            }
          </tr>
        );
      })
    }
    </tbody>
  );
};

export default TableBody;

TableBody.propTypes = {
  data: propTypes.array.isRequired,
  columns: propTypes.array.isRequired

};