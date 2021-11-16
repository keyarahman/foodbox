import React, {useEffect, useState} from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  Date,
  ActivityIndicator,
} from "react-native";
import {Bold} from "react-native-feather";
import {Card} from "react-native-paper";
import {Clock} from "react-native-feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DetailsScreen from "./DetailsScreen";
import {OrderReducer} from "../Redux2/reducer";
import moment from "moment";
import {useSelector} from "react-redux";

export default function TodaysOrder({navigation}) {
  const [TodaysOrderData, setTodaysOrderData] = useState([]);
  const {Orders} = useSelector(state => state.OrderReducer);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let itemsArray = Array.from(Orders);

    let arr = itemsArray.filter(item => {
      console.log("ietm", item);
      const dateLimit = moment(item.created_at).format("MM-DD-YYYY");
      const now = moment().utc().format("MM-DD-YYYY");
      console.log("time_________", dateLimit, now);
      return now === dateLimit;
    });
    console.log("arr._________----", arr);
    setTodaysOrderData(arr);
    setIsLoading(false);
  }, [Orders]);

  const newArray = () => {
    let itemsArray = Array.from(Orders);
    let arr = itemsArray.filter(item => {
      const dateLimit = moment(item.created_at).format("MM ddd, YYYY");
      const now = moment().format("MM ddd, YYYY");
      return now === dateLimit;
    });
    setTodaysOrderData(arr);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      {TodaysOrderData !== null && TodaysOrderData.length > 0 ? (
        <FlatList
          data={TodaysOrderData}
          renderItem={({item}) => (
            <Card style={{margin: 5, backgroundColor: "#fff"}}>
              <View style={{flex: 1, flexDirection: "row", padding: 10}}>
                <View style={{flex: 1, flexDirection: "column", padding: 10}}>
                  <View style={{flexDirection: "row"}}>
                    <Text style={{fontWeight: "bold"}}>
                      {item.customer.name}
                    </Text>
                    {item.is_new == 1 ? (
                      <Text style={{fontWeight: "bold", color: "red"}}>
                        (New order)
                      </Text>
                    ) : (
                      <Text>{}</Text>
                    )}
                  </View>
                  <Text>Address: {item.customer.address}</Text>
                  <Text>Order status: {item.order_status}</Text>
                  <Text style={{fontWeight: "bold"}}>
                    Total: {"\u00A3"}
                    {item.details.total}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: "column", padding: 10}}>
                  <Button
                    title="View Details"
                    color="#3090C7"
                    onPress={() =>
                      navigation.navigate("DetailsScreen", {item: item})
                    }
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      marginTop: 20,
                      marginStart: 50,
                    }}>
                    <Clock
                      stroke="#05375a"
                      fill="none"
                      width={20}
                      height={20}
                    />
                    <Text>{moment(item.created_at).format("hh:mm a")}</Text>
                  </View>
                </View>
              </View>
            </Card>
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={{alignItems: "center", marginTop: 190}}>
          <Text style={{fontSize: 20, padding: 20}}>
            You have no orders for today!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
