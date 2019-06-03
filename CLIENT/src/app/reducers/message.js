import {GET_MESSAGE,CLEAR_MESSAGE}  from '../actions/actionTypes';
const initialState = {
    msg: null,
    status: null,
  }
const CustomMessage =(state=initialState,action)=>{
    switch(action.type){
        case GET_MESSAGE:
            state= {
                msg: "*"+action.error.msg,
                status: action.error.status,
                
            
            };
            return state;
        case CLEAR_MESSAGE:
            return {
                msg:null,
                status:null,
                
            }

        default :
            return state;

    }
   

}
export default CustomMessage;