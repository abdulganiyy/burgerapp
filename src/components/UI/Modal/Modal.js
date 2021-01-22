import React from "react";

import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";


const modal = (props) => {
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-110vh)",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default modal;
