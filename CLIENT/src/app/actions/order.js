import Axios from 'axios';
import {GET_ORDER_SUCCESS,CHANGE_ORDER_STATUS_SUCCESS,REQUEST_ORDER,apiURL} from './actionTypes';
import {getMessage,clearMessage} from './message';


export const getOrderSuccess =(order)=>{

    return {
        type:GET_ORDER_SUCCESS,
        order
    }
};

export const getOrder=(township,token)=>{
    return (dispatch)=>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'authorization':`Bearer ${token}`
            }
          };
        
        if(township){
            // console.log(token);
           
            return Axios.get(apiURL+"api/orders/serach/by/today/"+`${township}`,config)
            .then(res=>{
                
                dispatch(getOrderSuccess(res.data));
                
            })
            .catch(error=>{
                throw error;
            });

        }
    }
};
///////////////////////////
export const changeOrderStatusSuccess=(order)=>{

    return {
        type:CHANGE_ORDER_STATUS_SUCCESS,
        order
    }

}

export const changeOrderStatus =(id,status,uid,token)=>{

    return (dispatch)=>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
             'authorization':`Bearer ${token}`
            }
          };
            return Axios.put(apiURL+"api/orders/"+id+"/"+status+"/"+uid,null,config)
            .then(res=>{
                
                dispatch(getMessage(res.data.msg));
                
                
                
            })
            .catch(err=>{
                throw err;
            });
    }
}

////////////////////////

export const requestOrderSuccess=(request)=>{

    return {
        type:REQUEST_ORDER,
        request
    }

}


export const requestOrder=(phone_no)=>{
    return (dispatch)=>{
        return Axios.get(apiURL+"api/customers/create/order/"+phone_no)
            .then(res=>{
                
                if(res.data.success){
                    dispatch(requestOrderSuccess(res.data))
                    dispatch(clearMessage());
                }
                else{
                    dispatch(getMessage(res.data.msg));
                }
               
                
                
                
            })
            .catch(err=>{
                throw err;
            });
    }
}


