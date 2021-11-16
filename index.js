import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { Store } from './Redux2/store';
import { name as appName } from './app.json';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActionSheetProvider } from '@expo/react-native-action-sheet';



export default function Main() {
  return (
      <GestureHandlerRootView


          style={{

              flex: 1,
          }}>
        <PaperProvider>
          <Provider store={Store}>
            <ActionSheetProvider>
              <App/>
            </ActionSheetProvider>
          </Provider>
        </PaperProvider>
      </GestureHandlerRootView>
  );
}


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => Main);
