import {
  FETCH_ORDER,
  FETCH_ORDER_FAIL,
  LOGIN,
  LOGOUT,
  ERROR,
  PRODUCTS_DETAILS,
  DELETE_PRODUCTS,
  EDITPRODUCT,
} from "./constant";

// import * as api from "./api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {requestUserPermission} from "../Service/Notifications";
import {useSelector} from "react-redux";

import {
  BLEPrinter,
  NetPrinter,
  USBPrinter,
  IUSBPrinter,
  IBLEPrinter,
  INetPrinter,
} from "react-native-thermal-receipt-printer";
import {oneOrder_Item_interface} from "../Screens/DetailsScreen";
import {Alert} from "react-native";

const printerList: Record<string, any> = {
  ble: BLEPrinter,
  net: NetPrinter,
  usb: USBPrinter,
};
// import * as Animatable from 'react-native-animatable';
interface SelectedPrinter
  extends Partial<IUSBPrinter & IBLEPrinter & INetPrinter> {
  printerType?: keyof typeof printerList;
}

const OrderApi = "https://eazm.co.uk/api/orders";
const logInApi = "https://eazm.co.uk/api/login";
const productApi = "https://eazm.co.uk/api/menu/4";
const deleteApi = "https://eazm.co.uk/api/delete_product";
const editProductApi = "https://eazm.co.uk/api/edit_product";

const sortArray = (orders: oneOrder_Item_interface[]) => {
  orders.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return orders;
};

export const getOrder = () => async (dispatch: any) => {
  console.log("___at getOrder");
  AsyncStorage.getItem("userToken").then((data: any) => {
    const token = JSON.parse(data).access_token;

    try {
      const config = {
        method: "get",
        url: OrderApi,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(function (response) {
          const OrderData = response.data; // JSON.parse(response.data); // .json();

          if (OrderData !== undefined) {
            // console.log(" << OrderData>> : ", OrderData);

            const ordered_orderData = sortArray(OrderData);

            dispatch({
              type: FETCH_ORDER,
              payload: ordered_orderData,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log("error in getting order data : ", error);
    }
  });
};

export const logIn = (email: any, password: any) => async (dispatch: any) => {
  let userToken;
  userToken = null;
  dispatch({type: ERROR, payload: ""});
  await fetch(logInApi, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(res => res.json())
    .then(resData => {
      if (resData != null) {
        if (resData.data != null && resData.data.profile != null) {
          if (resData.data.profile.role == "RestaurantAdmin") {
            // alert('Successfully logged in');
            userToken = resData;
            AsyncStorage.setItem("userToken", JSON.stringify(userToken));
            AsyncStorage.setItem(
              "resturantId",
              JSON.stringify(resData.data.profile.restaurant_id),
            );
            dispatch({type: LOGIN, id: email, token: userToken}); // check the AuthReducer....
          } else {
            // console.log("Not allowed");
            // Alert.alert("You don't have permission to log in");
          }
        } else {
          // console.log("ERROR: " + resData.message);
          dispatch({type: ERROR, payload: resData.message});
        }
      }
    })
    .then(data => {
      requestUserPermission();
    })
    .catch(err => {
      console.log("ERROR: " + err.message);
      dispatch({type: ERROR, payload: err.message});
    });
};

export const logOut = () => async (dispatch: any) => {
  try {
    AsyncStorage.removeItem("userToken");
  } catch (e) {
    console.log(e);
  }
  dispatch({type: LOGOUT});
};

// Products Api secrion

// product details api call

export const getProducts = () => async (dispatch: any) => {
  AsyncStorage.getItem("userToken").then((data: any) => {
    const token = JSON.parse(data).access_token;
    try {
      axios
        .get(productApi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          // console.log("responseData------------", res.data.products);
          dispatch({type: PRODUCTS_DETAILS, payload: res.data.products});
        })
        .catch(error => console.log("error", error));
    } catch (error) {
      console.log("error in getting order data : ", error);
    }
  });
};

//Product delete api funtion

export const deleteProduct = (productId: any) => async (dispatch: any) => {
  const returant_id = AsyncStorage.getItem("resturantId").then((data: any) => {
    const res_id = JSON.parse(data);

    console.log("resturantId____", res_id, productId);

    var id = {
      product_id: productId,
      restaurant_id: res_id,
    };
    AsyncStorage.getItem("userToken").then((data: any) => {
      const token = JSON.parse(data).access_token;
      try {
        axios
          .post(`${deleteApi}`, id, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => {
            // console.log("responseData__________", res);
            dispatch({type: DELETE_PRODUCTS});
            dispatch(getProducts());
          })
          .catch(error => console.log("error", error));
      } catch (error) {
        console.log("error in getting order data : ", error);
      }
    });
  });
};

//update product
export const editProduct =
  (productId: any, title: any, description: any, price: any, onComplete: any) =>
  async (dispatch: any) => {
    const returant_id = AsyncStorage.getItem("resturantId").then(
      (data: any) => {
        const res_id = JSON.parse(data);

        // console.log("resturantId____", res_id, res_id);

        var product = {
          product_id: productId,
          restaurant_id: res_id,
          title: title,
          description: description,
          price: price,
        };
        AsyncStorage.getItem("userToken").then((data: any) => {
          const token = JSON.parse(data).access_token;
          try {
            axios
              .post(`${editProductApi}`, product, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(res => {
                console.log("responseData__________", res);
                dispatch({type: EDITPRODUCT});
                dispatch(getProducts());
                onComplete && onComplete();
              })
              .catch(error => console.log("error", error));
          } catch (error) {
            console.log("error in getting order data : ", error);
          }
        });
      },
    );
  };
