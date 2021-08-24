import { combineReducers } from "redux";
import {OrderReducer} from './reducer'


export const reducers = combineReducers({

    Orders: OrderReducer

});