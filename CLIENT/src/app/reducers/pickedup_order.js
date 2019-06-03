import {GET_PICKEDUP_ORDER_SUCCESS} from '../actions/actionTypes';
const PickedupOrder =(state=null,action)=>{
    switch(action.type){
        case GET_PICKEDUP_ORDER_SUCCESS:
            state=action.order;
            return state;
        default:
            return state;
    }

}
export default PickedupOrder;