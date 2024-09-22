import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import FastImage from '../../component/FastImage';
import * as RNLocalize from 'react-native-localize';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  getAsyncStorage,
  setAsyncStorage,
  toastShow,
} from '../../utils/customFunctions';
import {Singular, sngLog} from 'singular-react-native';
import {Adjust} from 'react-native-adjust';
import {useTranslation} from 'react-i18next';

const Login = props => {
  const {i18n} = useTranslation();
  const {onPress, onPressForgotPassword, isCountry} = props;
  const simpleValidator = useRef(new SimpleReactValidator());
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [allValid, setAllValid] = useState(true);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [isFcmToken, setFcmToken] = useState('');
  const [isErrorMessage, setErrorMessage] = useState('');
  const [adId, setAdId] = useState('');

  useEffect(() => {
    if (Platform.OS == 'android') {
      Adjust.getGoogleAdId(googleAdId => {
        setAdId(googleAdId);
      });
    } else {
      Adjust.getIdfa(idfa => {
        setAdId(idfa);
      });
    }
  }, []);
  const onPressLogin = async () => {
    const fcmToken = await generateFCMToken();
    let timeZoneValue = await getAsyncStorage('timeZone');
    let timeZone = JSON.parse(timeZoneValue);
    let timeZoneCheck = RNLocalize.getTimeZone();
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
      return;
    }
    setLoader(true);
    let device_name_value = '';
    let device_address = null;
    let ip_address = null;
    // const deviceId = await DeviceInfo.getDeviceId();
    const deviceId = await DeviceInfo.getUniqueId();
    await DeviceInfo.getDeviceName().then(async deviceName => {
      device_name_value = await deviceName;
    });
    // await DeviceInfo.getIpAddress().then(ip => {
    //     device_address = ip;
    // });
    ip_address = await AsyncStorage.getItem('ISPAddress');
    const payload = {
      type: 'email',
      phone_no_or_email: loginId.trim().toLowerCase(),
      password: password.trim(),
      fcm_token: fcmToken ? fcmToken : '',
      device_type: Platform.OS,
      device_id: deviceId,
      timeZone: timeZone ? timeZone : timeZoneCheck,
      device_name: device_name_value,
      ip_address: ip_address,
      country_codee: isCountry ? isCountry : 'US',
      idfa_gaid: adId,
    };
    const {data, message} = await authApi.postDataToServer(Api.login, payload);

    console.log('login data', data?.data);

    if (!data) {
      setLoader(false);
      message == 'UserDoesNotExist'
        ? setErrorMessage(
            I18n.t(
              globalText.pleaseEnterEmailIdOrPhoneNumberWhichIsRegisteredWithOpinionBureau,
            ),
          )
        : message == 'pleaseEnterRegisteredEmail'
        ? setErrorMessage(
            I18n.t(
              globalText.pleaseEnterEmailIdOrPhoneNumberWhichIsRegisteredWithOpinionBureau,
            ),
          )
        : message == 'pleaseEnterValidEmailOrPhoneNo'
        ? setErrorMessage(
            I18n.t(globalText._pleaseEnterValidEmailAddressOrPhoneNumber),
          )
        : message == 'PasswordNotMatch'
        ? setErrorMessage(I18n.t(globalText.thePasswordYouEnteredIsIncorrect))
        : toastShow(message && message);
      return;
    }
    setTimeout(() => {
      toastShow(I18n.t(globalText.loginSuccessfully));
    }, 10);
    setLoader(false);
    await setAsyncStorage(
      'Token',
      JSON.stringify(data && data.data && data.data.token),
    );
    await setAsyncStorage(
      'Login_Data',
      JSON.stringify(data && data.data && data.data.data),
    );
    await setAsyncStorage(
      'ProfileImage',
      JSON.stringify(data && data.data && data.data.imagebuffer),
    );
    await setAsyncStorage(
      'currencySymbol',
      data &&
        data.data &&
        data.data.data &&
        data.data.data.currency_symbol.toString(),
    );
    let languageValue =
      (await data) && data.data && data.data.data && data.data.data.lang_code
        ? data.data.data.lang_code.toLowerCase()
        : 'en';
    await setAsyncStorage('appLanguage', languageValue.toString());
    i18n.changeLanguage(languageValue);

    Singular.event('login_submit_click');
    await onPress();
  };

  return (
    <>
      {loader && <CustomLoader />}
      {isErrorMessage != '' ? (
        <Text style={styles.errorMsgBoxStyle}>{isErrorMessage}</Text>
      ) : null}
      <View style={styles.flexRow}>
        <View style={styles.loginPhoneInputIconView}>
          <Feather
            name="edit"
            size={25}
            style={styles.loginFieldIcon}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.loginPhoneInputView}>
          <TextInput
            testID={'email'}
            //placeholder={I18n.t(globalText.phone_email)}
            placeholder={I18n.t(globalText._emailAddressPhoneNo)}
            onChangeText={i => setLoginId(i)}
            onBlur={
              !allValid ? simpleValidator.current.showMessageFor('email') : null
            }
            style={styles.inputStyle}
            placeholderTextColor="#222"

            // onBlur={() =>
            //     CustomValidation.onBlurField(simpleValidator, allValid, I18n.t(globalText.phone_email))
            // }
          />
        </View>
      </View>
      <View style={styles.marL30}>
        {simpleValidator.current.message('email', loginId, 'required') && (
          <Text style={styles.redColorText}>
            {I18n.t(globalText._theMessageMustBeRequired, {
              _message: I18n.t(globalText.phone_email),
            })}
          </Text>
        )}
      </View>
      <View style={[styles.flexRow, styles.marT50]}>
        <View style={styles.loginPasswordIconView}>
          <FastImage
            source={globalImages.passwordIcon}
            style={styles.loginFieldIcon}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.loginPasswordInputView}>
          <View style={styles.loginPasswordInputView_1}>
            <TextInput
              placeholder={I18n.t(globalText.password)}
              secureTextEntry={passwordVisible ? false : true}
              onChangeText={i => setPassword(i)}
              onBlur={
                !allValid
                  ? simpleValidator.current.showMessageFor('password')
                  : null
              }
              style={styles.inputStyle}
              placeholderTextColor="#222"
              // onBlur={() =>
              //     CustomValidation.onBlurField(simpleValidator, allValid, I18n.t(globalText.password))
              // }
            />
          </View>
          <View style={styles.loginPasswordEyeIconView}>
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? (
                <Ionicons name={'eye-sharp'} size={25} />
              ) : (
                <FastImage
                  source={globalImages.passwordVisibleIcon}
                  style={styles.loginFieldIcon}
                  resizeMode={'contain'}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.marL30}>
        {simpleValidator.current.message('password', password, 'required') && (
          <Text style={styles.redColorText}>
            {I18n.t(globalText._theMessageMustBeRequired, {
              _message: I18n.t(globalText.password).toLowerCase(),
            })}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={onPressForgotPassword}
        style={styles.alignSelfEnd}>
        <Text style={styles.loginForgetPasswordText}>
          {I18n.t(globalText.forgetPassword)}
        </Text>
      </TouchableOpacity>
      <View style={styles.loginButtonView}>
        <AuthButton
          buttonName={I18n.t(globalText.login)}
          leftIcon={
            <FastImage
              source={globalImages.passwordWhiteIcon}
              style={styles.loginButtonLockIcon}
              resizeMode={'contain'}
            />
          }
          rightIcon
          onPress={() => onPressLogin()}
        />
      </View>
    </>
  );
};

export default Login;
