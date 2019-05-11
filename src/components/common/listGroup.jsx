import React from "react";
import propTypes from "prop-types";

const ListGroup = ({
  elements,
  activeElem,
  iDField,
  valueField,
  onGenreChange}) => {

  let allCategory = {};
  allCategory[iDField] = 0;
  allCategory[valueField] = "All";

  return (
      <ul className="list-group">
        {
          [allCategory, ...elements].map(elem => {
            return (
              <li
                key={elem[iDField]}
                className={activeElem === elem[iDField] ?
                            "list-group-item active":
                            "list-group-item"
                          }
                onClick={()=>onGenreChange(elem[iDField])}
              >
              {elem[valueField]}
              </li>
            );
          })
        }
      </ul>
  );
};


ListGroup.propTypes = {
  elements: propTypes.array.isRequired,
  activeElem: propTypes.any,
  iDField: propTypes.string.isRequired,
  valueField: propTypes.string.isRequired,
  onGenreChange: propTypes.func.isRequired
};

export default ListGroup;