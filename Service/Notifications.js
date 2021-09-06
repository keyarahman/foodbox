
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';


 export  async function  requestUserPermission(){
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        alert("yes");
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
    else{
        alert("No");
    }
  }

  const getFcmToken = async () => {
    // let fcmToken = await AsyncStorage.getItem("fcmToken");
   
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
     alert(fcmToken);
     console.log("Your Firebase Token is:", fcmToken);
     var body = {
      token:fcmToken,
  
    };
     AsyncStorage.getItem('userToken').then(data => {
      let token = JSON.parse(data).access_token;
      axios
        .post("https://qrtech.co.uk/api/save_token", body,{headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
          alert(res.data.message)
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    } else {
       
     console.log("Failed", "No token received");
    }
    }
   
  
  


  export const notificationListener = async () => {


    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        // navigation.navigate(remoteMessage.data.type);
      });
  messaging().onMessage(remoteMessage => {
        console.log(
          'Notification caused app to open from foeground state:',
          remoteMessage.notification,
        );
        // navigation.navigate(remoteMessage.data.type);
      });
     
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
            // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
          }
      
        });
   
  }