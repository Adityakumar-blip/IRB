// import { useFocusEffect, useIsFocused } from '@react-navigation/native';
// import React, { useEffect, useState } from 'react';
// import { Alert, BackHandler, Linking, Text, TouchableOpacity, View, Platform, AppState } from 'react-native';
// import CountryFlag from 'react-native-country-flag';
// import FastImage from 'react-native-fast-image';
// import * as RNLocalize from 'react-native-localize';
// // import CountryPicker, { FlagButton } from 'react-native-country-picker-modal';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import CustomBackground from '../../component/customBackground/index';
// import CustomButton from '../../component/customButton';
// import CustomLoader from '../../component/customLoader/index';
// import GlobalImages from '../../helper/globalImages';
// import styles from '../../helper/globalStyles';
// import { globalText } from '../../helper/globalText';
// import I18n from '../../i18n/index';
// import colors from '../../styles/colors';
// import Api from '../../utils/api';
// import AuthApi from '../../utils/authApi';
// import { constant } from '../../utils/constants';
// import { setAsyncStorage, toastShow, getAsyncStorage, clearAsyncStorage } from '../../utils/customFunctions';
// import ActiveModal from './activeModal';
// import CountryModal from './countryModal';
// import LanguageModal from './languageModal';
// import DeviceInfo from 'react-native-device-info';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNetInfo } from '@react-native-community/netinfo';
// import axios from 'axios';
// import { NetworkInfo } from 'react-native-network-info';
// import Geolocation from 'react-native-geolocation-service';
// import Permissions, {
//     check,
//     checkMultiple,
//     openSettings,
//     PERMISSIONS,
//     requestMultiple,
//     RESULTS,
// } from 'react-native-permissions';
// import PermissionModal from './permissionModal';
// import SharedService from '../../services/sharedService/index';

// const SignUp = props => {
//     const [isLangaugeData, setLangaugeData] = useState(null);
//     const [showLocation, setShowLocation] = useState(false);
//     const [countryCode, setCountryCode] = useState(null);
//     const [langauge, setLangauge] = useState('English');
//     const [modal, setModal] = useState(false);
//     const [countryListing, setCountryListing] = useState([]);
//     const [loader, setLoader] = useState(false);
//     const [modalCountry, setModalCountry] = useState(false);
//     const [isFlagCode, setFlagCode] = useState('');
//     const [count, setCount] = useState(0);
//     const [countryCheck, setCountryCheck] = useState('');
//     const [isIpAddress, setIpAddress] = useState('');
//     const [isCurrentName, setCurrentName] = useState('');
//     const isFocused = useIsFocused();

//     useFocusEffect(
//         React.useCallback(() => {
//             // setCurrentName('SignUp');
//             // setAsyncStorage('ScreenName', JSON.stringify('SignUp'));
//             const subscribe = BackHandler.addEventListener('hardwareBackPress', onBackPress);
//             return () => {
//                 subscribe.remove('hardwareBackPress', onBackPress);
//             };
//         }, []),
//     );

//     useEffect(() => {
//         // checkForNetwork();
//     }, []);

//     const checkForNetwork = () => {
//         SharedService.networkChanged.subscribe(changed => {
//             if (changed.isInternetReachable == null) {
//                 return;
//             }
//             if (!changed.isInternetReachable) {
//                 // onPageInit();
//             } else {
//                 onPageInit();
//             }
//         });
//     };

//     useEffect(() => {
//         if (isFocused) {
//             onPageInit();
//         }
//     }, [isFocused]);

//     // useEffect(() => {
//     //     const susbcription = AppState.addEventListener('change', handleChange);
//     //     return () => {
//     //         susbcription.remove('change', handleChange);
//     //     };
//     // }, []);

//     const handleChange = async value => {
//         if (value == 'active') {
//             check(
//                 Platform.OS == 'ios' ? 'ios.permission.LOCATION_WHEN_IN_USE' : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//             )
//                 .then(result => {
//                     switch (result) {
//                         case 'unavailable':
//                             onCallPermission();
//                             break;
//                         case 'denied':
//                             onCallPermission();
//                             break;
//                         case 'granted':
//                             onCheckValue(false);
//                             break;
//                         case 'blocked':
//                             onCallPermission();
//                             break;
//                     }
//                 })
//                 .catch(error => {
//                     //toastShow(error)
//                 });
//         }
//     };

//     const onCallPermission = () => {
//         Alert.alert(I18n.t(globalText.permissionDenied), I18n.t(globalText.youNeedToTurnOnYourAppLocation), [
//             {
//                 text: I18n.t(globalText._ok),
//                 onPress: () => openSettings(),
//             },
//         ]);
//     };

