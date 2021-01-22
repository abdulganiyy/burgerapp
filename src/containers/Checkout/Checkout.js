import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends Component {
    state={
        ingredients:{
            salad: 1,
            bacon: 1,
            meat: 1,
            cheese: 1,
        },
        totalPrice:0
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = null;

        for (let param of query.entries()){
            if(param[0]==='price'){
                price = param[1]
            }else{
                ingredients[param[0]] = +param[1]
            }
            
        }

        this.setState({ingredients,totalPrice:price});

    }

    checkoutContinuedHandler=()=>{
        this.props.history.push('/checkout/contact-data')
    }

    checkoutCancelledHandler=()=>{
        this.props.history.goBack()
    }
    render(){
         return <div><CheckoutSummary ingredients={this.state.ingredients} 
         checkoutContinued={this.checkoutContinuedHandler}
         checkoutCancelled={this.checkoutCancelledHandler}/>
         <Route path={this.props.match.path + '/contact-data'} render={()=> <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/>}/></div>
    }
}

export default Checkout;