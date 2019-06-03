import Axios from 'axios';
import {GET_PICKEDUP_ORDER_SUCCESS,apiURL} from './actionTypes';

export const getPickedupOrderSuccess =(order)=>{

    return {
        type:GET_PICKEDUP_ORDER_SUCCESS,
        order
    }
};

export const getPickedupOrder=(township,uid,token)=>{

    return (dispatch)=>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'authorization':`Bearer ${token}`
            }
          };
        return Axios.get(apiURL+"api/orders/serach/by/today/"+township+"/"+uid+"/picked-up",config)
        .then(res=>{
            dispatch(getPickedupOrderSuccess(res.data));
            
        }).catch(err=>{
            throw err;
        });
    }

}

