import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import DeviceInfo from 'react-native-device-info';
import FastImage from '../../component/FastImage';
import * as RNLocalize from 'react-native-localize';
import Feather from 'react-native-vector-icons/Feather';
import SimpleReactValidator from 'simple-react-validator';
import AuthButton from '../../component/authButton/index';
import CustomLoader from '../../component/customLoader/index';
import globalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
import I18n from '../../i18n/index';
import Api from '../../utils/api';
import authApi from '../../utils/authApi';
import {
  generateFCMToken,
  generateOtp,
  getAsyncStorage,
  removeAsyncStorage,
  setAsyncStorage,
  toastShow,
} from '../../utils/customFunctions';
import {Singular, sngLog} from 'singular-react-native';

const OTP = props => {
  const {onPress, isCountry} = props;

  const simpleValidator = useRef(new SimpleReactValidator());
  const [otpTimerMin, setOtpTimerMin] = useState('01');
  const [otpTimerSec, setOtpTimerSec] = useState('59');
  const [sendOtp, setSendOtp] = useState(false);
  const [allValid, setAllValid] = useState(true);
  const [loginId, setLoginId] = useState('');
  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);
  const {initialMinute = 0, initialSeconds = 0} = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const {initialBackgroundMinute = 0, initialBackgroundSeconds = 0} = props;
  const [minutesBackground, setMinutesBackground] = useState(
    initialBackgroundMinute,
  );
  const [secondsBackground, setSecondsBackground] = useState(
    initialBackgroundSeconds,
  );
  const [isDetails, setDetails] = useState({});
  const [isPreviousValue, setPreviousValue] = useState('');
  const [isFcmToken, setFcmToken] = useState('');
  const [isErrorMessage, setErrorMessage] = useState('');

  const id = useRef(null);
  const timer = useRef(null);

  const clear = () => {
    BackgroundTimer.clearInterval(id.current);
  };

  const clear_timer = () => {
    BackgroundTimer.clearInterval(timer.current);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserDetails();
    }, []),
  );

  const getUserDetails = async () => {
    const data = await JSON.parse(await getAsyncStorage('langauge_data'));
    if (data) {
      setDetails(data && data);
    }
  };

  useEffect(() => {
    id.current = BackgroundTimer.setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          // removeAsyncStorage('Random_Otp');
          // clearInterval(myInterval);
          clear();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clear();
    };
  });

  useEffect(() => {
    timer.current = BackgroundTimer.setInterval(() => {
      if (secondsBackground > 0) {
        setSecondsBackground(secondsBackground - 1);
      }
      if (secondsBackground === 0) {
        if (minutesBackground === 0) {
          removeAsyncStorage('Random_Otp');
          // removeData()
          clear_timer();
        } else {
          setMinutesBackground(minutesBackground - 1);
          setSecondsBackground(59);
        }
      }
    }, 1000);

    return () => {
      clear_timer();
    };
  });

  const onPressSendOtp = async isData => {
    setOtp('');
    setErrorMessage('');
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
      return;
    }
    await removeAsyncStorage('Random_Otp');
    const otp = await generateOtp();
    await setAsyncStorage('Random_Otp', otp.toString());
    const randomOtp = await getAsyncStorage('Random_Otp');
    setSendOtp(true);
    setMinutes(1);
    setMinutesBackground(2);
    const payloadForMobile = {
      phone_no: loginId,
      verificationCode: randomOtp,
      country_code: isDetails.country_code,
      first_name: I18n.t(globalText.user),
      culture_id: isData.culture_id,
    };
    const payloadForEmail = {
      email: loginId,
      verificationCode: randomOtp,
      country_code: isDetails.country_code,
      first_name: I18n.t(globalText.user),
      culture_id: isData.culture_id,
    };
    setLoader(true);
    const payload = isData.id == 1 ? payloadForMobile : payloadForEmail;
    const {data, message} = await authApi.postDataToServer(
      Api.sendSmsOrEmailOtp,
      payload,
    );
    setPreviousValue(loginId);

    Singular.event('login_via_otp');
    if (!data) {
      setLoader(false);
      toastShow(I18n.t(globalText.somethingWentWrong));
      return;
    }
    setLoader(false);
    toastShow(I18n.t(globalText.otpSendSuccessfully));
  };

  const onVerifyNumber = async () => {
    setLoader(true);
    setErrorMessage('');
    if (timer.current) {
      await clear_timer();
    }
    let endPoint = `${
      Api.verifyWhetherEmailOrMobile
    }?username=${loginId.toLowerCase()}`;
    const {data, message, success} = await authApi.getDataFromServer(endPoint);
    if (!data) {
      setLoader(false);
      setErrorMessage(
        I18n.t(
          globalText.pleaseEnterEmailIdOrPhoneNumberWhichIsRegisteredWithOpinionBureau,
        ),
      );
      //setErrorMessage(I18n.t(globalText._pleaseEnterValidEmailAddressOrPhoneNumber));
      return;
    }
    const isData = (await data) && data.data;
    onPressSendOtp(isData);
  };

  const onPressLogin = async () => {
    let timeZoneValue = await getAsyncStorage('timeZone');
    let timeZone = JSON.parse(timeZoneValue);
    let timeZoneCheck = RNLocalize.getTimeZone();
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
      return;
    }
    const randomOtp = await getAsyncStorage('Random_Otp');
    if (otp.toString().length == 0) {
      setErrorMessage(I18n.t(globalText._pleaseEnterOtp));
      return;
    }
    if (isPreviousValue == loginId) {
      if (Number(randomOtp) == Number(otp)) {
        let device_name_value = '';
        let device_address = null;
        let ip_address = null;
        // const deviceId = DeviceInfo.getDeviceId();
        const deviceId = await DeviceInfo.getUniqueId();
        await DeviceInfo.getDeviceName().then(async deviceName => {
          device_name_value = await deviceName;
        });
        // await DeviceInfo.getIpAddress().then(ip => {
        //     device_address = ip;
        // });
        ip_address = await AsyncStorage.getItem('ISPAddress');
        const fcmToken = await generateFCMToken();
        const payload = {
          type: 'OTP',
          phone_no_or_email: isPreviousValue.trim().toLowerCase(),
          fcm_token: fcmToken ? fcmToken : '',
          device_type: Platform.OS,
          device_id: deviceId,
          timeZone: timeZone ? timeZone : timeZoneCheck,
          device_name: device_name_value,
          ip_address: ip_address,
          country_codee: isCountry ? isCountry : 'US',
        };

        setLoader(true);
        const {data, message, success} = await authApi.postDataToServer(
          Api.login,
          payload,
        );
        setLoader(false);
        if (!data) {
          toastShow(I18n.t(globalText.somethingWentWrong));
          return;
        }
        await setAsyncStorage(
          'Token',
          JSON.stringify(data && data.data && data.data.token),
        );
        await setAsyncStorage(
          'Login_Data',
          JSON.stringify(
            data && data.data && data.data.data && data.data.data.length > 0,
          ),
        );
        toastShow(I18n.t(globalText.loginSuccessfully));
        setLoader(false);
        await setAsyncStorage(
          'Token',
          JSON.stringify(data && data.data && data.data.token),
        );
        await setAsyncStorage(
          'ProfileImage',
          JSON.stringify(data && data.data && data.data.imagebuffer),
        );
        await setAsyncStorage(
          'Login_Data',
          JSON.stringify(data && data.data && data.data.data),
        );
        await setAsyncStorage(
          'currencySymbol',
          data &&
            data.data &&
            data.data.data &&
            data.data.data.currency_symbol.toString(),
        );
        await removeAsyncStorage('Random_Otp');

        let languageValue =
          (await data) &&
          data.data &&
          data.data.data &&
          data.data.data.lang_code
            ? data.data.data.lang_code.toLowerCase()
            : 'en';
        await setAsyncStorage('appLanguage', languageValue.toString());
        I18n.locale = languageValue;
        setErrorMessage('');
        await onPress();
      }
      if (randomOtp != Number(otp)) {
        setErrorMessage(I18n.t(globalText.incorrectOtp));
        return;
      }
    } else {
      setSendOtp(false);
      setMinutes(0);
      setSeconds(0);
      setMinutesBackground(0);
      setSecondsBackground(0);
      setOtp('');
      setErrorMessage(I18n.t(globalText.pleaseSendTheOtpForUser));
      return;
    }
  };

  return (
    <>
      {loader && <CustomLoader />}
      {isErrorMessage !== '' ? (
        <Text style={styles.errorMsgBoxStyle}>{isErrorMessage}</Text>
      ) : null}
      <View style={styles.flexRow}>
        <View style={styles.loginPhoneInputIconView}>
          <Feather name="edit" size={25} />
        </View>

        <View style={styles.loginPhoneInputView}>
          <TextInput
            placeholder={I18n.t(globalText._emailAddressPhoneNo)}
            onChangeText={i => setLoginId(i)}
            value={loginId}
            onBlur={() =>
              !allValid && simpleValidator.current.showMessageFor('phone')
            }
          />
        </View>
      </View>
      <View style={styles.marL30}>
        {simpleValidator.current.message('phone', loginId, 'required') && (
          <Text style={styles.redColorText}>
            {I18n.t(globalText._theMessageMustBeRequired, {
              _message: I18n.t(globalText.phone_email),
            })}
          </Text>
        )}
      </View>

      <View style={[styles.flexRow, styles.marT50]}>
        <View style={styles.loginPhoneInputIconView}>
          {/* <Octicons name={'unlock'} size={25} /> */}
          <FastImage
            source={globalImages.passwordIcon}
            style={styles.loginFieldIcon}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.loginPhoneInputView}>
          <TextInput
            placeholder={I18n.t(globalText.enterOtp)}
            keyboardType={'numeric'}
            onChangeText={i => setOtp(i)}
            value={otp}
            maxLength={4}
            // onBlur={() => CustomValidation.onBlurField(simpleValidator, allValid, 'OTP')}
          />
        </View>
      </View>
      {/* {CustomValidation.fieldErrorMsg(simpleValidator, 'OTP', otp, 'required')} */}
      {minutes === 0 && seconds === 0 && (
        <TouchableOpacity
          onPress={() => {
            onVerifyNumber();
          }}
          style={styles.alignSelfEnd}
          disabled={seconds != 0}>
          <Text style={styles.loginForgetPasswordText}>
            {sendOtp
              ? I18n.t(globalText.resendOtp)
              : I18n.t(globalText.sendOtp)}
          </Text>
        </TouchableOpacity>
      )}
      {minutes === 0 && seconds === 0 ? null : (
        <View style={styles.otpTimerView}>
          <Text style={styles.otpTimer}>
            {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        </View>
      )}
      <View style={styles.loginButtonView}>
        <AuthButton
          buttonName={I18n.t(globalText.login)}
          // leftIcon={<Octicons name={'unlock'} size={20} color={colors.WHITE} />}
          leftIcon={
            // <Octicons name={'unlock'} size={20} color={colors.WHITE} />
            <FastImage
              source={globalImages.passwordWhiteIcon}
              style={styles.loginButtonLockIcon}
              resizeMode={'contain'}
            />
          }
          rightIcon
          onPress={async () => {
            onPressLogin();
          }}
        />
      </View>
    </>
  );
};

export default OTP;
