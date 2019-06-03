import Axios from 'axios';
import {GET_DELIVERING_ORDER_SUCCESS,apiURL} from './actionTypes';

export const getDeliveringOrderSuccess =(order)=>{

    return {
        type:GET_DELIVERING_ORDER_SUCCESS,
        order
    }
};

export const getDeliveringOrder=(township,token)=>{

    return (dispatch)=>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'authorization':`Bearer ${token}`
            }
          };
        return Axios.get(apiURL+"api/orders/serach/by/today/"+township+"/delivering",config)
        .then(res=>{
            dispatch(getDeliveringOrderSuccess(res.data));
            
        }).catch(err=>{
            throw err;
        });
    }

}

