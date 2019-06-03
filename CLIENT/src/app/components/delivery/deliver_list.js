import React from 'react';
import {connect} from 'react-redux';

import {changeOrderStatus} from '../../actions/order';

class DeliverList extends React.Component{

    constructor(props){
        super(props);

    }
    handleClick =()=>{
        var status="delivered";
        this.props.changeOrderStatus(this.props.order.order,status,this.props.authUser.user._id,this.props.authUser.token);
        var $li = $('.nav-tabs').find('li'),
        i = $li.siblings('.active').index(),
        max = $li.length;
    
        if (i < max) {
        $li.find('[data-toggle="tab"]').eq(i+1).tab('show');
        }
    }
    render(){
        return (
            <div className="card">
                <div className="card-body">
                    <address>
                        <label>Name:</label> <span>{this.props.order.receiver.name}</span><br/>
                        <label>Address:</label> <span>{this.props.order.receiver.address}</span><br/>
                        <label>Township:</label> <span>{this.props.order.receiver.township}</span><br/>
                        <label>Phone:</label> <span>{this.props.order.receiver.phone_no}</span>
                        <div className="btn-group-toggle" data-toggle="buttons" onClick={this.handleClick}>
                            <label className="btn btn-primary active">
                                <input type="checkbox"/> Delivered
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

export default connect(mapStateToprops,mapDispatchToProps)(DeliverList);