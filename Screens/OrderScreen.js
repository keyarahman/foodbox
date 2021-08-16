import * as React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import IncomingOrderScreen from './IncomingOrderScreen';
import AcceptiesScreen from './AcceptiesScreen';
import StackNavigatorScreens from './StackNavigatorScreens'

const TabNavigator = createMaterialTopTabNavigator(
  {
    Incoming: {
      screen: IncomingOrderScreen,
      navigationOptions: {
        tabBarLabel: 'Incoming',
        showLabel: ({focused}) => {
          console.log(focused);
          return focused ? true : false;
        },
      },
    },
    Accepties: {
      screen: AcceptiesScreen,
      navigationOptions: {
        tabBarLabel: 'Accepties',
      },
    },
  },
  {
    tabBarOptions: {
      showIcon: true,

      style: {
        margin:5,
       
        backgroundColor: '#FFA500',
      },
    },
  },
);

const Navigator = createAppContainer(TabNavigator);

const OrderScreen = (NavigationContainer) => {
  return (
    <Navigator>
    <IncomingOrderScreen/>
    </Navigator>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
  },
});
