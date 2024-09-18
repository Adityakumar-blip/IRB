import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Image } from "react-native";
import CustomBackground from "../../component/customBackground/index";
import GlobalImages from "../../helper/globalImages";
import styles from "../../helper/globalStyles";
import {
  setAsyncStorage,
  removeAsyncStorage,
  getAsyncStorage,
  toastShow,
} from "../../utils/customFunctions";
import AuthApi from "../../utils/authApi";
import Api from "../../utils/api";
import { firebase } from "@react-native-firebase/dynamic-links";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { constant } from "../../utils/constants";
import FastImage from "react-native-fast-image";
import * as RNLocalize from "react-native-localize";
import I18n from "../../i18n/index";

const Splash = (props) => {
  useEffect(() => {
    onPageInit();
  }, []);

  const onPageInit = async () => {
    let lang_code = await getUserData();
    const res = await getLaunchApp(lang_code);
    const link = await getAppLaunchLink();
    if (res) {
      props.navigation.replace("DrawerNavigation", {
        screen: "Dashboard",
        params: { refresh: true },
      });
    } else {
      if (link) {
        props.navigation.replace("SignUp");
      } else {
        await removeAsyncStorage("INVITE_URL");
        props.navigation.replace("SignUp");
      }
    }
  };

  const getUserData = async () => {
    let fetchIpAddress = constant["ipsAddressApiLocal"];
    const { data, message } = await AuthApi.getDataFromServer(fetchIpAddress);
    if (!data) {
      // setShowLocation(true);
      return null;
    }
    let country_code = data.country_code
      ? data.country_code
      : RNLocalize.getLocales()[0].countryCode;
    let lang_code = await onLanguageCall(country_code);
    return lang_code;
  };

  const onLanguageCall = async (code) => {
    const getLangaugeList = `${Api.languageList}?country_code=${code}`;
    const { data, message } = await AuthApi.getDataFromServer(getLangaugeList);
    if (!data) {
      // toastShow(message);
      return null;
    }
    const isData = (await data) && data.data && data.data;
    if (isData && isData.length > 0) {
      let lang_code =
        isData && isData[0].lang_code
          ? isData[0].lang_code.toLowerCase()
          : "en";
      return lang_code;
    }
  };

  const getAppLaunchLink = async () => {
    let res = false;
    try {
      const { url } = await firebase.dynamicLinks().getInitialLink();
      if (url) {
        let storeConstant = null;
        if (url) {
          const arrUrl = url.split("?");
          const inviteCode = arrUrl[1];
          const allData = inviteCode.split("&");
          storeConstant = {
            reference_Link: allData[1] == "true" ? "" : url,
            reference_Id: allData[0],
            profileSurvey: allData[1],
            vendor_Id: allData[2] ? allData[2] : "0",
            source_Id: allData[3] ? allData[3] : "0",
          };

          // await AsyncStorage.setItem('INVITE', JSON.stringify(storeConstant));
          await setAsyncStorage("INVITE_URL", JSON.stringify(storeConstant));
        }
        //return storeConstant;
        res = true;
      }
      return res;
    } catch (err) {
      //toastShow(err)
    }
  };

  const getLaunchApp = async (lang_code) => {
    let GDPR_Status = "";
    await setAsyncStorage("GDPR_Status", GDPR_Status);
    let response = false;
    const endPoint = `${Api.polls}`;
    const { data, message } = await AuthApi.getDataFromServer(endPoint);
    if (!data) {
      lang_code ? lang_code : null;
      if (lang_code) {
        I18n.locale = lang_code;
      }
      return response;
    }
    const appLanguage = await getAsyncStorage("appLanguage");
    if (appLanguage) {
      I18n.locale = appLanguage;
    }
    response = true;
    return response;
  };

  // const getLaunchApp = async (lang_code) => {
  //   let GDPR_Status = "";
  //   await setAsyncStorage("GDPR_Status", GDPR_Status);

  //   // Set language
  //   if (lang_code) {
  //     I18n.locale = lang_code;
  //   } else {
  //     const appLanguage = await getAsyncStorage("appLanguage");
  //     if (appLanguage) {
  //       I18n.locale = appLanguage;
  //     }
  //   }

  //   // Always return true since we're not checking the API response
  //   return true;
  // };

  return (
    <View style={styles.container}>
      <CustomBackground
        screen={
          <SafeAreaView style={styles.splashMainView}>
            <FastImage
              style={styles.splashIconstyle}
              source={GlobalImages.logoIcon}
              resizeMode={"contain"}
            />
          </SafeAreaView>
        }
      />
    </View>
  );
};

export default Splash;
