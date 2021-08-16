import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button, Date } from 'react-native';
import { Bold } from 'react-native-feather';
import { Card } from "react-native-paper";
import { Clock } from 'react-native-feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react/cjs/react.development';
import DetailsScreen from './DetailsScreen'
import NewOrder from './NewOrder';
import moment from 'moment';

export default function TodaysOrder({ navigation }) {


  const [orderData, setOrderData] = useState("")


  //   // let token =  AsyncStorage. getItem('userToken');
  //   // let orderData = JSON.parse(token).data.orders;

  AsyncStorage.getItem("userToken").then(token => {
    let OrderList = JSON.parse(token).data.orders;
    let itemsArray = Array.from(OrderList);
    let newArray = itemsArray.filter((item) => {
      return moment(item.created_at) == moment();
    });

    setOrderData(newArray);

  });

  // AsyncStorage.getItem("userToken").then(token => {
  // setOrderData(JSON.parse(token).data.orders);
  // });


  return (
    <View style={{ flex: 1,marginTop:150,alignItems:"center" }}>
    <Text  style={{ fontSize:20,padding:20,}}>You have no orders for today!</Text>
  
   </View>


  );
}
