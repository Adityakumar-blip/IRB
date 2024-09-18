// import { Component } from 'react';
// import crashlytics from '@react-native-firebase/crashlytics';

// class FirebaseCrashlytics extends Component {
//     log = async (msg = '') => {
//         await crashlytics().log(msg);
//     };
//     setUserId = async (setUserId = '') => {
//         await crashlytics().setUserId(setUserId.toString());
//     };

//     setAttribute = async (key = '', value = '') => {
//         await crashlytics().setAttribute(key, value.toString());
//     };

//     setAttributes = async (setAttributes = {}) => {
//         await crashlytics().setAttributes({ ...setAttributes });
//     };

//     recordError = async (error = '') => {
//         await crashlytics().recordError(new Error(error));
//     };

//     crash = async () => {
//         await crashlytics().crash();
//     };

//     recordNativeException = async e => {
//         await ReactNativeFirebaseCrashlyticsNativeHelper.recordNativeException(e);
//     };
// }

// export default new FirebaseCrashlytics();
