import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Dimensions,
  Platform,
} from 'react-native';
//import DeviceInfo from 'react-native-device-info';
import SimpleReactValidator from 'simple-react-validator';
import AuthButton from '../../component/authButton/index';
import CustomBackground from '../../component/customBackground/index';
import globalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
import I18n from '../../i18n/index';
import CustomValidation from '../../utils/CustomValidation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import CustomLoader from '../../component/customLoader/index';
import {getAsyncStorage, toastShow} from '../../utils/customFunctions';
import FastImage from '../../component/FastImage';

const SocialThroughEmail = props => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const {height, width} = Dimensions.get('window');
  const [allValid, setAllValid] = useState(true);
  const [isData, setData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    email_id: '',
    phone_no: '',
    verification_method: null,
  });
  const [isReward, setReward] = useState(0);
  const [loader, setLoader] = useState(false);
  const [isIcon, setIcon] = useState('');

  useEffect(() => {
    onPageInit();
    onRewardsPoints();
  }, []);

  const onRewardsPoints = async () => {
    const language_data = await JSON.parse(
      await getAsyncStorage('langauge_data'),
    );
    setLoader(true);
    const endPoint = `${Api.signUpDetail}?country_id=${language_data.country_id}&culture_id=${language_data.culture_id}`;
    const {data, message} = await AuthApi.getDataFromServer(endPoint);
    setLoader(false);
    if (!data) {
      toastShow(I18n.t(globalText.somethingWentWrong));
      return;
    }
    const isData = (await data) && data.data ? data.data : {};
    if (isData) {
      let amount = (await isData.reward_amount) ? isData.reward_amount : 0;
      let icon = (await isData.currency_symbol) ? isData.currency_symbol : '';
      setReward(amount);
      setIcon(icon);
    }
  };

  const onPageInit = async () => {
    const data =
      (await props.route) && props.route.params && props.route.params.data;
    const status =
      (await props.route) && props.route.params && props.route.params.status;
    (isData.first_name = data.first_name),
      (isData.last_name = data.last_name),
      (isData.date_of_birth = data.date_of_birth),
      (isData.gender = data.gender),
      (isData.email_id = data.email_id),
      (isData.phone_no = data.phone_no),
      (isData.verification_method =
        status == 'Google'
          ? 1
          : status == 'Facebook'
          ? 2
          : status == 'Email'
          ? 3
          : status == 'Phone'
          ? 4
          : null);
    setData({...isData});
  };

  const onPressNext = () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
      return;
    }
    props.navigation.navigate('CompleteProfilePersonal', {data: isData});
  };

  return (
    <View style={styles.container}>
      <CustomBackground
        screen={
          <KeyboardAwareScrollView
            // extraScrollHeight={Platform.OS === 'ios' ? 140 : 0}
            nestedScrollEnabled
            enableOnAndroid={true}
            enableAutomaticScroll={Platform.OS === 'ios'}
            contentContainerStyle={styles.flexGrowOne}>
            {loader && <CustomLoader />}
            <View style={{height: height, justifyContent: 'center'}}>
              <SafeAreaView>
                <FastImage
                  style={styles.authLogoStyleCommom}
                  source={globalImages.logoIcon}
                  resizeMode={'contain'}
                />

                <View style={styles.sLoginMainView}>
                  <View style={styles.sTLTextView}>
                    <View style={styles.sTLTextViewFirst}>
                      <Text style={styles.sTLTextViewFirstTextStyle}>
                        {I18n.t(globalText.completeYourProfileToEarn)}
                      </Text>
                    </View>
                    <View style={styles.sTLTextViewSecond}>
                      <Text style={styles.sTLTextViewSecondTextStyle}>
                        {isIcon} {isReward}
                      </Text>
                    </View>
                    {/* <Text> </Text>
                                        <View style={styles.sTLTextViewFirst}>
                                            <Text style={styles.sTLTextViewFirstTextStyle}>
                                                {' '}
                                                {I18n.t(globalText.points)}
                                            </Text>
                                        </View> */}
                  </View>
                  <View style={styles.sTLTextMainView}>
                    <View style={styles.sTLTextInputFirstView}>
                      <FastImage
                        source={globalImages.userIcon}
                        style={styles.sTLTextInputFirstViewIcon}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={styles.sTLTextInputMiddleView}>
                      <View style={styles.sTLTxtInView}>
                        <TextInput
                          defaultValue={isData && isData.first_name}
                          onChangeText={text => {
                            isData.first_name = text.trim();
                            setData({...isData});
                          }}
                          style={styles.blackTransorm}
                          keyboardType={
                            Platform.OS === 'ios'
                              ? 'ascii-capable'
                              : 'visible-password'
                          }
                          placeholder={I18n.t(globalText.firstNameStar)}
                          onBlur={() =>
                            CustomValidation.onBlurField(
                              simpleValidator,
                              allValid,
                              'First name',
                            )
                          }
                        />
                      </View>

                      <View style={styles.sTLTxtInView}>
                        <TextInput
                          defaultValue={isData && isData.last_name}
                          onChangeText={text => {
                            isData.last_name = text.trim();
                            setData({...isData});
                          }}
                          style={styles.blackTransorm}
                          placeholder={I18n.t(globalText.lastNameStar)}
                          onBlur={() =>
                            CustomValidation.onBlurField(
                              simpleValidator,
                              allValid,
                              'Last name',
                            )
                          }
                          // onBlur={() =>
                          //     !allValid && simpleValidator.current.showMessageFor('Last name')
                          // }
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.sTLTextMainViewNew}>
                    <View style={styles.width12Per} />

                    <View style={styles.sTLTextInputMiddleView}>
                      <View style={styles.sTLTxtInViewNew}>
                        {simpleValidator.current.message(
                          I18n.t(globalText.firstName),
                          isData.first_name,
                          'required|alpha|string|min:2',
                        ) && (
                          <Text style={styles.redColorText}>
                            {isData.first_name && isData.first_name.length == 1
                              ? I18n.t(globalText._theValueAtleastCharcters, {
                                  _value: I18n.t(globalText.firstName),
                                  _number: 2,
                                })
                              : isData.first_name &&
                                isData.first_name.length > 0
                              ? I18n.t(globalText._theValueMustBeValid, {
                                  _firstValue: I18n.t(globalText.firstName),
                                  _lastValue: I18n.t(
                                    globalText.name,
                                  ).toLowerCase(),
                                })
                              : I18n.t(globalText._theMessageMustBeRequired, {
                                  _message: I18n.t(
                                    globalText.firstName,
                                  ).toLowerCase(),
                                })}
                          </Text>
                        )}
                      </View>

                      <View style={styles.sTLTxtInViewNew}>
                        {simpleValidator.current.message(
                          I18n.t(globalText.lastName),
                          isData.last_name,
                          'required|alpha|string|min:2',
                        ) && (
                          <Text style={styles.redColorText}>
                            {isData.last_name && isData.last_name.length == 1
                              ? I18n.t(globalText._theValueAtleastCharcters, {
                                  _value: I18n.t(globalText.lastName),
                                  _number: 2,
                                })
                              : isData.last_name && isData.last_name.length > 0
                              ? I18n.t(globalText._theValueMustBeValid, {
                                  _firstValue: I18n.t(globalText.lastName),
                                  _lastValue: I18n.t(
                                    globalText.name,
                                  ).toLowerCase(),
                                })
                              : I18n.t(globalText._theMessageMustBeRequired, {
                                  _message: I18n.t(globalText.lastName),
                                })}
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={styles.sTLViewButtonStyle}>
                    <AuthButton
                      buttonName={I18n.t(globalText.next).toUpperCase()}
                      rightIcon
                      onPress={() => onPressNext()}
                    />
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </KeyboardAwareScrollView>
        }
      />
    </View>
  );
};

export default SocialThroughEmail;
