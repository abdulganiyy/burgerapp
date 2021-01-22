import React from "react";

import classes from "../UI/Button/Button.module.css";

const orderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((ingKey) => {
    return (
      <li key={ingKey}>
        <span>{ingKey}</span> : {props.ingredients[ingKey]}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious Burger with the following infredients</p>
      <ul>{ingredients}</ul>
      <p>
        <strong>{props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <button
        onClick={props.purchaseClosed}
        className={[classes.Button, classes.Danger].join(" ")}
      >
        CANCEL
      </button>
      <button
        onClick={props.purchaseContinued}
        className={[classes.Button, classes.Success].join(" ")}
      >
        CONTINUE
      </button>
    </>
  );
};

export default orderSummary;
