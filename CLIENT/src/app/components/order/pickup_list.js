import React from 'react';
import {connect} from 'react-redux';

import {pickedupOrder} from '../../actions/assigned_order';
import {changeOrderStatus} from '../../actions/order';

class PickupList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            pickup:false,
            text:"Pickup"
        }

    }
    handleClick =()=>{
        if(this.state.pickup==false){
                this.setState({
                    pickup:true,
                    text:"Close"
                });
                
        }
        else{
            this.setState({
                pickup:false,
                text:"Pickup"
            });
            
        }
    }
    btnCancel_Click=()=>{
        this.setState({
            pickup:false,
            text:"Pickup"
        });
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        var status="pick-up";
        let newthing ={
            name:e.target.thing_name.value,
            info:e.target.info.value,
            price:e.target.price.value,
            receiver:{
                name:e.target.receiver_name.value,
                phone_no:e.target.phone_no.value,
                township:e.target.township.value,
                address:e.target.address.value,
            },
            order:this.props.order._id
        }
        
        this.props.pickedupOrder(newthing,this.props.authUser.token);
        this.props.changeOrderStatus(this.props.order._id,status,this.props.authUser.user._id,this.props.authUser.token);
        
    }
    render(){
        var form;
        if(this.state.pickup==true){
            form=(<form onSubmit={this.handleSubmit}>
                    <label htmlFor="thing_name"><b>Things Name</b></label>
                    <input type="text" placeholder="Enter Thing Name" name="thing_name" required/>

                    <label htmlFor="info"><b>Thing Details</b></label>
                    <input type="text" placeholder="Enter Thing Details" name="info" required/>

                    <label htmlFor="price"><b>Collected Price</b></label>
                    <input type="text" placeholder="Enter collected price" name="price" required/>
                    
                    <fieldset>
                        <legend>Receiver Info:</legend>
                        <label htmlFor="receiver_name"><b> Name</b></label>
                        <input type="text" placeholder="Enter Receiver Name" name="receiver_name" required/>

                        <label htmlFor="phone_no"><b>Phone No</b></label>
                        <input type="text" placeholder="Enter Phone No" name="phone_no" required/>

                        <label htmlFor="township"><b>Township</b></label>
                        <input type="text" placeholder="Enter Township" name="township" required/>
                        
                        <label htmlFor="address"><b>Address</b></label>
                        <input type="text" placeholder="Enter Address" name="address" required/>
                        </fieldset>
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                <button id="btnPickup" className="btn btn-primary btn-md center-block" style={{width: "100px"}} >Pickup Done</button>
                                 <button id="btnCancel" className="btn btn-danger btn-md center-block" style={{width: "100px"}} onClick={this.btnCancel_Click} >Cancel</button>
                             </div>
                        </div>
                
            </form>
           
            )
        }
        return (
            <div className="card">
                <div className="card-body">
                    <address>
                        <label>Name:</label> <span>{this.props.order.customer.name}</span><br/>
                        <label>Address:</label> <span>{this.props.order.customer.address}</span><br/>
                        <label>Township:</label> <span>{this.props.order.customer.township}</span><br/>
                        <label>Phone:</label> <span>{this.props.order.customer.phone_no}</span>
                        <div className="btn-group-toggle" data-toggle="buttons"  onClick={this.handleClick}>
                            <label className="btn btn-primary active">
                                <input type="checkbox"/> {this.state.text}
                            </label>
                        </div>
                    </address>
                   
                    {form}
                    
                </div>
            </div>            
        );
    }
}

const mapStateToprops=(state)=>{
    return {
        authUser:state.AuthUser,
    }

}
const mapDispatchToProps=(dispatch)=>{
    return {
        pickedupOrder:(thing,token)=>{
            dispatch(pickedupOrder(thing,token));

        },
        changeOrderStatus:(id,status,uid,token)=>{
            dispatch(changeOrderStatus(id,status,uid,token));
        }
    }
}

export default connect(mapStateToprops,mapDispatchToProps)(PickupList);