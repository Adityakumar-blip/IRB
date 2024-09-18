import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
  Modal,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomRadioAndAns from '../../component/CustomRadioAndAns/index';
import ChangePassword from '../../screens/changePassword';
import CustomBackGround from '../../component/customBackground/index';
import CustomButton from '../../component/customButton/index';
import CustomDynamicForm from '../../component/customDynamicForm/index';
import CustomHeader from '../../component/customHeader/index';
import CustomLoader from '../../component/customLoader/index';
import CustomSwitch from '../../component/customSwitch/index';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
import Api from '../../utils/api';
import authApi from '../../utils/authApi';
import {constant} from '../../utils/constants';
import {
  getAsyncStorage,
  getFormatedDate,
  getJsonStringify,
  toastShow,
  removeAsyncStorage,
  clearAsyncStorage,
} from '../../utils/customFunctions';
import UnSubscribeModal from '../../screens/unsubscribeModal';
import I18n from '../../i18n/index';
import MobileNotRegisterModal from '../../component/mobileNotRegisterModal/index';
import defaultText from '../../helper/textSample';
import UpdateEmailMobile from '../updateEmailMobile/index';
// import CustomCheckBox from "_components";
import CustomCheckBox from '../../component/customCheckBox/index';
import {Singular} from 'singular-react-native';

import colors from '../../styles/colors';

// import NetworkLogger from "react-native-network-logger";

