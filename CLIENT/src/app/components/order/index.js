import React from 'react';

import {connect} from 'react-redux';

import AssignList from './assign_list';
import PickupList from './pickup_list';
import CheckinList from './checkin_list';
require('../../public/css/style.css');

import {getOrder} from '../../actions/order';
import {getAssignedOrder} from '../../actions/assigned_order';
import {getPickedupOrder} from '../../actions/pickedup_order';


class Index extends React.Component{
    constructor(props){
        super(props);
       
    }
    componentDidMount(){
        this.interval = setInterval(()=>{
            this.props.getOrder(this.props.authUser.user.township,this.props.authUser.token);
            this.props.getAssignedOrder(this.props.authUser.user.township,this.props.authUser.user._id,this.props.authUser.token); 
            this.props.getPickedupOrder(this.props.authUser.user.township,this.props.authUser.user._id,this.props.authUser.token);
        },1000);
       
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }
   
        
    render(){
        
        let order_lists;
        var order_count=0;
        if(this.props.orders){
            if(this.props.orders.success){
                order_lists=this.props.orders.orders.map(order=>{
                    if(order){
                        order_count++;
                        return <AssignList key={order._id} order={order}/>
                    }
                });
             }
            else{
                order_lists = <p className="text-info">* No pick up request from customers</p>
            }
        }
        else{
            order_lists = <p className="text-info">* No pick up request from customers</p>
        }
        

        let pickup_lists;
        var pickup_count = 0;
           if(this.props.assignedOrder){
               if(this.props.assignedOrder.success){
                    pickup_lists=this.props.assignedOrder.orders.map(order=>{
                        if(order){
                            pickup_count++;
                            return <PickupList key={order._id} order={order}/>
                        }
                        else{
                            return <p>No Pick up List</p>
                        }
                    });
                 }
                 else{
                     pickup_lists = <p className="text-info">* Currently there is no pick up</p>
                 }
           }
           


        let checkin_lists;
        var checkin_count = 0;
              if(this.props.pickedupOrder){
                  if(this.props.pickedupOrder.success){
                       checkin_lists=this.props.pickedupOrder.orders.map(order=>{
                           if(order){
                               checkin_count++;
                               return <CheckinList key={order._id} order={order}/>
                           }
                           else{
                               return <p>No Check In List</p>
                           }
                       });
                    }
                    else{
                        checkin_lists = <p className="text-info">* Currently there is no Check In</p>
                    }
                }
             
        

        
        
        
        
               
        return (
            
            <div className="container">
                <div className="row">
                
                    <div className="col-md-8 col-md-offset-2">
                    <label>{this.props.message.status==null && <span className="text-success">{this.props.message.msg}</span>}</label> 
                        <div className="panel with-nav-tabs panel-default">
                            <div className="panel-heading">
                                    <ul className="nav nav-tabs">
                                        <li className="active"><a href="#tab1default" data-toggle="tab">Order Request <span className="badge badge-danger">{order_count}</span></a></li>
                                        <li><a href="#tab2default" data-toggle="tab">Pick Up <span className="badge badge-danger">{pickup_count}</span></a></li>
                                        <li><a href="#tab3default" data-toggle="tab">Check In <span className="badge badge-danger">{checkin_count}</span></a></li>

                                    </ul>
                            </div>
                            <div className="panel-body">
                              <div className="tab-content">
                                <div className="tab-pane fade in active" id="tab1default">
                                   {order_lists}
                                </div>
                                <div className="tab-pane fade" id="tab2default">{pickup_lists}</div>
                                <div className="tab-pane fade" id="tab3default">{checkin_lists}</div>
                            
                              </div>
                            </div>
                          </div>
                      </div>
                  </div>
            </div>
        
        );
    }
}
const mapStateToProps=(state)=>{
  return {
    orders:state.Order,
    authUser:state.AuthUser,
    assignedOrder:state.AssignedOrder,
    pickedupOrder:state.PickedupOrder,
    message:state.CustomMessage,

  }
}
const mapDispatchToProps =(dispatch)=>{
  return {
      getOrder:(township,token)=>{
            dispatch(getOrder(township,token));
      },
      getAssignedOrder:(township,uid,token)=>{
            dispatch(getAssignedOrder(township,uid,token));
      },
      getPickedupOrder:(township,uid,token)=>{
            dispatch(getPickedupOrder(township,uid,token));
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Index);