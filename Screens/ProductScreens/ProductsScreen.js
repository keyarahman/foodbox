import React, {useEffect, useState} from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";

import {Card} from "react-native-paper";
import {useSelector, useDispatch} from "react-redux";
import {getProducts, deleteProduct} from "../../Redux2/actions";

export default function ProductsScreen({navigation}) {
  const [productData, setProductData] = useState("");
  const [loading, setLoading] = useState(true);
  const {Products} = useSelector(state => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    setProductData(Products);
    setLoading(false);
  }, [Products]);

  const HandleProductDeletation = id => {
    dispatch(deleteProduct(id));
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <FlatList
        data={productData}
        renderItem={({item}) => (
          <Card style={{margin: 5, backgroundColor: "#fff"}}>
            <View style={{flexDirection: "row", flex: 1, padding: 10}}>
              <View style={{flexDirection: "column", flex: 1, padding: 5}}>
                <Text style={{fontSize: 15, fontWeight: "bold"}}>
                  {item.title}
                </Text>
                <Text>{item.description}</Text>
                <Text style={{fontWeight: "bold", color: "#3090C7"}}>
                  {"\u00A3"}
                  {item.price}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "column",
                  flex: 1,
                  padding: 10,
                  alignItems: "flex-end",
                }}>
                <View style={{width: 100, paddingBottom: 10}}>
                  <Button
                    title="Edit"
                    color="#3090C7"
                    onPress={() =>
                      navigation.navigate("Edit Product", {item: item})
                    }
                  />
                </View>
                <View style={{width: 100, paddingBottom: 10}}>
                  <Button
                    title="Delete"
                    color="red"
                    onPress={() => HandleProductDeletation(item.id)}
                  />
                </View>
              </View>
            </View>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
