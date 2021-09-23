import { FETCH_ORDER, FETCH_ORDER_FAIL, LOGIN, LOGOUT, SET_USER_EMAIL, SET_USER_PASSWORD,IS_NEW_OREDER } from './constant';
// import * as api from "./api";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import{requestUserPermission} from '../Service/Notifications'
import { useSelector } from "react-redux";



const OrderApi = 'https://qrtech.co.uk/api/orders';

// const sortArray=(props)=>{
//   const sortedArray  = props.sort((a,b) => moment(a.created_at).format('YYYYMMDD') -  moment(b.created_at).format('YYYYMMDD'));
//   return sortedArray;

//   };

export const getOrder = () => async (dispatch) => {

  AsyncStorage.getItem('userToken').then( (data) => {
    const token = JSON.parse(data).access_token;


    try{
      const config = {
        method: 'get',
        url: OrderApi,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      axios(config).
      then(function (response) {


        // console.log( " << JSON.stringify(response.data) >> ", JSON.stringify(response.data));


        // const OrderData = response.data;
        const OrderData =  response.data; // JSON.parse(response.data); // .json();

        if (OrderData !==undefined){

          // console.log(" << OrderData>> : ", OrderData);
          dispatch({
            type: FETCH_ORDER,
            payload: OrderData,
          });
        }


      }).
      catch(function (error) {
        console.log(error);
      });

    }catch (error){

      console.log("error in getting order data : ", error);
    }




  });
};


export const logIn = (email, password) => async (dispatch) => {

  let userToken;
  userToken = null;
  await fetch('https://qrtech.co.uk/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  })
    .then(res => res.json())
    .then(resData => {
      console.log(resData);

      if (resData != null) {

        if (resData.data != null && resData.data.profile != null) {

          if (resData.data.profile.role == 'RestaurantAdmin') {

            // alert('Successfully logged in');
            userToken = resData;
            AsyncStorage.setItem("userToken", JSON.stringify(userToken));
            dispatch({ type: LOGIN, id: email, token: userToken }); // check the AuthReducer....
          } else {
            console.log('Not allowed');
            alert("You don't have permission to log in");
          }
        }
        if (resData.message != null) {
          // alert(resData.message);
        }
      }
    }).then(data=>{
      requestUserPermission();
    })

};

export const logOut = () => async (dispatch) => {
  try {
    AsyncStorage.removeItem('userToken');
  } catch (e) {
    console.log(e);
  }
  dispatch({ type: LOGOUT });
};


export const setEmail = email => dispatch => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: email
  });

}
export const setPassword = password => dispatch => {
  dispatch({
    type: SET_USER_PASSWORD,
    payload: password
  });

}


// export const buttonHandler = (orderId,resturant_id) => async (dispatch) => {
//   var body = {
//     restaurant_id:resturant_id,
//     order_id: orderId,
//     status: "Accepted"
//   };

//   AsyncStorage.getItem('userToken').then(data => {
//     let token = JSON.parse(data).access_token;
//     axios
//       .post("https://qrtech.co.uk/api/update_order", body,{headers: {'Content-Type': 'application/json',Authorization: `Bearer ${token}`}})
//       .then(res => {
//         alert(res.data.message)
//         dispatch({
//           type: IS_NEW_OREDER,
//           id:orderId,
//           payload: false,
//         });
//         // item.is_new=false
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   });


// };
