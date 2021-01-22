import React, { Component } from 'react';
import Order from '../../components/Order/Order/Order';
import axios from 'axios';

class Orders extends Component{
    state={
        orders:null,
        loading:true
    }

    componentDidMount(){
        axios.get('https://react-paystack-orders-default-rtdb.firebaseio.com/orders.json').then(response=>{
            const fetchedOrders = [];
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id:key
                })
            }
            this.setState({loading:false,orders:fetchedOrders})
        }).catch(err => {
            
            this.setState({loading:false})
        })
    }
    render(){
        let orders = null
        if(this.state.loading){
           orders = <p>Loading...</p>
        }else{
             orders = <div>
             {this.state.orders.map(order =>{
                 return <Order ingredients={order.ingredients} price={order.price}/>
             })}
              </div>
        }
        return <>{orders}</>
    }
}

export default Orders;