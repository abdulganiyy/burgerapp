import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.5,
  meat: 0.5,
  cheese: 0.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  purchaseContinueHandler = () => {
    // console.log(this.props)
    const queryParams = [];
    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]))
     }

     queryParams.push('price=' + this.state.totalPrice);

     const queryString = queryParams.join('&');
    this.props.history.push({
      pathname:'/checkout',
      search:'?'+ queryString
    });
  };
  purchaseClosingHandler = () => {
    this.setState({
      purchasing: false,
    });
  };
  purchasingHandler = () => {
    this.setState({
      purchasing: true,
    });
  };
  updatePurchaseState(updatedIngredients) {
    const ingredients = {
      ...updatedIngredients,
    };

    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, ingVal) => {
        return sum + ingVal;
      }, 0);

    this.setState({
      purchasable: sum > 0,
    });
  }

  ingredientsAdded = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = newCount;

    const oldPrice = this.state.totalPrice;

    const newPrice = oldPrice + INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientsHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    let newCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = newCount;

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - INGREDIENT_PRICES[type];

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });

    this.updatePurchaseState(updatedIngredients);
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseClosingHandler}
        >
          <OrderSummary
            purchaseContinued={this.purchaseContinueHandler}
            purchaseClosed={this.purchaseClosingHandler}
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredients={this.ingredientsAdded}
          removeIngredients={this.removeIngredientsHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchasingHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
