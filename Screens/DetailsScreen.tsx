import React, { useEffect, useState } from "react";
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
  BackHandler
} from "react-native";
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
import { useFocusEffect } from '@react-navigation/native';





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
import {
  // USBPrinter,
  // NetPrinter,
  BLEPrinter,
} from "react-native-thermal-receipt-printer";


// interface for printer begins here.

interface IBLEPrinter {
  device_name: string;
  inner_mac_address: string;
}



//// interface for printer ends here.
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



  // printer related states begins here...


  // const [imagesState, setImageState] = useState <iImageCorpPicker[] | []>([]);
  const [printers, setPrinters] = useState <IBLEPrinter[]|[]>([]);
  const [currentPrinter, setCurrentPrinter] = useState();
  // printer related states ends here...


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = async () => {

       //await handleChangePrinterType(selectedValue);


        // if (isSelectionModeEnabled()) {
        //   disableSelectionMode();
        //   return true;
        // } else {
        //   return false;
        // }
      };

      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress);

      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackPress);
    }, [



      // selectedValue,
      // selectedPrinter

    ])
  );




  //  printer related states  ends here..



  // use Effect for BLE printer
  useEffect(() => {
    BLEPrinter.init().then(()=> {
      BLEPrinter.getDeviceList().then(setPrinters);
    });
  }, []);



  // original:


  /*
  _connectPrinter => (printer) => {
    //connect printer
    BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      setCurrentPrinter,
      error => console.warn(error))
  }
  */



  /*

  const four_curried3= function (_connectPrinter){
    return function (printer) {


      //   BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      //     setCurrentPrinter,
      //     error => console.warn(error))

    }
  }
  */





  /*

  const four_curried= function (_connectPrinter){
    return function (printer) {


      BLEPrinter.connectPrinter(printer.inner_mac_address).then(
        setCurrentPrinter,
        error => console.warn(error))

    }
  }
  */




  /*
  const _connectPrinter => (printer) => {
    //connect printer
    BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      setCurrentPrinter,
      error => console.warn(error))
  }

  */


  const printTextTest = () => {
    currentPrinter && BLEPrinter.printText("<C>sample text</C>\n");
  }

  const printBillTest = () => {
    currentPrinter && BLEPrinter.printBill("<C>sample bill</C>");
  }

  const handlePrint = async () => {
    try {
      // BLEPrinter.printBill("<C>sample bill</C>");
      const Printer = BLEPrinter;


      // await Printer.printText("<C>sample text</C>\n");


      /*
      await Printer.printBill("<CD>Your Recite</CD>\n");
      await Printer.printBill(`<CM>order Type: ${orderItem.order_type}</CM>\n`);
      await Printer.printBill(`<CM>order Status: ${orderItem.order_status}</CM>\n`);
      await Printer.printBill(`<CM>payment type: ${orderItem.payment_type}</CM>\n`);
      await Printer.printBill(`<CM>payment Status: ${orderItem.payment_status}</CM>\n`);
      await Printer.printBill(`<CM>requested time: ${requested_time(orderItem.created_at)}</CM>\n`);
      await Printer.printBill(`<CM>Total: ${orderItem.total}</CM>\n`);
      await Printer.printBill(`<CM>Product count${orderItem.details.products.length}</CM>\n`);
      */







      orderItem.details.products.map(async (oneProduct: Product, index: number) => {
        await Printer.printBill(`<M> item ${index} => ${oneProduct.name} => ${oneProduct.unit_price} =>  ${oneProduct.quantity} => ${oneProduct.unit_total}</M>\n`);

      });

      /*
      await Printer.printBill(`<CM>Subtotal${orderItem.details.subtotal}</CM>\n`);
      await Printer.printBill(`<CM>Discount${(orderItem.details.discount===null)? "0":"N/A"}</CM>\n`); // here nu
      await Printer.printBill(`<CM>Total${orderItem.details.total}</CM>\n`);
      await Printer.printBill("<CD>Customer Information</CD>\n");
      await Printer.printBill(`<CM>name: ${orderItem.customer.name}</CM>\n`);
      await Printer.printBill(`<CM>phone: ${orderItem.customer.phone}</CM>\n`);
      await Printer.printBill(`<CM>address: ${orderItem.customer.address}</CM>\n`);
      await Printer.printBill(`<CM>post code: ${orderItem.customer.postcode}</CM>\n`);

      */




      // "customer": {
      //   "name": "jytdjt",
      //     "phone": "0123456",
      //     "address": "hghjgcmh",
      //     "postcode": "jkgvjg"
      // },



      // quantity: number;
      // unit_price: number;
      // unit_total: string;

    } catch (err) {
      console.warn(err);
    }
  };





  const requested_time= (orderDate: Date)=>{
   return  new Date(orderDate).toLocaleTimeString().
    replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

  };




  const AcceptButtonHandler2  = async () => {

    for (let step = 0; step < printers.length; step++) {
      // Runs 5 times, with values of step 0 through 4.
      // console.log('Walking east one step');

      if (printers[step].inner_mac_address==="66:22:37:5D:18:65"){
        // _connectPrinter(printer)
        // four_curried(_connectPrinter(printer));



        // then cathc block begins here
        BLEPrinter.connectPrinter(printers[step].inner_mac_address).
        then(async (responseJson) => {
          const success = responseJson;
          console.log(" <<success >> : ", success);


          await handlePrint();


          // setCurrentPrinter(printers[step]);

        }).
        catch((error) => {
          console.error("error:", error);
        });

        // ends here..
      }
    }

    printers.map((printer:IBLEPrinter) => (

      console.log( ` printer => ${printer.inner_mac_address} ${printer.device_name} `)
      // four_curried
      // <TouchableOpacity key={printer.inner_mac_address} onPress={() => _connectPrinter(printer)}>
      //   {`device_name: ${printer.device_name}, inner_mac_address: ${printer.inner_mac_address}`}
      // </TouchableOpacity>


      // <TouchableOpacity key={printer.inner_mac_address} onPress={() => _connectPrinter(printer)}>
      //   {`device_name: ${printer.device_name}, inner_mac_address: ${printer.inner_mac_address}`}
      // </TouchableOpacity>
    ))
  };


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
        .then(async res => {
          setIs_new(0);
          setOrderStatus('Accepted');
          dispatch(getOrder());


          // api called now print locally.. sept 28:

          //




          /*



          console.log( " << !selectedPrinter?.device_name >> ", selectedPrinter?.device_name);
          console.log( " << !selectedPrinter?.inner_mac_address >> ", selectedPrinter?.inner_mac_address);


          if(!selectedPrinter?.inner_mac_address){

            // response is void.... // arefin
            const response= await handleConnectSelectedPrinter();
            console.log(" << What response could retrn may or may not be important >> ", response);



            // may be depend on response...
            if(selectedPrinter?.inner_mac_address){


            }
          }




          if(selectedPrinter?.inner_mac_address){

            handlePrint();

          }


          */





          // selectedPrinter




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
    // dispatch(AcceptbuttonHandler());

    AcceptButtonHandler2();

  };

  const handleDeclineBtfn = () => {
    dispatch(DeclinebuttonHandler());
  };

  console.log(" << currentPrinter >>: ", currentPrinter);

  // NHS begins here....
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
                  <Button
                    title="Accepted"
                    color="#808080"
                    disabled={true}
                    onPress= {function doNothing(){}}
                  />
                </View>
              ) : (
                <View>
                  <Button
                    title="Declined"
                    color="#808080"
                    disabled={true}
                    onPress={function doNothing(){}}
                  />
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
