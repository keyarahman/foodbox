import React from 'react';

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';

const MainTabScreen =()=>{
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }

export default MainTabScreen;
