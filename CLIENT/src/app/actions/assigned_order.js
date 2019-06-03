import Axios from 'axios';
import {GET_ASSIGNED_ORDER_SUCCESS,apiURL} from './actionTypes';

export const getAssignedOrderSuccess =(order)=>{

    return {
        type:GET_ASSIGNED_ORDER_SUCCESS,
        order
    }
};

export const getAssignedOrder=(township,uid,token)=>{

    return (dispatch)=>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'authorization':`Bearer ${token}`
            }
          };
        return Axios.get(apiURL+"api/orders/serach/by/today/"+township+"/"+uid+"/assigned",config)
        .then(res=>{
            dispatch(getAssignedOrderSuccess(res.data));
            
        }).catch(err=>{
            throw err;
        });
    }

}

export const pickedupOrder=(thing,token)=>{
    return (dispatch)=>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'authorization':`Bearer ${token}`
            }
          };
          return Axios.post(apiURL+"api/things/",thing,config)
          .then(res=>{
              
          })
          .catch(err=>{
              throw err;
          })
    }
}