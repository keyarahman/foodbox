
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

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
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if(!fcmToken){
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
     alert(fcmToken);
     console.log("Your Firebase Token is:", fcmToken);
     await AsyncStorage.setItem("fcmToken",fcmToken);
    } else {
       
     console.log("Failed", "No token received");
    }
    }
   
  
  }