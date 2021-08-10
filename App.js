/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './Screens/DrawerContent';
import Settings from './Screens/Settings';
import MainTabScreen from './Screens/MainTabScreen';
import RootStackScreen from './Screens/RootStackScreen';
import NewOrder from './Screens/NewOrder';
import OrderHistory from './Screens/OrderHistory';
import TodaysOrder from './Screens/TodaysOrder';
import HomeScreen from './Screens/HomeScreen';
import {AuthContext} from './components.js/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

//  const HomeStack = createNativeStackNavigator();
//  const SettingsStac = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const storeData =  value => {
    try {
      AsyncStorage.setItem('userToken', value);
     
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null,
  };
  const authContext = React.useMemo(
    () => ({

      logIn: async (email, password) => {
        let userToken;
        userToken = null;
        await fetch('https://qrtech.co.uk/api/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
          },
          body: JSON.stringify({email: email, password: password}),
        })
          .then(res => res.json())
          .then(resData => {
            console.log(resData);

            if (resData != null) {

              if (resData.data != null && resData.data.profile != null) {

                if (resData.data.profile.role == 'RestaurantAdmin') {

                  alert('Successfully logged in');
                  userToken = resData;
                  AsyncStorage.setItem("userToken", JSON.stringify(userToken));
                  dispatch({type: 'LOGIN', id: email, token: userToken});
                } else {
                  console.log('Not allowed');
                  alert("You don't have permission to log in");
                }
              }


              if (resData.message != null) {
                alert(resData.message);
              }
            }
          });
          
        
      },
      logOut:  () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
           AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
    }),
    
  );

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false,
        };
    }
  };


  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  useEffect(() => {
    setTimeout(() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      AsyncStorage.getItem("userToken").then(token => {
      
        userToken=JSON.parse(token);
      
        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
      });
     
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Orders',
                headerStyle: {
                  backgroundColor: '#FFA500',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="New Order" component={NewOrder} />
            <Drawer.Screen name="Order History" component={OrderHistory} />
            <Drawer.Screen name="Today's Order" component={TodaysOrder} />
          </Drawer.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
