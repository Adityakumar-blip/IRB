/* eslint-disable react/jsx-key */
import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "../../helper/globalStyles";
import colors from "../../styles/colors";
import { globalText } from "../../helper/globalText";
import I18n from "../../i18n/index";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Api from "../../utils/api";
import AuthApi from "../../utils/authApi";
import CustomLoader from "../../component/customLoader/index";
import { useFocusEffect } from "@react-navigation/native";
import CustomTextInput from "../../component/customTextInput";
import {
  toastShow,
  getAsyncStorage,
  setAsyncStorage,
} from "../../utils/customFunctions";
import CustomDropDown from "../../component/customDropdown";
import SimpleReactValidator from "simple-react-validator";
import CustomValidation from "../../utils/CustomValidation";
import CustomQuestionAnswerSample from "../../component/customQuestionAnswerSample/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Singular } from "singular-react-native";

const DemoSurvey = (props) => {
  const { visible, onRequestClose, onPressCross, onPressClose } = props;
  const simpleValidator = useRef(new SimpleReactValidator());
  const [allValid, setAllValid] = useState(true);
  const [isDataQuestionAnswer, setDataQuestionAnswer] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [isConatctInfo, setConatctInfo] = useState({
    address1: "",
    address2: "",
    state: "",
    state_id: null,
    city: "",
    zipcode: null,
  });
  const [openState, setOpenState] = useState(false);
  const [stateValue, setStateValue] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isOpenIndex, setOpenIndex] = useState(false);
  const [isNameRemainToFill, setNameRemainToFill] = useState("");

  useEffect(() => {
    Singular.event("DemoSurvey");
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      onPageInit();
      return () => {
        cleanUp();
      };
    }, [])
  );

  const cleanUp = () => {
    setDataQuestionAnswer([]);
  };

  const onPageInit = async () => {
    setLoader(true);
    await onBasicInfoData();
    await onQuestionData();
    await onUserDetail();
    setLoader(false);
  };

  const onBasicInfoData = async () => {
    const endPoint = `${Api.basicInformation}`;
    const { data, message } = await AuthApi.getDataFromServer(endPoint);
    if (!data) {
      setLoader(false);
      return;
    }
    const isData = data && data.data;
    if (isData) {
      isConatctInfo.address1 = isData.address_line_1;
      isConatctInfo.address2 = isData.address_line_2;
      isConatctInfo.state = "";
      isConatctInfo.state_id = null;
      isConatctInfo.city = isData.city;
      isConatctInfo.zipcode = isData.zipcode;
      setStateValue(isData.state);
      await onstate(isData.state);
      setConatctInfo({ ...isConatctInfo });
    }
  };

  const onstate = async (preSelectedState) => {
    const endPoint = `${Api.basicInfoState}?limit=${1000}`;
    const { data, message } = await AuthApi.getDataFromServer(endPoint);
    if (!data) {
      setLoader(false);
      toastShow(message);
      return;
    }
    const isData = data && data.data && data.data.data;
    setStateList(isData && isData);
    if (preSelectedState && preSelectedState.length > 0) {
      isData.map((item, index) => {
        if (item.state_name == preSelectedState) {
          isConatctInfo.state = item.state_name;
          isConatctInfo.state_id = item.state_id;
          setConatctInfo({ ...isConatctInfo });
        }
      });
    }
  };

  const onUserDetail = async () => {
    const getBasicInfo = await JSON.parse(await getAsyncStorage("Login_Data"));
    //  setBasicInfo(getBasicInfo);
    getBasicInfo.username.length > 0 && getBasicInfo.phone_no.length > 0
      ? setNameRemainToFill("")
      : getBasicInfo.username.length > 0
      ? setNameRemainToFill("phone")
      : setNameRemainToFill("email");
  };

  const onQuestionData = async () => {
    // setLoader(true);
    const enPoint = `${Api.demoSurveyDemoMergeApi}`;
    const { data, message } = await AuthApi.getDataFromServer(enPoint);
    if (!data) {
      setLoader(false);
      setDataLoaded(true);
      setDataQuestionAnswer([]);
      toastShow(message);
      return;
    }
    const isData = data && data.data && data.data.data ? data.data.data : [];
    if (isData.length > 0) {
      if (isData[0] && isData[0]?.isFind) {
        if (isData[0].isSelected) {
          let child_ques =
            isData[0].child_que_arr && isData[0].child_que_arr.length > 0
              ? isData[0].child_que_arr
              : [];
          const firstElement = isData.shift();
          setDataQuestionAnswer([...child_ques, ...isData]);
        } else {
          const firstElement = isData.shift();
          setDataQuestionAnswer([...isData]);
        }
      } else {
        setDataQuestionAnswer([...isData]);
      }
    }
    setDataLoaded(true);
  };

  const onSaveAnswer = async (
    allData,
    isChildArr,
    isParent,
    sub_category_type_id
  ) => {
    setDataLoaded(false);
    let isDataa = [];
    let isAllPrevData = await isDataQuestionAnswer;
    setDataQuestionAnswer([]);
    setLoader(true);
    const payload = {
      isParent: isParent,
      items: [...allData],
    };
    const { data, message, success } = await AuthApi.postDataToServer(
      Api.demoSurveyDemoSaveSelectedAns,
      payload
    );
    if (!data) {
      setLoader(false);
      toastShow(message && message);
      return;
    }
    isDataa =
      isAllPrevData && isAllPrevData.length > 0 ? isAllPrevData.splice(1) : [];
    isDataa = [...isChildArr, ...isDataa];

    if (isDataa && isDataa[0]?.isFind) {
      if (isDataa[0].isSelected) {
        let child_ques =
          isDataa[0].child_que_arr && isDataa[0].child_que_arr.length > 0
            ? isDataa[0].child_que_arr
            : [];
        const firstElement = isDataa.shift();
        isDataa = [...child_ques, ...isDataa];
      } else {
        const firstElement = isDataa.shift();
        isDataa = [...isDataa];
      }
    }
    setDataLoaded(true);
    if (isDataa && isDataa.length > 0) {
      setDataQuestionAnswer([...isDataa]);
    } else {
      setDataQuestionAnswer([]);
    }
    if (sub_category_type_id && Number(sub_category_type_id) == 7) {
      let logicForSpecficTab = data.data && data.data.key ? data.data.key : "";
      let isProfileMenuData = await JSON.parse(
        await getAsyncStorage("myProfileData")
      );
      if (logicForSpecficTab == "selected") {
        isProfileMenuData[1].isSelected = true;
      } else {
        isProfileMenuData[1].isSelected = false;
      }
      await setAsyncStorage(
        "myProfileData",
        JSON.stringify([...isProfileMenuData])
      );
    }
    setLoader(false);
  };

  const onCompleteDemo = async () => {
    const { data, message } = await AuthApi.postDataToServer(
      Api.demoSurveyCompleteDemoServey
    );
    if (!data) {
      setLoader(false);
      setTimeout(() => {
        Singular.event("survey_complete");

        // toastShow(message);
      }, 100);
      return;
    }
  };

  const onUpdate = async () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
      return;
    }
    const payload = {
      address_line_1: isConatctInfo.address1,
      address_line_2: isConatctInfo.address2,
      city: isConatctInfo.city,
      zipcode: isConatctInfo.zipcode ? isConatctInfo.zipcode.trim() : "",
      state: isConatctInfo.state_id,
    };
    setLoader(true);
    const { data, message } = await AuthApi.putDataToServer(
      Api.basicInfoContactInfo,
      payload
    );
    if (!data) {
      setLoader(false);
      let isZipData = message.split("Example:");
      if (isZipData && isZipData[1] && isZipData[1].length > 0) {
        setTimeout(() => {
          toastShow(I18n.t(globalText._enterValidPostCode));
        }, 100);
      } else {
        toastShow(message && message);
      }
      return;
    }
    await onCompleteDemo();
    setLoader(false);
    await onPressClose(isNameRemainToFill);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      swipeDirection="down"
      onRequestClose={onRequestClose}
    >
      <StatusBar
        barStyle={"light-content"}
        translucent
        backgroundColor={colors.TRANSPARENT}
        opacity={0.1}
        statusBarTranslucent
      />
      <View style={styles.demoSurveyMainModalView}>
        {loader && <CustomLoader noModal />}
        <View style={styles.demoSurveyMainModalViewStyle}>
          <View style={styles.height100}>
            <TouchableOpacity
              style={[styles.alignSelfFlexEnd, styles.padd15]}
              onPress={onPressCross}
            >
              <AntDesign name={"close"} size={25} color={colors.ABBEY} />
            </TouchableOpacity>
            {isDataLoaded &&
              isDataQuestionAnswer &&
              isDataQuestionAnswer.length > 0 && (
                <CustomQuestionAnswerSample
                  data={
                    isDataQuestionAnswer && new Array(isDataQuestionAnswer[0])
                  }
                  onSaveAnswer={(
                    selectedData,
                    isChildArr,
                    isParent,
                    sub_category_type_id
                  ) =>
                    onSaveAnswer(
                      selectedData,
                      isChildArr,
                      isParent,
                      sub_category_type_id
                    )
                  }
                />
              )}
            {isDataLoaded &&
              isDataQuestionAnswer &&
              isDataQuestionAnswer.length == 0 && (
                <KeyboardAwareScrollView
                  contentContainerStyle={
                    styles.changePasswordContentContainerStyle
                  }
                  extraScrollHeight={50}
                  nestedScrollEnabled
                  keyboardShouldPersistTaps={"handled"}
                  alwaysBounceVertical={false}
                >
                  <ScrollView
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    style={styles.height90}
                  >
                    <View style={styles.padd15}>
                      <Text style={styles.headerBold}>
                        {I18n.t(globalText.contactInformation)}
                      </Text>
                      <View style={styles.marT10}>
                        <Text style={styles.txtStyleNew}>
                          {I18n.t(globalText.address)}
                          <Text style={styles.redTxt}> *</Text>
                        </Text>
                        <View style={styles.marT5}>
                          <CustomTextInput
                            textStyle={styles.colorFaintGrey}
                            headerName={I18n.t(globalText.addressLine1)}
                            placeholder={I18n.t(
                              globalText.enterAdd1
                            ).toLowerCase()}
                            term={isConatctInfo.address1}
                            onChangeText={(text) => {
                              isConatctInfo.address1 = text;
                              setConatctInfo({ ...isConatctInfo });
                            }}
                            // onBlur={() =>
                            //     !allValid && simpleValidator.current.showMessageFor('address1')
                            // }
                            onBlur={() =>
                              !allValid &&
                              simpleValidator.current.showMessageFor("address1")
                            }
                          />
                        </View>
                        {simpleValidator.current.message(
                          "address1",
                          isConatctInfo.address1,
                          "required|string|min:2"
                        ) && (
                          <Text style={[styles.redColorText, styles.marL10]}>
                            {isConatctInfo.address1 &&
                            isConatctInfo.address1.length > 0
                              ? I18n.t(globalText._theValueAtleastCharcters, {
                                  _value: I18n.t(
                                    globalText.address
                                  ).toLowerCase(),
                                  _number: 2,
                                })
                              : I18n.t(globalText._theMessageMustBeRequired, {
                                  _message: I18n.t(
                                    globalText.address
                                  ).toLowerCase(),
                                })}
                          </Text>
                        )}
                        <View style={styles.marT5}>
                          <CustomTextInput
                            textStyle={styles.colorFaintGrey}
                            headerName={I18n.t(globalText.addressLine2)}
                            placeholder={I18n.t(
                              globalText.enterAdd2
                            ).toLowerCase()}
                            term={isConatctInfo.address2}
                            onChangeText={(text) => {
                              isConatctInfo.address2 = text;
                              setConatctInfo({ ...isConatctInfo });
                            }}
                          />
                        </View>
                      </View>
                      <View style={styles.marT10}>
                        <CustomTextInput
                          imp
                          headerName={I18n.t(globalText.city)}
                          placeholder={I18n.t(
                            globalText.enterCity
                          ).toLowerCase()}
                          term={isConatctInfo.city}
                          onChangeText={(text) => {
                            isConatctInfo.city = text;
                            setConatctInfo({ ...isConatctInfo });
                          }}
                          onBlur={() =>
                            !allValid &&
                            simpleValidator.current.showMessageFor("city")
                          }
                        />
                        {simpleValidator.current.message(
                          "city",
                          isConatctInfo.city,
                          "required|alpha_space|min:2"
                        ) && (
                          <Text style={[styles.redColorText, styles.marL10]}>
                            {isConatctInfo.city && isConatctInfo.city.length > 2
                              ? I18n.t(globalText._theValueMustBeValid, {
                                  _firstValue: I18n.t(
                                    globalText.city
                                  ).toLowerCase(),
                                  _lastValue: I18n.t(
                                    globalText.city
                                  ).toLowerCase(),
                                })
                              : isConatctInfo.city &&
                                isConatctInfo.city.length > 0
                              ? I18n.t(globalText._theValueAtleastCharcters, {
                                  _value: I18n.t(globalText.city).toLowerCase(),
                                  _number: 2,
                                })
                              : I18n.t(globalText._theMessageMustBeRequired, {
                                  _message: I18n.t(
                                    globalText.city
                                  ).toLowerCase(),
                                })}
                          </Text>
                        )}
                      </View>
                      <View
                        style={[
                          styles.marT10,
                          Platform.OS == "ios" && styles.zIndex1,
                        ]}
                      >
                        <Text style={styles.txtStyle}>
                          {I18n.t(globalText.stateAndProvince)}
                          <Text style={styles.redTxt}> *</Text>
                        </Text>
                        <View style={{ height: isOpenIndex ? 200 : null }}>
                          <CustomDropDown
                            zIndex={1}
                            placeholder={I18n.t(globalText.selectState)}
                            defaultValue={isConatctInfo.state}
                            placeholderStyle={styles.colorAlto}
                            open={openState}
                            value={stateValue}
                            items={stateList}
                            setOpen={setOpenState}
                            setValue={setStateValue}
                            setItems={setStateList}
                            displayKey={"state_name"}
                            dropDownContainerStyleNew={styles.heightStatic150}
                            onItemChoose={(item) => {
                              isConatctInfo.state = item.state_name;
                              isConatctInfo.state_id = item.state_id;
                              setConatctInfo({ ...isConatctInfo });
                            }}
                            onOpen={() => {
                              setOpenIndex(true);
                            }}
                            onClose={() => {
                              setOpenIndex(false);
                            }}
                          />
                        </View>
                        {simpleValidator.current.message(
                          I18n.t(globalText.state),
                          stateValue,
                          "required"
                        ) && (
                          <Text style={[styles.redColorText, styles.marL10]}>
                            {I18n.t(globalText._theMessageMustBeRequired, {
                              _message: I18n.t(globalText.state).toLowerCase(),
                            })}
                          </Text>
                        )}

                        {/* {CustomValidation.fieldErrorMsg(
                                            simpleValidator,
                                            I18n.t(globalText.state),
                                            isConatctInfo.state,
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
                      <View style={styles.marT10}>
                        <CustomTextInput
                          imp
                          headerName={I18n.t(globalText.postCodeZipCode)}
                          placeholder={I18n.t(globalText.enterPostCodeZipCode)}
                          // term={isConatctInfo.zipcode.trim()}
                          term={
                            isConatctInfo.zipcode
                              ? isConatctInfo.zipcode.trim()
                              : ""
                          }
                          keyboardType={"email-address"}
                          onChangeText={(text) => {
                            isConatctInfo.zipcode = text;
                            setConatctInfo({ ...isConatctInfo });
                          }}
                          onBlur={() =>
                            !allValid &&
                            simpleValidator.current.showMessageFor("code")
                          }
                        />
                        {simpleValidator.current.message(
                          "code",
                          isConatctInfo.zipcode,
                          "required"
                        ) && (
                          <Text style={[styles.redColorText, styles.marL10]}>
                            {I18n.t(globalText._theMessageMustBeRequired, {
                              _message: I18n.t(
                                globalText.postCodeZipCode
                              ).toLowerCase(),
                            })}
                          </Text>
                        )}
                        {/* {simpleValidator.current.message(
                                                'code',
                                                isConatctInfo.zipcode,
                                                'required|integer|min:3',
                                            ) && (
                                                <Text style={[styles.redColorText, styles.marL10]}>
                                                    {isConatctInfo.zipcode && isConatctInfo.zipcode.length > 2
                                                        ? I18n.t(globalText._theValueMustBeValid, {
                                                              _firstValue: I18n.t(
                                                                  globalText.postCodeZipCode,
                                                              ).toLowerCase(),
                                                              _lastValue: I18n.t(globalText.number).toLowerCase(),
                                                          })
                                                        : isConatctInfo.zipcode && isConatctInfo.zipcode.length > 0
                                                        ? I18n.t(globalText._theValueAtleastNumber, {
                                                              _value: I18n.t(globalText.postCodeZipCode).toLowerCase(),
                                                              _number: 3,
                                                          })
                                                        : I18n.t(globalText._theMessageMustBeRequired, {
                                                              _message: I18n.t(
                                                                  globalText.postCodeZipCode,
                                                              ).toLowerCase(),
                                                          })}
                                                </Text>
                                            )} */}
                      </View>
                      <View style={[styles.marT20, styles.alignSelfCenter]}>
                        <TouchableOpacity
                          style={styles.demoSureyAuthButton}
                          onPress={() => {
                            onUpdate();
                          }}
                        >
                          <Text style={styles.demoSureyAuthButtonName}>
                            {isNameRemainToFill.length > 0
                              ? I18n.t(globalText.next)
                              : I18n.t(globalText.submit)}
                          </Text>
                          {isNameRemainToFill.length > 0 && (
                            <FontAwesome
                              name={"chevron-right"}
                              size={13}
                              color={colors.WHITE}
                              style={styles.marL5}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </KeyboardAwareScrollView>
              )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default DemoSurvey;
