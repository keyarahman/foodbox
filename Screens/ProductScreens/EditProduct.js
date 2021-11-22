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
import {editProduct, updateProduct} from "../../Redux2/actions";

const EditProduct = ({route, navigation}) => {
  const {item} = route.params;

  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    error: "",
  });

  useEffect(() => {
    if (item) {
      setData({
        ...data,
        title: item.title,
        description: item.description,
        price: item.price.toString(),
      });
    }
  }, []);

  const handleUpdate = () => {
    console.log("Call");
    if (!data.title || !data.description || !data.price) {
      setData({...data, error: "please fill up all the inputs"});
    } else {
      setData({...data, error: ""});
      dispatch(
        updateProduct(item.id, data.title, data.description, data.price, () => {
          navigation.navigate("Products");
        }),
      );
    }
    // navigation.navigate("Products");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView style={styles.header}>
        {/* <Animatable.View style={styles.footer} animation="fadeInUpBig"> */}
        <View style={{marginTop: 20}}>
          <Text style={styles.text_footer}>Title</Text>
          <View style={styles.action}>
            <TextInput
              placeholderTextColor="#D3D3D3"
              style={styles.textInput}
              value={data.title}
              name="title"
              onChangeText={text => setData({...data, title: text})}
            />
          </View>
          <Text style={styles.text_footer}>Description</Text>
          <View style={styles.action}>
            <TextInput
              placeholderTextColor="#A9A9A9"
              style={styles.textInput}
              value={data.description}
              name="description"
              onChangeText={text => setData({...data, description: text})}
            />
          </View>
          <Text style={styles.text_footer}>Price</Text>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              value={data.price}
              keyboardType="numeric"
              name="price"
              onChangeText={text => setData({...data, price: text})}
            />
          </View>
        </View>
        <View>
          <Text style={{color: "red"}}>{data.error}</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.signIn} onPress={handleUpdate}>
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
                Update
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* </Animatable.View> */}
    </KeyboardAvoidingView>
  );
};

export default EditProduct;

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
    marginTop: 30,
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
  },
  action: {
    flexDirection: "row",
    marginTop: 8,
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