//     const onPageInit = async () => {
//         const result = await checkAccess();
//         const isTimeZoneExist = await AsyncStorage.getItem('timeZone');
//         const isIpAddressExist = await AsyncStorage.getItem('ISPAddress');
//         if (!result) {
//             checkAccess();
//             return;
//         }
//         if (isTimeZoneExist && isIpAddressExist) {
//             const language_data = await JSON.parse(await getAsyncStorage('langauge_data'));
//             setCountryCode(language_data.country_code);
//             setFlagCode(language_data.country_code);
//             await onLanguageCall(language_data.country_code);
//             return;
//         }
//         await onCheckValue();
//     };

//     const getCurrentLoc = () => {
//         Geolocation.getCurrentPosition(
//             async error => {
//                 if (error.code === 2) {
//                     await getCurrentLoc();
//                 }
//             },
//             {
//                 enableHighAccuracy: true,
//                 timeout: 30000,
//                 maximumAge: 10000,
//                 showLocationDialog: true,
//                 forceRequestLocation: true,
//             },
//         );
//     };

//     const checkAccess = async () => {
//         let result = false;
//         if (Platform.OS === 'android') {
//             await checkMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then(async statuses => {
//                 await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then(async statuses => {
//                     if (statuses['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
//                         result = true;
//                         return result;
//                     }
//                 });
//             });
//         }
//         if (Platform.OS === 'ios') {
//             await checkMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(async () => {
//                 await requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(async statuses => {
//                     if (statuses['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted') {
//                         result = true;
//                         return result;
//                     }
//                 });
//             });
//         }
//         return result;
//     };

//     //https://www.opinionbureau.com/images/flags/4x3/af.svg

//     const onCheckValue = async (loader = true) => {
//         setLoader(loader ? true : false);
//         let fetchIpAddress = constant['ipsAddressApiLocal'];
//         const { data, message } = await AuthApi.getDataFromServer(fetchIpAddress);
//         setLoader(false);
//         if (!data) {
//             // setShowLocation(true);
//             onDetails(null);
//             return;
//         }
//         let isData = data && data.ip;
//         let timezone = data && data.timezone && data.timezone.id;
//         setIpAddress(isData && isData);
//         await setAsyncStorage('timeZone', JSON.stringify(timezone));
//         await onDetails(isData, data && data.country_code);
//     };

//     const onDetails = async (id, countryCode) => {
//         let _id = '';
//         let checkCoumtry = await RNLocalize.getTimeZone();
//         let valueNew = checkCoumtry.split('/');
//         setCountryCheck(valueNew);
//         if (id) {
//             _id = id;
//             await setAsyncStorage('ISPAddress', _id.toString());
//             const value = id ? { status: true, code: countryCode } : { status: false };
//             setCountryCode(value.code);
//             setFlagCode(value.code);
//             await onLanguageCall(value.code);
//         } else {
//             setCountryCode('US');
//             setFlagCode('US');
//             await onLanguageCall('US');
//             await onCountryList();
//             // setShowLocation(true);
//         }
//         //setLoader(false);
//     };

//     const onCountryList = async () => {
//         const getCountryList = `${Api.countryList}?skip=${0}&limit=${500}`;
//         const { data, message } = await AuthApi.getDataFromServer(getCountryList);
//         if (!data) {
//             toastShow(message);
//             return;
//         }
//         const isData = (await data) && data.data && data.data.data;
//         if (isData) {
//             setCountryListing(isData && isData);
//         }
//     };

//     const onLanguageCall = async code => {
//         const getLangaugeList = `${Api.languageList}?country_code=${code}`;
//         const { data, message } = await AuthApi.getDataFromServer(getLangaugeList);
//         if (!data) {
//             toastShow(message);
//             return;
//         }
//         const isData = (await data) && data.data && data.data;
//         if (isData) {
//             await setAsyncStorage('langauge_data', JSON.stringify(isData && isData));
//             if (isData && isData.language) {
//                 setLangauge(isData.language);
//             }
//             setLangaugeData(isData && isData);
//             I18n.locale = isData && isData.lang_code ? isData.lang_code.toLowerCase() : 'en';
//             setCount(count + 1);
//         }
//     };

//     const onBackPress = () => {
//         Alert.alert(
//             '',
//             I18n.t(globalText.appExitMessage),
//             [{ text: I18n.t(globalText.yes), onPress: () => BackHandler.exitApp() }, { text: I18n.t(globalText.no) }],
//             { cancelable: true },
//         );
//         return true;
//     };

