import {AtSign, LogIn} from "react-native-feather";
import {
  FETCH_ORDER,
  FETCH_ORDER_FAIL,
  LOGOUT,
  LOGIN,
  RETRIEVE_TOKEN,
  IS_NEW_OREDER,
  ERROR,
  PRODUCTS_DETAILS,
  DELETE_PRODUCTS,
  EDITPRODUCT,
  CATAGORIES,
  NEWPRODUCT,
} from "./constant";

const initialOrderState = {
  loading: true,
  Orders: [],
  loginError: "",
};

const initialLoginState = {
  isLoading: true,
  email: null,
  userToken: null,
  error: "",
};
const initialProductState = {
  loading: true,
  Products: [],
  categories: [],
};
export const OrderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case FETCH_ORDER:
      return {
        loading: false,
        Orders: action.payload,
      };
    case FETCH_ORDER_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const AuthReducer = (state = initialLoginState, action) => {
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
    case ERROR:
      return {
        ...initialLoginState,
        loginError: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case PRODUCTS_DETAILS:
      return {
        ...state,
        Products: action.payload,
        isLoading: false,
      };
    case EDITPRODUCT:
      return {
        ...state,
        isLoading: false,
      };
    case DELETE_PRODUCTS:
      return {
        ...state,
        loading: false,
      };
    case NEWPRODUCT:
      return {
        ...state,
        loading: false,
      };
    case CATAGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
