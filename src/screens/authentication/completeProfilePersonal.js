import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from '../../component/FastImage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleReactValidator from 'simple-react-validator';
import AuthButton from '../../component/authButton';
import CustomBackground from '../../component/customBackground';
import globalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
import I18n from '../../i18n/index';
import colors from '../../styles/colors';
import CustomValidation from '../../utils/CustomValidation';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import CustomLoader from '../../component/customLoader/index';
import {
  getAsyncStorage,
  getFormatedDate,
  toastShow,
} from '../../utils/customFunctions';

const CompleteProfilePersonal = props => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const [allValid, setAllValid] = useState(true);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [genderModal, setGenderModal] = useState(false);
  const [genderSelected, setGenderSelected] = useState('');
  const [isData, setData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    email_id: '',
    phone_no: '',
    country_id: '',
    verification_method: null,
  });
  const [isErrorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    onPageInit();
  }, []);

  const onPageInit = async () => {
    const language_data = await JSON.parse(
      await getAsyncStorage('langauge_data'),
    );
    isData.country_id = language_data.country_id
      ? language_data.country_id
      : 236;
    const data =
      (await props.route) && props.route.params && props.route.params.data;
    (isData.first_name = data.first_name),
      (isData.last_name = data.last_name),
      (isData.date_of_birth = data.date_of_birth),
      (isData.gender = data.gender),
      (isData.email_id = data.email_id),
      (isData.phone_no = data.phone_no),
      (isData.verification_method = data.verification_method),
      setData({...isData});
  };

  const onPressNext = async () => {
    // setErrorMessage('');
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
      return;
    }
    // setLoader(true);
    // let dataValue = getFormatedDate(isData.date_of_birth, 'yyyy-mm-dd');
    // let endPoint = `${Api.signupSinupCheckAge}?country_id=${isData.country_id}&dob=${dataValue}`;
    // const { data, message, success } = await AuthApi.getDataFromServer(endPoint);
    // setLoader(false);
    // if (!data) {
    //     typeof message == 'object'
    //         ? setErrorMessage(
    //               I18n.t(globalText.eligibaleErrorDateOfBirthNew, {
    //                   _age: message.age ? message.age : '',
    //               }),
    //           )
    //         : toastShow(message && message);
    //     return;
    // }
    // setErrorMessage('');
    props.navigation.navigate('CompleteProfile', {data: isData});
  };

  return (
    <>
      <CustomBackground
        screen={
          <SafeAreaView>
            <FastImage
              source={globalImages.logoIcon}
              style={styles.authenticationLogoStyle}
              resizeMode={'contain'}
            />
            {loader && <CustomLoader />}
            <View style={styles.loginMainScreen}>
              {isErrorMessage != '' ? (
                <Text style={styles.errorMsgBoxStyle}>{isErrorMessage}</Text>
              ) : null}
              <View style={styles.row}>
                <View style={styles.loginPhoneInputIconView}>
                  <EvilIcons name="calendar" size={25} />
                </View>
                <TouchableOpacity
                  hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
                  style={styles.loginPhoneInputView}
                  onPress={() => {
                    setShow(true);
                  }}>
                  <TextInput
                    testID="dateOfBirth"
                    placeholder={`${I18n.t(globalText.dateOfBirth)} ${I18n.t(
                      globalText.impSymbol,
                    )}`}
                    style={{color: '#000'}}
                    value={
                      isData &&
                      isData.date_of_birth &&
                      isData.date_of_birth != ''
                        ? getFormatedDate(isData.date_of_birth, 'dd/mm/yyyy')
                        : ''
                    }
                    editable={false}
                    // autoFocus={true}
                    // onBlur={() => CustomValidation.onBlurField(simpleValidator, allValid, 'Date')}
                    onBlur={() =>
                      !allValid &&
                      simpleValidator.current.showMessageFor('Date')
                    }
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <View style={[styles.width10, styles.marL15]} />
                {/* {CustomValidation.fieldErrorMsg(
                                    simpleValidator,
                                    'Date',
                                    isData.date_of_birth,
                                    'required',
                                )} */}
                {simpleValidator.current.message(
                  'Date',
                  isData.date_of_birth,
                  'required',
                ) && (
                  <Text style={styles.redColorText}>
                    {I18n.t(globalText._theMessageMustBeRequired, {
                      _message: I18n.t(globalText.date).toLowerCase(),
                    })}
                  </Text>
                )}
              </View>

              <View style={styles.completeProfilePersonalGenderView}>
                <View style={styles.loginPhoneInputIconView}>
                  {/* <Ionicons name="md-male-female-sharp" size={25} /> */}
                  <FastImage
                    source={globalImages.genderIcon}
                    style={styles.height25width25}
                    resizeMode="contain"
                  />
                </View>
                <TouchableOpacity
                  // hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                  style={[
                    styles.loginPhoneInputView,
                    styles.completeProfilePersonalGenderDropDown,
                  ]}
                  onPress={() => setGenderModal(!genderModal)}>
                  <View style={styles.width90}>
                    <TextInput
                      testID="gender"
                      placeholder={`${I18n.t(globalText.gender)} ${I18n.t(
                        globalText.impSymbol,
                      )}`}
                      value={
                        isData && isData.gender.length > 0 ? isData.gender : ''
                      }
                      editable={false}
                      style={[styles.height100, {color: '#000'}]}
                      //autoFocus={true}
                      onBlur={
                        !allValid &&
                        simpleValidator.current.showMessageFor('gender')
                      }
                      // onBlur={() =>
                      //     CustomValidation.onBlurField(simpleValidator, allValid, 'gender')
                      // }
                    />
                  </View>
                  <View style={styles.width10per}>
                    <Entypo
                      name={'triangle-down'}
                      size={25}
                      color={colors.DOVE_GRAY}
                    />
                  </View>
                </TouchableOpacity>
                {genderModal && (
                  <View
                    style={styles.completeProfilePersonalGenderDropDownOpen}>
                    <Text
                      style={styles.compDropDownStyle}
                      onPress={() => {
                        isData.gender = I18n.t(globalText.male);
                        setData({...isData});

                        setGenderModal(false);
                      }}>
                      {I18n.t(globalText.male)}
                    </Text>
                    <Text
                      style={styles.compDropDownStyle}
                      onPress={() => {
                        isData.gender = I18n.t(globalText.female);
                        setData({...isData});
                        setGenderModal(false);
                      }}>
                      {I18n.t(globalText.female)}
                    </Text>
                    <Text
                      style={styles.compDropDownStyle}
                      onPress={() => {
                        isData.gender = I18n.t(globalText.other);
                        setData({...isData});
                        setGenderModal(false);
                      }}>
                      {I18n.t(globalText.other)}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.row}>
                <View style={[styles.width10, styles.marL15]} />
                {simpleValidator.current.message(
                  'gender',
                  isData.gender,
                  'required',
                ) && (
                  <Text style={styles.redColorText}>
                    {I18n.t(globalText._theMessageMustBeRequired, {
                      _message: I18n.t(globalText.gender).toLowerCase(),
                    })}
                  </Text>
                )}

                {/* {CustomValidation.fieldErrorMsg(simpleValidator, 'gender', isData.gender, 'required')} */}
              </View>

              <View style={styles.loginButtonView}>
                <AuthButton
                  buttonName={I18n.t(globalText.next)}
                  rightIcon
                  onPress={() => onPressNext()}
                />
              </View>
            </View>
            {show && (
              <DateTimePickerModal
                isVisible={show}
                mode="date"
                date={
                  isData && isData.date_of_birth
                    ? isData.date_of_birth
                    : new Date()
                }
                maximumDate={new Date()}
                onConfirm={date => {
                  setShow(false);
                  isData.date_of_birth = date;
                  setData({...isData});
                }}
                onCancel={() => setShow(false)}
              />
            )}
          </SafeAreaView>
        }
      />
    </>
  );
};

export default CompleteProfilePersonal;
