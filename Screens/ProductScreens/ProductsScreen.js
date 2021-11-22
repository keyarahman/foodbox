import React, {useEffect, useState} from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import {Card} from "react-native-paper";
import {useSelector, useDispatch} from "react-redux";
import {getProducts, deleteProduct} from "../../Redux2/actions";

import {PlusCircle} from "react-native-feather";

export default function ProductsScreen({navigation}) {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {Products} = useSelector(state => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    const _products = Object.keys(Products).map(key => ({
      title: key,
      data: Products[key].map(item => ({
        title: item.title,
        price: item.price,
        description: item.description,
        id: item.id,
      })),
    }));
    // console.log(_products);
    setProductData(_products);
    setLoading(false);
  }, [Products]);

  const HandleProductDeletation = id => {
    dispatch(deleteProduct(id));
  };

  const handleAddButton = () => {
    navigation.navigate("Add Product");
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

  const Item = ({title, description, price, id, item}) => (
    <View style={styles.item}>
      {/* <Text style={styles.title}>{title}</Text> */}
      <Card style={{margin: 5, backgroundColor: "#fff"}}>
        <View style={{flexDirection: "row", flex: 1, padding: 10}}>
          <View style={{flexDirection: "column", flex: 1, padding: 5}}>
            <Text style={{fontSize: 15, fontWeight: "bold"}}>{title}</Text>
            <Text>{description}</Text>
            <Text style={{fontWeight: "bold", color: "#3090C7"}}>
              {"\u00A3"}
              {price}
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
                onPress={() => HandleProductDeletation(id)}
              />
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={productData}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <Item
            title={item.title}
            description={item.description}
            price={item.price}
            id={item.id}
            item={item}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />

      <View style={{alignSelf: "center"}}>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: "white",
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            backgroundColor: "#FFA500",
            borderRadius: 30,
            bottom: 5,
          }}
          onPress={handleAddButton}>
          <PlusCircle stroke="white" fill="none" width={20} height={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    // <SafeAreaView style={styles.container}>
    //   {/* <FlatList
    //     data={productData}
    //     renderItem={weightData}
    //     keyExtractor={(item, index) => index}
    //   /> */}
    // </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 10,
  },
  item: {
    // backgroundColor: "#f9c2ff",
    // padding: 20,
    // marginVertical: 8,
  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
    // backgroundColor: "#fff",
    margin: 5,
  },
  title: {
    fontSize: 24,
  },
});
