import React from 'react';
import { connect } from 'react-redux';

import {requestOrder} from '../../actions/order';
require('../../public/css/style.css');

class RequestOrder extends React.Component{

    constructor(props){
        super(props);
       
    }
    handleSubmit = (e) =>{
       
        e.preventDefault();
        this.props.requestOrder(e.target.phone_no.value);


    }

    
    render(){
       
        return (
           
            <form onSubmit={this.handleSubmit} >
            
               
                <div className="container">
               
             
                 <label>{this.props.message && <span className="text-danger">{this.props.message.msg}</span>}</label>                  
                    <br/>
                   

                    <label htmlFor="phone_no"><b>Phone Number</b></label>
                    <input type="text" placeholder="Enter Phone number" name="phone_no" required/>

                   

                    <button type="submit">Request</button>
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
        requestOrder:(phone_no)=>{
            dispatch(requestOrder(phone_no));
        },
        
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RequestOrder);
