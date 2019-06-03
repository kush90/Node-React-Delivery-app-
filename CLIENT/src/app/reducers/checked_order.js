import {GET_CHECKEDIN_ORDER_SUCCESS} from '../actions/actionTypes';
const CheckedinOrder =(state=null,action)=>{
    switch(action.type){
        case GET_CHECKEDIN_ORDER_SUCCESS:
            state=action.order;
            return state;
        default:
            return state;
    }

}
export default CheckedinOrder;