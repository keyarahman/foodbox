import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {EyeOff, Lock, Mail, Eye, Bold} from 'react-native-feather';
import {AuthContext} from '../components.js/context';
import {useSelector, useDispatch} from 'react-redux';
import AuthReducer from '../Redux2/reducer';
import {logIn} from '../Redux2/actions';
import ResetPasswordScreen from './ResetPasswordScreen'


const ForgotPasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [email,setEmail]=useState("")
  const[isValidEmail,setIsValidEmail]=useState(true)

//   const [data, setData] = React.useState({
//     email: '',
//     isValidEmail: true,
   
//   });

  const handleEmailChange = (val) => {
    if (val.trim().length > 0) {
      if (validateEmail(val)) {
       setEmail(val);
       setIsValidEmail(true)
      }
     else {
     setEmail(val)
     setIsValidEmail(false)
    }
}
  };

  const validateEmail = (val) => {
    var regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(val).toLowerCase());
  };

   const emailHandler = () => async () => {

    await fetch('https://qrtech.co.uk/api/forgot_password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email:email}),
    })
      .then(res => res.json())
      .then(resData => {
    //    alert(resData.message)
    
    if(isValidEmail && resData.message==="Email Sent!"){
     navigation.navigate('ResetPasswordScreen');
    }
    else{
        alert(resData.message)
    }

      }).catch(function (error) {
        console.log(error);
      });
    }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFA500" barStyle="light-content" />

      <View style={styles.header}></View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#05375a'}}>
          Forgot Password
        </Text>
        <View style={{marginTop: 25}}>
          <Text style={{fontSize: 17, color: '#696969'}}>
            Enter your email for the varification process, we will send 4 digits
            code to your email.
          </Text>
        </View>
        <View style={{marginTop: 40}}>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <Mail stroke="#05375a" fill="none" width={20} height={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
            //   value={email}
              onChangeText={val=>handleEmailChange(val)}
            />
          </View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={emailHandler()}>
            <LinearGradient
              colors={['#FFA500', '#FFA500']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  row: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 100,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  signUp: {
    width: '80%',
    height: 20,
    borderRadius: 30,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  forgot_password: {
    alignItems: 'center',
    marginTop: 30,
  },
});
