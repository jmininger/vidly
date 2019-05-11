import React from "react";
import propTypes from "prop-types";

const Like = (props) => {
  const style = props.liked ? "fa fa-heart" : "fa fa-heart-o";
  return ( <i className={style} onClick={() => props.handleLike()}/>);
};

Like.propTypes = {
  liked: propTypes.bool.isRequired,
  handleLike: propTypes.func.isRequired
};

Like.defaultProps = {
  liked: false
};
export default Like;