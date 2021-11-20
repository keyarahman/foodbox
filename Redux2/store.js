import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
// import userReducer from './reducers';

import {OrderReducer, AuthReducer, productReducer} from "./reducer";

const rootReducer = combineReducers({
  OrderReducer,
  AuthReducer,
  productReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
