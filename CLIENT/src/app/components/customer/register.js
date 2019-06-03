import React from 'react';
import { connect } from 'react-redux';

import {createCustomer} from '../../actions/customer';


require('../../public/css/style.css');

class Register extends React.Component{

    constructor(props){
        super(props);
       
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        let newCustomer ={
            name:e.target.name.value,
            phone_no:e.target.phone_no.value,
            township:e.target.township.value,
            address:e.target.address.value
        };
        this.props.createCustomer(newCustomer);
            

    }

    
    render(){
       
        return (
           
            <form onSubmit={this.handleSubmit} >
            
               
                <div className="container">
               
             
                 <label>{this.props.message && <span className="text-danger">{this.props.message.msg}</span>}</label>                  
                    <br/>
                     <label htmlFor="name"><b>name</b></label>
                    <input type="text" placeholder="Enter name" name="name" required/>

                    <label htmlFor="phone_no"><b>Phone Number</b></label>
                    <input type="text" placeholder="Enter Phone number" name="phone_no" required/>

                    <label htmlFor="township"><b>Township</b></label>
                    <input type="text" placeholder="Enter Township" name="township" required/>

                    <label htmlFor="address"><b>Address</b></label>
                    <input type="text" placeholder="Enter Address" name="address" required/>

                    <button type="submit">Register</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        message:state.CustomMessage
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        createCustomer:(customer)=>{
            dispatch(createCustomer(customer));
        },
        
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);