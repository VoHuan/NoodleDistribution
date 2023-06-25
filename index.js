/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';
import Welcome from './src/screens/Welcome';
import QRScreen from './src/screens/QRScreen';
import App from './src/navigation/App'

AppRegistry.registerComponent(appName, () => App);
