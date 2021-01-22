import React from "react";

import classes from "./Button.module.css";

const button = (props) => {
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(" ")}
      onClick={props.clicked}
    >
      {props.chldren}
    </button>
  );
};

export default button;
