import React, { Component } from 'react';

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import { View, Text,StatusBar } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import IncomingOrderScreen from './IncomingOrderScreen';
import AcceptiesScreen from './AcceptiesScreen';
const Tab = createMaterialTopTabNavigator();


const HomeScreen = () => {
  return (
    <Tab.Navigator

      initialRouteName="Incoming"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: { fontSize: 14 },
        tabBarStyle: { backgroundColor: '#FFA500' },
      }}>
      <Tab.Screen name="Incoming" component= {IncomingOrderScreen} />
      <Tab.Screen name="Accepties" component= {AcceptiesScreen} />
    </Tab.Navigator>

  );

}

export default HomeScreen;
