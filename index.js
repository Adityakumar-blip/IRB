/**
 * @format
 */
import 'react-native-reanimated';
import {AppRegistry, Text, LogBox, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import interceptor from './src/services/interceptor/index';
import NetworkService from './src/services/networkService/index';

import {startNetworkLogging} from 'react-native-network-logger';

startNetworkLogging();
interceptor.setupInterceptors();
NetworkService.checkNetworkConnection();

// LogBox.ignoreLogs([
//     "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
//     'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
// ]);

// LogBox.ignoreAllLogs(true);
if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;
Text.defaultProps.fontFamily = '';

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
}
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent('IRB', () => App);
