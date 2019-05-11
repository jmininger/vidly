import React from "react";
import propTypes from "prop-types";

const TableHead = (props) => {
  const { columns, onSort, currentSort} = props;
  return (
    <thead>
    <tr>
      {
        columns.map(col =>
          ( <th
              key={col.path || col.key}
              scope="row"
              onClick={()=> {
                if (col["sortable"])
                  onSort(createSortObj(col.path, currentSort));
              }}
            >
              { col["label"]}
              {col.sortable && col.path === currentSort.path ?
                <i className={currentSort.order[0]==="asc"?"fa fa-sort-asc":"fa fa-sort-desc"} />:
                null
              }
            </th>))
      }
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  columns : propTypes.array.isRequired,
  onSort : propTypes.func.isRequired,
  currentSort: propTypes.object.isRequired

};

export default TableHead;

function createSortObj(path, currentSort){
  let order = ["asc"];
  if (currentSort && currentSort.path === path)
    order = currentSort.order[0] === "asc"?["desc"]:["asc"];
  return {path: path, order: order};
}