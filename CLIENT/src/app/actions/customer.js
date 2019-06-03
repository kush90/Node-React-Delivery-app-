import Axios from 'axios';
import {CREATE_CUSTOMER,apiURL,} from './actionTypes';

import {getMessage,clearMessage} from './message';

// redux create customer action and async action
export const createCustomerSuccess = (customer)=>{
    return {
        type:CREATE_CUSTOMER,
        customer

    };

};

export const createCustomer = (customer)=>{
    return (dispatch)=>{
        return Axios.post(apiURL+"api/customers",customer)
        
        .then(res => {
            if(res.data.success)
            {
                dispatch(createCustomerSuccess(res.data));
                dispatch(clearMessage());
                console.log(res.data);
                
            }
            else{
                dispatch(getMessage(res.data.error,res.data.success));
                console.log(res.data);
            
            }
        })
        .catch(error=>{
            throw error;
        });
    };
};

////////////////////////////////////////////