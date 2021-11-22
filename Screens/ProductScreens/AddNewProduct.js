import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import {useDispatch, useSelector} from "react-redux";
import {
  addNewProduct,
  editProduct,
  getCatagories,
  updateProduct,
} from "../../Redux2/actions";
import SelectDropdown from "react-native-select-dropdown";
import {CATAGORIES} from "../../Redux2/constant";

const AddNewProduct = ({navigation}) => {
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.productReducer);
  const [catagorie, setCatagorie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    error: "",
  });

  useEffect(() => {
    dispatch(getCatagories());
  }, []);

  useEffect(() => {
    const d = [];
    categories.map(item => {
      d.push(item.title);
    });
    console.log("_______", d);
    setCatagorie(d);
    // setLoading(false);
  }, [categories]);

  const handleUpload = () => {
    if (!data.title || !data.description || !data.price) {
      setData({...data, error: "please fill up all the inputs"});
    } else {
      if (!data.id) {
        setData({...data, error: "please select an option"});
      } else {
        setData({...data, error: ""});
        dispatch(
          addNewProduct(
            data.id,
            data.title,
            data.description,
            data.price,
            () => {
              navigation.navigate("Products");
            },
          ),
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.header}>
        <View style={{marginTop: 20}}>
          {/* <Text style={styles.text_footer}>Catagorie</Text> */}
          {/* <View style={{backgroundColor: "red", width: 500}}> */}

          {/* </View> */}

          <Text style={styles.text_footer}>Title</Text>
          <View style={styles.action}>
            <TextInput
              placeholderTextColor="#D3D3D3"
              style={styles.textInput}
              //   value={data.title}
              name="title"
              onChangeText={text => setData({...data, title: text})}
            />
          </View>
          <Text style={styles.text_footer}>Description</Text>
          <View style={styles.action}>
            <TextInput
              placeholderTextColor="#A9A9A9"
              style={styles.textInput}
              //   value={data.description}
              name="description"
              onChangeText={text => setData({...data, description: text})}
            />
          </View>
          <Text style={styles.text_footer}>Price</Text>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              //   value={data.price}
              keyboardType="numeric"
              name="price"
              onChangeText={text => setData({...data, price: text})}
            />
          </View>
          <View style={{paddingTop: 20}}>
            <SelectDropdown
              data={catagorie}
              onSelect={(selectedItem, index) => {
                console.log("______________", selectedItem, index + 15);
                setData({...data, id: index + 16});
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
        </View>
        <View>
          <Text style={{color: "red"}}>{data.error}</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={handleUpload}>
            <LinearGradient
              colors={["#FFA500", "#FFA500"]}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}>
                Upload
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddNewProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
    // justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 100,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 7,
  },
  action: {
    flexDirection: "row",
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#696969",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  signUp: {
    width: "80%",
    height: 20,
    borderRadius: 30,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },

  forgot_password: {
    alignItems: "center",
    marginTop: 30,
  },
});
