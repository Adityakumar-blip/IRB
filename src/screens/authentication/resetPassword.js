import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from '../../component/FastImage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {toastShow} from '../../utils/customFunctions';
import AuthButton from '../../component/authButton';
import CustomBackground from '../../component/customBackground';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import CustomLoader from '../../component/customLoader/index';
import globalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
import I18n from '../../i18n/index';
import {useFocusEffect} from '@react-navigation/native';
import {checkPasswordVallidation} from '../../utils/customFunctions';

const ResetPassword = props => {
  const [newPasswordVisible, setNewPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [isNewPasswordError, setNewPasswordError] = useState(false);
  const [isConfirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isNewPasswordValue, setNewPasswordValue] = useState('');
  const [isConfirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [loader, setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [isUserData, setUserData] = useState(null);
  const [isErrorMessage, setErrorMessage] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      onPageInit();
    }, []),
  );

  const onPageInit = async () => {
    let value =
      (await props.route) && props.route.params && props.route.params.userValue;
    setUserData(value && value);
  };

  useEffect(() => {
    if (count != 0) {
      let valueNewPassword = checkPasswordVallidation(isNewPasswordValue);
      valueNewPassword ? setNewPasswordError(false) : setNewPasswordError(true);
      let valueConfirmPassword = checkPasswordVallidation(
        isConfirmPasswordValue,
      );
      valueConfirmPassword
        ? setConfirmPasswordError(false)
        : setConfirmPasswordError(true);
    }
  }, [isNewPasswordValue, isConfirmPasswordValue]);

  const onResetPassword = async () => {
    setErrorMessage('');
    setCount(count + 1);
    let valueNewPassword = await checkPasswordVallidation(isNewPasswordValue);

    valueNewPassword ? setNewPasswordError(false) : setNewPasswordError(true);
    let valueConfirmPassword = await checkPasswordVallidation(
      isConfirmPasswordValue,
    );
    valueConfirmPassword
      ? setConfirmPasswordError(false)
      : setConfirmPasswordError(true);
    if (!valueNewPassword && !valueConfirmPassword) {
      return;
    }
    if (isNewPasswordValue != isConfirmPasswordValue) {
      setErrorMessage(I18n.t(globalText._pleaseConfirmPassword));
      return;
    }
    setErrorMessage('');
    setLoader(true);
    const payload = {
      username: isUserData.userValue.toLowerCase(),
      newpassword: isNewPasswordValue,
      confirm_newpassword: isConfirmPasswordValue,
    };
    const {data, message, success} = await AuthApi.postDataToServer(
      Api.resetPassword,
      payload,
    );
    setLoader(false);
    if (!data) {
      toastShow(message && message);
      return;
    }
    setTimeout(() => {
      toastShow(I18n.t(globalText.passwordhasChangeSucessfuly));
    }, 200);
    props.navigation.replace('Auth');
  };

  return (
    <CustomBackground
      screen={
        <SafeAreaView>
          {loader && <CustomLoader />}
          <KeyboardAwareScrollView
            extraScrollHeight={20}
            nestedScrollEnabled
            enableOnAndroid={true}
            style={styles.height100}
            enableAutomaticScroll={Platform.OS === 'ios'}
            contentContainerStyle={styles.flexGrowOne}>
            <View style={[styles.pad15, styles.height100AlignIJusCenter]}>
              <Text
                style={[
                  styles.textCenter,
                  styles.headerTextStyle,
                  styles.paddB40,
                ]}>
                {I18n.t(globalText._resetPassword)}
              </Text>
              <Text style={styles.resetPasswordText}>
                {I18n.t(
                  globalText._setTheNewPasswordForYourAccountSoYouCamLoginAndAccessAllTheFeatures,
                )}
              </Text>
              {isErrorMessage != '' ? (
                <Text style={isErrorMessage ? styles.errorMsgBoxStyle : {}}>
                  {isErrorMessage}
                </Text>
              ) : null}
              <View style={styles.row}>
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
                      placeholder={I18n.t(globalText.newPassword)}
                      secureTextEntry={newPasswordVisible ? true : false}
                      value={isNewPasswordValue && isNewPasswordValue}
                      onChangeText={text => setNewPasswordValue(text)}
                      placeholderTextColor={'grey'}
                    />
                  </View>
                  <View style={styles.loginPasswordEyeIconView}>
                    <TouchableOpacity
                      onPress={() =>
                        setNewPasswordVisible(!newPasswordVisible)
                      }>
                      {newPasswordVisible ? (
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
                {isNewPasswordError && (
                  <Text
                    style={[
                      styles.width90,
                      styles.redColorText,
                      styles.paddR15,
                    ]}>
                    {isNewPasswordValue.length == 0
                      ? I18n.t(globalText._theMessageMustBeRequired, {
                          _message: I18n.t(globalText.newPasswordNew),
                        })
                      : I18n.t(globalText._passwordValidationMessage)}
                  </Text>
                )}
              </View>

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
                      placeholder={'Comfirm Password'}
                      secureTextEntry={confirmPasswordVisible ? true : false}
                      value={isConfirmPasswordValue}
                      onChangeText={text => setConfirmPasswordValue(text)}
                      placeholderTextColor={'grey'}
                    />
                  </View>
                  <View style={styles.loginPasswordEyeIconView}>
                    <TouchableOpacity
                      onPress={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }>
                      {confirmPasswordVisible ? (
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
                {isConfirmPasswordError && (
                  <Text
                    style={[
                      styles.width90,
                      styles.redColorText,
                      styles.paddR15,
                    ]}>
                    {isConfirmPasswordValue.length == 0
                      ? I18n.t(globalText._theMessageMustBeRequired, {
                          _message: I18n.t(globalText.confirmPassword),
                        })
                      : I18n.t(globalText._passwordValidationMessage)}
                  </Text>
                )}
              </View>

              <View style={{paddingTop: 90}}>
                <AuthButton
                  buttonName={I18n.t(globalText._resetPassword)}
                  authButtonStyle={styles.paddH30}
                  buttonStyle={styles.fontWeightNormal}
                  onPress={() => onResetPassword()}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      }
    />
  );
};

export default ResetPassword;
