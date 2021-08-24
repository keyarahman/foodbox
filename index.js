import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { Store } from './Redux2/store';
import { name as appName } from './app.json';
import App from './App';
import DetailsScreen from './Screens/DetailsScreen';


export default function Main() {
  return (
    <PaperProvider>
      <Provider store={Store}>
      <App/>
      </Provider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);