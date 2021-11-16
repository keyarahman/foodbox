import React, {useEffect, useState} from "react";
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
    Appearance,
    ScrollView,
    Button,
    BackHandler,
    Alert,
} from "react-native";
import {Card} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import axios from "axios";
import {getOrder} from "../Redux2/actions";
import {useActionSheet} from "@expo/react-native-action-sheet";
import {LongPressGestureHandler, State, TapGestureHandler} from "react-native-gesture-handler";
// import {useFocusEffect} from "@react-navigation/native";
// import { useBluetoothStatus } from 'react-native-bluetooth-status';

export interface Product {
    name: string;
    checkedItem: string[];
    quantity: number;
    unit_price: number;
    unit_total: string;
}
export interface oneOrder_Item_interface {
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
    navigation: any;
    route: any;
}
import {BLEPrinter, PrinterOptions} from "react-native-thermal-receipt-printer";
import Snackbar from "react-native-snackbar";
// import BleManager from '../BleManager';
// import BleManager from 'react-native-ble-manager';
// interface for printer begins here.
// import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from "react-native-vector-icons/Entypo";
interface IBLEPrinter {
    device_name: string;
    inner_mac_address: string;
}

//// interface for printer ends here.
const DetailsScreen: React.FC<Props> = ({route, navigation}) => {
    const dispatch = useDispatch();
    const [refreshing, setrefreshing] = useState(false);
    const [loading, setLoading] = useState("");


    const [printing_Succeed_State, setPrinting_Succeed_State] =useState<boolean>(false);

    const [bluetoothEnabled_by_userState, set_BluetoothEnabled_by_user] = useState<boolean>(false);
    const [userSaid_BlueTooth_EnabledState, SetUserSaid_BlueTooth_EnabledState]  = useState<boolean>(false);
    const {item} = route.params;
    const orderItem: oneOrder_Item_interface = item;

    // bottom sheet components begins here...
    const {showActionSheetWithOptions} = useActionSheet();


    const cancel_Button_Index = 2;
    const options_Print_Again = [
        'Print',
        'Cancel'
    ];

    const icons_Print_Again = [


        <MaterialCommunityIcons
            size={20}

            style={{
                color: 'black',
                textAlign: 'center',

                // alignSelf: 'stretch',
                // fontSize: 30
                // fontSize: 40
            }}
            name={'printer-wireless'}
            key='printer-wireless'
        />,


        /*   <FontAwesome
               style={{
                   // paddingRight: 5
                   paddingTop: 5,
               }}
               size={18}
               name='mail-reply-all'
               key='mail-reply-all'
               color='#000'

           />,*/

        <Entypo
            style={{
                paddingRight: 5
            }}

            name='back'
            size={20}
            color='#000'
            key='back'
        />,


    ];



    // bottom shett components ends here....

    // console.log(" <<orderItem >> : ", orderItem);

    // console.log( " << JSON.stringify(orderItem) >> ", JSON.stringify(orderItem));

    const [is_new, setIs_new] = useState(orderItem.is_new);
    const [orderStatus, setOrderStatus] = useState(orderItem.order_status);

    // printer related states begins here...

    // const [imagesState, setImageState] = useState <iImageCorpPicker[] | []>([]);
    const [printers, setPrinters] = useState<IBLEPrinter[] | []>([]);
    const [currentPrinter, setCurrentPrinter] = useState();
    // printer related states ends here...

    // BleManager.checkState();




    useEffect(() => {

            const initializeBluetooth= async () => {

                // console.log("at [initializeBluetooth] and  btStatus: ",btStatus);

                BLEPrinter.init()
                    .then((somePromise: void) => {
                        console.log("somePromise: ", somePromise);

                        BLEPrinter.getDeviceList().then(setPrinters);

                        set_BluetoothEnabled_by_user(true);
                        // error => console.warn(error)
                    })
                    .catch((error3: string) => {
                        console.log("_error_:", error3);
                        if (error3 === "bluetooth adapter is not enabled") {
                            Alert.alert(
                                `Bluetooth not Enabled`,
                                "Please enable Bluetooth.",
                                [
                                    {
                                        text: "close",
                                        onPress: () => {
                                            console.log("close Pressed");
                                        },
                                        style: "cancel",
                                    },
                                    {
                                        text: "Enabled",
                                        onPress: () => {
                                            SetUserSaid_BlueTooth_EnabledState(!userSaid_BlueTooth_EnabledState); // good user won't move by this condition..
                                            // SetUserSaid_BlueTooth_EnabledState(false);  // good user can do other stuff with this condition..

                                        },
                                        // style?: 'default' | 'cancel' | 'destructive' | undefined;
                                        style: 'default',

                                    },

                                ],
                                {cancelable: false},
                            );



                            set_BluetoothEnabled_by_user(false);
                        }
                    });
            }

            initializeBluetooth();


        }, [
            // btStatus
            userSaid_BlueTooth_EnabledState,
        ]
    );

    const printTextTest = () => {
        currentPrinter && BLEPrinter.printText("<C>sample text</C>\n");
    };

    const printBillTest = () => {
        currentPrinter && BLEPrinter.printBill("<C>sample bill</C>");
    };

    const products_Print = (products?: Product[]) => {
        // console.log(" << products: >>", products);

        if (products) {
            return products
                .map(
                    (oneProduct: Product, index: number) =>
                        `item[${index + 1}]: ${
                            oneProduct.name.length < 16
                                ? oneProduct.name
                                : `${oneProduct.name.substring(0, 15)}.`
                        }: ${oneProduct.unit_price} X ${oneProduct.quantity} = ${
                            oneProduct.unit_total
                        } \n`,
                )
                .join("");
        } else {
            return "Products: null";
        }
    };

    // name: string;
    // checkedItem: string[];
    // quantity: number;
    // unit_price: number;
    // unit_total: string;

    const design = (orderItem: oneOrder_Item_interface) => `
       Your Recite           
-------------------------------
Order Type: ${orderItem.order_type}
Order Status: Accepted
Payment type: ${orderItem.payment_type}
Payment Status: ${orderItem.payment_status}
Requested time: ${requested_time(orderItem.created_at)}
 
Product count: ${orderItem.details.products.length}
-------------------------------
${products_Print(orderItem.details.products)}
Subtotal: ${orderItem.details.subtotal}
Discount: ${orderItem.details.discount === null ? "0" : "N/A"}
Total: ${orderItem.details.total}
Total cost: ${orderItem.total}
-------------------------------
 Customer Information
-------------------------------
Name: ${orderItem.customer.name}
Phone: ${orderItem.customer.phone}
Add.: ${
        orderItem.customer.address.length < 25
            ? orderItem.customer.address
            : `${orderItem.customer.address.substring(0, 23)}.`
    }
Post code: ${orderItem.customer.postcode}
`;

    const handlePrint = async (oneOrder3: oneOrder_Item_interface) => {
        try {
            // BLEPrinter.printBill("<C>sample bill</C>");
            const Printer = BLEPrinter;

            // await Printer.printText("<C>sample text</C>\n");

            // console.log("design(orderItem): ", design(oneOrder3));

            // design(oneOrder3)

            const PrinterOptions2: PrinterOptions = {
                beep: true,
                cut: true,
                tailingLine: true,
                encoding: "utf-8",
            };

            await Printer.printBill(`<M>${design(orderItem)}</M>`, PrinterOptions2);



            setPrinting_Succeed_State(true);
            console.log("__done__");


            // 0002

            /*

            ANOTHER API CALL IF RECITE IS PRINTED (isPrin)
            ("http://3.9.23.131/api/update_order", {isPrinted: printed}
                */

        } catch (err) {
            setPrinting_Succeed_State(false);
            console.warn(err);

            Alert.alert(
                `Printing not Succeeded.`,
                "something went wrong.",
                [
                    {
                        text: "close",
                        onPress: () => {
                            console.log("close Pressed");
                        },
                        style: "cancel",
                    },
                ],
                {cancelable: false},
            );



            // 0003

            /*

            ANOTHER API CALL IF RECITE IS PRINTED (isPrin)
            ("http://3.9.23.131/api/update_order", {isPrinted: printingError}
                */

        }
    };

    const requested_time = (orderDate: Date) => {
        return new Date(orderDate)
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    };

    const AcceptButtonHandler2 = async (oneOrder: oneOrder_Item_interface) => {
        for (let step = 0; step < printers.length; step++) {
            // Runs 5 times, with values of step 0 through 4.
            // console.log('Walking east one step');

            if (
                printers[step].inner_mac_address === "66:22:37:5D:18:65" ||
                printers[step].device_name === "MTP-2"
            ) {
                // _connectPrinter(printer)
                // four_curried(_connectPrinter(printer));
                // {"device_name": "MTP-2", "inner_mac_address": "66:22:37:5D:18:65"}

                // then cathc block begins here
                BLEPrinter.connectPrinter(printers[step].inner_mac_address)
                    .then(async responseJson => {
                        const success = responseJson;
                        console.log(" <<success >> : ", success);

                        await handlePrint(oneOrder);

                        // setCurrentPrinter(printers[step]);
                    })
                    .catch(error => {
                        console.error("error:", error);
                    });

                // ends here..
            }
        }

        printers.map(
            (printer: IBLEPrinter) =>
                console.log(
                    ` printer => ${printer.inner_mac_address} ${printer.device_name} `,
                ),
            // four_curried
            // <TouchableOpacity key={printer.inner_mac_address} onPress={() => _connectPrinter(printer)}>
            //   {`device_name: ${printer.device_name}, inner_mac_address: ${printer.inner_mac_address}`}
            // </TouchableOpacity>

            // <TouchableOpacity key={printer.inner_mac_address} onPress={() => _connectPrinter(printer)}>
            //   {`device_name: ${printer.device_name}, inner_mac_address: ${printer.inner_mac_address}`}
            // </TouchableOpacity>
        );
    };

    const AcceptbuttonHandler = () => async (dispatch: any) => {

        var body = {
            restaurant_id: orderItem.restaurant_id,
            order_id: orderItem.id,
            status: "Accepted",
        };

        const orderItemTemp = orderItem;

        AsyncStorage.getItem("userToken").then(data => {
            let token = JSON.parse(data).access_token;
            axios
                .post("http://3.9.23.131/api/update_order", body, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(async res => {
                    setIs_new(0);
                    setOrderStatus("Accepted");
                    dispatch(getOrder());

                    Alert.alert(
                        `Order Accepted`,
                        "Do you want to print the recite now?",
                        [
                            {
                                text: "Cancel",
                                onPress: () => {
                                    console.log("Cancel Pressed");


                                    /*

                                    0001
                                    ANOTHER API CALL IF RECITE IS PRINTED (isPrin)
                                    ("http://3.9.23.131/api/update_order", {isPrinted: cancelledByUser}
                                        */



                                },
                                style: "cancel",
                            },
                            {
                                text: "print",
                                onPress: () => {
                                    const tempOrder = {
                                        ...orderItemTemp,
                                        order_status: "Accepted",
                                    };

                                    // console.log(" << tempOrder >>: ", tempOrder);

                                    if (bluetoothEnabled_by_userState){

                                        AcceptButtonHandler2(tempOrder);  // for printing in realLife..
                                    }

                                    else{



                                        Alert.alert(
                                            `Bluetooth not Enabled`,
                                            "Please enable Bluetooth.",
                                            [
                                                {
                                                    text: "close",
                                                    onPress: () => {
                                                        console.log("close Pressed");
                                                    },
                                                    style: "cancel",
                                                },

                                                {
                                                    text: "EnabledAlready",
                                                    onPress: () => {
                                                        // SetUserSaid_BlueTooth_EnabledState(true); --------CHECK THIS AND THIS...
                                                        SetUserSaid_BlueTooth_EnabledState(!userSaid_BlueTooth_EnabledState); // --------CHECK THIS AND THIS...

                                                    },
                                                    // style: "cancel",
                                                },
                                            ],
                                            {cancelable: false},
                                        );






                                        // Snackbar.show({
                                        //     text: 'Please Enable Bluetooth and visit this page again.',
                                        //     duration: Snackbar.LENGTH_INDEFINITE,
                                        //     numberOfLines: 3,
                                        //     action: {
                                        //         text: 'close',
                                        //         textColor: 'green',
                                        //         onPress: () => {
                                        //             Snackbar.dismiss();
                                        //         },
                                        //     },
                                        // });
                                    }









                                },
                            },
                        ],
                        {cancelable: true},
                    );

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

    const DeclinebuttonHandler = () => async (dispatch: any) => {
        var body = {
            restaurant_id: orderItem.restaurant_id,
            order_id: orderItem.id,
            status: "Declined",
        };

        AsyncStorage.getItem("userToken").then(data => {
            let token = JSON.parse(data).access_token;
            axios
                .post("http://3.9.23.131/api/update_order", body, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(res => {
                    setIs_new(0);
                    setOrderStatus("Declined");
                    dispatch(getOrder());
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    };

    const handleAcceptBtfn = () => {
        dispatch(AcceptbuttonHandler());

        // for tEST ONLY.... DONT REMOVE...PLEASE...

        /*
        const tempOrder ={
          ...orderItem,
          order_status: "Accepted",
        };

        console.log(" << tempOrder >>: ", JSON.stringify(tempOrder));

        return;
        // AcceptButtonHandler2(tempOrder);

        */
    };

    const handleDeclineBtfn = () => {
        dispatch(DeclinebuttonHandler());
    };

    console.log(" << currentPrinter >>: ", currentPrinter);

    // NHS begins here....
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#FFA500" barStyle="light-content" />
            {/*<ScrollView>*/}

            <View
                style={{
                    flex: 6,
                    backgroundColor: "#fff",
                    flexDirection: "column",
                }}>
                <FlatList
                    data={orderItem.details.products}
                    renderItem={({item}) => (
                        <View>
                            <Card style={{margin: 5, backgroundColor: "#fff"}}>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        padding: 8,
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            marginStart: 10,
                                            borderWidth: 1,
                                            backgroundColor: "#fff",
                                        }}>
                                        <Text
                                            style={{
                                                paddingVertical: 5,
                                                paddingHorizontal: 10,
                                                fontWeight: "bold",
                                            }}>
                                            {item?.quantity}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "column",
                                            marginStart: 10,
                                            padding: 5,
                                        }}>
                                        <Text style={{color: "#3090C7"}}>{item.name}</Text>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: "column",
                                            flex: 1,
                                            alignItems: "flex-end",
                                        }}>
                                        <Text style={{}}>
                                            {"\u00A3"}
                                            {item.unit_total}
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        </View>
                    )}
                    keyExtractor={(item: Product, index: number) =>
                        `${item.checkedItem}+ ${item.quantity}+ ${item.unit_price} +${item.name}+${index}`
                    }
                />
            </View>

            <View
                style={{
                    flex: 1.5,
                    // backgroundColor: '#fff',
                    // backgroundColor: 'crimson',
                    flexDirection: "column",
                }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingLeft: 20,
                    }}>
                    <View style={{flexDirection: "column"}}>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                            }}>
                            Subtotal{" "}
                        </Text>
                        {orderItem.details.discount !== null ? (
                            <Text style={{paddingTop: 7}}>Discount </Text>
                        ) : null}
                    </View>
                    <View
                        style={{
                            flexDirection: "column",
                            alignItems: "flex-end",
                            flex: 1,
                            paddingRight: 13,
                        }}>
                        <Text style={{fontSize: 18}}>
                            {" "}
                            {"\u00A3"}
                            {orderItem.details.subtotal}
                        </Text>
                        {orderItem.details.discount !== null ? (
                            <Text
                                style={{
                                    color: "#FF0000",
                                    paddingTop: 7,
                                }}>
                                -{"\u00A3"}
                                {orderItem.details.discount}
                            </Text>
                        ) : null}
                    </View>
                </View>
            </View>
            {/* </ScrollView>*/}

            <View
                style={{
                    flex: 2.5,
                    // backgroundColor: '#fff',
                    // backgroundColor: 'green',
                    flexDirection: "column",
                }}>
                <View
                    style={{
                        paddingVertical: 30,
                        paddingHorizontal: 10,
                        backgroundColor: "#fff",
                        flexDirection: "column",
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            marginStart: 6,
                        }}>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 18,
                            }}>
                            Total:{" "}
                        </Text>
                        <Text
                            style={{
                                fontSize: 18,
                            }}>
                            {"\u00A3"}
                            {orderItem.details.total}
                        </Text>
                    </View>
                    {is_new === 1 ? (
                        <View style={{flexDirection: "row"}}>
                            <View
                                style={{
                                    width: 190,
                                    padding: 10,
                                }}>
                                <Button
                                    title="Accept"
                                    color="#3090C7"
                                    onPress={handleAcceptBtfn}
                                />
                            </View>
                            <View
                                style={{
                                    width: 190,
                                    padding: 10,
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
                            (orderStatus === "Accepted") ? (

                                <LongPressGestureHandler

                                    onHandlerStateChange={(event) => {
                                        if (event.nativeEvent.state === State.ACTIVE) {
                                            // console.log("props.minDurationMsState: ", props.customMinDurationMs3);


                                            return showActionSheetWithOptions(
                                                {
                                                    // title: chatMessage,
                                                    options: options_Print_Again,
                                                    // optionsSharedFeed,
                                                    cancelButtonIndex: cancel_Button_Index,

                                                    showSeparators: true,
                                                    icons: icons_Print_Again,

                                                },
                                                (buttonIndex) => {

                                                    console.log('buttonIndex: ', buttonIndex);

                                                    if (buttonIndex === 0) {

                                                        console.log(`buttonIndex: again , ${buttonIndex} : ${options_Print_Again[buttonIndex]}`);




                                                        if (bluetoothEnabled_by_userState){
                                                            const {item} = route.params;
                                                            const orderItem: oneOrder_Item_interface = item;
                                                            const tempOrder = {


                                                                ...orderItem,
                                                                // order_status: "Accepted",
                                                            };

                                                            AcceptButtonHandler2(tempOrder);  // for printing in realLife..
                                                        }

                                                        else{



                                                            Alert.alert(
                                                                `Bluetooth not Enabled`,
                                                                "Please enable Bluetooth.",
                                                                [
                                                                    {
                                                                        text: "close",
                                                                        onPress: () => {
                                                                            console.log("close Pressed");
                                                                        },
                                                                        style: "cancel",
                                                                    },

                                                                    {
                                                                        text: "EnabledAlready",
                                                                        onPress: () => {
                                                                            // SetUserSaid_BlueTooth_EnabledState(true); --------check this and this...
                                                                            SetUserSaid_BlueTooth_EnabledState(!userSaid_BlueTooth_EnabledState); // --------check this and this...
                                                                            // console.log("ok Pressed");
                                                                            // setBluetooth(!btStatus)
                                                                        },
                                                                        // style: "cancel",
                                                                    },
                                                                ],
                                                                {cancelable: false},
                                                            );
                                                        }

                                                    }


                                                    if (buttonIndex === 1) {


                                                        console.log(`buttonIndex: again , ${buttonIndex} : ${options_Print_Again[buttonIndex]}`);
                                                        //props.pauseRemoteDataFetchingForBottomSheetChatReplyForward_ETC(1);
                                                    }



                                                    // Do something here depending on the button index selected
                                                },
                                            );


                                        }
                                    }}
                                    minDurationMs={400}
                                    key={`Accepted`}
                                    // minDurationMs={props.customMinDurationMs3}

                                >



                                    <View>
                                        <Button
                                            title="Accepted"
                                            color="#808080"
                                            disabled={true}
                                            onPress={function doNothing() {}}
                                        />
                                    </View>


                                </LongPressGestureHandler>




                            ) : (
                                <View>
                                    <Button
                                        title="Declined"
                                        color="#808080"
                                        disabled={true}
                                        onPress={function doNothing() {}}
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

{
    /*</SafeAreaView>*/
}
export default DetailsScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    card: {
        margin: 5,
    },
    container: {
        flex: 10,
        backgroundColor: "#fff",
        flexDirection: "column",
    },
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",

        paddingVertical: 40,
        paddingHorizontal: 20,
    },

    logo: {
        width: height_logo,
        height: height_logo,
        borderRadius: 80,
    },
    title: {
        color: "#05375a",
        fontSize: 30,
        fontWeight: "bold",
    },
    text: {
        color: "grey",
        marginTop: 5,
    },
    button: {
        alignItems: "flex-end",
        marginTop: 30,
    },

    textSign: {
        color: "white",
        fontWeight: "bold",
    },
});
