import * as React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import IncomingScreen from './IncomingScreen';
import AcceptiesScreen from './AcceptiesScreen';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Incoming: {
      screen: IncomingScreen,
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
        backgroundColor: '#FFA500',
      },
    },
  },
);

const Navigator = createAppContainer(TabNavigator);

const HomeScreen = () => {
  return (
    <Navigator>
      <IncomingScreen />
    </Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
  },
});
