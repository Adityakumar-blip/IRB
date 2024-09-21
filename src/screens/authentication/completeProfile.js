import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import FastImage from '../../component/FastImage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleReactValidator from 'simple-react-validator';
import AuthButton from '../../component/authButton';
import CustomBackground from '../../component/customBackground';
import CustomLoader from '../../component/customLoader/index';
import globalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
import sampleData from '../../helper/sampleData';
import I18n from '../../i18n/index';
import colors from '../../styles/colors';
import CustomValidation from '../../utils/CustomValidation';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import {
  checkPasswordVallidation,
  getAsyncStorage,
  getFormatedDate,
  toastShow,
} from '../../utils/customFunctions';

const CompleteProfile = props => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const [allValid, setAllValid] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [agreement, setAgreement] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);
  const [count, setCount] = useState(0);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isDailcode, setDailcode] = useState('');
  const [isData, setData] = useState({
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
    email: '',
    phone_number: '',
    password: '',
    device_id: null,
    device_type: null,
    device_name: '',
    ip_address: null,
    country_id: null,
    lang_id: null,
    country_code: '',
    source: 1, //1 if direct from play store, 2 for vendor and 3 for referral
    verification_method: 3, //1-  google, 2 - facebook, 3 - email, 4 – phone no
    referer_url: null,
    vid: null,
    gdpr_status: 0,
    last_form_submit: 1,
    reference: null,
    visiting_ip: null,
    registration_ip: null,
    login_with: 1,
    source_user_id2: null,
  });
  const [isErrorMessage, setErrorMessage] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      onPageInit();
    }, []),
  );
  const {height, width} = Dimensions.get('window');

  useEffect(() => {
    if (count != 0) {
      let value = checkPasswordVallidation(isData.password);
      value ? setPasswordError(false) : setPasswordError(true);
    }
  }, [isData.password]);

  const onPageInit = async () => {
    const dt = await JSON.parse(await AsyncStorage.getItem('INVITE_URL'));
    if (dt && dt.profileSurvey != 'true') {
      if (dt.reference_Id != '0') {
        isData.source = 3;
        isData.referer_url = dt.reference_Link;
        isData.reference = dt.reference_Id;
      } else {
        isData.source = 2;
        isData.referer_url = dt.reference_Link;
        isData.vid = dt.vendor_Id;
      }
      setData({...isData});
    }
    const addresss = await AsyncStorage.getItem('ISPAddress');
    isData.ip_address = addresss ? addresss.toString() : '';
    setData({...isData});
    setAgreement(false);
    const getGdprStatus = await getAsyncStorage('GDPR_Status');
    isData.gdpr_status = getGdprStatus ? getGdprStatus : 0;
    const data =
      (await props.route) && props.route.params && props.route.params.data;
    isData.first_name = data.first_name;
    isData.last_name = data.last_name;
    isData.dob = data.date_of_birth.toString();
    isData.gender = data.gender;
    isData.email = data.email_id;
    isData.phone_no = data.phone_no;
    isData.verification_method = data.verification_method;
    isData.password = '';
    setData({...isData});
    // const deviceId = DeviceInfo.getDeviceId();
    const deviceId = DeviceInfo.getUniqueId();
    const deviceType = Platform.OS || DeviceInfo.getDeviceType();
    isData.device_id = deviceId;
    isData.device_type = deviceType;
    setData({...isData});
    DeviceInfo.getDeviceName().then(async deviceName => {
      isData.device_name = await deviceName;
      setData({...isData});
    });
    const language_data = await JSON.parse(
      await getAsyncStorage('langauge_data'),
    );
    isData.country_id = language_data.country_id
      ? language_data.country_id
      : 236;
    isData.country_code = language_data.country_code
      ? language_data.country_code
      : 'US';
    isData.lang_id = language_data.lang_id ? language_data.lang_id : 1;
    isData.culture_id = language_data.culture_id ? language_data.culture_id : 1;
    setData({...isData});
  };

  const onSignUp = async () => {
    setErrorMessage('');
    if (isData.email.trim().length == 0 && isData.verification_method == '3') {
      setErrorMessage(I18n.t(globalText.emailAddReq));
      return;
    }
    if (
      isData.phone_no.trim().length == 0 &&
      isData.verification_method == '4'
    ) {
      setErrorMessage(I18n.t(globalText.phNAddReq));
      return;
    }
    if (
      isData.email.trim().length == 0 &&
      isData.phone_no.trim().length == 0 &&
      (isData.verification_method == '1' || isData.verification_method == '2')
    ) {
      setErrorMessage(I18n.t(globalText.pleaseEnterAtLeastEmailOrMobileOrBoth));
      return;
    }
    setDataLoaded(true);
    setCount(count + 1);
    const formValid = await simpleValidator.current.allValid();
    let value = checkPasswordVallidation(isData.password);
    value ? setPasswordError(false) : setPasswordError(true);
    if (!formValid) {
      setAllValid(false);
      await simpleValidator.current.showMessages();
      return;
    }
    if (!value) {
      return;
    }
    if (!agreement) {
      return;
    }
    setLoader(true);
    const payload = {
      email: isData.email.toLowerCase() ? isData.email.toLowerCase() : '',
      phone_number: isData.phone_no ? isData.phone_no : '',
      country_id: isData.country_id,
    };
    const {data, message, success} = await AuthApi.postDataToServer(
      Api.signupSinupEmailVerificationApi,
      payload,
    );
    setLoader(false);
    if (!data) {
      message == '"email" must be a valid email'
        ? setErrorMessage(I18n.t(globalText.enterAValidAndActiveEmailAddress))
        : message == '"phone_number" length must be at least 10 characters long'
        ? setErrorMessage(I18n.t(globalText.enterAvalidAndActivePhoneNumber))
        : message == 'Enter valid phone number'
        ? setErrorMessage(I18n.t(globalText.enterAvalidAndActivePhoneNumber))
        : toastShow(message && message);
      return;
    }
    let resData = data && data.data;
    if (resData.email != 'success' && isData.email.length != 0) {
      resData.email == '"email" must be a valid email'
        ? setErrorMessage(I18n.t(globalText.enterAValidAndActiveEmailAddress))
        : resData.email == 'Email is not valid'
        ? setErrorMessage(I18n.t(globalText.enterAValidAndActiveEmailAddress))
        : resData.email == 'Email is already exist'
        ? setErrorMessage(I18n.t(globalText.emailIsAlreadyExist))
        : null;
      return;
    }
    if (resData.phone_number != 'success' && isData.phone_no.length != 0) {
      resData.phone_number == 'Phone number is already exist'
        ? setErrorMessage(I18n.t(globalText.phoneNumberIsAlreadyExist))
        : resData.phone_number ==
          '"phone_number" length must be at least 10 characters long'
        ? setErrorMessage(I18n.t(globalText.enterAvalidAndActivePhoneNumber))
        : null;
      return;
    }
    setErrorMessage('');
    const payloadData = {
      email: isData.email.toLowerCase(),
      phone_number: isData.phone_no,
      password: isData.password,
      first_name: isData.first_name,
      last_name: isData.last_name,
      dob: getFormatedDate(new Date(isData.dob).toString(), 'yyyy-mm-dd'),
      gender:
        isData.gender == I18n.t(globalText.male)
          ? 'M'
          : isData.gender == I18n.t(globalText.female)
          ? 'F'
          : 'O',
      country_code: isData.country_code,
      country_id: isData.country_id,
      device_id: isData.device_id,
      device_type: isData.device_type,
      device_name: isData.device_name,
      language_id: Number(isData.lang_id),
      ip_address: isData.ip_address ? isData.ip_address : '50.248.21.108',
      source: isData.source,
      verification_method: isData.verification_method,
      referer_url: isData.referer_url,
      vid: isData.vid,
      gdpr_status: isData.gdpr_status,
      last_form_submit: isData.last_form_submit,
      reference: isData.reference,
      visiting_ip: isData.ip_address ? isData.ip_address : '50.248.21.108',
      registration_ip: isData.ip_address ? isData.ip_address : '50.248.21.108',
      login_with: isData.login_with,
      source_user_id2: isData.source_user_id2,
      culture_id: isData.culture_id,
    };
    let isCheckEmailOrPhone = {
      email: isData.email.toLowerCase().length > 0,
      phone: isData.phone_no.toString().length > 0,
    };
    props.navigation.navigate('OtpVerification', {
      data: payloadData,
      checkEmailOrPhone: {...isCheckEmailOrPhone},
    });
  };

  useEffect(() => {
    const data = sampleData.dail_code_number;
    if (isData.country_code) {
      let value_code = '';
      data.map((item, index) => {
        if (item.code.toLowerCase() == isData.country_code.toLowerCase()) {
          value_code = item.dial_code;
        }
      });
      setDailcode(value_code);
    }
  }, [isData.country_code]);

  return (
    <CustomBackground
      screen={
        <SafeAreaView>
          <FastImage
            source={globalImages.logoIcon}
            style={[styles.authenticationLogoStyle, {position: 'relative'}]}
            resizeMode={'contain'}
          />
          {loader && <CustomLoader />}
          <KeyboardAwareScrollView
            extraScrollHeight={20}
            nestedScrollEnabled
            enableOnAndroid={true}
            style={styles.height100}
            enableAutomaticScroll={Platform.OS === 'ios'}
            contentContainerStyle={styles.flexGrowOne}>
            <View
              style={[styles.loginMainScreen, {height: height}, styles.marM80]}>
              {isErrorMessage != '' ? (
                <Text style={styles.errorMsgBoxStyle}>{isErrorMessage}</Text>
              ) : null}

              <View style={styles.row}>
                <View style={styles.loginPhoneInputIconView}>
                  {/* <MaterialCommunityIcons name="email-outline" size={25} /> */}
                  <FastImage
                    source={globalImages.mailIcon}
                    style={styles.height25width25}
                    resizeMode={'contain'}
                  />
                </View>
                <View style={styles.loginPhoneInputView}>
                  <TextInput
                    onChangeText={text => {
                      isData.email = text.trim();
                      setData({...isData});
                    }}
                    placeholder={I18n.t(globalText.emailAddress)}
                    value={isData.email}
                    // autoFocus={true}
                    keyboardType={'email-address'}
                    //onBlur={!allValid && simpleValidator.current.showMessageFor('email')}
                    // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                  />
                </View>
              </View>
              {/* <View style={styles.row}>
                                <View style={[styles.width10, styles.marL15]} />

                                {simpleValidator.current.message('email', isData.email, 'required|email') && (
                                    <Text style={styles.redColorText}>
                                        {isData.email && isData.email.length > 0
                                            ? I18n.t(globalText._theValueMustBeValid, {
                                                  _firstValue: I18n.t(globalText.email),
                                                  _lastValue: I18n.t(globalText._emailAdree),
                                              })
                                            : I18n.t(globalText._theMessageMustBeRequired, {
                                                  _message: I18n.t(globalText.email).toLowerCase(),
                                              })}
                                    </Text>
                                )}
                            </View> */}

              <View style={styles.rowTop25}>
                <View style={styles.loginPasswordIconView}>
                  <FastImage
                    source={globalImages.callIcon}
                    style={styles.height25width25}
                    resizeMode={'contain'}
                  />
                </View>
                <View style={styles.loginPasswordInputView}>
                  <View style={styles.width13JusCenter}>
                    <TextInput
                      defaultValue={isDailcode}
                      style={{color: colors.DOVE_GRAY}}
                      maxLength={3}
                      keyboardType={'numeric'}
                      editable={false}
                    />
                  </View>
                  <View style={styles.cplProView} />
                  <View
                    style={[
                      styles.loginPasswordInputView_1,
                      styles.width90PaddL5,
                    ]}>
                    <TextInput
                      placeholder={I18n.t(globalText.phoneNumber)}
                      keyboardType={'numeric'}
                      onChangeText={text => {
                        isData.phone_no = text;
                        setData({...isData});
                      }}
                      returnKeyType={'done'}
                      // autoFocus={true}
                      defaultValue={
                        isData && isData.phone_no && isData.phone_no
                      }
                      //onBlur={!allValid && simpleValidator.current.showMessageFor('phone number')}
                    />
                  </View>
                </View>
              </View>
              {/* <View style={styles.row}>
                                <View style={[styles.width10, styles.marL15]} />
                                {simpleValidator.current.message('phone number', isData.phone_no, 'required|phone') && (
                                    <Text style={styles.redColorText}>
                                        {isData.phone_no && isData.phone_no.length > 0
                                            ? I18n.t(globalText._theValueMustBeValid, {
                                                  _firstValue: I18n.t(globalText.phoneNumberNew),
                                                  _lastValue: I18n.t(globalText.phoneNumberNew),
                                              })
                                            : I18n.t(globalText._theMessageMustBeRequired, {
                                                  _message: I18n.t(globalText.phoneNumberNew).toLowerCase(),
                                              })}
                                    </Text>
                                )}
                            </View> */}

              <View style={styles.rowTop25}>
                <View style={styles.loginPasswordIconView}>
                  <FastImage
                    source={globalImages.passwordIcon}
                    style={styles.height25width25}
                    resizeMode={'contain'}
                  />
                </View>
                <View style={styles.loginPasswordInputView}>
                  <View style={styles.loginPasswordInputView_1}>
                    <TextInput
                      placeholder={I18n.t(globalText.password)}
                      secureTextEntry={passwordVisible ? true : false}
                      defaultValue={isData.password}
                      onChangeText={text => {
                        isData.password = text;
                        setData({...isData});
                      }}
                      onBlur={() =>
                        CustomValidation.onBlurField(
                          simpleValidator,
                          allValid,
                          'password',
                        )
                      }
                    />
                  </View>
                  <View style={styles.loginPasswordEyeIconView}>
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!passwordVisible)}>
                      {passwordVisible ? (
                        <FastImage
                          source={globalImages.passwordVisibleIcon}
                          style={styles.height25width25}
                          resizeMode={'contain'}
                        />
                      ) : (
                        <Ionicons name={'eye-sharp'} size={25} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.row}>
                <View style={[styles.width10, styles.marL15]} />

                {isDataLoaded && isPasswordError && (
                  <Text
                    style={[
                      styles.width90,
                      styles.redColorText,
                      styles.paddR15,
                    ]}>
                    {isData.password.length == 0
                      ? I18n.t(globalText._thePasswordMustBeRequired)
                      : I18n.t(globalText._passwordValidationMessage)}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={styles.rowTop25}
                onPress={() => setAgreement(!agreement)}>
                <TouchableOpacity
                  style={[
                    styles.completeProfileAgreementView,
                    Platform.OS == 'android' && {marginLeft: -2},
                  ]}
                  onPress={() => setAgreement(!agreement)}>
                  {agreement ? (
                    <MaterialIcons name="check-box" size={25} />
                  ) : (
                    <MaterialCommunityIcons name="square-outline" size={25} />
                  )}
                </TouchableOpacity>
                <View style={styles.width90per}>
                  <Text style={styles.completeProfileAgreement}>
                    {I18n.t(globalText.termsCondition)}
                  </Text>
                </View>
              </TouchableOpacity>
              {isDataLoaded && !agreement && (
                <View style={[styles.width90per, styles.alignSelfEnd]}>
                  <Text style={styles.redTxt}>
                    {I18n.t(globalText._pleaseSelectTheCheckbox)}
                  </Text>
                </View>
              )}
              <View style={styles.loginButtonView}>
                <AuthButton
                  buttonName={I18n.t(globalText.signUp)}
                  leftIcon={
                    <Ionicons
                      name={'person-outline'}
                      size={20}
                      color={colors.WHITE}
                    />
                  }
                  rightIcon
                  onPress={() => onSignUp()}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      }
    />
  );
};

export default CompleteProfile;
