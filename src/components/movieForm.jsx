import React from "react";
import propTypes from "prop-types";

const MovieForm = (props) => {
  return (
    <div>
      <h1> MovieID: {props.match.params.id} </h1>
    </div>
  );
};

MovieForm.propTypes = {
  match: propTypes.object.isRequired
};

export default MovieForm;