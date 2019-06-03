import {combineReducers} from 'redux';
import Customer from "./customer";
import CustomMessage from './message';
import AuthUser from './auth_user';
import Order from './order';
import AssignedOrder from './assigned_order';
import PickedupOrder from './pickedup_order';
import CheckedinOrder from './checked_order';
import DeliveringOrder from './delivering_order';


export default combineReducers({
    Customer:Customer,
    CustomMessage:CustomMessage,
    AuthUser:AuthUser,
    Order:Order,
    AssignedOrder:AssignedOrder,
    PickedupOrder:PickedupOrder,
    CheckedinOrder:CheckedinOrder,
    DeliveringOrder:DeliveringOrder

});