import * as React from 'react';
import { View, Text ,Image} from 'react-native';

const IncomingScreen=()=> {
   return (

    <View style={{ flex: 1,marginTop:150,alignItems:"center" }}>
      <Text  style={{ fontSize:20,padding:20,}}>You have no active orders!</Text>
     <View style={{ height: 140, alignItems: 'center' }}>
     <Image source={require('../assets/palate.jpeg')} style={{ height: 120, width: 120, borderRadius: 80 }} />
     </View>
     </View>
   );
 }

  export default IncomingScreen;