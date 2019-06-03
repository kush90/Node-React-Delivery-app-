import {CREATE_CUSTOMER} from '../actions/actionTypes';
const Customer =(state=[],action)=>{
    switch(action.type){
        case CREATE_CUSTOMER:
            return [
                ...state,
                Object.assign({},action.customer)
            ];
        default:
            return state;

    }

}
export default Customer;