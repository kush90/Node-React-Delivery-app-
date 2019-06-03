import {GET_DELIVERING_ORDER_SUCCESS} from '../actions/actionTypes';
const DeliveringOrder =(state=null,action)=>{
    switch(action.type){
        case GET_DELIVERING_ORDER_SUCCESS:
            state=action.order;
            return state;
        default:
            return state;
    }

}
export default DeliveringOrder;