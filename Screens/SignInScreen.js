import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {EyeOff, Lock, Mail, Eye} from 'react-native-feather';

// import { useTheme } from 'react-native-paper';

// import { AuthContext } from '../components/context';

// import Users from '../model/users';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
      username: '',
      password: '',
      check_textInputChange: false,
      secureTextEntry: true,
      isValidUser: true,
      isValidPassword: true,
  });

  // const { colors } = useTheme();

  // const { signIn } = React.useContext(AuthContext);

  //     const textInputChange = (val) => {
  //         if( val.trim().length >= 4 ) {
  //             setData({
  //                 ...data,
  //                 username: val,
  //                 check_textInputChange: true,
  //                 isValidUser: true
  //             });
  //         } else {
  //             setData({
  //                 ...data,
  //                 username: val,
  //                 check_textInputChange: false,
  //                 isValidUser: false
  //             });
  //         }
  //     }

      const handlePasswordChange = (val) => {
          if( val.trim().length >= 8 ) {
              setData({
                  ...data,
                  password: val,
                  isValidPassword: true
              });
          } else {
              setData({
                  ...data,
                  password: val,
                  isValidPassword: false
              });
          }
      }

      const updateSecureTextEntry = () => {
          setData({
              ...data,
              secureTextEntry: !data.secureTextEntry
          });
      }

    //   const handleValidUser = (val) => {
    //       if( val.trim().length >= 4 ) {
    //           setData({
    //               ...data,
    //               isValidUser: true
    //           });
    //       } else {
    //           setData({
    //               ...data,
    //               isValidUser: false
    //           });
    //       }
    //   }

      const loginHandle = (userName, password) => {

          const foundUser = Users.filter( item => {
              return userName == item.username && password == item.password;
          } );

          if ( data.username.length == 0 || data.password.length == 0 ) {
              Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                  {text: 'Okay'}
              ]);
              return;
          }

          if ( foundUser.length == 0 ) {
              Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                  {text: 'Okay'}
              ]);
              return;
          }
          signIn(foundUser);
      }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Login </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>

        <View style={styles.action}>
          <Mail stroke="#05375a" fill="none" width={20} height={20} />
          <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
          />
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

          <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {loginHandle( data.username, data.password )}}
                >
                <LinearGradient
                    colors={["#FFA500","#FFA500"]}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Login</Text>
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
            </View>
    </View>
  );
};

export default SignInScreen;

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
    marginLeft:100
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
    fontWeight: "bold",
  },
});
