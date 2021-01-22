import React from 'react';
import Burger from '../../Burger/Burger';
// import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
import Buttonclasses from '../../UI/Button/Button.module.css';

const checkoutSummary = props => {
    return <div className={classes.CheckoutSummary}><h1>We hope it tastes better</h1>
    <div style={{width:'100%',height:'300px',margin:'5% auto'}}><Burger ingredients={props.ingredients}/></div>
    <button
        onClick={props.checkoutCancelled}
        className={[Buttonclasses.Button, Buttonclasses.Danger].join(" ")}
      >
        CANCEL
      </button>
      <button
        onClick={props.checkoutContinued}
        className={[Buttonclasses.Button, Buttonclasses.Success].join(" ")}
      >
        CONTINUE
      </button>

    </div>
}

export default checkoutSummary;