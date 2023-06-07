import React from "react";
import classes from "./ActionButton.module.css";

function Button(props) {
  const { onClick, text } = props;
  return (
    <button className={classes.button} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;