import React from 'react';
import {connect} from 'react-redux';
import {Link,BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './customer/index';
import Register from './customer/register';
import Login from './login';
import Pickup from './order/index';
import OrderRequest from './customer/request_order';
import Delivery from './delivery/index';

import {logout} from '../actions/auth_user';

const Navbar =(props)=>{
    // const token = sessionStorage.getItem('token');
    let filter="";
    if(!props.authUser.token){
          filter = <ul className="nav navbar-nav navbar-right">
                
          <li><Link to="/customer-home"><span className="glyphicon glyphicon-user"></span> Pick Up Form</Link></li>
          <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
      
        </ul>;
    }
    else{
      filter = <ul className="nav navbar-nav navbar-right">
                
         
          <li><Link to="/logout" onClick={props.logout}><span className="glyphicon glyphicon-log-out"></span> Logout</Link></li>
      
        </ul>;
    }

    return (
        <Router>
          <div>
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>                        
                   </button>
                  <Link className="navbar-brand" to="/">WebSiteName</Link>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                  <ul className="nav navbar-nav">

                    {!props.authUser.token &&<li className="active"><Link to="/">Home</Link></li>}
                  
                  </ul>
                  
                {filter}
                </div>
              </div>
            </nav>
          
            <Switch>
              <Route path="/" exact ></Route> 
              <Route path="/login" component={Login}></Route>
              <Route path="/customer-home" component={Home}></Route>
              <Route path="/customer-register" component={Register}></Route>
              <Route path="/order-request" component={OrderRequest}></Route>
              <Route path="/pickup-index" component={Pickup}></Route>
              <Route path="/delivery-index" component={Delivery}></Route>
            </Switch>
          </div>
        </Router>
    );
}
const mapStateToProps =(state) =>{
  return {
    authUser:state.AuthUser
  }
}
const mapDispatchToProps=(dispatch)=>{
      return {
        logout:()=>{
          dispatch(logout());
        }
      }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
