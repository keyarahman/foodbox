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
  FlatList,
  ScrollView,
  Button,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Card} from 'react-native-paper';
import {useState} from 'react/cjs/react.development';
import { Stack } from "react-native-spacing-system";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useTheme} from '@react-navigation/native';
import {blue100} from 'react-native-paper/lib/typescript/styles/colors';
import { ArrowLeft} from 'react-native-feather';
const DetailsScreen = ({route, navigation}) => {
  const {item} = route.params;

  const [productData, setProductData] = useState('');
  const {colors} = useTheme();

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor='#fff' barStyle="light-content"/>
      <ScrollView>
        <FlatList
          data={item.products}
          renderItem={({item}) => (
            <View>
              <Card style={{margin: 5}}>
                <View style={{flex: 1, flexDirection: 'row', padding: 8}}>
                  <View style={{flexDirection: 'column',marginStart:10,borderWidth:1,backgroundColor:"#fff"}}>
                    <Text style={{paddingVertical:5,paddingHorizontal:10,fontWeight: 'bold'}}>{item.quantity}</Text>
                  </View>

                  <View
                    style={{
                     
                      flexDirection: 'column',
                     marginStart:10,
                     padding:5      
                    }}>
                    <Text style={{color:"#3090C7"}}>{item.name}</Text>
                  </View>

                  <View
                    style={{
                    
                   
                      flexDirection: 'column',
                     flex:1,
                     alignItems:'flex-end'
                     
                    }}>
                       
                    <Text style={{}}>
                      {'\u00A3'}
                      {item.unit_total}
                    </Text>
                    
                  </View>
                </View>
              </Card>
            </View>
          )}
          keyExtractor={item => item.id}
        />

        <View style={{flex: 1, flexDirection: 'row', paddingLeft: 20}}>
          <View style={{ flexDirection: 'column'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Subtotal </Text>
            <Text style={{paddingTop:7}}>Discount </Text>
          </View>
          <View
            style={{flexDirection: 'column',alignItems:'flex-end',flex:1,paddingRight:13}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {' '}
              {'\u00A3'}
              {item.subtotal}
            </Text>
            <Text style={{color:"#FF0000",paddingTop:7}}>
              -{'\u00A3'}
              {item.discount}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          paddingVertical: 30,
          paddingHorizontal: 10,
          backgroundColor: '#fff',
          flexDirection:'column',
  
        }}>
        <View style={{ marginStart: 4,flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold', fontSize: 22}}> Total</Text>

          <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 250}}>
            {'\u00A3'}
            {item.total}
          </Text>
        </View>
        <View style={{marginStart: 10}}>
        <Button
          title="Accept"
          color="#3090C7"
          onPress={() =>
            navigation.navigate('DetailsScreen', {item: item.details})
          }
        />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',

    paddingVertical: 40,
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
