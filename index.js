import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { Store } from './Redux2/store';
import { name as appName } from './app.json';
import App from './App';
import messaging from '@react-native-firebase/messaging';





export default function Main() {
  return (
    <PaperProvider>
      <Provider store={Store}>
      <App/>
      </Provider>
    </PaperProvider>
  );
}


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => Main);