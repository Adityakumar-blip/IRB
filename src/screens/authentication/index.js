import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import FastImage from '../../component/FastImage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  setAsyncStorage,
  removeAsyncStorage,
  getAsyncStorage,
  generateOtp,
} from '../../utils/customFunctions';
import CustomBackground from '../../component/customBackground';
import globalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
import colors from '../../styles/colors';
import Login from './login';
import OTP from './otp';
import I18n from '../../i18n/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Singular, sngLog} from 'singular-react-native';

const Auth = props => {
  const [loginVia, setLoginVia] = useState(I18n.t(globalText.password));
  const [isCountryCode, setCountryCode] = useState('');
  const {height, width} = Dimensions.get('window');

  useEffect(() => {
    Singular.event('authentication_login');
    onPageInit();
  });

  const onPageInit = async () => {
    let country_code =
      (await props.route) &&
      props.route.params &&
      props.route.params.country_code;
    setCountryCode(country_code);
    let demoCount = 0;
    await setAsyncStorage('demoCount', demoCount.toString());
  };

  const generateRandomOtp = async () => {
    const otp = await generateOtp();
    await setAsyncStorage('Random_Otp', otp.toString());
  };

  return (
    <CustomBackground
      screen={
        <KeyboardAwareScrollView
          // extraScrollHeight={Platform.OS === 'ios' ? 140 : 0}
          nestedScrollEnabled
          enableOnAndroid={false}
          enableAutomaticScroll={false}
          contentContainerStyle={styles.flexGrowOne}
          style={{height: '100%'}}>
          <SafeAreaView>
            <FastImage
              source={globalImages.logoIcon}
              style={[styles.authenticationLogoStyle]}
              resizeMode={'contain'}
            />

            <View style={[styles.loginMainScreen, {height: height}]}>
              <View style={styles.authTabView}>
                <TouchableOpacity
                  style={[
                    styles.authPasswordTab,
                    {
                      backgroundColor:
                        loginVia == I18n.t(globalText.password)
                          ? colors.RED_VOILET
                          : colors.WHITE,
                    },
                  ]}
                  onPress={async () => {
                    setLoginVia(I18n.t(globalText.password));
                    await removeAsyncStorage('Random_Otp');
                  }}>
                  <Text
                    style={[
                      styles.font16,
                      {
                        color:
                          loginVia == I18n.t(globalText.password)
                            ? colors.WHITE
                            : colors.SILVER_CHALICE,
                      },
                    ]}>
                    {I18n.t(globalText.password)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.authOtpTab,
                    {
                      backgroundColor:
                        loginVia == I18n.t(globalText.otp)
                          ? colors.RED_VOILET
                          : colors.WHITE,
                    },
                  ]}
                  onPress={async () => {
                    setLoginVia(I18n.t(globalText.otp));
                    await generateRandomOtp();
                  }}>
                  <Text
                    style={[
                      styles.font16,
                      {
                        color:
                          loginVia == I18n.t(globalText.otp)
                            ? colors.WHITE
                            : colors.SILVER_CHALICE,
                      },
                    ]}>
                    {I18n.t(globalText.otp)}
                  </Text>
                </TouchableOpacity>
              </View>
              {loginVia == I18n.t(globalText.password) && (
                <View style={styles.marT50}>
                  <Login
                    onPressForgotPassword={() => {
                      Singular.event('Forgotpass_click');
                      props.navigation.navigate('ForgotPassword');
                    }}
                    onPress={() => props.navigation.replace('DrawerNavigation')}
                    isCountry={isCountryCode}
                  />
                </View>
              )}
              {loginVia == I18n.t(globalText.otp) && (
                <View style={styles.marT50}>
                  <OTP
                    onPress={() => props.navigation.replace('DrawerNavigation')}
                    isCountry={isCountryCode}
                  />
                </View>
              )}
            </View>
          </SafeAreaView>
        </KeyboardAwareScrollView>
      }
    />
  );
};

export default Auth;
