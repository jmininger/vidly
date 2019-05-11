import React from "react";
import propTypes from "prop-types";

const EmptyPage = (props) => {
  return (
    <div>
      <h1> {props.value} </h1>
    </div>
  );
};

export default EmptyPage;

EmptyPage.propTypes = {
    value: propTypes.string.isRequired
  };