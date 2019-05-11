import React from "react";
import propTypes from "prop-types";

const SearchForm = ({value, onChange}) => {
  return (
    <div>
      <input
        name="search"
        value={value}
        className="form-control my-3"
        onChange={e=>onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchForm;

SearchForm.propTypes = {
  value: propTypes.string,
  onChange: propTypes.func.isRequired
};
