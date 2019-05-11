import React from "react";
import propTypes from "prop-types";

const Pagination = ({pageSize, numElements, currentPage, onPageChange}) => {
  const numPages = calcNumPages(pageSize, numElements);
  const pages = generatePageIndex(numPages);
  if (currentPage > pages.length)
    onPageChange(currentPage-1);

  return (
      <nav aria-label="...">
        <ul className="pagination">
          {
            pages.map(pageIdx => {
              return (
                <li
                  key={pageIdx}
                  className={
                    currentPage === pageIdx?
                    "page-item active":
                    "page-item"}
                >
                  <button
                    className="page-link"
                    onClick={()=>onPageChange(pageIdx)}
                  >
                   {pageIdx}</button>
                </li>
                );
            })
          }
        </ul>
      </nav>
  );
};

        // <li className="page-item active">
export default Pagination;

Pagination.propTypes = {
  pageSize: propTypes.number.isRequired,
  numElements: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired

};

Pagination.defaultProps = {
  currentPage : 1
};

function generatePageIndex(numPages) {
  let pages = [];
  for (let i = 1; i <= numPages; i++)
    pages.push(i);
  return pages;
}

function calcNumPages(pageSize, numElements) {
  return Math.ceil(numElements / pageSize);
}