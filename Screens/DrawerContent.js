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
} from 'react-native-feather';
import {AuthContext} from  '../components.js/context';


// import{ AuthContext } from '../components/context';

export default function DrawerContent(props) {
    const { logOut } = React.useContext(AuthContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Drawer.Section style={styles.firstDrawerSection}>
        <View style={{height: 140, alignItems: 'center'}}>
          <Image
            source={require('../assets/UserImage.png')}
            style={{height: 120, width: 120, borderRadius: 80}}
          />
        </View>
      </Drawer.Section>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <Home stroke='#FFA500' fill="none" width={20} height={20} />
            <Menu.Item
              onPress={() => {
                props.navigation.navigate('Home');
              }}
              title="Home"
            />
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <ShoppingCart stroke='#FFA500' fill="none" width={20} height={20} />

            <Menu.Item
              onPress={() => {
                props.navigation.navigate("Today's Order");
              }}
              title="Today's Order"
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <FolderPlus stroke='#FFA500' fill="none" width={20} height={20} />

            <Menu.Item
              onPress={() => {
                props.navigation.navigate('New Order');
              }}
              title="New Order"
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <FolderMinus stroke='#FFA500' fill="none" width={20} height={20} />

            <Menu.Item
              onPress={() => {
                props.navigation.navigate('Order History');
              }}
              title="Order History"
            />
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection}>
            <Settings stroke='#FFA500' fill="none" width={20} height={20} />
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
        <LogOut stroke='#FFA500' fill="none" width={20} height={20} />

        <Menu.Item
        onPress={() => {logOut()}}
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
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
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
    paddingTop: 20,
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
    marginBottom:2,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
},
});
