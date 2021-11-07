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
import {Card} from "react-native-paper";
import {Clock} from "react-native-feather";

import moment from "moment";
import {useSelector, useDispatch} from "react-redux";

export default function AcceptiesScreen({navigation}) {
  const [acceptedOrder, setAcceptedOrder] = useState([]);
  const {Orders} = useSelector(state => state.OrderReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setrefreshing] = useState(false);

  useEffect(() => {
    newArray();
  }, []);

  const newArray = () => {
    let itemsArray = Array.from(Orders);
    let arr = itemsArray.filter(item => {
      return item.order_status === "Accepted";
    });
    setAcceptedOrder(arr);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }
  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(() => {
      dispatch(getOrder());
      setrefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView>
      {acceptedOrder.length > 0 ? (
        <FlatList
          data={acceptedOrder}
          renderItem={({item}) => (
            <Card style={{margin: 5, backgroundColor: "#fff"}}>
              <View style={{flex: 1, flexDirection: "row", padding: 10}}>
                <View style={{flex: 1, flexDirection: "column", padding: 10}}>
                  <Text style={{fontWeight: "bold"}}>{item.customer.name}</Text>
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
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : (
        <View style={{alignItems: "center", marginTop: 190}}>
          <Text style={{fontSize: 20, padding: 20}}>
            You have no previous accepted orders!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
