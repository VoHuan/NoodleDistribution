/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';
import Welcome from './src/screens/Welcome';
import QRScreen from './src/screens/QRScreen';
import App from './src/navigation/App'
import UIButton from './src/components/UIButton';
import Home from './src/screens/Home';
import Done from './src/screens/Done';

AppRegistry.registerComponent(appName, () => App);
