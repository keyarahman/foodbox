import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
// import SignUpScreen from './SignUpScreen';


const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator >
        <RootStack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" options={{ headerShown: false }}  component={SignInScreen}/>

    </RootStack.Navigator>
);

export default RootStackScreen;