/* eslint-disable no-unreachable */
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import SimpleReactValidator from "simple-react-validator";
import CustomBackground from "../../component/customBackground/index";
import CustomButton from "../../component/customButton/index";
import CustomLoader from "../../component/customLoader/index";
import styles from "../../helper/globalStyles";
import Api from "../../utils/api";
import AuthApi from "../../utils/authApi";
import {
  getAsyncStorage,
  setAsyncStorage,
  toastShow,
  removeAsyncStorage,
  timeTakeToSignUp,
  generateFCMToken,
  getFormatedDate,
} from "../../utils/customFunctions";
import CustomValidation from "../../utils/CustomValidation";
import I18n from "../../i18n/index";
import { globalText } from "../../helper/globalText";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "@react-native-firebase/dynamic-links";
import BackgroundTimer from "react-native-background-timer";
import * as RNLocalize from "react-native-localize";
import sampleData from "../../helper/sampleData";
import DeviceInfo from "react-native-device-info";
import CustomLoaderNew from "../../component/customLoaderNew/index";
import { Singular } from "singular-react-native";
import { Adjust } from "react-native-adjust";

let interval = undefined;
const OtpVerification = (props) => {
  const [isDisableVerify, setVerifyDisable] = useState(false);
  const simpleValidator = useRef(new SimpleReactValidator());
  const [allValid, setAllValid] = useState(true);
  const [loader, setLoader] = useState(false);

  const { initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  const { initialBackgroundMinuteMob = 0, initialBackgroundSecondsMob = 0 } =
    props;
  const [minutesBackgroundMob, setMinutesBackgroundMob] = useState(
    initialBackgroundMinuteMob
  );
  const [secondsBackgroundMob, setSecondsBackgroundMob] = useState(
    initialBackgroundSecondsMob
  );

  const { initialMinuteEmail = 0, initialSecondsEmail = 0 } = props;
  const [minutesEmail, setMinutesEmail] = useState(initialMinuteEmail);
  const [secondsEmail, setSecondsEmail] = useState(initialSecondsEmail);

  const {
    initialBackgroundMinuteEmail = 0,
    initialBackgroundSecondsEmail = 0,
  } = props;
  const [minutesBackgroundEmail, setMinutesBackgroundEmail] = useState(
    initialBackgroundMinuteEmail
  );
  const [secondsBackgroundEmail, setSecondsBackgroundEmail] = useState(
    initialBackgroundSecondsEmail
  );

  const [otpMobile, setOtpMobile] = useState(null);
  const [otpEmail, setOtpEmail] = useState(null);
  const [adId, setAdId] = useState("");

  const [isDetail, setDetail] = useState({});
  const [isVerifiyOtp, setVerifiyOtp] = useState({
    isMobile: false,
    isEmail: false,
  });
  const [isErrorMessage, setErrorMessage] = useState("");
  const [isSignUpLoader, setSignUpLoader] = useState(false);
  const [isSignUpTime, setSignUpTime] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      onPageInit();
      return () => {
        cleanUp();
      };
    }, [])
  );
  const cleanUp = () => {
    setSignUpTime(0);
    setSignUpLoader(false);
  };

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
  const processIndicator = useRef(null);

  useEffect(() => {
    if (isSignUpLoader) {
      if (Number(isSignUpTime) < 9) {
        interval = setInterval(() => {
          setSignUpTime((prev) => prev + 1);
        }, 1500);
      } else {
        clearInterval(interval);
      }
    }
  }, [isSignUpLoader]);

  useEffect(() => {
    if (isSignUpTime == 9) {
      clearInterval(interval);
    }
  }, [isSignUpTime]);

  const [isCheckEmailOrPhone, setCheckEmailOrPhone] = useState({
    email: false,
    phone: false,
  });

  const id_mobile = useRef(null);
  const id_email = useRef(null);

  const timer_mob = useRef(null);
  const timer_email = useRef(null);

  const clear = (type) => {
    if (type == "MOBILE") {
      BackgroundTimer.clearInterval(id_mobile.current);
    }
    if (type == "EMAIL") {
      BackgroundTimer.clearInterval(id_email.current);
    }
    if (type == "PROCESS") {
      processIndicator;
    }
  };
  const [isDailcode, setDailcode] = useState("");

  useEffect(() => {
    const userDetail =
      props.route && props.route.params && props.route.params.data;
    const data = sampleData.dail_code_number;
    if (userDetail.country_code) {
      let value_code = "";
      data.map((item, index) => {
        if (item.code.toLowerCase() == userDetail.country_code.toLowerCase()) {
          value_code = item.dial_code;
        }
      });
      setDailcode(value_code);
    }
  }, []);

  const clear_timer = (type) => {
    if (type == "MOBILE") {
      BackgroundTimer.clearInterval(timer_mob.current);
    }
    if (type == "EMAIL") {
      BackgroundTimer.clearInterval(timer_email.current);
    }
  };

  const onPageInit = async () => {
    await getUserDetails();
  };

  const getUserDetails = async () => {
    const data =
      (await props.route) && props.route.params && props.route.params.data;
    const isData =
      (await props.route) &&
      props.route.params &&
      props.route.params.checkEmailOrPhone;
    // setDetail(data);
    setCheckEmailOrPhone({ ...isData });
    if (data && data) {
      setDetail(data);
      isData.email ? onEmailOTP(data) : null;
      isData.phone ? onMobileOTP(data) : null;
    }
  };

  const onMobileOTP = async (isData) => {
    if (timer_email.current) {
      await clear_timer("MOBILE");
    }
    let isDataValue = isData ? isData : isDetail;
    setSeconds(0);
    setMinutes(1);
    setMinutesBackgroundMob(2);
    const otp = Math.floor(1000 + Math.random() * 9000);
    await setAsyncStorage("Random_Otp_Mobile", otp.toString());
    const randomOtp = await getAsyncStorage("Random_Otp_Mobile");
    const payload = {
      phone_no: isDataValue.phone_number,
      verificationCode: Number(randomOtp),
      country_code: isDataValue.country_code,
      first_name: isDataValue.first_name,
      culture_id: isDataValue.culture_id,
    };
    setLoader(true);
    const { data, message } = await AuthApi.postDataToServer(
      Api.sendSmsOrEmailOtp,
      payload
    );
    setLoader(false);
    if (!data) {
      toastShow(I18n.t(globalText.somethingWentWrong));
      return;
    }
    // let isMessage = data.data ? data.data : '';
    setTimeout(() => {
      Singular.event("signup_mobile");
      toastShow(I18n.t(globalText.otpSendSuccessfully));
    }, 100);
  };

  const onEmailOTP = async (isData) => {
    if (timer_email.current) {
      await clear_timer("EMAIL");
    }
    let isDataValue = isData ? isData : isDetail;
    setSecondsEmail(0);
    setMinutesEmail(1);
    setMinutesBackgroundEmail(2);
    const otp = Math.floor(1000 + Math.random() * 9000);
    await setAsyncStorage("Random_Otp_Email", otp.toString());
    const randomOtp = await getAsyncStorage("Random_Otp_Email");
    setLoader(true);
    const payload = {
      email: isDataValue.email,
      verificationCode: Number(randomOtp),
      country_code: isDataValue.country_code,
      first_name: isDataValue.first_name,
      culture_id: isDataValue.culture_id,
    };
    const { data, message } = await AuthApi.postDataToServer(
      Api.sendSmsOrEmailOtp,
      payload
    );
    setLoader(false);
    if (!data) {
      setLoader(false);
      toastShow(I18n.t(globalText.somethingWentWrong));
      return;
    }
    setTimeout(() => {
      Singular.event("signup_email");
      toastShow(I18n.t(globalText.otpSendSuccessfully));
    }, 100);
  };

  useEffect(() => {
    id_mobile.current = BackgroundTimer.setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          // !isVerifiyOtp.isMobile && removeAsyncStorage('Random_Otp_Mobile');
          // !isVerifiyOtp.isMobile && setOtpMobile(null);
          // clearInterval(myInterval);
          clear("MOBILE");
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    id_email.current = BackgroundTimer.setInterval(() => {
      if (secondsEmail > 0) {
        setSecondsEmail(secondsEmail - 1);
      }
      if (secondsEmail === 0) {
        if (minutesEmail === 0) {
          // !isVerifiyOtp.isEmail && removeAsyncStorage('Random_Otp_Email');
          // !isVerifiyOtp.isEmail && setOtpEmail(null);
          // clearInterval(myIntervalEmail);
          clear("EMAIL");
        } else {
          setMinutesEmail(minutesEmail - 1);
          setSecondsEmail(59);
        }
      }
    }, 1000);
    return () => {
      clear("MOBILE");
      clear("EMAIL");
    };
  });

  useEffect(() => {
    timer_mob.current = BackgroundTimer.setInterval(() => {
      if (secondsBackgroundMob > 0) {
        setSecondsBackgroundMob(secondsBackgroundMob - 1);
      }
      if (secondsBackgroundMob === 0) {
        if (minutesBackgroundMob === 0) {
          !isVerifiyOtp.isMobile && removeAsyncStorage("Random_Otp_Mobile");
          //!isVerifiyOtp.isMobile && setOtpMobile(null);
          // clearInterval(myInterval);
          clear_timer("MOBILE");
        } else {
          setMinutesBackgroundMob(minutesBackgroundMob - 1);
          setSecondsBackgroundMob(59);
        }
      }
    }, 1000);

    timer_email.current = BackgroundTimer.setInterval(() => {
      if (secondsBackgroundEmail > 0) {
        setSecondsBackgroundEmail(secondsBackgroundEmail - 1);
      }
      if (secondsBackgroundEmail === 0) {
        if (minutesBackgroundEmail === 0) {
          !isVerifiyOtp.isEmail && removeAsyncStorage("Random_Otp_Email");
          //!isVerifiyOtp.isEmail && setOtpEmail(null);
          // clearInterval(myIntervalEmail);
          clear_timer("EMAIL");
        } else {
          setMinutesBackgroundEmail(minutesBackgroundEmail - 1);
          setSecondsBackgroundEmail(59);
        }
      }
    }, 1000);
    return () => {
      clear_timer("MOBILE");
      clear_timer("EMAIL");
    };
  });

  const onVerify = async () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
      return;
    }
    setVerifyDisable(true);

    
    // setTimeout(() => {
    //   setVerifyDisable(false);
    // },4000);
    const randomOtpMobile = await getAsyncStorage("Random_Otp_Mobile");
    const randomOtpEmail = await getAsyncStorage("Random_Otp_Email");
    if (isCheckEmailOrPhone.phone && otpMobile == randomOtpMobile) {
      isVerifiyOtp.isMobile = true;
      setVerifiyOtp({ ...isVerifiyOtp });
    }
    if (isCheckEmailOrPhone.phone && !isVerifiyOtp.isMobile) {
      setErrorMessage(I18n.t(globalText._mobileOTPIsIncorect));
      return;
    }
    if (isCheckEmailOrPhone.email && otpEmail == randomOtpEmail) {
      isVerifiyOtp.isEmail = true;
      setVerifiyOtp({ ...isVerifiyOtp });
    }
    if (isCheckEmailOrPhone.email && !isVerifiyOtp.isEmail) {
      setErrorMessage(I18n.t(globalText._emailOTPIsIncorect));
      return;
    }
    let checkValidation = false;
    if (isCheckEmailOrPhone.phone) {
      if (isVerifiyOtp.isMobile) {
        checkValidation = true;
      } else {
        checkValidation = false;
        return;
      }
    }
    if (isCheckEmailOrPhone.phone) {
      if (isVerifiyOtp.isMobile) {
        checkValidation = true;
      } else {
        checkValidation = false;
        return;
      }
    }
    if (isCheckEmailOrPhone.email) {
      if (isVerifiyOtp.isEmail) {
        checkValidation = true;
      } else {
        checkValidation = false;
        return;
      }
    }

    if (checkValidation) {
      setErrorMessage("");
      setSignUpLoader(true);
      let time_taken_min = await getAsyncStorage("TIME_TO_SIGN_UP");
      let timeZoneValue = await getAsyncStorage("timeZone");
      let timeZone = JSON.parse(timeZoneValue);
      let timeZoneCheck = RNLocalize.getTimeZone();
      let timeTaken = null;
      if (time_taken_min) {
        timeTaken = timeTakeToSignUp(time_taken_min);
      }
      const payload = {
        country_id: isDetail.country_id,
        device_id: isDetail.device_id,
        device_type: isDetail.device_type,
        dob: isDetail.dob ? getFormatedDate(isDetail.dob, "yyyy-mm-dd") : "",
        email: isDetail.email,
        first_name: isDetail.first_name,
        gender: isDetail.gender,
        ip_address: isDetail.ip_address,
        language_id: isDetail.language_id,
        last_name: isDetail.last_name,
        password: isDetail.password,
        phone_number: isDetail.phone_number,
        device_name: isDetail.device_name,
        idfa_gaid: adId,
        source: isDetail.source,
        verification_method:
          isDetail.verification_method == 3 || isDetail.verification_method == 4
            ? 4
            : isDetail.verification_method,
        referer_url: isDetail.referer_url ? isDetail.referer_url : "null",
        vid: isDetail.vid ? isDetail.vid : "0",
        gdpr_status: isDetail.gdpr_status ? isDetail.gdpr_status : 0,
        last_form_submit: isDetail.last_form_submit,
        visiting_ip: isDetail.visiting_ip,
        registration_ip: isDetail.registration_ip,
        login_with: isDetail.login_with,
        source_user_id2: isDetail.source_user_id2
          ? isDetail.source_user_id2
          : 0,
        reference: isDetail.reference ? isDetail.reference : 0,
        time_to_complete_reg_form: timeTaken
          ? Number(timeTaken).toFixed(2)
          : null,
        timeZone: timeZone ? timeZone : timeZoneCheck,
      };
      setVerifyDisable(false);
      const { data, message } = await AuthApi.postDataToServer(
        Api.signupSignUP,
        payload
      );
      if (!data) {
        setSignUpLoader(false);
        setSignUpTime(0);
        setTimeout(() => {
          if (
            message ==
            "Thank you for showing interest in Opinion Bureau! We are not taking registrations at the moment. Kindly check back in a few days."
          ) {
            toastShow(I18n.t(globalText.thankYouComeAgain));
          } else if (typeof message == "object") {
            typeof message.m == "string"
              ? setErrorMessage(
                  I18n.t(globalText.eligibaleErrorDateOfBirthNew, {
                    _age: message.age ? message.age : "",
                  })
                )
              : toastShow(message && message);
          } else {
            toastShow(I18n.t(globalText.somethingWentWrong));
          }
        }, 100);
        setVerifyDisable(false);
        return;
      }

      let isMessage =
        data && data.data && data.data.message ? data.data.message : "";
      let isData = data && data.data;
      await onDemoInvitation(isData);
      setTimeout(() => {
        if (isMessage == "User signup successfully") {
          toastShow(I18n.t(globalText.userSignUpSuccesfully));
        } else {
          toastShow(isMessage);
        }
      }, 100);
      await removeAsyncStorage("TIME_TO_SIGN_UP");
      let demoCount = "0";
      await setAsyncStorage("demoCount", demoCount.toString());
      setSignUpTime(10);
      await proceedToLogin(
        isDetail.email,
        isDetail.password,
        isDetail.device_id,
        isDetail.phone_number,
        isDetail.device_name,
        isDetail.country_code
      );
    } else {
      setVerifyDisable(false);
    }
  };

  const proceedToLogin = async (
    email,
    password,
    device_id,
    phone,
    device_name_value,
    isCountry
  ) => {
    let timeZoneValue = await getAsyncStorage("timeZone");
    let timeZone = JSON.parse(timeZoneValue);
    let device_address = null;
    await DeviceInfo.getIpAddress().then((ip) => {
      device_address = ip;
    });
    const fcmToken = await generateFCMToken();
    const payload = {
      type: "email",
      phone_no_or_email: email.trim().toLowerCase()
        ? email.trim().toLowerCase()
        : phone.trim(), // 'jyoti143rose@hotmail.com'
      password: password, // 'asdfgh@12345'
      fcm_token: fcmToken ? fcmToken : "",
      device_type: Platform.OS,
      device_id: device_id,
      timeZone: timeZone,
      device_name: device_name_value,
      ip_address: device_address,
      country_codee: isCountry ? isCountry : "US",
    };
    const { data, message } = await AuthApi.postDataToServer(
      Api.login,
      payload
    );
    if (!data) {
      setSignUpLoader(false);
      setSignUpTime(0);
      return;
    }
    await setAsyncStorage(
      "Token",
      JSON.stringify(data && data.data && data.data.token)
    );
    await setAsyncStorage(
      "Login_Data",
      JSON.stringify(data && data.data && data.data.data)
    );
    await setAsyncStorage(
      "ProfileImage",
      JSON.stringify(data && data.data && data.data.imagebuffer)
    );
    await setAsyncStorage(
      "currencySymbol",
      data &&
        data.data &&
        data.data.data &&
        data.data.data.currency_symbol.toString()
    );
    let languageValue =
      data && data.data && data.data.data && data.data.data.lang_code
        ? data.data.data.lang_code.toLowerCase()
        : "en";
    await setAsyncStorage("appLanguage", languageValue.toString());
    I18n.locale = languageValue;
    setSignUpLoader(false);
    props.navigation.replace("DrawerNavigation");
  };

  const onDemoInvitation = async (isAllData) => {
    const link = await firebase.dynamicLinks().buildShortLink({
      link: `https://opinionbureau.page.link/?${
        isAllData.panelist_id
      }&${"true"}&${"0"}`,
      android: {
        packageName: "com.opinionbureau",
      },
      ios: {
        bundleId: "com.ios.opinionbureau",
      },
      domainUriPrefix: "https://opinionbureau.page.link",
    });

    const payload = {
      email: isAllData.email ? isAllData.email : "",
      phone_no: isAllData.phone_number ? isAllData.phone_number : "",
      first_name: isAllData.first_name ? isAllData.first_name : "",
      country_id: isAllData.country_id ? isAllData.country_id : 0,
      panelist_id: isAllData.panelist_id ? isAllData.panelist_id : 0,
      link: link,
      user_location: isAllData.user_location ? isAllData.user_location : "",
      culture_id: isDetail.culture_id,
    };
    const { data, message } = await AuthApi.postDataToServer(
      Api.signupSinupDemoSurveyMail,
      payload
    );
    if (!data) {
      setTimeout(() => {
        toastShow(I18n.t(globalText.somethingWentWrong));
      }, 100);
      return;
    }
  };

  return (
    <View style={styles.container}>
      {isSignUpLoader && (
        <CustomLoaderNew signUpProgress={Number(isSignUpTime) / 10} />
      )}
      {loader && <CustomLoader />}
      <CustomBackground
        screen={
          <SafeAreaView>
            <KeyboardAwareScrollView
              extraScrollHeight={20}
              nestedScrollEnabled
              enableOnAndroid={true}
              style={styles.height100}
              enableAutomaticScroll={Platform.OS === "ios"}
              contentContainerStyle={styles.flexGrowOne}
            >
              <View style={styles.height100CenterView}>
                {isErrorMessage != "" ? (
                  <View style={styles.marH15}>
                    <Text style={styles.errorMsgBoxStyle}>
                      {isErrorMessage}
                    </Text>
                  </View>
                ) : null}
                <Text style={styles.otpVericicationTextStyle}>
                  {I18n.t(globalText._otpVerification)}
                </Text>
                {isCheckEmailOrPhone.phone && (
                  <View style={styles.paddB60}>
                    <Text style={styles.otpTextStyleFirst}>
                      {I18n.t(globalText._eneterTheOTPSentToYourMobileNumber)}
                    </Text>
                    {isDetail && Object.keys(isDetail).length > 0 && (
                      <Text style={styles.otpTextStyleSecond}>
                        {isDailcode}
                        {isDetail.phone_number}
                      </Text>
                    )}
                    <View
                      style={[
                        styles.otpVerificationTextInputStyle,
                        isVerifiyOtp.isMobile
                          ? { backgroundColor: "#ccc" }
                          : null,
                      ]}
                    >
                      <TextInput
                        style={styles.otpVerificationTextInputStyleText}
                        placeholder={I18n.t(globalText._enterFourDigitOTP)}
                        keyboardType={"numeric"}
                        maxLength={4}
                        value={otpMobile}
                        onChangeText={(i) => setOtpMobile(i)}
                        onBlur={() =>
                          isCheckEmailOrPhone.phone &&
                          CustomValidation.onBlurField(
                            simpleValidator,
                            allValid,
                            "Mobile OTP"
                          )
                        }
                        returnKeyType={"done"}
                        editable={!isVerifiyOtp.isMobile}
                      />
                    </View>
                    <View style={styles.otpVerificationErrorMsg}>
                      {simpleValidator.current.message(
                        "Mobile OTP",
                        otpMobile,
                        "required"
                      ) && (
                        <Text style={styles.redColorText}>
                          {I18n.t(globalText._theMessageMustBeRequired, {
                            _message:
                              I18n.t(globalText.mobile).toLowerCase() +
                              " " +
                              I18n.t(globalText.otp).toLowerCase(),
                          })}
                        </Text>
                      )}
                      {/* {CustomValidation.fieldErrorMsg(
                                                simpleValidator,
                                                'Mobile OTP',
                                                otpMobile,
                                                'required',
                                            )} */}
                    </View>

                    <View style={styles.otpVerificationLastViewTextStyle}>
                      <Text style={styles.otpVerificationRensendText}>
                        {isVerifiyOtp && isVerifiyOtp.isMobile
                          ? I18n.t(globalText._otpVerified)
                          : I18n.t(globalText._resendOTPIn)}
                      </Text>
                      {isVerifiyOtp && !isVerifiyOtp.isMobile && (
                        <Text style={styles.otpVerificationTimerStyle}>
                          {" "}
                          0{minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                        </Text>
                      )}
                    </View>
                    {minutes == 0 && seconds == 0 && !isVerifiyOtp.isMobile && (
                      <TouchableOpacity onPress={() => onMobileOTP()}>
                        <Text style={styles.otpVerificationTextLast}>
                          {I18n.t(globalText._resendOtpSimple)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                {isCheckEmailOrPhone.email && (
                  <View style={styles.paddB60}>
                    <Text style={styles.otpTextStyleFirst}>
                      {I18n.t(globalText._eneterTheOTPSentToYourEmailID)}
                    </Text>
                    {isDetail && Object.keys(isDetail).length > 0 && (
                      <Text style={styles.otpTextStyleSecond}>
                        {isDetail.email}
                      </Text>
                    )}
                    <View
                      style={[
                        styles.otpVerificationTextInputStyle,
                        isVerifiyOtp && isVerifiyOtp.isEmail
                          ? styles.greybackgroundCCC
                          : null,
                      ]}
                    >
                      <TextInput
                        style={styles.otpVerificationTextInputStyleText}
                        placeholder={I18n.t(globalText._enterFourDigitOTP)}
                        keyboardType={"numeric"}
                        maxLength={4}
                        value={otpEmail}
                        onChangeText={(i) => setOtpEmail(i)}
                        onBlur={() =>
                          isCheckEmailOrPhone.email &&
                          CustomValidation.onBlurField(
                            simpleValidator,
                            allValid,
                            "OTP"
                          )
                        }
                        returnKeyType={"done"}
                        editable={!isVerifiyOtp.isEmail}
                      />
                    </View>
                    <View style={styles.otpVerificationErrorMsg}>
                      {simpleValidator.current.message(
                        "Email OTP",
                        otpEmail,
                        "required"
                      ) && (
                        <Text style={styles.redColorText}>
                          {I18n.t(globalText._theMessageMustBeRequired, {
                            _message:
                              I18n.t(globalText.email).toLowerCase() +
                              " " +
                              I18n.t(globalText.otp).toLowerCase(),
                          })}
                        </Text>
                      )}
                      {/* {CustomValidation.fieldErrorMsg(
                                                simpleValidator,
                                                'Email OTP',
                                                otpEmail,
                                                'required',
                                            )} */}
                    </View>
                    <View style={styles.otpVerificationLastViewTextStyle}>
                      <Text style={styles.otpVerificationRensendText}>
                        {isVerifiyOtp && isVerifiyOtp.isEmail
                          ? I18n.t(globalText._otpVerified)
                          : I18n.t(globalText._resendOTPIn)}
                      </Text>
                      {isVerifiyOtp && !isVerifiyOtp.isEmail && (
                        <Text style={styles.otpVerificationTimerStyle}>
                          {" "}
                          0{minutesEmail} :{" "}
                          {secondsEmail < 10
                            ? `0${secondsEmail}`
                            : secondsEmail}
                        </Text>
                      )}
                    </View>
                    {minutesEmail == 0 &&
                      secondsEmail == 0 &&
                      !isVerifiyOtp.isEmail && (
                        <TouchableOpacity onPress={() => onEmailOTP()}>
                          <Text style={styles.otpVerificationTextLast}>
                            {I18n.t(globalText._resendOtpSimple)}
                          </Text>
                        </TouchableOpacity>
                      )}
                  </View>
                )}
                <CustomButton
                  buttonName={I18n.t(globalText._verify).toUpperCase()}
                  addButtonStyle={styles.otpVericicationVerifyStyle}
                  addButtonTextStyle={styles.font18}
                  onPress={() => onVerify()}
                  disabled={isDisableVerify}
                />
              </View>
            </KeyboardAwareScrollView>
          </SafeAreaView>
        }
      />
    </View>
  );
};

export default OtpVerification;
