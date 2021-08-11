import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button } from 'react-native';
import { Bold } from 'react-native-feather';
import { Card } from "react-native-paper";
import { Clock } from 'react-native-feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react/cjs/react.development';
import DetailsScreen from './DetailsScreen'
import NewOrder from './NewOrder';
;
export default function IncomingScreen({navigation}){


  const [orderData, setOrderData] = useState("")


  // let token =  AsyncStorage. getItem('userToken');
  // let orderData = JSON.parse(token).data.orders;

  AsyncStorage.getItem("userToken").then(token => {
    setOrderData(JSON.parse(token).data.orders)

});


   
    return (
      <SafeAreaView>
        <FlatList
          data={orderData}
          renderItem={({ item }) => (
            <Card style={{ margin: 5 }}>
              <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>

                <View style={{ flex: 1, flexDirection: "column", padding: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.customer.name}</Text>
                  <Text>Address: {item.customer.address}</Text>
                  <Text>Order status: {item.order_status}</Text>
                  <Text style={{ fontWeight: 'bold' }}>Total: {'\u00A3'}{item.details.total}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "column", padding: 10 }}>
                  <Button
                    title="Check"
                    color="#3090C7"
                    onPress={() => navigation.navigate('NewOrder')}
                  />
                  <View style={{ flex: 1, flexDirection: "row", marginTop:20,marginStart:50}} >
                  <Clock stroke="#05375a" fill="none" width={20} height={20} />
                  <Text> 1.00pm</Text>
                  </View>
                </View>
              </View>


            </Card>
          )
          }

          keyExtractor={item => item.id}

        />


      </SafeAreaView>


    );
  }
  





