import {GET_ORDER_SUCCESS,CHANGE_ORDER_STATUS_SUCCESS,REQUEST_ORDER} from '../actions/actionTypes';
const Order =(state=null,action)=>{
    switch(action.type){
        case GET_ORDER_SUCCESS:
            return action.order
        case CHANGE_ORDER_STATUS_SUCCESS:
            return action.order
        case REQUEST_ORDER:
            return action.request
        default:
            return state;
    }

}
export default Order;