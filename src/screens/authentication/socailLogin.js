/* eslint-disable no-constant-condition */
import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  BackHandler,
  Platform,
} from "react-native";
import FastImage from "react-native-fast-image";
import AuthButton from "../../component/authButton/index";
import CustomBackground from "../../component/customBackground/index";
import GlobalImages from "../../helper/globalImages";
import styles from "../../helper/globalStyles";
import { globalText } from "../../helper/globalText";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
  LoginButton,
} from "react-native-fbsdk";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import I18n from "../../i18n/index";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Singular } from "singular-react-native";
import auth from "@react-native-firebase/auth";

const SocailLogin = (props) => {
  const [isData, setData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    email_id: "",
    phone_no: "",
  });
  const [userDataLogInByThirdParty, setUserDataLogInByThirdParty] =
    useState(null);

  // const oncheck = async () => {
  //     const url = await JSON.parse(await AsyncStorage.getItem('invitedUrl'));
  //     if (url) {
  //         const inviteId = url && url.split('?');
  //     }
  // };

  useFocusEffect(
    React.useCallback(() => {
      setData({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        email_id: "",
        phone_no: "",
      });
    }, [])
  );

  const onPressSignUpWithFacebook = async () => {
    LoginManager.logOut();
    if (Platform.OS === "android") {
      LoginManager.setLoginBehavior("web_only");
    }
    LoginManager.logInWithPermissions(["public_profile,email"]).then(
      async (result) => {
        console.log("result", result);
        if (result.isCancelled) {
          // toastShow('Something went wrong, please try after some time', 5000);
        } else {
          AccessToken.getCurrentAccessToken().then(async (data) => {
            const accessToken = data.accessToken.toString();
            const PROFILE_REQUEST_PARAMS = {
              fields: {
                string: "id,email,name,birthday,gender,first_name,last_name",
              },
            };
            const profileRequest = new GraphRequest(
              "/me",
              { accessToken, parameters: PROFILE_REQUEST_PARAMS },
              (error, result) => {
                if (error) {
                  // toastShow('Login Info has an error:', error);
                } else {
                  if (result.isCancelled) {
                    //   toastShow('Login cancelled');
                  }
                  (isData.first_name = result.first_name
                    ? result.first_name
                    : ""),
                    (isData.last_name = result.last_name
                      ? result.last_name
                      : ""),
                    (isData.date_of_birth = result.birthday
                      ? new Date(result.birthday)
                      : ""),
                    (isData.gender =
                      result.gender && result.gender == "female"
                        ? I18n.t(globalText.female)
                        : result.gender == "male"
                        ? I18n.t(globalText.male)
                        : result.gender == "other"
                        ? I18n.t(globalText.other)
                        : ""),
                    (isData.email_id = result.email ? result.email : ""),
                    (isData.phone_no = result.phone ? result.email : "");
                  setData({ ...isData });

                  Singular.event("Login_with_facebook");
                  props.navigation.navigate("SocialThroughEmail", {
                    data: isData,
                    status: "Facebook",
                  });
                }
              }
            );
            new GraphRequestManager().addRequest(profileRequest).start();
          });
        }
      },
      (error) => {
        // toastShow('Login fail with error: ' + error);
      }
    );
  };

  const onPressSignUpWithGoogle = async () => {
    try {
      GoogleSignin.configure({
        //webClientId is required if you need offline access
        offlineAccess: true,
        webClientId:
          "244782268392-c524qiu8sal8hpk8jtfqb0dap80pe6lb.apps.googleusercontent.com",
        androidClientId:
          "244782268392-imbsr7tiveb12s27jmkdvdtvtpq44r4m.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });
      await GoogleSignin.hasPlayServices();
      console.log("reached google sign in");
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("error occured SIGN_IN_CANCELLED");
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("error occured IN_PROGRESS");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("error occured PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        console.log(error);
        console.log("error occured unknow error");
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomBackground
        screen={
          <View style={styles.sLoginMainView}>
            <Image
              style={styles.sLLogoStyle}
              source={GlobalImages.logoIcon}
              resizeMode={"contain"}
            />

            <Text style={styles.sLContWithTextstyle}>
              {I18n.t(globalText.continueWith)}
            </Text>
            {/* <View style={styles.sLfbGLogoMainStyle}>
              <TouchableOpacity
                onPress={() => onPressSignUpWithFacebook()}
                style={[styles.sLFbGoIconStyle, styles.marR20]}
              >
                <FastImage
                  style={styles.sLFBStyle}
                  source={GlobalImages.fbIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onPressSignUpWithGoogle()}
                style={[styles.sLFbGoIconStyle, styles.marL20]}
              >
                <FastImage
                  style={styles.sLGoogleStyle}
                  source={GlobalImages.googleIcom}
                />
              </TouchableOpacity>
            </View> */}
            {/* <Text style={styles.sLOrTextStyle}>{I18n.t(globalText.or)}</Text> */}
            <View style={[styles.alignSelfCenter]}>
              <View
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  padding: 15,
                  borderRadius: 5,
                  opacity: 0.6,
                  paddingHorizontal: 40,
                }}
              >
                <TouchableOpacity
                  style={styles.signUpSelection}
                  onPress={() =>
                    props.navigation.navigate("SocialThroughEmail", {
                      data: isData,
                      status: "Email",
                    })
                  }
                >
                  <MaterialIcons
                    name="email-fast-outline"
                    size={30}
                    color={"#673AB7"}
                    style={{ paddingRight: 10 }}
                  />
                  <Text style={styles.sLEmailTextStyle}>
                    {I18n.t(globalText.email)}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.colorGreyDashSPace}>|</Text>
                <TouchableOpacity
                  style={styles.signUpSelection}
                  onPress={() =>
                    props.navigation.navigate("SocialThroughEmail", {
                      data: isData,
                      status: "Phone",
                    })
                  }
                >
                  <Feather
                    name="phone-call"
                    size={21}
                    color={"#673AB7"}
                    style={{ paddingRight: 10 }}
                  />

                  <Text style={styles.sLEmailTextStyle}>
                    {I18n.t(globalText.phone)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default SocailLogin;
