import React from 'react';
import classes from './Input.module.css';

const input =(props)=>{
    let inputElem = null;
    
    switch(props.elementType){
        case('input'):
          inputElem =<input onChange={props.changed} className={classes.InputElement} {...props.elementConfig} value={props.value}/>
          break;
        case('textarea'):
          inputElem =<textarea onChange={props.changed} className={classes.InputElement} {...props}/>
          break;
        case('select'):
          inputElem =<select onChange={props.changed} className={classes.InputElement} value={props.value}>
              {props.elementConfig.options.map(option =>{
                  return <option key={option.value} value={option.value}>{option.displayValue}</option>
              })}
          </select>
          break;  
        default:
            inputElem=<input className={classes.InputElement} {...props}/>    
    }

    return<div className={classes.Input}>
        <label></label>
        {inputElem}
    </div>
}

export default input;