const PrivacyAndSetting = props => {
  const [isCheckPI, setCheckPI] = useState(false);

  const [isPiModel, setPIModel] = useState(false);
  const [isSwitch, setSwitch] = useState(false);
  const [isUnsubModal, setUnsubModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [accountStatus, setAccountStatus] = useState({});
  const [isData, setIsData] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackFocus, setFeedbackFocus] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [unregisterNumber, setUnregisterNumber] = useState(false);
  const [isPreSelctedValue, setPreSelctedValue] = useState([]);
  const [isSeeMore, setMore] = useState(true);
  const [isMobileData, setMobileData] = useState({});
  const [paginationData, setPaginationData] = useState({
    currentPage: 0,
    pageLimit: 10,
    skip: 0,
    totalCount: 0,
    totalPages: 0,
  });
  const [isEditDetails, setEditDetails] = useState(false);
  const [categotyData, setCategotyData] = useState([]);

  const [isEmailConsentAnswerSelected, setEmailConsentAnswer] = useState(false);

  useEffect(() => {
    Singular.event('PrivacyAndSetting');
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      onPageInit();
    }, []),
  );

  const onPageInit = async () => {
    setLoader(true);
    await getLoginData();
    await getAccountStatus();
    await omPageDetails();
    await getPIInformation();
    await getSurveyPreferenceQuestion(0);
    const isProfileMenuData = await JSON.parse(
      await getAsyncStorage('myProfileData'),
    );
    setCategotyData(isProfileMenuData);
    setLoader(false);
    setDataLoaded(true);
  };

  const getLoginData = async () => {
    let temp = await JSON.parse(await getAsyncStorage('Login_Data'));
    if (temp) {
      await setLoginData(temp);
    }
  };

  const onSavePIInfo = () => {
    setPIModel(false);
    setCheckPI(!isCheckPI);
    setTimeout(() => {
      savePIInformation(!isCheckPI);
    }, 600);
  };
  const getAccountStatus = async () => {
    const {data, message} = await authApi.getDataFromServer(
      Api.privacySettingAcceptedDate,
    );
    if (!data) {
      toastShow((message && message) || I18n.t(globalText.somethingWentWrong));
      return;
    }
    if (data && data.data && data.data.data && data.data.data) {
      let temp = data.data.data;
      setAccountStatus(temp);
    }
  };

  const omPageDetails = async () => {
    const endPoint = `${
      Api.privacySettingSitePreferenceQuestion
    }?skip=${0}&limit=${10}`;
    const {data, message} = await authApi.getDataFromServer(endPoint);

    if (!data) {
      setLoader(false);
      toastShow(I18n.t(globalText.somethingWentWrong));
      return;
    }
    // let isData = (await data) && data.data && data.data.data ? data.data.data : [];
    if (data && data.data && data.data.data && data.data.data.length > 0) {
      let temp = data.data.data;
      setMobileData(temp[0]);
      getPreSelectedDataForMobile(temp[0]);
    }
  };

  const getPreSelectedDataForMobile = async value => {
    const {data, message} = await authApi.getDataFromServer(
      Api.privacySettingGetPrivacySelectedAnswer,
    );

    if (!data) {
      setLoader(false);
      toastShow(I18n.t(globalText.somethingWentWrong));
      return;
    }

    const isData = data && data.data && data.data.data ? data.data.data : [];
    if (isData && isData.length > 0) {
      let count = 0;
      await isData.map((item, index) => {
        if (item.question_id == value.question_id) {
          value.items.map((i, j) => {
            if (i.question_answer_id == item.answer) {
              i.selected = true;
              if (
                i.answer.toLowerCase() == I18n.t(globalText.yes).toLowerCase()
              ) {
                count = count + 1;
                setSwitch(true);
              } else {
                setSwitch(false);
              }
            }
            // else {
            //     i.selected = false;
            //     count == 0 ? setSwitch(false) : null;
            // }
          });
        }
      });
      setMobileData([...value]);
    }
  };

  const getPIInformation = async () => {
    const endPoint = `${Api.privacySettingPIIInformation}`;
    const {data, message} = await authApi.getDataFromServer(endPoint);
    let piInfo = data?.data?.pii_info_status;

    if (piInfo && piInfo === 1) {
      setCheckPI(false);
    } else {
      setCheckPI(true);
    }
  };

  const savePIInformation = async isEnable => {
    setLoader(true);
    const payload = {
      items: [
        {
          pii_info_status: isEnable ? '0' : '1',
        },
      ],
    };
    const endPoint = `${Api.privacySettingAddPIInformation}`;
    const {data, message} = await authApi.postDataToServer(endPoint, payload);

    setLoader(false);
  };
  const getSurveyPreferenceQuestion = async (
    currentPage = 0,
    loader = false,
  ) => {
    // setLoader(loader ? true : false);
    let page = currentPage ? currentPage : paginationData.currentPage;
    let limit = 10;
    const taskContent = currentPage == 0 ? [] : isData;
    // const endPoint = isSwitch
    //   ? `${Api.privacySettingSitePreferenceQuestion}?skip=${paginationData.skip}&limit=${limit}`
    //   : `${Api.privacySettingSureveyPrefernceQuestionMerge}?skip=${paginationData.skip}&limit=${limit}`;
    const endPoint = `${Api.privacySettingSureveyPrefernceQuestionMerge}?skip=${paginationData.skip}&limit=${limit}`;
    // const endPoint = `${Api.privacySettingSitePreferenceQuestion}?skip=${paginationData.skip}&limit=${limit}`;
    const {data, message} = await authApi.getDataFromServer(endPoint);
    if (!data) {
      setLoader(false);
      toastShow(I18n.t(globalText.somethingWentWrong));
      return;
    }
    if (data && data.data && data.data.data && data.data.data.length > 0) {
      let updateData = await data.data.data;
      let isAllData = [...taskContent, ...updateData];
      // await getPreSelectedData(isAllData);
      // setIsData(isAllData);

      await updateQuestions(isAllData);
      setPaginationData({
        currentPage: page + 1,
        totalPages: Math.ceil(data.data.totalCount / limit),
        pageLimit: 10,
        totalCount: data.data.totalCount,
        skip: Math.ceil(paginationData.skip + 10),
      });
      if (
        paginationData.currentPage + 1 ==
        Math.ceil(data.data.totalCount / 10)
      ) {
        setMore(false);
      } else {
        setMore(true);
      }
      // setLoader(false);
    }
  };

  const updateQuestions = async data => {
    let questions = [...data];
    questions &&
      questions.length > 0 &&
      questions.map((i, j) => {
        if (i && i.items && i.items.length > 0) {
          i.items.map((m, n) => {
            if (
              i &&
              i.privacy_selected_ans &&
              i.privacy_selected_ans.length > 0
            ) {
              i.privacy_selected_ans.map((p, q) => {
                if (m.question_answer_id == p.answer) {
                  m.selected = true;
                } else {
                  m.selected = false;
                }
              });
            }
          });
        }
      });

    // alert(JSON.stringify(questions));
    setIsData([...questions]);
  };

  // const getPreSelectedData = async isAllData => {
  //     const { data, message } = await authApi.getDataFromServer(Api.privacySettingGetPrivacySelectedAnswer);
  //     if (!data) {
  //         setLoader(false);
  //         toastShow(I18n.t(globalText.somethingWentWrong));
  //         return;
  //     }
  //     // const value = (await data) && data.data && data.data.data;
  //     if (data && data.data && data.data.data && data.data.data.length > 0) {
  //         let value = await data.data.data;
  //         setPreSelctedValue([...value]);
  //         if (value && value.length > 0) {
  //             await isAllData.map(async (item1, index1) => {
  //                 await value.map((item, index) => {
  //                     if (item.question_id == item1.question_id) {
  //                         item1.items.map((i, j) => {
  //                             if (i.question_answer_id == item.question_answer_id) {
  //                                 i.selected = true;
  //                             } else {
  //                                 i.selected = false;
  //                             }
  //                         });
  //                     }
  //                 });
  //             });
  //         }
  //         setIsData([...isAllData]);
  //         setLoader(false);
  //     }
  // };

  const renderSurveyQue = ({item, index}) => {
    return (
      <CustomDynamicForm
        key={index}
        question={item.question}
        isCheckBox={item?.isCheckbox}
        emailConsent={item?.email_consent_status}
        setEmailConsent={() => {
          if (isData[index]['email_consent_status'] == 0) {
            isData[index]['email_consent_status'] = 1;
          } else {
            isData[index]['email_consent_status'] = 0;
          }
          for (let i = 0; i < isData[index]['items'].length; i++) {
            isData[index]['items'][i]['selected'] = false;
          }

          if (isData && isData.length) {
            setIsData([...isData]);
          }
        }}
        inSideValue={
          <View
            pointerEvents={
              item.hasOwnProperty('isCheckbox') &&
              item?.email_consent_status == 0
                ? 'none'
                : 'auto'
            }>
            {item.items &&
              item.items.length > 0 &&
              item.items.map((m, n) => (
                <View
                  key={n}
                  style={[
                    styles.paddT10,
                    item.hasOwnProperty('isCheckbox') &&
                    item?.email_consent_status == 0
                      ? {opacity: 0.4}
                      : {opacity: 1},
                  ]}>
                  <CustomRadioAndAns
                    checkValue={m.selected}
                    answer={m.answer}
                    onPressRadio={() => onSelected(index, n)}
                  />
                </View>
              ))}
          </View>
        }
      />
    );
  };

  const onSelected = (isFirstIndex, isSecondIndex) => {
    isData.map((item, index) => {
      // let updatedItem = item;
      if (isFirstIndex == index) {
        item.items.map((i, j) => {
          if (j == isSecondIndex) {
            i.selected = true;
          } else {
            i.selected = false;
          }
        });
      }

      return item;
    });
    setIsData([...isData]);
  };

  const fetch = async () => {
    if (
      Number(paginationData.currentPage < Number(paginationData.totalPages))
    ) {
      setLoader(true);
      await getSurveyPreferenceQuestion(paginationData.currentPage);
      setLoader(false);
    }
  };

  const onPressSave = async () => {
    const stored = [];

    isMobileData.items.map((item, index) => {
      if (item.selected) {
        stored.push({
          question_id: isMobileData.question_id,
          question_answer_id: item.question_answer_id,
          grid_subquestion_id: item.grid_subquestion_id
            ? item.grid_subquestion_id
            : 0,
          answer: item.answer,
        });
      }
    });

    // setEmailConsentAnswer(false);
    let isSelectedConsent = false;
    isData.map((item, index) => {
      item.items.map((i, j) => {
        if (i.selected) {
          stored.push({
            question_id: item.question_id,
            question_answer_id: i.question_answer_id,
            grid_subquestion_id: i.grid_subquestion_id
              ? i.grid_subquestion_id
              : 0,
            answer: i.answer,

            email_consent_status: item.email_consent_status,
          });
          if (item.email_consent_status == 1) {
            isSelectedConsent = true;
          } else {
            isSelectedConsent = false;
          }
        } else if (item.email_consent_status == 0) {
          isSelectedConsent = true;

          stored.push({
            question_id: item.question_id,
            question_answer_id: i.question_answer_id,
            grid_subquestion_id: i.grid_subquestion_id
              ? i.grid_subquestion_id
              : 0,
            answer: '',

            email_consent_status: 0,
          });
        }
      });
    });

    if (stored.length == 0) {
      setLoader(false);
      return Alert.alert('', I18n.t(globalText._pleaseSelectAtleastOneAnswer), [
        {
          //text: 'ok',
          text: I18n.t(globalText._ok),
          onPress: () => {
            true;
          },
        },
      ]);
    }

    // setTimeout(async () => {
    if (!isSelectedConsent) {
      return Alert.alert(
        '',
        'Please Select answer for selected email consent',
        [
          {
            //text: 'ok',
            text: I18n.t(globalText._ok),
            onPress: () => {
              true;
            },
          },
        ],
      );
    }

    if (!isSelectedConsent) {
      return;
    }
    setLoader(true);
    if (isSelectedConsent) {
      const payload = {
        items: stored.length > 0 && stored,
      };
      const {data, message} = await authApi.postDataToServer(
        Api.privacySettingSavePrivacySelectedAnswer,
        payload,
      );
      if (!data) {
        setLoader(false);
        toastShow(message && message);
        return;
      }
      setLoader(false);
      setTimeout(() => {
        toastShow(I18n.t(globalText.selectedAnswerSaveSuccefully));
      }, 200);
    }
    // }, 600);
  };

  const onPressReset = async () => {
    let isAllIds = [];
    isMobileData.items.map((item, index) => {
      if (item.selected) {
        item.selected = false;
        isAllIds.push(item.question_answer_id);
      }
    });
    setSwitch(false);
    setMobileData(isMobileData);
    isData.map((item, index) => {
      item.items.map((i, j) => {
        if (i.selected) {
          i.selected = false;
          isAllIds.push(i.question_answer_id);
        }
      });
    });
    setIsData([...isData]);
    let getAllIds = isAllIds.join();
    if (getAllIds.length > 0) {
      setLoader(true);
      const endPoint = `${Api.privacySettingResetSlectedAnswer}?question_answer_id=${getAllIds}`;
      const {data, message} = await authApi.deleteDataFromServer(endPoint);
      if (!data) {
        setLoader(false);
        toastShow(message && message);
        return;
      }
      setTimeout(() => {
        toastShow(I18n.t(globalText.resetSuccesfully));
      }, 200);
      paginationData.currentPage = 0;
      paginationData.pageLimit = 10;
      paginationData.skip = 0;
      paginationData.totalCount = 0;
      paginationData.totalPages = 0;
      setPaginationData({
        ...paginationData,
      });
      // props.navigation.navigate('Dashboard');
      // getSurveyPreferenceQuestion(0);
      setLoader(false);
    }
  };

  const checkMobileRegister = async () => {
    if (!loginData.phone_no || loginData.phone_no == '') {
      setEditDetails(true);
      return;
    }
    if (loginData.phone_no && loginData.phone_no.toString().length > 0) {
      isMobileData &&
        isMobileData.items.map((item, index) => {
          if (isSwitch) {
            if (
              item.answer.toLowerCase() ==
                I18n.t(globalText.yes).toLowerCase() ||
              (index == 0 && item)
            ) {
              item.selected = false;
            } else {
              item.selected = true;
            }
          } else {
            if (
              item.answer.toLowerCase() ==
                I18n.t(globalText.yes).toLowerCase() ||
              (index == 1 && item)
            ) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          }
        });
      setMobileData(isMobileData);

      Singular.event(
        isSwitch ? 'send_me_mobile_disable' : 'send_me_mobile_enable',
      );
      setSwitch(!isSwitch);
    }
  };

  const onRequestClose = () => {
    setPIModel(!isPiModel);
  };
  const onCall = (item, item1, index) => {
    props.navigation.navigate('Basic_Profile', {
      data: item,
      id: item1.sub_category_type_id,
    });
  };
  return (
    <>
      {/* <View style={{ padding: 14 }}></View> */}
      {/* <NetworkLogger theme="dark" /> */}
      {isEditDetails && (
        <UpdateEmailMobile
          isName={'mobile'}
          onRequestClose={() => setEditDetails(false)}
          onPressCross={() => setEditDetails(false)}
          isFirstName={loginData && loginData.first_name}
          onSetUpdatedEmailOrMobile={async () => {
            setLoader(true);
            await getLoginData();
            setLoader(false);
            setEditDetails(false);
          }}
        />
      )}
      <View style={styles.container}>
        <CustomBackGround
          screen={
            <SafeAreaView style={styles.height100}>
              <CustomHeader
                headerName={I18n.t(globalText.privacyAndSett)}
                onPressLeftIcon={() => {
                  props.navigation.openDrawer();
                }}
                threeDotNeed
                categotyData={categotyData && categotyData}
                onCall={(item, item1, index) => onCall(item, item1, index)}
              />
              {loader && <CustomLoader isVisible={loader} />}
              <View style={styles.height100BackWhite}>
                <ScrollView nestedScrollEnabled scrollEventThrottle={16}>
                  <View style={styles.pSFirstView}>
                    <FastImage
                      style={styles.pSFirstIConStyle}
                      source={GlobalImages.shieldLockIcon}
                    />
                    <Text style={styles.pSPrivacyText}>
                      {I18n.t(globalText.privacy)}
                    </Text>
                  </View>
                  <View style={styles.pSBorderStyle} />
                  <View style={styles.padd15}>
                    <View style={styles.rowCenterSpaceBetw}>
                      <Text style={styles.pSPassStyle}>
                        {I18n.t(globalText.password)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setChangePasswordModal(true)}>
                        <Text style={styles.pSEditStyle}>
                          {I18n.t(globalText.edit)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.pShidePassStyle}>{'********'}</Text>
                    <Text style={[styles.pSTextStyle, styles.marT10]}>
                      {I18n.t(globalText._privacyPolicyUpdatedOnDate, {
                        _date:
                          accountStatus && accountStatus.updated_on
                            ? getFormatedDate(
                                accountStatus.updated_on,
                                'dd/mm/yyyy',
                              )
                            : '',
                      })}
                    </Text>
                    <Text style={styles.pSTextStyle}>
                      {I18n.t(globalText._acceptedOnDate, {
                        _date:
                          accountStatus && accountStatus.accepted_on
                            ? getFormatedDate(
                                accountStatus.accepted_on,
                                'dd/mm/yyyy',
                              )
                            : '',
                      })}
                    </Text>
                    <View style={[styles.rowCenterSpaceBetw, styles.marT20]}>
                      <Text style={styles.pSAcStatusStyle}>
                        {I18n.t(globalText.accStatus)}
                      </Text>
                      <Text style={styles.pSAppStyle}>
                        {accountStatus &&
                          accountStatus.admin_approval_status &&
                          I18n.t(constant[accountStatus.admin_approval_status])}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          if (!isCheckPI) {
                            setPIModel(true);
                          } else {
                            onSavePIInfo();
                          }
                        }}>
                        <View
                          style={[
                            styles.pSUnsubStyle,
                            {
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 10,
                            },
                          ]}>
                          <CustomCheckBox
                            checkValue={isCheckPI}
                            onPressCheckBox={() => {
                              // setPIModel(true);
                              if (!isCheckPI) {
                                setPIModel(true);
                              } else {
                                onSavePIInfo();
                              }
                            }}
                          />

                          <Text style={{color: colors.DARK_BLUE}}>
                            &nbsp;
                            {I18n.t(globalText.dontshare)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.rowCenter}>
                      <TouchableOpacity
                        onPress={() => {
                          Singular.event('click_on_unsubscribe');
                          setUnsubModal(true);
                        }}>
                        <Text style={styles.pSUnsubStyle}>
                          {I18n.t(globalText.unsubscribe)}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={async () =>
                          await Linking.openURL(constant['privacyPolicyUrl'])
                        }>
                        <Text style={[styles.pSUnsubStyle, {marginLeft: -9}]}>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          {I18n.t(globalText.privacyPolicy)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.padd80}>
                    <View style={styles.pSSettMainView}>
                      <FastImage
                        style={styles.pSFirstIConStyle}
                        source={GlobalImages.settingsIcon}
                      />
                      <Text style={styles.pSSettTextStyle}>
                        {I18n.t(globalText.settings)}
                      </Text>
                    </View>
                    <View style={styles.pSBorderStyle} />
                    <View style={styles.padd15}>
                      {isDataLoaded && isData && isData.length > 0 && (
                        <>
                          <Text style={styles.prAndSettSurveyText}>
                            {I18n.t(globalText.surveyPreferences)}
                          </Text>
                          <View>
                            <FlatList
                              nestedScrollEnabled
                              data={isData}
                              renderItem={renderSurveyQue}
                              keyExtractor={(item, index) => index}
                              onEndReached={() => fetch()}
                              onEndReachedThreshold={0}
                              extraData={isData}
                            />
                          </View>
                        </>
                      )}

                      {isDataLoaded && isData && isData.length === 0 && (
                        <Text>{I18n.t(globalText.noRecordFound)}</Text>
                      )}
                      {isDataLoaded && isData && isData.length > 0 && (
                        <View>
                          <View
                            style={[
                              styles.rowCenterSpaceBetw,
                              styles.marT10,
                              styles.width100,
                            ]}>
                            <View style={styles.width80Per}>
                              <Text style={styles.pSLastTextStyle}>
                                {I18n.t(globalText.sendMeMobileEnabledSurveys)}
                              </Text>
                            </View>
                            <CustomSwitch
                              switchEnable={isSwitch}
                              onPressSwicth={async () => {
                                await checkMobileRegister();
                              }}
                            />
                          </View>

                          <View style={styles.prAndSettSurveyLastBttnView}>
                            <View>
                              <CustomButton
                                onPress={() => onPressSave()}
                                addButtonStyle={styles.prAndSettSurveySaveStyle}
                                addButtonTextStyle={styles.fontSize14}
                                buttonName={I18n.t(globalText.save)}
                              />
                            </View>
                            <View>
                              <CustomButton
                                onPress={() => onPressReset()}
                                addButtonStyle={
                                  styles.prAndSettSurveyResetStyle
                                }
                                addButtonTextStyle={
                                  styles.prAndSettSurveyResetBttn
                                }
                                buttonName={I18n.t(globalText.reset)}
                              />
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </ScrollView>
              </View>
            </SafeAreaView>
          }
        />

        {unregisterNumber && (
          <MobileNotRegisterModal
            isModalVisible={unregisterNumber}
            setModalVisible={setUnregisterNumber}
            message={I18n.t(globalText._addYourPhoneNumberAndVerifyIt)}
          />
        )}

        {isUnsubModal && (
          <UnSubscribeModal
            onRequestClose={() => setUnsubModal(false)}
            onChangeText={i => setFeedbackText(i)}
            onPressYes={() => {
              Singular.event('click_on_unsubscribe_yes');
              setFeedbackFocus(true);
            }}
            onPressNo={() => {
              Singular.event('click_on_unsubscribe_no');
              setFeedbackFocus(false);
              setUnsubModal(false);
            }}
            onCompleteUnsubScribe={() => {
              Singular.event('unsubscribe_complete');

              setUnsubModal(false);
              props.navigation.replace('SignUp');
            }}
            autoFocus={feedbackFocus ? true : false}
            onPressOutside={() => setUnsubModal(false)}
          />
        )}
        {isPiModel && (
          <Modal
            visible={isPiModel}
            animationType="slide"
            transparent={true}
            swipeDirection="down"
            onRequestClose={onRequestClose}
            backgroundColor="red">
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 'auto',
                  width: 350,
                  opacity: 1,
                  backgroundColor: '#FFF',
                  borderRadius: 10,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  position: 'relative',
                  paddingBottom: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setPIModel(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1,
                  }}>
                  <FastImage
                    style={{
                      height: 18,
                      width: 18,
                    }}
                    source={GlobalImages.crossIcon}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 20,
                    marginBottom: 20,
                    textAlign: 'center',
                    width: '90%',
                  }}
                  numberOfLines={2}
                  ellipsizeMode="tail">
                  {I18n.t(globalText.piiInformation)}
                </Text>
                <Text style={{color: 'black', marginBottom: 15, padding: 10}}>
                  {I18n.t(globalText.piiDesc)}
                  &nbsp;
                  <Text
                    style={{textDecorationLine: 'underline', padding: 4}}
                    onPress={() => {
                      Singular.event('click_on_unsubscribe');
                      setUnsubModal(true);
                    }}>
                    {I18n.t(globalText.unsubscribe)}
                  </Text>
                </Text>

                <CustomButton
                  onPress={() => onSavePIInfo()}
                  addButtonStyle={styles.prAndSettSurveySaveStyle}
                  addButtonTextStyle={styles.fontSize14}
                  buttonName={I18n.t(globalText._ok)}
                />
              </View>
            </View>
          </Modal>
        )}

        {changePasswordModal && (
          <ChangePassword
            visible={changePasswordModal}
            onRequestClose={() => setChangePasswordModal(false)}
            onPress={() => setChangePasswordModal(false)}
            onPressOutside={() => setChangePasswordModal(false)}
          />
        )}
      </View>
    </>
  );
};
export default PrivacyAndSetting;
