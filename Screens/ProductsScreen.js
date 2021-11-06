import React, {Component, useState} from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Image,
} from "react-native";
import {Bold} from "react-native-feather";
import {Card} from "react-native-paper";
import {Clock} from "react-native-feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DetailsScreen from "./DetailsScreen";

export default function ProductsScreen({navigation}) {
  const [productData, setProductData] = useState("");

  //   // let token =  AsyncStorage. getItem('userToken');
  //   // let orderData = JSON.parse(token).data.orders;

  AsyncStorage.getItem("userToken").then(token => {
    setProductData(JSON.parse(token).data.products);
  });

  return (
    <SafeAreaView>
      <FlatList
        data={productData}
        renderItem={({item}) => (
          <Card style={{margin: 5, backgroundColor: "#fff"}}>
            <View style={{flexDirection: "row", flex: 1, padding: 10}}>
              <View style={{flexDirection: "column", flex: 1, padding: 5}}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>
                  {item.title}
                </Text>
                <Text>{item.description}</Text>
                <Text style={{fontWeight: "bold", color: "#3090C7"}}>
                  {"\u00A3"}
                  {item.price}
                </Text>
              </View>
            </View>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
