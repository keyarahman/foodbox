import React from 'react';
import {View, StyleSheet, Image, SafeAreaView} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  List,
  Menu,
} from 'react-native-paper';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {black, white} from 'react-native-paper/lib/typescript/styles/colors';
import {
  Home,
  Settings,
  LogOut,
  ShoppingCart,
  FolderPlus,
  FileMinus,
  FolderMinus,
  Folder
} from 'react-native-feather';
import {AuthContext} from '../components.js/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { useState } from 'react/cjs/react.development';
import { color } from 'react-native-reanimated';

// import{ AuthContext } from '../components/context';

export default function DrawerContent(props) {
  const {logOut} = React.useContext(AuthContext);
 
const [profile, setProfile] = useState("")


AsyncStorage.getItem("userToken").then(token => {
  setProfile(JSON.parse(token).data.profile)
 
});


  return (
    <SafeAreaView style={{flex: 1}}>
      <Drawer.Section style={styles.firstDrawerSection}>
        <View style={{height: 160 ,marginStart:20,flexDirection:'column'}}>
          <Image
            source={require('../assets/images.jpeg')}
            style={{height: 100, width: 100, borderRadius: 200}}
          />
          {/* <View style={{marginLeft: 15, flexDirection: 'column'}}> */}
            <Title style={styles.title}>{profile.name}</Title>
            <Text style={{color:"#fff"}}>{profile.email}</Text>
           
          {/* </View> */}
        </View>
      </Drawer.Section>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <Home stroke="#3090C7"fill="none" width={20} height={20} />
            <Menu.Item
              onPress={() => {
                props.navigation.navigate('Home');
              }}
              title="Home"
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <Folder stroke="#3090C7" fill="none" width={20} height={20} />

            <Menu.Item
              onPress={() => {
                props.navigation.navigate('Products');
              }}
              title="Products"
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <ShoppingCart stroke="#3090C7" fill="none" width={20} height={20} />

            <Menu.Item
              onPress={() => {
                props.navigation.navigate("Today's Orders");
              }}
              title="Today's Order"
            />
          </Drawer.Section>
         
          <Drawer.Section style={styles.drawerSection}>
            <FolderMinus stroke="#3090C7" fill="none" width={20} height={20} />

            <Menu.Item
              onPress={() => {
                props.navigation.navigate('Order History');
              }}
              title="Order History"
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <Settings stroke="#3090C7"fill="none" width={20} height={20} />
            <Menu.Item
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
              title="Settings"
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <LogOut stroke="#3090C7"fill="none" width={20} height={20} />

        <Menu.Item
          onPress={() => {
            logOut();
          }}
          title="Log Out"
        />
      </Drawer.Section>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },

  userInfoSection: {
    paddingLeft: 20,
  },
  image: {},
  title: {
    fontSize: 14,
 
    color:"#fff",
    fontSize:15,
    fontWeight:'bold'
   
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },

  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  FirstSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'green',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },

  firstDrawerSection: {
    // marginBottom:
    backgroundColor:'#FFA500',
    paddingTop: 10,
    borderTopColor: '#f4f4f4',
    
  },
  drawerSection: {
    marginStart: 20,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  bottomDrawerSection: {
    marginStart: 20,
    marginBottom: 2,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
});
