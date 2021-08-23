import React,{useEffect} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Button ,Date,ActivityIndicator} from 'react-native';
import { Bold } from 'react-native-feather';
import { Card } from "react-native-paper";
import { Clock } from 'react-native-feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react/cjs/react.development';
import DetailsScreen from './DetailsScreen'
import NewOrder from './NewOrder';
import moment from 'moment';

export default function OrderHistory({navigation}){


  const [PreOrderData, setPreOrderData] = useState(null)
  const[isLoading, setIsLoading]=useState(true)



useEffect(() => {
  //setIsLoading(true)
  AsyncStorage.getItem("userToken").then(token => {
    let OrderList=JSON.parse(token).data.orders;
    let itemsArray = Array.from(OrderList);
    let newArray = itemsArray.filter((item) =>{
      const dateLimit = moment(item.created_at).format("MM ddd, YYYY");
      const now = moment().format("MM ddd, YYYY");
      return now<dateLimit;
    });
  
    setPreOrderData(newArray);
    setIsLoading(false)
  
  });
 
}, [])

if (isLoading) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#FFA500" />
    </View>
  );
}



// AsyncStorage.getItem("userToken").then(token => {
// setOrderData(JSON.parse(token).data.orders);
// });

   
    return (
      <SafeAreaView>
        {PreOrderData !== null ? (
        <FlatList
          data={PreOrderData}
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
                    onPress={() => navigation.navigate('DetailsScreen')}
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
        ):(
          <View style={{alignItems: 'center',marginTop:190}}>
          <Text style={{fontSize: 20, padding: 20}}>
            You have no previous orders!
          </Text>
        </View>
        )}


      </SafeAreaView>


    );
  }
  
