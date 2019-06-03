import {LOGIN_SUCCESS,LOGOUT_SUCCESS} from '../actions/actionTypes';
const initialState = {
    success:null,
    msg:null,
    token:'',
    user:{}
}
const Login = (state=initialState,action)=>{

    switch(action.type){
        case LOGIN_SUCCESS:
            state = {
                success:action.info.success,
                msg:action.info.msg,
                token:action.info.token,
                user:action.info.user
            }
            localStorage.setItem('token',action.info.token);
            return state;
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token',true);
            state={
                success:null,
                msg:null,
                token:'',
                user:null
             }
             return state;
             
            
        default:
            return state;
    }

}
export default Login;