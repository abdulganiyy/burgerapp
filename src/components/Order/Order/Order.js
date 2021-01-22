import React, { Component } from 'react';
import classes from './Order.module.css';

class Order extends Component{
    render(){
        
        const ingredients = Object.keys(this.props.ingredients).map(ingName =>{
            return {name:ingName,amount:this.props.ingredients[ingName]}
        });
        const ingredientsOutput = ingredients.map(ing=>{
            return <span style={{
                border:'1px solid #eee',
                padding:'5px',
                margin:'0 8px',
                display:'inline-block',
                textTransform:'capitalize'
            }} key={ing.name}>{ing.name} ({ing.amount})</span>
        })

        return <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price : <strong>{this.props.price}</strong></p>
        </div>
    }
}

export default Order;