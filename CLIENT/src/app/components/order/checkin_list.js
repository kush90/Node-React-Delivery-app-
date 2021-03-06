import React from 'react';
import {connect} from 'react-redux';

import {changeOrderStatus} from '../../actions/order';

class AssignList extends React.Component{

    constructor(props){
        super(props);

    }
    handleClick =()=>{
        var status="check-in";
        this.props.changeOrderStatus(this.props.order._id,status,this.props.authUser.user._id,this.props.authUser.token);
        
    }
    render(){
        return (
            <div className="card">
                <div className="card-body">
                    <address>
                        <label>Name:</label> <span>{this.props.order.customer.name}</span><br/>
                        <label>Address:</label> <span>{this.props.order.customer.address}</span><br/>
                        <label>Township:</label> <span>{this.props.order.customer.township}</span><br/>
                        <label>Phone:</label> <span>{this.props.order.customer.phone_no}</span>
                        <div className="btn-group-toggle" data-toggle="buttons" onClick={this.handleClick}>
                            <label className="btn btn-primary active">
                                <input type="checkbox"/> Check In
                            </label>
                        </div>
                    </address>
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
        changeOrderStatus:(id,status,uid,token)=>{
            dispatch(changeOrderStatus(id,status,uid,token));
        }
    }
}

export default connect(mapStateToprops,mapDispatchToProps)(AssignList);