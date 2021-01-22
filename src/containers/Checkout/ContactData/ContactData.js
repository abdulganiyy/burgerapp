import React from 'react'
import classes from './ContactData.module.css';
import ButtonClasses from '../../../components/UI/Button/Button.module.css';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'

class ContactData extends React.Component{
    state={
       orderForm:{
         name:{
             elementType:'input',
             elementConfig:{
                 type:'text',
                 placeholder:'Your Name'
             },
             value:'Balogun Abdulganiyy',
             validation:{
                 required:true
             }
         },
         street:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Street'
            },
            value:'street',
            validation:{
                required:true
            }

        },
         zipCode:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Zipcode'
            },
            value:'200222',
            validation:{
                required:true
            }
        },             
         country:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your Country'
            },
            value:'Nigeria',
            validation:{
                required:true
            }
        },
         email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'Your-Email'
            },
            value:'test@test.com',
            validation:{
                required:true
            }
        },
         deliverymethod:{
             elementType:'select',
             elementConfig:{
                 options:[{
                    value:'fastest',
                    displayValue:'Fastest'
                },{
                     value:'cheapest',
                     displayValue:'Cheapest'
                 }]
             }
         }
            
       },
       loading:false
    }

    orderHandler =(event) =>{
          event.preventDefault();
          this.setState({loading:true})
        //   console.log(this.props.ingredients);
        const formData = {};
        for(let formInputId in this.state.orderForm){
           formData[formInputId] = this.state.orderForm[formInputId].value;
        }
          const order={
              ingredients:this.props.ingredients,
              price:this.props.price,
              ContactData:formData
              
          }

          axios.post('https://react-paystack-orders-default-rtdb.firebaseio.com/orders.json',order).then(response =>{
              alert('Order received');
              this.setState({loading:false})
          }).catch(err => {
            this.setState({loading:false})
          })
    }

    onChangeHandler =(event,inputIdentifier)=>{
        const updatedForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value
        updatedForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm:updatedForm});
    }
    render(){
        let contactform = null;
        let formElements = [];
            for(let key in this.state.orderForm){
                formElements.push({
                    id:key,
                    config:this.state.orderForm[key]
                })
            }

        if(this.state.loading){
            contactform = <Spinner />
        }else{
            contactform =(<form onSubmit={this.orderHandler} >
                {formElements.map(formElement=>{
                   return <Input 
                    key={formElement.id} 
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event)=> this.onChangeHandler(event,formElement.id)}
                    />
                })}
                <button style={{display:'block',margin:'20px auto'}} className={[ButtonClasses.Button,ButtonClasses.Success].join(' ')}>ORDER</button>
            </form>)

            
        }
        return <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {contactform}
     </div>
    }
}

export default ContactData;