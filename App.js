
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './Screens/DrawerContent';
import Settings from './Screens/Settings';
import MainTabScreen from './Screens/HomeScreen';
import RootStackScreen from './Screens/RootStackScreen';

import OrderHistory from './Screens/OrderHistory';
import TodaysOrder from './Screens/TodaysOrder';
import HomeScreen from './Screens/HomeScreen';
import {AuthContext} from './components.js/context';

import ProductScreen from './Screens/ProductsScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailsScreen from './Screens/DetailsScreen';
import { black } from 'react-native-paper/lib/typescript/styles/colors';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


function Root() {
  return (
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
            <Drawer.Screen name="Products" component={ProductScreen}    options={{
                title: 'Products',
                headerStyle: {
                  backgroundColor: '#FFA500',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}/>
            <Drawer.Screen name="Order History" component={OrderHistory} options={{
                title: 'Order History',
                headerStyle: {
                  backgroundColor: '#FFA500',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}/>
            <Drawer.Screen name="Today's Orders" component={TodaysOrder} options={{
                
                headerStyle: {
                  backgroundColor: '#FFA500',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }}}/>
          </Drawer.Navigator>
  );
}

const App = () => {

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

                  // alert('Successfully logged in');
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
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={Root}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{
                title: 'Details',
                headerStyle: {
                  backgroundColor: '#fff',
                },
                headerTintColor: "#000000",
                headerTitleStyle: {
                  fontWeight: 'bold',
                },}} />
        </Stack.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;