import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import {ERROR} from "../Redux2/constant";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import {EyeOff, Lock, Mail, Eye} from "react-native-feather";
import {AuthContext} from "../components.js/context";
import {useSelector, useDispatch} from "react-redux";
import AuthReducer from "../Redux2/reducer";
import {logIn} from "../Redux2/actions";

const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loginError} = useSelector(state => state.AuthReducer);

  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
    error: "",
    emailerror: "",
    passwordError: "",
  });

  useEffect(() => {
    dispatch({type: ERROR, payload: ""});
  }, []);
  useEffect(() => {
    console.log("Log In Error: ", loginError);

    if (loginError === "Invalid Email!") {
      console.log("emailEror");
      setData({...data, emailerror: loginError, passwordError: ""});
    } else {
      console.log("Password");
      setData({...data, passwordError: loginError, emailerror: ""});
    }

    return () => {};
  }, [loginError]);

  const handleEmailChange = val => {
    if (val.trim().length > 0) {
      if (validateEmail(val)) {
        setData({
          ...data,
          email: val,
          isValidEmail: true,
        });
      } else {
        setData({
          ...data,
          email: val,
          isValidEmail: false,
        });
      }
    }
  };

  const validateEmail = val => {
    var regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(val).toLowerCase());
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = (email, password) => {
    if (!email || !password) {
      setData({
        ...data,
        error: "Please fill up all the inputs ",
      });
    } else {
      setData({
        ...data,
        error: "",
      });
      console.log("Logging in");
      // dispatch(logIn(email, password));
      dispatch(logIn(email, password));
    }
  };

  const goToForgotPassword = () => navigation.navigate("ForgotPasswordScreen");

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFA500" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Login </Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <Mail stroke="#05375a" fill="none" width={20} height={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            // value={email}
            onChangeText={val => handleEmailChange(val)}
          />
        </View>
        <View>
          <Text style={{color: "red"}}>{data.emailerror}</Text>
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <Lock stroke="#05375a" fill="none" width={20} height={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <EyeOff stroke="#05375a" fill="none" width={20} height={20} />
            ) : (
              <Eye stroke="#05375a" fill="none" width={20} height={20} />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: "red"}}>{data.passwordError}</Text>
        </View>
        <View>
          <Text style={{color: "red"}}>{data.error}</Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            // onPress={() => {logIn()}}
            onPress={() => loginHandle(data.email, data.password)}>
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
                Login
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* <View style={styles.row}>
                    <Text>Dont have an account? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignInScreen')}
                    style={[styles.signUp, { 
                        marginTop:-3
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: "#3DD4CA"
                    }]}>Click here</Text>
                </TouchableOpacity></View> */}
        </View>
        <View style={styles.forgot_password}>
          <Text
            style={{color: "#3090C7", fontSize: 16}}
            onPress={goToForgotPassword}>
            Forgot Password?
          </Text>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFA500",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
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
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
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
    color: "#05375a",
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
