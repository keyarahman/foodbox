import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button ,Date} from 'react-native';
import { Bold } from 'react-native-feather';
import { Card } from "react-native-paper";
import { Clock } from 'react-native-feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react/cjs/react.development';
import DetailsScreen from './DetailsScreen'
import NewOrder from './NewOrder';
import moment from 'moment';

export default function IncomingOrderScreen({navigation}){


  const [orderData, setOrderData] = useState("")




AsyncStorage.getItem("userToken").then(token => {
setOrderData(JSON.parse(token).data.orders);
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
                    onPress={() => navigation.navigate('DetailsScreen',{item:item.details})}
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
  





