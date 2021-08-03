/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import * as React from 'react';
 import { View, Text } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 
import HomeScreen from './Screens/HomeScreen';
import Settings from './Screens/Settings';
import RootStackScreen from './Screens/RootStackScreen'
 
//  const HomeStack = createNativeStackNavigator();
//  const SettingsStac = createNativeStackNavigator();
 const Drawer = createDrawerNavigator();


 
 function App() {
   return (
     <NavigationContainer>
       <RootStackScreen/>
       {/* <Drawer.Navigator initialRouteName="Home" screenOptions={{
         headerStyle:{
           backgroundColor:"#A020F0",
         },
         headerTintColor:"#fff",
         headerTitleStyle:{
           fontWeight:'bold'
         }

       }}> 
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator> */}
      </NavigationContainer>
   );
 }
 
 export default App;
 