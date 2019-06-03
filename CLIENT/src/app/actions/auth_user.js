import Axios from 'axios';
import {LOGIN_SUCCESS,LOGOUT_SUCCESS,apiURL} from './actionTypes';

import {getMessage,clearMessage} from './message';


export const loginSuccess = (info)=>{

    return {
        type:LOGIN_SUCCESS,
        info
    };

}

export const logoutSuccess =()=>{
    return {
        type:LOGOUT_SUCCESS
    }
}

export const logout =(ownProps)=>{
    return (dispatch)=>{
        dispatch(logoutSuccess());
         ownProps.history.push(`/`);
        //dispatch(push('/')); // navigate to some route
    }
}

export const login =(user,ownProps)=>{
    return (dispatch)=>{
        return Axios.post(apiURL+"api/users/auth",user)
        .then(res=>{
            if(res.data.success){
                dispatch(loginSuccess(res.data));
                dispatch(clearMessage());
                if(res.data.user.role=='picker'){
                    ownProps.history.push(`/pickup-index`);
                }
                else if(res.data.user.role="deliveryman"){
                    ownProps.history.push(`/delivery-index`);
                }
                
                
                
            }
            else{
                dispatch(getMessage(res.data.error,res.data.success));
               
            }
            
        })
        .catch(error=>{
            throw error;
        });
    }

}