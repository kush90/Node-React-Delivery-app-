import React from 'react';
import {connect} from 'react-redux';

import {getCheckedinOrder} from '../../actions/checkin_order';
import {getDeliveringOrder} from '../../actions/delivering_order';
import AssignList from './assign_list';
import DeliverList from './deliver_list';

class Index extends React.Component{

    constructor(props){
        super(props);
    }
    componentDidMount(){
      this.interval = setInterval(()=>{
          
          this.props.getCheckedinOrder(this.props.authUser.user.township,this.props.authUser.token);
          this.props.getDeliveringOrder(this.props.authUser.user.township,this.props.authUser.token); 
          
      },1000);
     
  }
  componentWillUnmount(){
      clearInterval(this.interval);
  }
    render(){
       console.log(this.props.deliveringOrder);
      let assign_lists;
        var assign_count = 0;
           if(this.props.checkedinOrder){
               if(this.props.checkedinOrder.success){
                    assign_lists=this.props.checkedinOrder.things.map(order=>{
                        if(order){
                            assign_count++;
                            return <AssignList key={order._id} order={order}/>
                        }
                        else{
                            return <p>No Assign up List</p>
                        }
                    });
                 }
                 else{
                     assign_lists = <p className="text-info">* Currently there is no delivery</p>
                 }
           }
        let delivery_lists;
        var delivery_count = 0;
           if(this.props.deliveringOrder){
               if(this.props.deliveringOrder.success){
                    delivery_lists=this.props.deliveringOrder.things.map(order=>{
                        if(order){
                            delivery_count++;
                            return <DeliverList key={order._id} order={order}/>
                        }
                        else{
                            return <p>No delivering orders</p>
                        }
                    });
                 }
                 else{
                     delivery_lists = <p className="text-info">* Currently there is no delivering orders</p>
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
                                        <li className="active"><a href="#tab1default" data-toggle="tab">Delivery List <span className="badge badge-danger">{assign_count}</span></a></li>
                                        <li><a href="#tab2default" data-toggle="tab">Delivery Confirmation <span className="badge badge-danger">{delivery_count}</span></a></li>
                                        

                                    </ul>
                            </div>
                            <div className="panel-body">
                              <div className="tab-content">
                                <div className="tab-pane fade in active" id="tab1default">
                                {assign_lists}
                                </div>
                                <div className="tab-pane fade" id="tab2default">
                                    {delivery_lists}
                                </div>
                               
                            
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
      authUser:state.AuthUser,
      message:state.CustomMessage,
      checkedinOrder:state.CheckedinOrder,
      deliveringOrder:state.DeliveringOrder
  
    }
}
const mapDispatchToProps =(dispatch)=>{

  return {
    getCheckedinOrder:(township,token)=>{
        dispatch(getCheckedinOrder(township,token))
    },
    getDeliveringOrder:(township,token)=>{
        dispatch(getDeliveringOrder(township,token))
    }
  }

}
export default connect(mapStateToProps,mapDispatchToProps)(Index);