//     const onCall = item => {
//         I18n.locale = item && item.lang_code ? item.lang_code.toLowerCase() : 'en';
//         setCount(count + 1);
//     };

//     const onCallSignUp = async () => {
//         let payload = new Date().toString();
//         await setAsyncStorage('TIME_TO_SIGN_UP', payload);
//         if (countryCheck[0] == 'Europe') {
//             setCurrentName('');
//             props.navigation.navigate('Privacy');
//         } else {
//             setCurrentName('');
//             props.navigation.navigate('SocailLogin', {});
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {loader && <CustomLoader />}

//             <CustomBackground
//                 screen={
//                     <View style={styles.signUpMainView}>
//                         <View style={styles.signUpFirstView}>
//                             <FastImage
//                                 style={styles.signUpLogoStyle}
//                                 source={GlobalImages.logoIcon}
//                                 resizeMode={'contain'}
//                             />

//                             <View style={styles.row}>
//                                 <View style={styles.pickerCountryView}>
//                                     <View style={{ marginRight: 10 }}>
//                                         <CountryFlag isoCode={isFlagCode && isFlagCode} size={20} />
//                                     </View>
//                                     <Text>-</Text>
//                                 </View>
//                                 <TouchableOpacity
//                                     onPress={() => setModal(true)}
//                                     style={styles.pickerCountryViewStyleNew}
//                                 >
//                                     <Text style={styles.paddR5paddL5}>
//                                         {langauge ? langauge.substring(0, 3) : 'Eng'}
//                                     </Text>
//                                     <AntDesign size={15} name={'caretdown'} color={colors.DOVE_GRAY}></AntDesign>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>

//                         <View style={styles.justifyContentCenter}>
//                             <CustomButton
//                                 buttonName={I18n.t(globalText.loginBold)}
//                                 addButtonStyle={styles.signUpLoginButtonStyle}
//                                 addButtonTextStyle={styles.fontSize20}
//                                 onPress={() => {
//                                     setCurrentName('');
//                                     props.navigation.navigate('Auth');
//                                 }}
//                             />
//                             <View style={styles.signUpBorder} />
//                             <View style={styles.signUpRowBView}>
//                                 <Text numberOfLines={1} style={[styles.fontSize18, styles.flexShrinkOne]}>
//                                     {I18n.t(globalText.dontHaveAnACc)}
//                                 </Text>
//                                 <TouchableOpacity onPress={() => onCallSignUp()}>
//                                     <Text style={[styles.signUpTextStyle, styles.flexShrinkOne]} numberOfLines={1}>
//                                         {I18n.t(globalText.signUpBold)}
//                                     </Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                         <View style={styles.rowAlignSelfItemCenter}>
//                             <TouchableOpacity onPress={() => Linking.openURL(constant['termsAndCondition'])}>
//                                 <Text style={styles.textCenter}>{I18n.t(globalText.termsAndCond)}</Text>
//                             </TouchableOpacity>
//                             <Text style={styles.textCenter}> | </Text>
//                             <TouchableOpacity onPress={() => Linking.openURL(constant['privacyPolicyUrl'])}>
//                                 <Text style={styles.textCenter}>{I18n.t(globalText.privacyPolicy)}</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 }
//             />

//             {showLocation && (
//                 <ActiveModal
//                     visible={showLocation}
//                     onRequestClose={() => setShowLocation(false)}
//                     onPressTap={() => {
//                         setShowLocation(false);
//                         setModalCountry(true);
//                     }}
//                 />
//             )}

//             {modal && (
//                 <LanguageModal
//                     // languageSelect={() => onCall}
//                     onRequestClose={() => setModal(false)}
//                     data={isLangaugeData && isLangaugeData}
//                     onPressClose={() => setModal(false)}
//                     onSetValue={item => {
//                         onCall(item);
//                         setModal(false);
//                         // setLangauge(item.code);
//                     }}
//                     languageName={langauge && langauge}
//                 />
//             )}
//             {modalCountry && (
//                 <CountryModal
//                     onRequestClose={() => setModalCountry(false)}
//                     data={countryListing && countryListing}
//                     onPressClose={() => setModalCountry(false)}
//                     onSetValue={item => {
//                         setModalCountry(false);
//                         setFlagCode(item.country_code);
//                         onLanguageCall(item.country_code);
//                     }}
//                 />
//             )}
//         </View>
//     );
// };

// export default SignUp;
