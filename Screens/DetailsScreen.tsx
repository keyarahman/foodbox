import React, {useState} from 'react';
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
// import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Card} from 'react-native-paper';
// import {useState} from 'react/cjs/react.development';
import {Stack} from 'react-native-spacing-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {blue100} from 'react-native-paper/lib/typescript/styles/colors';
import {ArrowLeft} from 'react-native-feather';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {getOrder} from '../Redux2/actions';


export interface Product {
  name: string;
  checkedItem: string[];
  quantity: number;
  unit_price: number;
  unit_total: string;
}
export  interface oneOrder_Item_interface{


  id: number;
  restaurant_id: number;
  order_type: string;
  order_status: string;
  is_new: number;
  payment_type: string;
  payment_status: string;
  payment_id?: any;
  requested_time: string;
  accepted_time?: any;
  total: number;
  details: {
    products: Product[];
    subtotal: number;
    discount?: any;
    total: number;
  };
  customer: {
    name: string;
    phone: string;
    address: string;
    postcode: string;
  };
  created_at: Date;
  updated_at: Date;
}


export interface Props {
  navigation: any,
  route: any,
}

const DetailsScreen: React.FC<Props> = ({route, navigation}) => {


  const dispatch = useDispatch();
  const [refreshing, setrefreshing] = useState(false);
  const [loading, setLoading] = useState('');

  const {item} = route.params;

  const orderItem:oneOrder_Item_interface =item;



  // console.log(" <<orderItem >> : ", orderItem);

  // console.log( " << JSON.stringify(orderItem) >> ", JSON.stringify(orderItem));



  const [is_new, setIs_new] = useState(orderItem.is_new);
  const [orderStatus, setOrderStatus] = useState(orderItem.order_status);

  const AcceptbuttonHandler = () => async (dispatch:any) => {
    var body = {
      restaurant_id: orderItem.restaurant_id,
      order_id: orderItem.id,
      status: 'Accepted',
    };

    AsyncStorage.getItem('userToken').then(data => {
      let token = JSON.parse(data).access_token;
      axios
        .post('https://qrtech.co.uk/api/update_order', body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setIs_new(0);
          setOrderStatus('Accepted');
          dispatch(getOrder())
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const DeclinebuttonHandler = () => async (dispatch:any) => {
    var body = {
      restaurant_id: orderItem.restaurant_id,
      order_id: orderItem.id,
      status: 'Declined',
    };

    AsyncStorage.getItem('userToken').then(data => {
      let token = JSON.parse(data).access_token;
      axios
        .post('https://qrtech.co.uk/api/update_order', body, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setIs_new(0);
          setOrderStatus('Declined');
          dispatch(getOrder())
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const handleAcceptBtfn = () => {
    dispatch(AcceptbuttonHandler());
  };

  const handleDeclineBtfn = () => {
    dispatch(DeclinebuttonHandler());
  };

  return (

    <SafeAreaView
      style={styles.container}
    >

      <StatusBar backgroundColor="#FFA500" barStyle="light-content" />
      {/*<ScrollView>*/}

      <View style={{

        flex: 6,
        backgroundColor: '#fff',
        flexDirection: 'column',
      }}>
        <FlatList
          data={orderItem.details.products}
          renderItem={({item}) => (
            <View>
              <Card style={{margin: 5}}>
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 8
                }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginStart: 10,
                      borderWidth: 1,
                      backgroundColor: '#fff',
                    }}>
                    <Text
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        fontWeight: 'bold',
                      }}>
                      {item?.quantity}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      marginStart: 10,
                      padding: 5,
                    }}>
                    <Text style={{color: '#3090C7'}}>{item.name}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      flex: 1,
                      alignItems: 'flex-end',
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

          keyExtractor={(item:Product, index: number) => `${item.checkedItem}+ ${item.quantity}+ ${item.unit_price} +${item.name}+${index}`}
        />
      </View>

      <View style={{

        flex: 1.5,
        // backgroundColor: '#fff',
        // backgroundColor: 'crimson',
        flexDirection: 'column',

      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          paddingLeft: 20}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 18}}>Subtotal </Text>
            {orderItem.details.discount !== null ? (
              <Text style={{paddingTop: 7}}>Discount </Text>
            ) : (
              <View>

              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              flex: 1,
              paddingRight: 13,
            }}>
            <Text style={{fontSize: 18}}>
              {' '}
              {'\u00A3'}
              {orderItem.details.subtotal}
            </Text>
            {orderItem.details.discount !== null ? (
              <Text style={{
                color: '#FF0000',
                paddingTop: 7
              }}>
                -{'\u00A3'}
                {orderItem.details.discount}
              </Text>
            ) : (
              <View></View>
            )}
          </View>
        </View>
      </View>
      {/* </ScrollView>*/}


      <View style={{

        flex: 2.5,
        // backgroundColor: '#fff',
        // backgroundColor: 'green',
        flexDirection: 'column',

      }}>


        <View
          style={{
            paddingVertical: 30,
            paddingHorizontal: 10,
            backgroundColor: '#fff',
            flexDirection: 'column',
          }}>
          <View style={{
            flexDirection: 'row',
            marginStart: 6}}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 18}}>Total: </Text>
            <Text style={{
              fontSize: 18}}>
              {'\u00A3'}
              {orderItem.details.total}
            </Text>
          </View>
          {is_new === 1 ? (
            <View style={{flexDirection: 'row'}}>
              <View style={{
                width: 190,
                padding: 10}}>
                <Button
                  title="Accept"
                  color="#3090C7"
                  onPress={handleAcceptBtfn}
                />
              </View>
              <View style={{
                width: 190,
                padding: 10
              }}>
                <Button
                  title="Decline"
                  color="#3090C7"
                  onPress={handleDeclineBtfn}
                />
              </View>
            </View>
          ) : (
            [
              orderStatus === 'Accepted' ? (
                <View>
                  <Button title="Accepted" color="#808080" />
                </View>
              ) : (
                <View>
                  <Button title="Declined" color="#808080" />
                </View>
              ),
            ]
          )}
        </View>
      </View>
    </SafeAreaView>

  );
};

{/*</SafeAreaView>*/}
export default DetailsScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#fff',
    flexDirection: 'column',
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
