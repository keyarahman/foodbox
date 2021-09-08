import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderScreen from './OrderScreen';
import DetailsScreen from './DetailsScreen';

const OrderStack = createNativeStackNavigator();

const StackNavigatorScreens = ({ navigation }) => (


    <OrderStack.Navigator>
        <OrderStack.Screen name="OrderScreen" options={{ headerShown: false }} component={OrderScreen}
        />
        <OrderStack.Screen name="DetailsScreen" options={{ headerShown: false }} component={DetailsScreen}
        />
    </OrderStack.Navigator>


);

export default StackNavigatorScreens;