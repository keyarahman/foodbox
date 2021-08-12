import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  FlatList
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react/cjs/react.development';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useTheme} from '@react-navigation/native';

const DetailsScreen = ({navigation}) => {
  const {colors} = useTheme();

  const [orderDetailsData, setOrderDetailsData] = useState('');

  AsyncStorage.getItem('userToken').then(token => {
    setOrderDetailsData(JSON.parse(token).data.orders.details.products);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFA500" barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            Order Details
          </Text>
        </View>
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig">
       
            <View style={{flex:1,flexDirection:'column',padding:10}}>
              
            </View>
         

      </Animatable.View>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 80,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
 
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
