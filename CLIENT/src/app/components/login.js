import React from 'react';
import {connect} from 'react-redux';

import {login} from '../actions/auth_user';


 

class Login extends React.Component{

    constructor(props){
        super(props);
        
    }
   
    handleSubmit = (e) =>{
        e.preventDefault();
        let login_user ={
        name:e.target.username.value,
        password:e.target.password.value};
        this.props.login(login_user);
        e.target.username.value="";
        e.target.password.value="";
            
    
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                <label>{this.props.message && <span className="text-danger">{this.props.message.msg}</span>}</label>                  
                    <br/>
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="username" required/>

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required/>

                    <button type="submit">Login</button>
                </div>
            </form>
        );
    }

}
const mapStateToProps = (state)=>{
    return {
        message:state.CustomMessage,
        authUser:state.AuthUser,

    }
}
const mapDispatchToProps=(dispatch,ownProps)=>{
    return {
        login:(user)=>{
            dispatch(login(user,ownProps));
        }
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);