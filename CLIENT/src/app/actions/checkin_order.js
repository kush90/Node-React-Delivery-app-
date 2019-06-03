import Axios from 'axios';
import {GET_CHECKEDIN_ORDER_SUCCESS,apiURL} from './actionTypes';

export const getCheckedinOrderSuccess =(order)=>{

    return {
        type:GET_CHECKEDIN_ORDER_SUCCESS,
        order
    }
};

export const getCheckedinOrder=(township,token)=>{

    return (dispatch)=>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'authorization':`Bearer ${token}`
            }
          };
        return Axios.get(apiURL+"api/orders/serach/by/today/"+township+"/checked-in",config)
        .then(res=>{
            dispatch(getCheckedinOrderSuccess(res.data));
            
        }).catch(err=>{
            throw err;
        });
    }

}

