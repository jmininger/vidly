import React from "react";
import propTypes from "prop-types";

const Input = ({id, label, error, ...rest}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        {...rest}
        name={id}
        className="form-control"
        id={id}
      />
      {
        error && (<div className="alert alert-danger"> {error} </div>)
      }
    </div>
  );
};

Input.propTypes = {
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  error: propTypes.oneOfType([propTypes.object, propTypes.string]) //string or undefined
  // value: propTypes.isRequired
};

Input.defaultProps = {
  value: "",
  type: "text"
}

export default Input;