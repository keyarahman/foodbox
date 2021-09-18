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
import {EyeOff, Lock, Mail, Eye, Bold} from 'react-native-feather';
import {AuthContext} from '../components.js/context';
import {useSelector, useDispatch} from 'react-redux';
import AuthReducer from '../Redux2/reducer';
import {logIn} from '../Redux2/actions';
import SignInScreen from './SignInScreen'

const ResetPasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [data, setData] = React.useState({
    code: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,

    isValidPassword: true,
  });
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
  const handleCodeChange = (val) => {
    setData({
      ...data,
      code: val,
    });
  };

  const resetPasswordHandel = () => async () => {

    await fetch('https://qrtech.co.uk/api/new_password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ passcode: data.code, password: data.password}),
    })
      .then(res => res.json())
      .then(resData => {
       alert(resData.message)
     navigation.navigate('SignInScreen');

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
          Reset Password
        </Text>
        <View style={{marginTop: 25}}>
          <Text style={{fontSize: 17, color: '#696969'}}>
            Set the Verification code and new password for your account so that
            you can login and accesss all the features.
          </Text>
        </View>
        <View>
          <View style={{marginTop: 30}}>
            <Text style={styles.text_footer}>Verification Code</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="Enter the code"
                style={styles.textInput}
                autoCapitalize="none"
                // value={email}
                onChangeText={val => handleCodeChange(val)}
              />
            </View>
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            New Password
          </Text>
          <View style={styles.action}>
            <Lock stroke="#05375a" fill="none" width={20} height={20} />
            <TextInput
              placeholder="Enter Your Password"
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
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            // onPress={() => {logIn()}}
            onPress={resetPasswordHandel()}>
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
                Reset Password
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default ResetPasswordScreen;

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
