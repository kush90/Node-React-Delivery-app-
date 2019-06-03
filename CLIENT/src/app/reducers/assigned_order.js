import {GET_ASSIGNED_ORDER_SUCCESS} from '../actions/actionTypes';
const AssignedOrder =(state=null,action)=>{
    switch(action.type){
        case GET_ASSIGNED_ORDER_SUCCESS:
            state=action.order;
            return state;
        default:
            return state;
    }

}
export default AssignedOrder;