import {useFocusEffect} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from '../../component/FastImage';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SimpleReactValidator from 'simple-react-validator';
import AddSocialProfile from '../../screens/addSocialProfile';
import ChangePhoto from '../../screens/changePhoto';
import CustomButton from '../../component/customButton/index';
import CustomDropDown from '../../component/customDropdown';
import CustomDropDownAnswer from '../../component/CustomDropwDownAnswer/index';
import CustomDynamicForm from '../../component/customDynamicForm/index';
import CustomLoader from '../../component/customLoader/index';
import CustomTextImput from '../../component/customTextInput/index';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
import I18n from '../../i18n/index';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import {
  getAsyncStorage,
  getFormatedDate,
  setAsyncStorage,
  toastShow,
} from '../../utils/customFunctions';
// import CustomValidation from '../../utils/CustomValidation';

import UpdateEmailMobile from './updateEmailMobile';

const Basic_Profile = props => {
  let isTxtInputValue = {};
  const {onChangePage, onChangeAnswer, onSelectAnswer} = props;
  const simpleValidator = useRef(new SimpleReactValidator());
  const [allValid, setAllValid] = useState(true);
  const [changePhotoModal, setChangePhotModal] = useState(false);
  const [addSocialProfileModal, setAddSocialProfileModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [stateValue, setStateValue] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [isUserData, setUserData] = useState({});
  const [isLinkName, setLinkName] = useState('');
  const [isQuestionAnswerData, setQuestionAnswerData] = useState([]);
  const [isCountImageCheck, setCountImageCheck] = useState(0);
  const [isDropDownSelected, setDropdownSelected] = useState(false);
  const [isEditDetails, setEditDetails] = useState(false);
  const [isEditName, setEditName] = useState('');
  const [isAllData, setAllData] = useState({
    userid: '',
    name: '',
    last_name: '',
    membersinceyear: '',
    image_name: '',
    phone_no: '',
    username: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    zipcode: '',
    state: '',
    state_id: null,
    country: '',
    gender: '',
    dob: '',
    language_name: '',
    employemntStatus: '',
    organization: '',
    highestEdu: '',
    inCome: '',
    maritalStatus: '',
    facebood_page: '',
    twitter_page: '',
    linkedin_page: '',
    skype_link: '',
    website_link: '',
    upi_link: '',
    whatsapp_link: '',
    selected_answer: [],
    imagebuffer: '',
    // employment_status: {
    //     question_answer_id: null,
    //     answer: '',
    // },
    // highest_level_education: {
    //     question_answer_id: null,
    //     answer: '',
    // },
    // household_income: {
    //     question_answer_id: null,
    //     answer: '',
    // },
    // marital_status: {
    //     question_answer_id: null,
    //     answer: '',
    // },
  });
  const [isOpenIndex, setOpenIndex] = useState(-1);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [isCheckAnswr, setCheckAnswr] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      onPageInit();
      return () => {
        cleanUp();
      };
    }, []),
  );

  // useEffect(()=>{
  //   alert(JSON.stringify(isAllData));
  // },[isAllData]);

  const cleanUp = () => {
    setAllData({
      userid: '',
      name: '',
      last_name: '',
      membersinceyear: '',
      image_name: '',
      phone_no: '',
      username: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      zipcode: '',
      state: '',
      state_id: null,
      country: '',
      gender: '',
      dob: '',
      language_name: '',
      employemntStatus: '',
      organization: '',
      highestEdu: '',
      inCome: '',
      maritalStatus: '',
      facebood_page: '',
      twitter_page: '',
      linkedin_page: '',
      skype_link: '',
      website_link: '',
      whatsapp_link: '',
      selected_answer: [],
      imagebuffer: '',
      // employment_status: {
      //     question_answer_id: null,
      //     answer: '',
      // },
      // highest_level_education: {
      //     question_answer_id: null,
      //     answer: '',
      // },
      // household_income: {
      //     question_answer_id: null,
      //     answer: '',
      // },
      // marital_status: {
      //     question_answer_id: null,
      //     answer: '',
      // },
    });
    setStateList([]);
  };

  const onPageInit = async () => {
    setLoader(true);
    const ueserData = await JSON.parse(await getAsyncStorage('Login_Data'));
    setUserData(ueserData && ueserData);
    await onBasicInfoQuestionList();
    setLoader(false);
    setDataLoaded(true);
  };

  const pageLoad = async () => {
    await onBasicInfoQuestionList();
    setLoader(false);
    setDataLoaded(true);
  };

  const onBasicInfoQuestionList = async () => {
    const endPoint = `${Api.basicInfoQuestionList}`;
    const {data, message} = await AuthApi.getDataFromServer(endPoint);
    if (!data) {
      setLoader(false);
      toastShow(message);
      return;
    }
    const isData = data && data.data && data.data.data ? data.data.data : [];

    setQuestionAnswerData([...isData]);
    let getAllId = [];
    (await isData) &&
      isData.length > 0 &&
      isData.map((item, index) => {
        getAllId.push(item.question_id);
      });
    await onBasicInfoDetails(isData, getAllId);
  };

  const onBasicInfoDetails = async (isQuestionData, ids) => {
    let getAllIds = ids.join();
    getAllIds ? getAllIds : null;
    const endPoint = `${Api.basicInformation}?question_id=${getAllIds}`;
    const {data, message} = await AuthApi.getDataFromServer(endPoint);
    if (!data) {
      setLoader(false);
      // toastShow(message);
      return;
    }

    const isData = data && data.data;

    setAllData({...isAllData, ...isData});
    setCountImageCheck(0);
    if (isData.imagebuffer && isData.imagebuffer.length > 10) {
      await setAsyncStorage('ProfileImage', JSON.stringify(isData.imagebuffer));
    }
    setStateValue(isData.state);
    await onstate(isData.state);
    if (isData && isData.selected_answer.length > 0) {
      isData.selected_answer.map((item1, index1) => {
        isQuestionData.map((item, index) => {
          switch (item.question_type) {
            case '5':
              if (item.question_id == item1.question_id) {
                item.answer = item1.answer;
                item.question_answer_id = item1.answer;
                setQuestionAnswerData([...isQuestionData]);
              }
              break;
            default:
              if (item.question_id == item1.question_id) {
                item.answer_arr.map((i, j) => {
                  if (i.question_answer_id == item1.answer) {
                    i.selected = true;
                    if (item.sub_category_type_id == '7') {
                      onCheckOrganizationIssue(i);
                    }
                  } else {
                    i.selected = false;
                  }
                });
                setQuestionAnswerData([...isQuestionData]);
              }
          }
        });
      });
      setQuestionAnswerData([...isQuestionData]);
    }
  };

  const onCheckOrganizationIssue = i => {
    if (i.key == 'N') {
      setCheckAnswr('none');
    } else {
      setCheckAnswr('selected');
    }
  };

  const onstate = async preSelectedState => {
    const endPoint = `${Api.basicInfoState}?limit=${1000}`;
    const {data, message} = await AuthApi.getDataFromServer(endPoint);
    if (!data) {
      setLoader(false);
      toastShow(message);
      return;
    }
    const isData = data && data.data && data.data.data;
    setStateList(isData && isData);
    if (preSelectedState && preSelectedState.length > 0) {
      isData.map((item, index) => {
        if (item.state_name == stateValue) {
          isAllData.state = item.state_name;
          isAllData.state_id = item.state_id;
          setAllData({...isAllData});
        }
      });
    }
  };

  const onCallTrash = async () => {
    setCountImageCheck(isCountImageCheck + 1);
    await onImageUpload('');
    isAllData.imagebuffer = '';
    setAllData({...isAllData});
    setChangePhotModal(false);
  };

  const onPressGallery = () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
      compressImageMaxHeight: 500,
      compressImageMaxWidth: 500,
    })
      .then(async image => {
        setCountImageCheck(isCountImageCheck + 1);
        await onImageUpload(image.data);
        isAllData.imagebuffer = image.data;
        setAllData({...isAllData});
        setChangePhotModal(false);
      })
      .catch(e => {
        setChangePhotModal(false);
        if (e.code !== 'E_PICKER_CANCELLED') {
          Alert.alert(I18n.t(globalText.imageUploadCancelMessage));
        }
      });
  };

  const onPressCamera = async () => {
    await ImagePicker.openCamera({
      // width: 300,
      // height: 400,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
      // compressImageQuality: 0.8,
      compressImageMaxHeight: 100,
      compressImageMaxWidth: 100,
    })
      .then(async image => {
        setCountImageCheck(isCountImageCheck + 1);
        await onImageUpload(image.data);
        isAllData.imagebuffer = image.data;
        setAllData({...isAllData});
        setChangePhotModal(false);
      })
      .catch(e => {
        setChangePhotModal(false);
        if (e.code !== 'E_PICKER_CANCELLED') {
          Alert.alert(I18n.t(globalText.imageUploadCancelMessage));
        }
      });
  };

  const socialMediDelete = async value => {
    if (value == 'facebook') {
      isAllData.facebood_page = '';
      setAllData({...isAllData});
    } else if (value == 'twitter') {
      isAllData.twitter_page = '';
      setAllData({...isAllData});
    } else if (value == 'linkedin') {
      isAllData.linkedin_page = '';
      setAllData({...isAllData});
    } else if (value == 'skype') {
      isAllData.skype_link = '';
      setAllData({...isAllData});
    } else if (value == 'website') {
      isAllData.website_link = '';
      setAllData({...isAllData});
    } else if (value == 'upi_id') {
      isAllData.upi_id = '';
      // alert("remove");
      setAllData({...isAllData});
    }
    await updateSocialProfile({type: value, link: ''});
  };

  const checkDropDownValidation = async () => {
    let count = 0;
    let allData = [];
    let isNotAns = {};
    isQuestionAnswerData &&
      isQuestionAnswerData.length > 0 &&
      isQuestionAnswerData.map(async (item1, index1) => {
        switch (item1.question_type) {
          case '5':
            if (item1.answer && item1.answer.length > 0) {
              let value = {
                question_type: item1.question_type,
                question_id: item1.question_id,
                answer: item1.answer,
                grid_subquestion_id: -1,
                question_answer_id: item1.answer,
              };
              allData.push({...value});
            }
            break;
          default:
            await item1.answer_arr.map((item, index) => {
              if (item.selected) {
                count++;
                item1.selectedDropDown = true;
                let value = {
                  question_type: item1.question_type,
                  question_id: item1.question_id,
                  answer: item.answer,
                  question_answer_id: item.question_answer_id,
                  grid_subquestion_id: -1,
                };
                allData.push({...value});
                if (item1.sub_category_type_id == '7' && item.key == 'N') {
                  isNotAns = value;
                }
              }
            });
            break;
        }
      });
    return {count: count, allData: allData, isNotAns: isNotAns};
  };

  const onUpdate = async () => {
    setDropdownSelected(true);

    const formValid = simpleValidator.current.allValid();

    console.log(formValid);
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
      return;
    }

    const {count, allData, isNotAns} = await checkDropDownValidation();

    const payload = {
      image_name: isAllData.image_name,
      first_name: isAllData.name,
      last_name: isAllData.last_name,
      phone_no: isAllData.phone_no,
      username: isAllData.username,
      address_line_1: isAllData.address_line_1,
      address_line_2: isAllData.address_line_2,
      city: isAllData.city,
      zipcode: isAllData.zipcode ? isAllData.zipcode.trim() : '',
      state: isAllData.state_id,
      country: isUserData.country_id,
      gender: isAllData.gender,
      dob: isAllData.dob,
      facebook_page:
        isAllData.facebood_page && isAllData.facebood_page.length > 0
          ? isAllData.facebood_page
          : null,
      twitter_page:
        isAllData.twitter_page && isAllData.twitter_page.length > 0
          ? isAllData.twitter_page
          : null,
      linkedin_page:
        isAllData.linkedin_page && isAllData.linkedin_page.length > 0
          ? isAllData.linkedin_page
          : null,
      skype_link:
        isAllData.skype_link && isAllData.skype_link.length > 0
          ? isAllData.skype_link
          : null,
      website_link:
        isAllData.website_link && isAllData.website_link.length > 0
          ? isAllData.website_link
          : null,
      whatsapp_link:
        isAllData.whatsapp_link && isAllData.whatsapp_link.length > 0
          ? isAllData.whatsapp_link
          : null,
      upi_link:
        isAllData.upi_link && isAllData.upi_link.length > 0
          ? isAllData.upi_link
          : null,
      items: [...allData],
    };

    // alert(payload)
    setLoader(true);
    const {data, message} = await AuthApi.putDataToServer(
      Api.basicInfoUpdateUserProfile,
      payload,
    );
    if (!data) {
      setLoader(false);
      let isZipData = message.split('Example:');
      if (isZipData && isZipData.length > 0) {
        setTimeout(() => {
          toastShow(I18n.t(globalText._enterValidPostCode));
        }, 100);
      } else {
        toastShow(message && message);
      }
      return;
    }
    // await onImageUpload();
    // if (isCountImageCheck != 0) {
    //     await onImageUpload();
    // }
    isNotAns && Object.keys(isNotAns).length > 0 && onSaveAnswer(isNotAns);
    let getBasicInfo = await JSON.parse(await getAsyncStorage('Login_Data'));
    getBasicInfo.first_name = isAllData.name;
    getBasicInfo.last_name = isAllData.last_name;
    await setAsyncStorage('Login_Data', JSON.stringify(getBasicInfo));
    let logicForSpecficTab =
      data.data && data.data.isSelected ? data.data.isSelected : false;
    onChangeAnswer(logicForSpecficTab);
    setLoader(false);
    onChangePage(1);
  };

  const onSaveAnswer = async isNotAns => {
    const payload = {
      question_id: isNotAns.question_id,
    };
    const {data, message, success} = await AuthApi.putDataToServer(
      Api.removePreselectedAnswers,
      payload,
    );
    if (!data) {
      toastShow(message && message);
      return;
    }
  };

  const onImageUpload = async (img = '') => {
    setLoader(true);
    const payload = {
      image: img,
    };
    const {data, message} = await AuthApi.postDataToServer(
      Api.basicInfoUoloadImage,
      payload,
    );
    setLoader(false);
    if (!data) {
      return;
    }

    await setAsyncStorage('ProfileImage', JSON.stringify(img));
  };

  const onAddSocialProfile = name => {
    setLinkName(name);

    if (name.toLowerCase() === 'upi link') {
      if (isUserData.culture_id === '4') {
        setAddSocialProfileModal(true);
      } else {
        console.log('UPI Link is only available for culture ID 4');
      }
    } else {
      setAddSocialProfileModal(true);
    }
  };

  const onPressSubmit = async data => {
    if (data.type == 'facebook') {
      isAllData.facebood_page = data.link;
      setAllData({...isAllData});
    } else if (data.type == 'twitter') {
      isAllData.twitter_page = data.link;
      setAllData({...isAllData});
    } else if (data.type == 'linkedin') {
      isAllData.linkedin_page = data.link;
      setAllData({...isAllData});
    } else if (data.type == 'skype') {
      isAllData.skype_link = data.link;
      setAllData({...isAllData});
    } else if (data.type == 'website') {
      isAllData.website_link = data.link;
      setAllData({...isAllData});
    } else if (data.type.includes('Upi')) {
      data.type = 'upi_id';
      isAllData.upi_link = data.link;
      setAllData({...isAllData});
    }
    await updateSocialProfile(data);
  };

  const updateSocialProfile = async (info = {}) => {
    setLoader(true);
    const payload = {
      type: info.type == 'upi' ? 'upi_id' : info.type,
      link: info.link,
    };
    const {data, message} = await AuthApi.postDataToServer(
      Api.basicInfoAddSocialProfile,
      payload,
    );

    // alert(info.link);

    // alert(info.link,JSON.stringify(isAllData))

    if (info.type == 'upi') {
      isAllData.upi_link = info.link;
      setAllData(isAllData);
    }

    // alert(isAllData.upi_link);
    setLoader(false);

    // if (!data) {
    //   return;
    // }
    // pageLoad();
    // onPageInit();
  };

  const onCallSelection = (quesValue, ansValue, subItem) => {
    isQuestionAnswerData.map((item1, index1) => {
      switch (quesValue.question_type) {
        case '5':
          if (quesValue.question_id == item1.question_id) {
            item1.answer = ansValue;
          }
          setQuestionAnswerData([...isQuestionAnswerData]);
          break;
        default:
          if (quesValue.question_id == item1.question_id) {
            item1.answer_arr.map((item, index) => {
              if (ansValue.question_answer_id == item.question_answer_id) {
                item1.selectedDropDown = true;
                item.selected = true;
                if (quesValue.sub_category_type_id == '7') {
                  item.key == 'N'
                    ? setCheckAnswr('none')
                    : setCheckAnswr('selected');
                  onRemoveValue(item);
                  // onCheckTabData(item);
                }
              } else {
                item.selected = false;
              }
            });
          }
          setQuestionAnswerData([...isQuestionAnswerData]);
          break;
      }
    });
    setQuestionAnswerData([...isQuestionAnswerData]);
  };

  const onRemoveValue = item1 => {
    if (
      isQuestionAnswerData &&
      isQuestionAnswerData.length > 0 &&
      item1.key == 'N'
    ) {
      isQuestionAnswerData &&
        isQuestionAnswerData.length > 0 &&
        isQuestionAnswerData.map((item, index) => {
          if (item.question_type) {
            item.answer = '';
          }
        });
      setQuestionAnswerData([...isQuestionAnswerData]);
    }
  };

  // const onCheckTabData = item => {
  //     if (item.key == 'N') {
  //         onSelectAnswer('none');
  //     } else {
  //         onSelectAnswer('selected');
  //     }
  // };

  return (
    <>
      {/* <View style={{ height: 180 }}>
        <NetworkLogger theme="dark" />
      </View> */}

      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          extraScrollHeight={140}
          nestedScrollEnabled
          enableOnAndroid={false}
          enableAutomaticScroll={true}
          contentContainerStyle={styles.accScrollContentStyle}>
          {isEditDetails && (
            <UpdateEmailMobile
              isName={isEditName}
              onRequestClose={() => setEditDetails(false)}
              onPressCross={() => setEditDetails(false)}
              isFirstName={isAllData.name}
              isOldValue={
                isEditName == 'email' ? isAllData.username : isAllData.phone_no
              }
              onSetUpdatedEmailOrMobile={(fieldName, isUpdatedValue) => {
                setEditDetails(false);
                if (fieldName == 'email') {
                  isAllData.username = isUpdatedValue;
                  setAllData({...isAllData});
                } else {
                  isAllData.phone_no = isUpdatedValue;
                  setAllData({...isAllData});
                }
              }}
            />
          )}
          <View style={styles.paddB250}>
            {loader && <CustomLoader />}
            <ScrollView
              style={styles.height100}
              contentContainerStyle={styles.accScrollContentStyle}
              nestedScrollEnabled>
              <View>
                <View style={styles.padd15}>
                  <Image
                    style={styles.bPImageStyle}
                    source={
                      isAllData.imagebuffer && isAllData.imagebuffer.length > 5
                        ? {
                            uri: `data:image/png;base64,${isAllData.imagebuffer}`,
                          }
                        : GlobalImages.userIconStatic
                    }
                  />
                  <CustomButton
                    addButtonStyle={styles.bPChangePhotoStyle}
                    addButtonTextStyle={styles.bPChangePhotoTextStyle}
                    buttonName={I18n.t(globalText.changePhoto)}
                    onPress={() => setChangePhotModal(!changePhotoModal)}
                  />

                  <Text style={styles.basicPBasciTextStyle}>
                    {I18n.t(globalText.basicInfo)}
                  </Text>
                  <Text style={styles.basicProfNameStyle}>
                    {I18n.t(globalText.name)}{' '}
                    <Text style={styles.redTxt}> *</Text>
                  </Text>
                  <View style={styles.rowSpaceBetween}>
                    <View style={styles.width48}>
                      <CustomTextImput
                        placeholder={I18n.t(globalText.enterFirstName)}
                        term={isAllData.name}
                        onChangeText={text => {
                          isAllData.name = text;
                          setAllData({...isAllData});
                        }}
                        txtInptStyle={styles.textTransformStyle}
                        // onBlur={() =>
                        //     CustomValidation.onBlurField(simpleValidator, allValid, 'First name')
                        // }
                        onBlur={() =>
                          !allValid &&
                          simpleValidator.current.showMessageFor('First Name')
                        }
                      />
                      {simpleValidator.current.message(
                        'First Name',
                        isAllData.name,
                        'required|alpha|string|min:2',
                      ) && (
                        <Text style={[styles.redColorText, styles.marL10]}>
                          {isAllData.name && isAllData.name.length == 1
                            ? I18n.t(globalText._theValueAtleastCharcters, {
                                _value: I18n.t(globalText.firstName),
                                _number: 2,
                              })
                            : isAllData.name && isAllData.name.length > 0
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
                    <View style={styles.width48}>
                      <CustomTextImput
                        placeholder={I18n.t(globalText.enterLastName)}
                        term={isAllData.last_name}
                        onChangeText={text => {
                          isAllData.last_name = text;
                          setAllData({...isAllData});
                        }}
                        txtInptStyle={styles.textTransformStyle}
                        // onBlur={() =>
                        //     CustomValidation.onBlurField(simpleValidator, allValid, 'Last name')
                        // }
                        onBlur={() =>
                          !allValid &&
                          simpleValidator.current.showMessageFor('Last name')
                        }
                      />
                      {simpleValidator.current.message(
                        'Last name',
                        isAllData.last_name,
                        'required|alpha|string|min:2',
                      ) && (
                        <Text style={[styles.redColorText, styles.marL10]}>
                          {isAllData.last_name &&
                          isAllData.last_name.length == 1
                            ? I18n.t(globalText._theValueAtleastCharcters, {
                                _value: I18n.t(globalText.lastName),
                                _number: 2,
                              })
                            : isAllData.last_name &&
                              isAllData.last_name.length > 0
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
                  <Text style={styles.bPMemberTextstyle}>
                    {I18n.t(globalText._basicProfileMemberSince, {
                      _year: isAllData && isAllData?.membersinceyear,
                    })}
                  </Text>
                  <View style={styles.marT10}>
                    <CustomTextImput
                      editable={false}
                      headerName={I18n.t(globalText.mobileNo)}
                      inputMainViewNew={styles.colorFaintGreyBackground}
                      // placeholder={I18n.t(globalText.enterMobileNo)}
                      placeholder={
                        I18n.t(globalText.edit) +
                        ' ' +
                        I18n.t(globalText.mobileNo).toLowerCase()
                      }
                      keyboardType={'numeric'}
                      endSource
                      endIconPress={() => {
                        setEditName('mobile');
                        setEditDetails(true);
                      }}
                      term={isAllData.phone_no}
                      onChangeText={text => {
                        isAllData.phone_no = text;
                        setAllData({...isAllData});
                      }}
                    />
                  </View>
                  <View style={styles.marT10}>
                    <CustomTextImput
                      editable={false}
                      endSource
                      endIconPress={() => {
                        setEditName('email');
                        setEditDetails(true);
                      }}
                      headerName={I18n.t(globalText.email)}
                      // placeholder={I18n.t(globalText.enterEmail)}
                      placeholder={
                        I18n.t(globalText.edit) +
                        ' ' +
                        I18n.t(globalText._emailAdree).toLowerCase()
                      }
                      term={isAllData.username.trim()}
                      inputMainViewNew={styles.colorFaintGreyBackground}
                      onChangeText={text => {
                        isAllData.username = text;
                        setAllData({...isAllData});
                      }}
                    />
                  </View>
                  <Text
                    style={[styles.basicPBasciTextStyle, styles.marginTop35]}>
                    {I18n.t(globalText.contactDetail)}
                  </Text>
                  <Text style={styles.basicProfNameStyle}>
                    {I18n.t(globalText.addressCap)}
                  </Text>
                  <View style={styles.rowSpaceBetween}>
                    <View style={styles.width48}>
                      <CustomTextImput
                        placeholder={I18n.t(globalText.enterAdd1)}
                        term={isAllData.address_line_1}
                        onChangeText={text => {
                          isAllData.address_line_1 = text;
                          setAllData({...isAllData});
                        }}
                      />
                    </View>
                    <View style={styles.width48}>
                      <CustomTextImput
                        placeholder={I18n.t(globalText.enterAdd2)}
                        term={isAllData.address_line_2}
                        onChangeText={text => {
                          isAllData.address_line_2 = text;
                          setAllData({...isAllData});
                        }}
                      />
                    </View>
                  </View>
                  <View style={[styles.rowSpaceBetween, styles.marginT8]}>
                    <View style={styles.width48}>
                      <CustomTextImput
                        headerName={I18n.t(globalText.city)}
                        term={
                          isAllData.city && isAllData.city != 'null'
                            ? isAllData.city
                            : ''
                        }
                        placeholder={I18n.t(globalText.enterCity)}
                        onChangeText={text => {
                          isAllData.city = text;
                          setAllData({...isAllData});
                        }}
                      />
                    </View>
                    <View style={styles.width48}>
                      <CustomTextImput
                        headerName={I18n.t(globalText.zipCode)}
                        term={
                          isAllData.zipcode &&
                          isAllData.zipcode != 'null' &&
                          isAllData.zipcode.trim()
                        }
                        placeholder={I18n.t(globalText.enterZipCode)}
                        keyboardType={'email-address'}
                        onChangeText={text => {
                          isAllData.zipcode = text;
                          setAllData({...isAllData});
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={[
                      styles.marT10,
                      Platform.OS == 'ios' && styles.zIndex5,
                    ]}>
                    <View
                      style={{
                        height: isOpenIndex == 10 ? 230 : undefined,
                      }}>
                      <CustomDropDown
                        // imp
                        placeholder={I18n.t(globalText.selectState)}
                        defaultValue={isAllData.state}
                        title={I18n.t(globalText.state)}
                        zIndex={5}
                        // placeholder={isAllData.state}
                        open={openState}
                        value={stateValue}
                        items={stateList}
                        setOpen={setOpenState}
                        setValue={setStateValue}
                        setItems={setStateList}
                        displayKey={'state_name'}
                        onOpen={() => {
                          setOpenIndex(10);
                          // setOpenEmployee(false);
                          // setOpenEducation(false);
                          // setOpenInCome(false);
                          // setOpenMartial(false);
                        }}
                        dropDownContainerStyleNew={styles.heightStatic150}
                        onClose={() => {
                          setOpenIndex(-1);
                        }}
                        onItemChoose={item => {
                          setOpenIndex(-1);
                          isAllData.state = item.state_name;
                          isAllData.state_id = item.state_id;
                          setAllData({...isAllData});
                        }}
                      />
                    </View>
                    {/* {CustomValidation.fieldErrorMsg(
                                simpleValidator,
                                I18n.t(globalText.state),
                                isAllData.state,
                                'required',
                                {
                                    messages: {
                                        required: I18n.t(globalText._theMessageMustBeRequired, {
                                            _message: I18n.t(globalText.state).toLowerCase(),
                                        }),
                                    },
                                },
                            )} */}
                  </View>
                  {/* {simpleValidator.current.message(
                            I18n.t(globalText.state),
                            isAllData.state,
                            'required',
                        ) && (
                            <Text style={[styles.redColorText, styles.marL10]}>
                                
                            </Text>
                        )} */}
                  <View style={styles.marT10}>
                    <CustomTextImput
                      headerName={I18n.t(globalText.country)}
                      term={isAllData.country}
                      //txtInptStyle={styles.bPFaintGreyText}
                      placeholder={I18n.t(globalText.enterCountry)}
                      editable={false}
                      inputMainViewNew={styles.colorFaintGreyBackground}
                    />
                  </View>
                  <Text
                    style={[styles.basicPBasciTextStyle, styles.marginTop35]}>
                    {I18n.t(globalText.otherDetails)}
                  </Text>
                  <View>
                    <CustomTextImput
                      headerName={I18n.t(globalText.panelistID)}
                      term={isAllData.userid && isAllData.userid.toString()}
                      placeholder={I18n.t(globalText.enterPanelistId)}
                      keyboardType={'numeric'}
                      //txtInptStyle={styles.bPFaintGreyText}
                      editable={false}
                      inputMainViewNew={styles.colorFaintGreyBackground}
                    />
                  </View>
                  <View style={styles.marT10}>
                    <CustomTextImput
                      headerName={I18n.t(globalText.gender)}
                      term={
                        isAllData && isAllData.gender.toUpperCase() == 'M'
                          ? I18n.t(globalText.male)
                          : isAllData.gender.toUpperCase() == 'F'
                          ? I18n.t(globalText.female)
                          : isAllData.gender.toUpperCase() == 'O'
                          ? I18n.t(globalText.other)
                          : null
                      }
                      placeholder={I18n.t(globalText.enterGender)}
                      //txtInptStyle={styles.bPFaintGreyText}
                      editable={false}
                      inputMainViewNew={styles.colorFaintGreyBackground}
                    />
                  </View>
                  <View style={styles.marT10}>
                    <CustomTextImput
                      headerName={I18n.t(globalText.dateOfBirth)}
                      term={
                        isAllData.dob &&
                        getFormatedDate(isAllData.dob, 'dd-mm-yyyy')
                      }
                      //txtInptStyle={styles.bPFaintGreyText}
                      placeholder={I18n.t(globalText.enterDateOfBirth)}
                      editable={false}
                      inputMainViewNew={styles.colorFaintGreyBackground}
                    />
                  </View>
                  <View style={styles.marT10}>
                    <CustomTextImput
                      headerName={I18n.t(globalText.primaryLang)}
                      placeholder={I18n.t(globalText.enterLangauge)}
                      term={isAllData.language_name}
                      //txtInptStyle={styles.bPFaintGreyText}
                      editable={false}
                      inputMainViewNew={styles.colorFaintGreyBackground}
                    />
                  </View>

                  <View style={styles.pT20}>
                    {isDataLoaded &&
                      isQuestionAnswerData &&
                      isQuestionAnswerData.length > 0 &&
                      isQuestionAnswerData.map((item1, index1) => (
                        <View key={index1}>
                          {isCheckAnswr == 'selected' ? (
                            <CustomDynamicForm
                              key={index1}
                              noNeedBorder
                              question={item1.question}
                              extraStyle={styles.padBMinus20}
                              quesTextStyleExtra={[
                                styles.myFamilyQuetionTextStyle,
                                styles.colorTopazStyle,
                              ]}
                              // imp
                              inSideValue={
                                <View>
                                  {item1 && item1.question_type != 5 && (
                                    <View style={styles.pT10}>
                                      <View
                                        style={{
                                          height:
                                            isOpenIndex == index1
                                              ? 200
                                              : undefined,
                                        }}>
                                        <CustomDropDownAnswer
                                          itemsData={item1.answer_arr}
                                          labelKey={'question_answer_id'}
                                          displayKey={'answer'}
                                          onItemChoose={item => {
                                            onCallSelection(item1, item);
                                            setOpenIndex(-1);
                                          }}
                                          onOpen={() => {
                                            setOpenIndex(index1);
                                          }}
                                          onClose={() => {
                                            setOpenIndex(-1);
                                          }}
                                          isOpenCheck={isOpenIndex == index1}
                                        />
                                        {/* {CustomValidation.fieldErrorMsg(
                                                                    simpleValidator,
                                                                    'stateValue',
                                                                    isAllData.state,
                                                                    'required',
                                                                )} */}
                                      </View>
                                      {/* {isDropDownSelected && !item1.selectedDropDown && (
                                                                <Text style={[styles.redTxt, styles.marL10]}>
                                                                    please select dropdown
                                                                </Text>
                                                            )} */}
                                    </View>
                                  )}

                                  {item1 && item1.question_type == 5 && (
                                    <View style={styles.pT5}>
                                      <CustomTextImput
                                        placeholder={I18n.t(
                                          globalText._typeHereYourAnswer,
                                        )}
                                        term={item1 && item1.answer}
                                        onChangeText={text => {
                                          onCallSelection(item1, text);
                                        }}
                                      />
                                    </View>
                                  )}
                                </View>
                              }
                            />
                          ) : (
                            item1.question_type != 5 && (
                              <CustomDynamicForm
                                key={index1}
                                noNeedBorder
                                question={item1.question}
                                extraStyle={styles.padBMinus20}
                                quesTextStyleExtra={[
                                  styles.myFamilyQuetionTextStyle,
                                  styles.colorTopazStyle,
                                ]}
                                // imp
                                inSideValue={
                                  <View>
                                    {item1 && item1.question_type != 5 && (
                                      <View style={styles.pT10}>
                                        <View
                                          style={{
                                            height:
                                              isOpenIndex == index1
                                                ? 200
                                                : undefined,
                                          }}>
                                          <CustomDropDownAnswer
                                            itemsData={item1.answer_arr}
                                            labelKey={'question_answer_id'}
                                            displayKey={'answer'}
                                            onItemChoose={item => {
                                              onCallSelection(item1, item);
                                              setOpenIndex(-1);
                                            }}
                                            onOpen={() => {
                                              setOpenIndex(index1);
                                            }}
                                            onClose={() => {
                                              setOpenIndex(-1);
                                            }}
                                            isOpenCheck={isOpenIndex == index1}
                                          />
                                          {/* {CustomValidation.fieldErrorMsg(
                                                                    simpleValidator,
                                                                    'stateValue',
                                                                    isAllData.state,
                                                                    'required',
                                                                )} */}
                                        </View>
                                        {/* {isDropDownSelected && !item1.selectedDropDown && (
                                                                <Text style={[styles.redTxt, styles.marL10]}>
                                                                    please select dropdown
                                                                </Text>
                                                            )} */}
                                      </View>
                                    )}
                                  </View>
                                }
                              />
                            )
                          )}
                        </View>
                      ))}
                  </View>
                </View>
                <View style={styles.bPBorderStyle} />
                <View style={[styles.paddH15paddV8, styles.zIndexMinus1]}>
                  <Text style={styles.bPGreyText}>
                    {I18n.t(globalText.SOCIALPROFILE)}
                  </Text>

                  <View style={styles.bPSocialMediaViewMain}>
                    <FastImage
                      style={styles.bPSocialMedieIconStyle}
                      source={GlobalImages.fbIcon}
                    />

                    {isAllData &&
                    isAllData.facebood_page &&
                    isAllData.facebood_page.length > 0 ? (
                      <View style={styles.bPSocialMediaRowView}>
                        <View style={styles.bPSocialMediaBorderAllView}>
                          <Text numberOfLines={1}>
                            {' '}
                            {isAllData && isAllData.facebood_page}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => socialMediDelete('facebook')}>
                          <FastImage
                            style={styles.bPTrashIconStyle}
                            source={GlobalImages.trashIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.bPSocialMediaFirstView}
                        onPress={() =>
                          onAddSocialProfile(I18n.t(globalText.facebookLink))
                        }>
                        <Text style={styles.bPSocialMediaPlusStyle}>
                          {I18n.t(globalText.plusIcon)}
                        </Text>
                        <Text style={styles.bPSocialMediaAddStyle}>
                          {I18n.t(globalText.add)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.bPSocialMediaViewMain}>
                    <FastImage
                      style={styles.bPSocialMedieIconStyle}
                      source={GlobalImages.twitterIcon}
                    />
                    {isAllData &&
                    isAllData.twitter_page &&
                    isAllData.twitter_page.length > 0 ? (
                      <View style={styles.bPSocialMediaRowView}>
                        <View style={styles.bPSocialMediaBorderAllView}>
                          <Text numberOfLines={1}>
                            {isAllData.twitter_page}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => socialMediDelete('twitter')}>
                          <FastImage
                            style={styles.bPTrashIconStyle}
                            source={GlobalImages.trashIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.bPSocialMediaFirstView}
                        onPress={() =>
                          onAddSocialProfile(I18n.t(globalText.twitterLink))
                        }>
                        <Text style={styles.bPSocialMediaPlusStyle}>
                          {I18n.t(globalText.plusIcon)}
                        </Text>
                        <Text style={styles.bPSocialMediaAddStyle}>
                          {I18n.t(globalText.add)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.bPSocialMediaViewMain}>
                    <FastImage
                      style={styles.bPSocialMedieIconStyle}
                      source={GlobalImages.linkedinIcon}
                    />
                    {isAllData &&
                    isAllData.linkedin_page &&
                    isAllData.linkedin_page.length > 0 ? (
                      <View style={styles.bPSocialMediaRowView}>
                        <View style={styles.bPSocialMediaBorderAllView}>
                          <Text numberOfLines={1}>
                            {isAllData.linkedin_page}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => socialMediDelete('linkedin')}>
                          <FastImage
                            style={styles.bPTrashIconStyle}
                            source={GlobalImages.trashIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.bPSocialMediaFirstView}
                        onPress={() =>
                          onAddSocialProfile(I18n.t(globalText.linkedInLink))
                        }>
                        <Text style={styles.bPSocialMediaPlusStyle}>
                          {I18n.t(globalText.plusIcon)}
                        </Text>
                        <Text style={styles.bPSocialMediaAddStyle}>
                          {I18n.t(globalText.add)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.bPSocialMediaViewMain}>
                    <FastImage
                      style={styles.bPSocialMedieIconStyle}
                      source={GlobalImages.skypeIcon}
                    />
                    {isAllData &&
                    isAllData.skype_link &&
                    isAllData.skype_link.length > 0 ? (
                      <View style={styles.bPSocialMediaRowView}>
                        <View style={styles.bPSocialMediaBorderAllView}>
                          <Text numberOfLines={1}>{isAllData.skype_link}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => socialMediDelete('skype')}>
                          <FastImage
                            style={styles.bPTrashIconStyle}
                            source={GlobalImages.trashIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.bPSocialMediaFirstView}
                        onPress={() =>
                          onAddSocialProfile(I18n.t(globalText.skypeLink))
                        }>
                        <Text style={styles.bPSocialMediaPlusStyle}>
                          {I18n.t(globalText.plusIcon)}
                        </Text>
                        <Text style={styles.bPSocialMediaAddStyle}>
                          {I18n.t(globalText.add)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.bPSocialMediaViewMain}>
                    <FastImage
                      style={styles.bPSocialMedieIconStyle}
                      source={GlobalImages.webIcon}
                    />
                    {isAllData &&
                    isAllData.website_link &&
                    isAllData.website_link.length > 0 ? (
                      <View style={styles.bPSocialMediaRowView}>
                        <View style={styles.bPSocialMediaBorderAllView}>
                          <Text numberOfLines={1}>
                            {isAllData.website_link}
                            {/* {isAllData.upi_id} */}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => socialMediDelete('website')}>
                          <FastImage
                            style={styles.bPTrashIconStyle}
                            source={GlobalImages.trashIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.bPSocialMediaFirstView}
                        onPress={() =>
                          onAddSocialProfile(I18n.t(globalText.websiteLink))
                        }>
                        <Text style={styles.bPSocialMediaPlusStyle}>
                          {I18n.t(globalText.plusIcon)}
                        </Text>
                        <Text style={styles.bPSocialMediaAddStyle}>
                          {I18n.t(globalText.add)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <View>
                    {isAllData?.country === 'India' && (
                      <View style={styles.bPSocialMediaViewMain}>
                        <FastImage
                          style={styles.bPSocialMedieIconStyle}
                          source={GlobalImages.upiIcon}
                        />
                        {isAllData &&
                        ((isAllData.upi_id && isAllData.upi_id.length > 0) ||
                          isAllData.upi_link) ? (
                          <View style={styles.bPSocialMediaRowView}>
                            <View style={styles.bPSocialMediaBorderAllView}>
                              <Text numberOfLines={1}>
                                {isAllData.upi_link
                                  ? isAllData.upi_link
                                  : isAllData.upi_id}
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <TouchableOpacity
                            style={styles.bPSocialMediaFirstView}
                            onPress={() =>
                              // onAddSocialProfile(I18n.t(globalText.upiLink))
                              onAddSocialProfile('Upi Link')
                            }>
                            <Text style={styles.bPSocialMediaPlusStyle}>
                              {I18n.t(globalText.plusIcon)}
                            </Text>
                            <Text style={styles.bPSocialMediaAddStyle}>
                              {I18n.t(globalText.add)}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                  <CustomButton
                    buttonName={I18n.t(globalText.update)}
                    addButtonStyle={styles.bP_buttonStyle}
                    onPress={() => onUpdate()}
                  />
                </View>
              </View>
            </ScrollView>
            {changePhotoModal && (
              <>
                <ChangePhoto
                  visible={changePhotoModal}
                  onRequestClose={() => setChangePhotModal(false)}
                  onPressCamera={() => {
                    onPressCamera();
                  }}
                  onPressTrash={() => onCallTrash()}
                  onPressOutside={() => setChangePhotModal(false)}
                  onPressComponent={() => {
                    onPressGallery();
                  }}
                />
              </>
            )}

            {addSocialProfileModal && (
              <>
                <AddSocialProfile
                  name={isLinkName && isLinkName}
                  visible={addSocialProfileModal}
                  onRequestClose={() => setAddSocialProfileModal(false)}
                  onPressCancel={() => setAddSocialProfileModal(false)}
                  onPressSubmit={data => {
                    onPressSubmit(data);
                    setAddSocialProfileModal(false);
                  }}
                  onPressOutside={() => setAddSocialProfileModal(false)}
                />
              </>
            )}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default Basic_Profile;
