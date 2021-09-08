import { LogIn } from 'react-native-feather';
import { FETCH_ORDER, FETCH_ORDER_FAIL, LOGOUT, LOGIN,RETRIEVE_TOKEN } from './constant';

const initialOrderState = {
  loading: true, Orders:[], error: "",
}

const initialLoginState = {
  isLoading: true,
  email: null,
  userToken: null,
};
export const OrderReducer = (state=initialOrderState, action) => {
  switch (action.type) {

    case FETCH_ORDER:
      return { loading: false, Orders: action.payload };
    case FETCH_ORDER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const AuthReducer = (state=initialLoginState, action) => {
  switch (action.type) {
    case RETRIEVE_TOKEN:
      return {
        ...initialLoginState,
        userToken: action.token,
        isLoading: false,
      };
    case LOGIN:
      return {
        ...initialLoginState,
        email: action.id,
        userToken: action.token,
        isLoading: false,
      };
    case LOGOUT:
      return {
        ...initialLoginState,
        email: null,
        userToken: null,
        isLoading: false,
      };
      default:
      return state;
  }
};

