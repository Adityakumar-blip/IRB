import {firebase} from '@react-native-firebase/messaging';
import Navigator from './navigations';
import React, {useEffect, useState} from 'react';
import {createStore} from 'redux';
import SharedService from './services/sharedService/index';
// import { useRoute } from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {SET_BACKGROUND_NOTIFICATION} from './store/action';
import ReduxStore from './store/index';
import {View} from 'react-native';
import NetworkLogger from 'react-native-network-logger';

const App = () => {
  const dispatch = useDispatch();
  const [isLocationOn, setLocationOn] = useState(true);
  const [networkModal, setNetworkModal] = useState(false);

  const store = createStore(ReduxStore);

  // useEffect(() => {
  //     const subscribe = AppState.addEventListener('change', handleChange);
  //     return () => {
  //         subscribe.remove('change', handleChange);
  //     };
  // }, []);

  // const getAppLaunchLink = async () => {
  //     try {
  //         const { url } = await firebase.dynamicLinks().getInitialLink();
  //         if (url) {
  //             let storeConstant = null;
  //             if (url) {
  //                 const arrUrl = url.split('?');
  //                 const inviteCode = arrUrl[1];
  //                 const allData = inviteCode.split('&');
  //                 storeConstant = {
  //                     reference_Link: allData[1] ? '' : url,
  //                     reference_Id: allData[0],
  //                     profileSurvey: allData[1],
  //                     vendor_Id: allData[2] ? allData[2] : '0',
  //                     source_Id: allData[3] ? allData[3] : '0',
  //                 };
  //                 await setAsyncStorage('INVITE_URL', await JSON.stringify(storeConstant));
  //             }
  //             return storeConstant;
  //         }
  //     } catch (err) {
  //         //return false;
  //     }
  // };

  // const checkPermissions = async () => {
  //     let response = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); // <-- always blocked
  //     let isPermissionsGranted = false;

  //     if (response === RESULTS.GRANTED) {
  //         isPermissionsGranted = true;
  //     } else if (response == 'unavailable') {
  //         response = request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, {
  //             title: 'FreeLine requires permission',
  //             message: 'FreeLine needs access to your location so you can see your position',
  //             buttonPositive: 'Ok',
  //             buttonNegative: "Don't show my position",
  //         });
  //         await openSettings();
  //         if (response === 'RESULTS.GRANTED') {
  //             isPermissionsGranted = true;
  //         } else if (response == 'unavailable') {
  //             await openSettings();
  //         }
  //     }

  //     return isPermissionsGranted;
  // };

  // const handleChange = value => {
  //     if (value == 'active') {
  //         NetworkService.checkNetworkConnection();
  //     }
  // };

  useEffect(() => {
    // checkNetwork();
    SharedService.networkChanged.subscribe(changed => {
      if (changed.isInternetReachable == null) {
        return;
      }
      if (!changed.isInternetReachable) {
        setNetworkModal(true);
      } else {
        setNetworkModal(false);
      }
    });
  }, [networkModal]);

  const checkNetwork = () => {
    SharedService.networkChanged.subscribe(async changed => {
      if ((await changed.isInternetReachable) == null) {
        return;
      }
      if (!changed.isInternetReachable) {
        setNetworkModal(true);
      } else {
        setNetworkModal(false);
      }
    });
  };

  // useEffect(() => {
  //     // if (Platform.OS === 'ios') {
  //     //     Geolocation.requestAuthorization('always');
  //     // }
  //     // requestLocationPermission();
  // }, []);

  // const onPageInit = () => {
  //     deviceLocale = i18n.currentLocale();
  // };

  // const requestContactsPermission = async () => {
  //     const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
  //     if (!result) {
  //         const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
  //             title: 'Hey you need to give us contacts permissions!',
  //             message: 'We need to read your contacts.',
  //         });
  //         return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     }
  // };

  // useEffect(() => {
  //     if (!isLocationOn) {
  //         checkMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(() => {
  //             requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(async statuses => {
  //                 if (statuses['ios.permission.LOCATION_WHEN_IN_USE'] === 'blocked') {
  //                     // requestLocationPermission();
  //                     await openSettings();
  //                 }
  //             });
  //         });
  //     }
  // }, [isLocationOn]);

  // const requestLocationPermission = async () => {
  //     try {
  //         if (Platform.OS === 'android') {
  //             await checkMultiple([
  //                 PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //                 PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  //                 PERMISSIONS.ANDROID.SEND_SMS,
  //             ]).then(async () => {
  //                 await requestMultiple([
  //                     PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //                     PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  //                     PERMISSIONS.ANDROID.SEND_SMS,
  //                 ]).then(async statuses => {
  //                     if (
  //                         statuses['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
  //                         statuses['android.permission.ACCESS_COARSE_LOCATION'] === 'granted' &&
  //                         statuses['android.permission.SEND_SMS'] === 'granted'
  //                     ) {
  //                         setLocationOn(true);
  //                         // await getCurrentLoc();
  //                     } else {
  //                         setLocationOn(false);
  //                     }
  //                 });
  //             });
  //         } else if (Platform.OS === 'ios') {
  //             await checkMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(async () => {
  //                 await requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(async statuses => {
  //                     if (statuses['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted') {
  //                         setLocationOn(true);
  //                         // await getCurrentLoc();
  //                     } else {
  //                         // request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
  //                         //     setPermissionResult(result);
  //                         // });
  //                         setLocationOn(false);
  //                     }
  //                 });
  //             });
  //         }
  //     } catch (err) {
  //         Alert.alert(
  //             'Permission Denied!',
  //             'You need to turn on your location',
  //             [
  //                 {
  //                     text: 'Ok',
  //                     onPress: () => {
  //                         requestLocationPermission();
  //                     },
  //                 },
  //             ],
  //             { cancelable: false },
  //         );
  //     }
  // };

  // const checkNEW = async () => {
  //     const result1 = await PermissionsAndroid.check(Permission.PERMISSIONS.ACCESS_FINE_LOCATION);
  //     const result2 = await PermissionsAndroid.check(Permission.PERMISSIONS.ACCESS_COARSE_LOCATION);
  //     if (!result2 && !result1) {
  //         // await requestLocationPermission();
  //     }
  // };

  // const getCurrentLoc = () => {
  //     Geolocation.getCurrentPosition(
  //         async position => {},
  //         async error => {
  //             if (error.code === 2) {
  //                 await getCurrentLoc();
  //             }
  //         },
  //         {
  //             enableHighAccuracy: true,
  //             timeout: 30000,
  //             maximumAge: 10000,
  //             showLocationDialog: true,
  //             forceRequestLocation: true,
  //         },
  //     );
  // };

  // useEffect(() => {
  //     messaging().onNotificationOpenedApp(remoteMessage => {
  //         // remoteMessage', remoteMessage);
  //     }, []);
  //     messaging().setBackgroundMessageHandler(remoteMessage => {
  //         // ('remoteMessage', remoteMessage);
  //     });
  //     messaging()
  //         .getInitialNotification()
  //         .then(remoteMessage => {
  //             if (remoteMessage) {
  //                 // ('remoteMessage', remoteMessage);
  //             }
  //         });
  // }, []);

  useEffect(() => {
    firebase.messaging().onMessage(async remoteMessage => {
      // console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    firebase.messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage?.data?.type) {
        dispatch(SET_BACKGROUND_NOTIFICATION(remoteMessage?.data?.type));
        // await SharedService.isNotificationOpened.next(remoteMessage?.data?.type);
      }
      // console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
    });

    firebase
      .messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage?.data?.type) {
          dispatch(SET_BACKGROUND_NOTIFICATION(remoteMessage?.data?.type));
          // await SharedService.isNotificationOpened.next(remoteMessage?.data?.type);
        }
        // console.log('Notification caused app to open from quit state:', JSON.stringify(remoteMessage));
      });

    firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  // useEffect(() => {
  //     getNotification();
  // }, []);

  // const getNotification = async () => {
  //     await messaging().onNotificationOpenedApp(remoteMessage => {
  //         // remoteMessage', remoteMessage);
  //     }, []);
  //     await messaging().setBackgroundMessageHandler(remoteMessage => {
  //         // ('remoteMessage', remoteMessage);
  //     });
  //     await messaging()
  //         .getInitialNotification()
  //         .then(remoteMessage => {
  //             if (remoteMessage) {
  //                 // ('remoteMessage', remoteMessage);
  //             }
  //         });
  // };

  // const requestUserPermission = async () => {
  //     const authStatus = await messaging().requestPermission({
  //         alert: true,
  //         announcement: false,
  //         badge: true,
  //         carPlay: true,
  //         provisional: false,
  //         sound: true,
  //     });
  //     const enabled =
  //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //     if (enabled) {
  //         getFcmToken(); //<---- Add this
  //     }
  // };

  // const getFcmToken = async () => {
  //     if (Platform.OS == 'ios') {
  //         await messaging().registerDeviceForRemoteMessages();
  //         await messaging().setAutoInitEnabled(true);
  //     }
  //     const fcmToken = await getAsyncStorage('fcmToken');
  //     if (!fcmToken) {
  //         const generateFCM = await messaging().getToken();
  //         if (generateFCM) {
  //             await setAsyncStorage('fcmToken', generateFCM);
  //             // await AsyncStorage.setItem('fcmToken', );
  //         }
  //     }
  // };

  return (
    <>
      <View style={{marginBottom: 40}}></View>
      {/* <View style={{ height: 200 }}>
        <NetworkLogger theme="dark" />
      </View> */}
      <Navigator />
    </>
  );
};

export default App;
