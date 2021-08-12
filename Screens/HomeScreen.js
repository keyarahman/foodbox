import React from 'react';

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

import OrderScreen from './OrderScreen';
import StackNavigatorScreens from './StackNavigatorScreens';

const HomeScreen =()=>{
    return (
      <StackNavigatorScreens/>
    );
  }

export default HomeScreen;
