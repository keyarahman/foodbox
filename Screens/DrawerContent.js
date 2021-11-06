import React, {useState} from "react";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {Title, Drawer, Text, Menu} from "react-native-paper";
import {LogOut} from "react-native-feather";

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {logOut} from "../Redux2/actions";

export default function DrawerContent(props) {
  const dispatch = useDispatch();

  const [profile, setProfile] = useState("");

  AsyncStorage.getItem("userToken").then(token => {
    setProfile(JSON.parse(token).data.profile);
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#fff"}}>
      <Drawer.Section style={styles.firstDrawerSection}>
        <View style={{height: 160, marginStart: 20, flexDirection: "column"}}>
          <Image
            source={require("../assets/profileImage.png")}
            style={{height: 80, width: 80, borderRadius: 200}}
          />

          <Title style={styles.title}>{profile.name}</Title>
          <Text style={{color: "#fff"}}>{profile.email}</Text>
        </View>
      </Drawer.Section>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {/* 
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          title="logout"
          onPress={() => {
            dispatch(logOut());
          }}
        />
      </Drawer.Section> */}
      <TouchableOpacity
        onPress={() => {
          dispatch(logOut());
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          marginBottom: 50,
          marginStart: 20,
        }}>
        <LogOut stroke="#FF6666" fill="none" width={20} height={20} />
        <Text style={{marginStart: 20, fontWeight: "bold", color: "#FF6666"}}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },

  title: {
    fontSize: 14,

    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },

  firstDrawerSection: {
    // marginBottom:
    backgroundColor: "#FFA500",
    paddingTop: 10,
    borderTopColor: "#f4f4f4",
  },
  drawerSection: {
    marginStart: 20,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  bottomDrawerSection: {
    marginStart: 10,
    marginBottom: 2,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
});
