import {GET_MESSAGE,CLEAR_MESSAGE} from './actionTypes';
export const getMessage = (msg,status=null)=>{
    return {
        type:GET_MESSAGE,
        error:{msg,status}

    };

};

export const clearMessage = ()=>{
    return {
        type:CLEAR_MESSAGE,
       

    };

};

