import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import FastImage from "react-native-fast-image";
import * as RNLocalize from "react-native-localize";
// import CountryPicker, { FlagButton } from 'react-native-country-picker-modal';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomBackground from "../../component/customBackground/index";
import CustomButton from "../../component/customButton";
import CustomLoader from "../../component/customLoader/index";
import GlobalImages from "../../helper/globalImages";
import styles from "../../helper/globalStyles";
import { globalText } from "../../helper/globalText";
import I18n from "../../i18n/index";
import colors from "../../styles/colors";
import Api from "../../utils/api";
import AuthApi from "../../utils/authApi";
import { constant } from "../../utils/constants";
import {
  getAsyncStorage,
  setAsyncStorage,
  toastShow,
} from "../../utils/customFunctions";
import ActiveModal from "./activeModal";
import CountryModal from "./countryModal";
import EligibleCountryModal from "./eligibleCountryModal";
import LanguageModal from "./languageModal";
import { Singular, SingularConfig } from "singular-react-native";
import { Adjust } from "react-native-adjust";

const SignUp = (props) => {
  const [isLangaugeData, setLangaugeData] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const [countryCode, setCountryCode] = useState(null);
  const [langauge, setLangauge] = useState("");
  const [modal, setModal] = useState(false);
  const [countryListing, setCountryListing] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modalCountry, setModalCountry] = useState(false);
  const [isFlagCode, setFlagCode] = useState("");
  const [count, setCount] = useState(0);
  const [countryCheck, setCountryCheck] = useState("");
  const [isIpAddress, setIpAddress] = useState("");
  const [isCurrentName, setCurrentName] = useState("");
  const [isCheckCountryEligible, setCheckCountryEligible] = useState(false);
  const isFocused = useIsFocused();
  const [adId, setAdId] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const subscribe = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => {
        subscribe.remove("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  useEffect(() => {
    if (Platform.OS == "android") {
      Adjust.getGoogleAdId((googleAdId) => {
        setAdId(googleAdId);
      });
    } else {
      Adjust.getIdfa((idfa) => {
        setAdId(idfa);
      });
    }
  }, []);
  // useEffect(() => {
  //     // checkForNetwork();
  // }, []);

  // const checkForNetwork = () => {
  //     SharedService.networkChanged.subscribe(changed => {
  //         if (changed.isInternetReachable == null) {
  //             return;
  //         }
  //         if (!changed.isInternetReachable) {
  //             // onPageInit();
  //         } else {
  //             onPageInit();
  //         }
  //     });
  // };

  useEffect(() => {
    if (isFocused) {
      onPageInit();
    }
  }, [isFocused]);

  // useEffect(() => {
  //     const susbcription = AppState.addEventListener('change', handleChange);
  //     return () => {
  //         susbcription.remove('change', handleChange);
  //     };
  // }, []);

  // const handleChange = async value => {
  //     if (value == 'active') {
  //         check(
  //             Platform.OS == 'ios' ? 'ios.permission.LOCATION_WHEN_IN_USE' : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //         )
  //             .then(result => {
  //                 switch (result) {
  //                     case 'unavailable':
  //                         onCallPermission();
  //                         break;
  //                     case 'denied':
  //                         onCallPermission();
  //                         break;
  //                     case 'granted':
  //                         onCheckValue(false);
  //                         break;
  //                     case 'blocked':
  //                         onCallPermission();
  //                         break;
  //                 }
  //             })
  //             .catch(error => {
  //                 //toastShow(error)
  //             });
  //     }
  // };

  // const onCallPermission = () => {
  //     Alert.alert(I18n.t(globalText.permissionDenied), I18n.t(globalText.youNeedToTurnOnYourAppLocation), [
  //         {
  //             text: I18n.t(globalText._ok),
  //             onPress: () => openSettings(),
  //         },
  //     ]);
  // };

  const onPageInit = async () => {
    await onCheckValue();
  };

  // const getCurrentLoc = () => {
  //     Geolocation.getCurrentPosition(
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

  // const checkAccess = async () => {
  //     let result = false;
  //     if (Platform.OS === 'android') {
  //         await checkMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then(async statuses => {
  //             await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then(async statuses => {
  //                 if (statuses['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
  //                     result = true;
  //                     return result;
  //                 }
  //             });
  //         });
  //     }
  //     if (Platform.OS === 'ios') {
  //         await checkMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(async () => {
  //             await requestMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]).then(async statuses => {
  //                 if (statuses['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted') {
  //                     result = true;
  //                     return result;
  //                 }
  //             });
  //         });
  //     }
  //     return result;
  // };

  const onCheckValue = async (loader = true) => {
    const isTimeZoneExist = await AsyncStorage.getItem("timeZone");
    const isIpAddressExist = await AsyncStorage.getItem("ISPAddress");
    if (isTimeZoneExist && isIpAddressExist) {
      const language_data = await JSON.parse(
        await getAsyncStorage("langauge_data")
      );
      if (language_data) {
        setCountryCode(language_data.country_code);
        setFlagCode(language_data.country_code.substring(0, 2).toUpperCase());
      }
      // await onLanguageCall(language_data.country_code);
      return;
    }
    setLoader(true);
    let fetchIpAddress = constant["ipsAddressApiLocal"];
    // let fetchIpAddress = constant['ipsAddressApiNew'];
    const { data, message } = await AuthApi.getDataFromServer(fetchIpAddress);
    if (!data) {
      // setShowLocation(true);
      await onDetails(null);
      setLoader(false);
      return;
    }
    let isData = data && data.ip;
    let timezone =
      data && data.timezone && data.timezone.id
        ? data.timezone.id
        : RNLocalize.getTimeZone();
    let valueNew = timezone.split("/");
    setCountryCheck(valueNew);
    let country_code = data.country_code
      ? data.country_code
      : RNLocalize.getLocales()[0].countryCode;
    setIpAddress(isData && isData);
    await setAsyncStorage("timeZone", JSON.stringify(timezone));
    await onDetails(isData, country_code);
    setLoader(false);
  };

  const onDetails = async (id, countryCode) => {
    let _id = "";
    if (id) {
      _id = id;
      await setAsyncStorage("ISPAddress", _id.toString());
      const value = id
        ? { status: true, code: countryCode }
        : { status: false };
      setCountryCode(value.code);
      setFlagCode(value.code.substring(0, 2).toUpperCase());
      await onLanguageCall(value.code);
    } else {
      setCountryCode("US");
      setFlagCode("US");
      await onLanguageCall("US");
      await onCountryList();
    }
  };

  const onCountryList = async () => {
    const getCountryList = `${Api.countryList}?skip=${0}&limit=${500}`;
    const { data, message } = await AuthApi.getDataFromServer(getCountryList);
    if (!data) {
      toastShow(message);
      return;
    }
    const isData = data && data.data && data.data.data;
    if (isData) {
      setCountryListing(isData && isData);
    }
  };

  const onLanguageCall = async (code) => {
    let getLangaugeList = `${Api.languageList}?country_code=${code}`;

    getLangaugeList =
      "https://obiapp.opinionbureau.com/api/language?country_code=IN";

    // alert(getLangaugeList);
    const { data, message } = await AuthApi.getDataFromServer(getLangaugeList);
    if (!data) {
      toastShow(message);
      return;
    }
    const isData = data && data.data && data.data;
    if (isData && isData.length > 0) {
      await setAsyncStorage(
        "langauge_data",
        JSON.stringify(isData[0] && isData[0])
      );
      if (isData && isData[0].language) {
        setLangauge(isData[0].language);
      }
      setLangaugeData(isData && isData);
      I18n.locale =
        isData && isData[0].lang_code
          ? isData[0].lang_code.toLowerCase()
          : "en";
      setCount(count + 1);
    } else {
      let isStaticData = {
        language: "English",
        lang_id: "1",
        lang_code: "EN",
        country_id: 236,
        country_code: "US",
        country_name: "United States",
        culture_id: "1",
      };
      await setAsyncStorage("langauge_data", JSON.stringify(isStaticData));
      setLangauge(isStaticData.language);
      I18n.locale = "en";
    }
  };

  const onBackPress = () => {
    Alert.alert(
      "",
      I18n.t(globalText.appExitMessage),
      [
        { text: I18n.t(globalText.yes), onPress: () => BackHandler.exitApp() },
        { text: I18n.t(globalText.no) },
      ],
      { cancelable: true }
    );
    return true;
  };

  const onCall = async (item) => {
    await setAsyncStorage("langauge_data", JSON.stringify(item && item));
    setLangauge(item.language);
    I18n.locale = item && item.lang_code ? item.lang_code.toLowerCase() : "en";
    setCount(count + 1);
  };

  const onSaveUSerData = async () => {
    let referData = {
      // vendor_Id
      vid: "",
      source: 1,
      referLink: "",
    };
    const dt = await JSON.parse(await AsyncStorage.getItem("INVITE_URL"));
    if (dt && dt.profileSurvey != "true") {
      if (dt.reference_Id != "0") {
        referData.vid = "";
        referData.source = 3;
        referData.referLink = dt.reference_Link;
      } else {
        referData.vid = dt.vendor_Id;
        referData.source = 2;
        referData.referLink = dt.reference_Link;
      }
    }
    let device_name_value = "";
    let ip_address = null;
    // const deviceId = await DeviceInfo.getDeviceId();
    const deviceId = await DeviceInfo.getUniqueId();
    device_name_value = await DeviceInfo.getDeviceName();

    // await DeviceInfo.getDeviceName().then(async (deviceName) => {
    //   device_name_value = await deviceName;
    //   // alert(deviceId, deviceName);
    // });

    await DeviceInfo.getIpAddress().then((ip) => {
      device_address = ip;
    });
    ip_address = await AsyncStorage.getItem("ISPAddress");
    const payload = {
      country_code: countryCode,
      device_id: deviceId,
      device_type: Platform.OS,
      device_name: device_name_value ? device_name_value : "",
      ip_address: ip_address ? ip_address : "",
      source: referData.source,
      referer_url: referData.referLink,
      vid: referData.vid,
      source_user_id2: 0,
      idfa_gaid: adId,
    };

    const { data, message } = await AuthApi.postDataToServer(
      Api.signUpUserDeviceData,
      payload
    );
    if (!data) {
      return;
    }
  };

  const onCheckEligibileCountry = async () => {
    const checkCountryEligibleOrNot = `${Api.checkRegPerSignUp}?country_code=${countryCode}`;
    const { data, message } = await AuthApi.getDataFromServer(
      checkCountryEligibleOrNot
    );
    if (!data) {
      message ==
      "Thank you for showing interest in Opinion Bureau! We are not taking registrations at the moment. Kindly check back in a few days."
        ? setCheckCountryEligible(true)
        : //? toastShow(I18n.t(globalText.thankYouComeAgain))
          toastShow(message);
      return;
    }
    let payload = new Date().toString();
    await setAsyncStorage("TIME_TO_SIGN_UP", payload);
    if (countryCheck[0] == "Europe") {
      setCurrentName("");
      props.navigation.navigate("Privacy");
    } else {
      setCurrentName("");
      props.navigation.navigate("SocailLogin", {});
      //signUpGdprStatus;
    }
  };

  const onCallLogin = async () => {
    Singular.event("Login_Click");
    setLoader(true);
    await onSaveUSerData();
    setCurrentName("");
    props.navigation.navigate("Auth", { country_code: countryCode });
    setLoader(false);
  };

  const onCallSignUp = async () => {
    Singular.event("Signup_Click");
    setLoader(true);
    await onSaveUSerData();
    await onCheckEligibileCountry();
    setLoader(false);
  };

  const sanitizeIsoCode = (code) => {
    if (typeof code === "string" && code.length >= 2) {
      return code.substring(0, 2).toUpperCase();
    }
    return "UN";
  };

  console.log("is flag code", isFlagCode);

  return (
    <View style={styles.container}>
      {loader && <CustomLoader />}

      <CustomBackground
        screen={
          <View style={styles.signUpMainView}>
            <View style={styles.signUpFirstView}>
              <FastImage
                style={styles.signUpLogoStyle}
                source={GlobalImages.logoIcon}
                resizeMode={"contain"}
              />

              <View style={styles.row}>
                <View style={styles.pickerCountryView}>
                  <View style={{ marginRight: 10 }}>
                    <CountryFlag
                      isoCode={sanitizeIsoCode(isFlagCode)}
                      size={20}
                    />
                  </View>
                  <Text>-</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setModal(true)}
                  style={styles.pickerCountryViewStyleNew}
                >
                  <Text style={styles.paddR5paddL5}>
                    {langauge ? langauge.substring(0, 3) : "Eng"}
                  </Text>
                  <AntDesign
                    size={15}
                    name={"caretdown"}
                    color={colors.DOVE_GRAY}
                  ></AntDesign>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.justifyContentCenter}>
              <CustomButton
                buttonName={I18n.t(globalText.loginBold)}
                addButtonStyle={styles.signUpLoginButtonStyle}
                addButtonTextStyle={styles.fontSize20}
                onPress={() => onCallLogin()}
              />
              <View style={styles.signUpBorder} />
              <View style={styles.signUpRowBView}>
                <Text
                  numberOfLines={1}
                  style={[styles.fontSize18, styles.flexShrinkOne]}
                >
                  {I18n.t(globalText.dontHaveAnACc)}
                </Text>
                <TouchableOpacity onPress={() => onCallSignUp()}>
                  <Text
                    style={[styles.signUpTextStyle, styles.flexShrinkOne]}
                    numberOfLines={1}
                  >
                    {I18n.t(globalText.signUpBold)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rowAlignSelfItemCenter}>
              <TouchableOpacity
                onPress={() => Linking.openURL(constant["termsAndCondition"])}
              >
                <Text style={styles.textCenter}>
                  {I18n.t(globalText.termsAndCond)}
                </Text>
              </TouchableOpacity>
              <Text style={styles.textCenter}> | </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(constant["privacyPolicyUrl"])}
              >
                <Text style={styles.textCenter}>
                  {I18n.t(globalText.privacyPolicy)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
      {isCheckCountryEligible && (
        <EligibleCountryModal
          onRequestClose={() => setCheckCountryEligible(false)}
          onPressClose={() => setCheckCountryEligible(false)}
        />
      )}

      {showLocation && (
        <ActiveModal
          visible={showLocation}
          onRequestClose={() => setShowLocation(false)}
          onPressTap={() => {
            setShowLocation(false);
            setModalCountry(true);
          }}
        />
      )}

      {modal && (
        <LanguageModal
          // languageSelect={() => onCall}
          onRequestClose={() => setModal(false)}
          data={isLangaugeData && isLangaugeData}
          onPressClose={() => setModal(false)}
          onSetValue={(item) => {
            onCall(item);
            setModal(false);
            // setLangauge(item.code);
          }}
          languageName={langauge && langauge}
        />
      )}
      {modalCountry && (
        <CountryModal
          onRequestClose={() => setModalCountry(false)}
          data={countryListing && countryListing}
          onPressClose={() => setModalCountry(false)}
          onSetValue={(item) => {
            setModalCountry(false);
            setFlagCode(item.country_code.substring(0, 2).toUpperCase());
            onLanguageCall(item.country_code);
          }}
        />
      )}
    </View>
  );
};

export default SignUp;
