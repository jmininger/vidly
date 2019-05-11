import React from "react";
import {Route, Redirect} from "react-router-dom";
import propTypes from "prop-types";
import {getCurrentUser} from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        return Component ?( <Component {...props} />) : render(props);
      }}
    />
  );
};


ProtectedRoute.propTypes = {
  path: propTypes.string.isRequired,
  component: propTypes.func,
  render: propTypes.func
};

export default ProtectedRoute;