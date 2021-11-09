import React, {useEffect} from "react";
import {View, Text, ActivityIndicator} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator, DrawerItem} from "@react-navigation/drawer";

import DrawerContent from "./Screens/DrawerContent";
import Settings from "./Screens/Settings";
import MainTabScreen from "./Screens/HomeScreen";
import RootStackScreen from "./Screens/RootStackScreen";

import OrderHistory from "./Screens/OrderHistory";
import TodaysOrder from "./Screens/TodaysOrder";
import HomeScreen from "./Screens/HomeScreen";
import {AuthContext} from "./components.js/context";

import ProductScreen from "./Screens/ProductsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DetailsScreen from "./Screens/DetailsScreen";
import {black} from "react-native-paper/lib/typescript/styles/colors";

import {useSelector, useDispatch} from "react-redux";
// import { AuthReducer } from '../Redux2/reducer';

import {RETRIEVE_TOKEN} from "./Redux2/constant";
import {notificationListener} from "./Service/Notifications";
import messaging from "@react-native-firebase/messaging";
import {DefaultTheme} from "react-native-paper";
import {
  Home,
  Settings as SettingsIcon,
  LogOut,
  ShoppingCart,
  FolderPlus,
  FileMinus,
  FolderMinus,
  Folder,
} from "react-native-feather";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerPage() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: "#FFA500",
          },
          drawerIcon: () => (
            <Home stroke="#3090C7" fill="none" width={20} height={20} />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Drawer.Screen
        name="Products"
        component={ProductScreen}
        options={{
          title: "Products",
          headerStyle: {
            backgroundColor: "#FFA500",
          },
          drawerIcon: () => (
            <ShoppingCart stroke="#3090C7" fill="none" width={20} height={20} />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Drawer.Screen
        name="Order History"
        component={OrderHistory}
        options={{
          title: "Order History",
          headerStyle: {
            backgroundColor: "#FFA500",
          },
          drawerIcon: () => (
            <FolderMinus stroke="#3090C7" fill="none" width={20} height={20} />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Drawer.Screen
        name="Today's Orders"
        component={TodaysOrder}
        options={{
          headerStyle: {
            backgroundColor: "#FFA500",
          },
          drawerIcon: () => (
            <Folder stroke="#3090C7" fill="none" width={20} height={20} />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      {/* <DrawerItem
        name="LogOut"
        options={{
          headerStyle: {
            backgroundColor: "#FFA500",
          },
          drawerIcon: () => (
            <LogOut stroke="#3090C7" fill="none" width={20} height={20} />
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      /> */}
    </Drawer.Navigator>
  );
}

const App = () => {
  const dispatch = useDispatch();

  const {userToken, isLoading} = useSelector(state => state.AuthReducer);

  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
    
      dispatch(notificationListener());
      let userToken;
      userToken = null;

      AsyncStorage.getItem("userToken").then(token => {
        userToken = JSON.parse(token);

        // console.log("\n\n << userToken >> \n\n", userToken);

        dispatch({type: RETRIEVE_TOKEN, token: userToken});
      });
    }, 1000);
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="DrawerPage"
            component={DrawerPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{
              headerStyle: {
                backgroundColor: "#FFA500",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
};

export default App;
