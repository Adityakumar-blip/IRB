import React, {useEffect, useRef, useState} from 'react';
import {Platform, SafeAreaView, ScrollView, Text, View} from 'react-native';
import SimpleReactValidator from 'simple-react-validator';
import CustomBackGround from '../../component/customBackground/index';
import CustomButton from '../../component/customButton/index';
import CustomDropDown from '../../component/customDropdown';
import CustomHeader from '../../component/customHeader/index';
import CustomLoader from '../../component/customLoader/index';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
import I18n from '../../i18n/index';
import Api from '../../utils/api';
import authApi from '../../utils/authApi';
import {getAsyncStorage, toastShow} from '../../utils/customFunctions';
import CustomValidation from '../../utils/CustomValidation';
// import NetworkLogger from "react-native-network-logger";
import AddSocialProfile from '../../screens/addSocialProfile';
import {Singular} from 'singular-react-native';

const RedemptionRequestForm = props => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const [loader, setLoader] = useState(false);
  const [allValid, setAllValid] = useState(true);
  const [currencyValue, setCurrencyValue] = useState('');

  const [threesholdLimit, setThreesholdLimit] = useState(null);
  const [remainingAmountStatus, setRemainingAmountStatus] = useState({});

  const [onChooseOption, setOnChooseOption] = useState({});
  const [onChooseAmount, setOnChooseAmount] = useState({});

  const [openRewardPartnerOptions, setOpenRewardPartnerOptions] =
    useState(false);
  const [rewardPartnerOption, setRewardPartnerOption] = useState(null);
  const [rewardPartnerOptionData, setRewardPartnerOptionData] = useState([]);

  const [openAmount, setOpenAmount] = useState(false);
  const [amount, setAmount] = useState(null);
  const [amountList, setAmountList] = useState([]);
  const [isValue, setValue] = useState(false);

  const [pointRedemptionWarning, setPointRedemptionWarning] = useState(false);

  const [isChecklimit, setChecklimit] = useState(false);
  const [categotyData, setCategotyData] = useState([]);

  const [previousPayload, setPreviousPayload] = useState(null);

  const [addSocialProfileModal, setAddSocialProfileModal] = useState(false);
  const [isLinkName, setLinkName] = useState('');

  useEffect(() => {
    Singular.event('RedemptionRequestForm');
    onPageInit();
  }, []);

  const onAddSocialProfile = name => {
    setLinkName(name);
    setAddSocialProfileModal(true);
  };

  const onPressSocialSubmit = async data => {
    data.type = 'upi_id';
    data.upi_link = data.link;
    await updateSocialProfile(data);
  };

  const updateSocialProfile = async (info = {}) => {
    setLoader(true);
    const payload = {
      type: info.type,
      link: info.link,
    };
    const {data, message} = await authApi.postDataToServer(
      Api.basicInfoAddSocialProfile,
      payload,
    );
    // setLoader(false);

    if (data) {
      onPressSubmit();
    }
    if (!data) {
      return;
    }
  };
  const onPageInit = async () => {
    setLoader(true);
    const getCurrenctySymbol = await getAsyncStorage('currencySymbol');
    setCurrencyValue(getCurrenctySymbol && getCurrenctySymbol);
    const isProfileMenuData = await JSON.parse(
      await getAsyncStorage('myProfileData'),
    );
    setCategotyData(isProfileMenuData);
    await getBalance();
    await getRewardPartnerOption();
    await getThresholdLimit();
    setLoader(false);
  };

  useEffect(() => {
    onAmountData();
  }, [onChooseOption.panel_reward_id, onChooseOption.redeemable_option_id]);

  const onAmountData = async () => {
    setValue(true);
    await getRewardPartnerOptionAmount();
    setValue(false);
  };

  // useEffect(() => {
  //     getThresholdLimit();
  // }, [onChooseOption]);

  const getBalance = async () => {
    const {data, message} = await authApi.getDataFromServer(
      Api.redemmableAmountRemainingBalance,
    );
    if (!data) {
      toastShow((message && message) || I18n.t(globalText.somethingWentWrong));
      return;
    }
    if (data && data.data) {
      let temp = await data.data;
      setRemainingAmountStatus(temp);
    }
  };

  const getRewardPartnerOption = async () => {
    const {data, message} = await authApi.getDataFromServer(
      Api.rewardPartnerOption,
    );
    if (!data) {
      toastShow((message && message) || I18n.t(globalText.somethingWentWrong));
      return;
    }
    if (data && data.data) {
      let temp = await data.data;
      setRewardPartnerOptionData(temp);
    }
  };

  const getRewardPartnerOptionAmount = async () => {
    if (onChooseOption.panel_reward_id && onChooseOption.redeemable_option_id) {
      setLoader(true);
      // const endPoint = Api.rewardPartnerOptionAmount;
      const endPoint = `${Api.rewardPartnerOptionAmount}?panel_reward_id=${onChooseOption.panel_reward_id}&redeemable_option_id=${onChooseOption.redeemable_option_id}`;
      const {data, message} = await authApi.getDataFromServer(endPoint);
      if (!data) {
        setLoader(false);
        toastShow(
          (message && message) || I18n.t(globalText.somethingWentWrong),
        );
        return;
      }
      if (data && data.data) {
        let temp = await data.data;
        if (temp && temp.length > 0) {
          temp = temp.map((i, j) => {
            i.amount_new = currencyValue + ' ' + i.reward_amount;
            temp = {...i};
            return temp;
          });
          setAmountList(temp);
        }
      }
      setLoader(false);
    }
  };

  const getThresholdLimit = async () => {
    setLoader(true);
    let endPoint = `${Api.threesholdLimit}`;
    const {data, message} = await authApi.getDataFromServer(endPoint);
    setLoader(false);
    if (!data) {
      setLoader(false);
      toastShow((message && message) || I18n.t(globalText.somethingWentWrong));
      return;
    }
    let temp = await data.data;
    if (temp && temp && temp.cash_redemption_limit) {
      setThreesholdLimit(temp.cash_redemption_limit);
    }
  };

  // const getThresholdLimit = async () => {
  //     if (onChooseOption.panel_id) {
  //         setLoader(true);
  //         let endPoint = `${Api.threesholdLimit}?panel_id=${onChooseOption.panel_id}`;
  //         const { data, message } = await authApi.getDataFromServer(endPoint);
  //         setLoader(false);
  //         if (!data) {
  //             setLoader(false);
  //             setChecklimit(true);
  //             toastShow((message && message) || I18n.t(globalText.somethingWentWrong));
  //             return;
  //         }
  //         let temp = await data.data;
  //         if (temp && temp && temp.cash_redemption_limit) {
  //             setThreesholdLimit(temp.cash_redemption_limit);
  //         }
  //         // if(temp.cash_redemption_limit > remainingAmountStatus.redemmable_amount){
  //         if (temp.cash_redemption_limit > remainingAmountStatus && remainingAmountStatus.remaining_balance) {
  //             setPointRedemptionWarning(true);
  //         } else {
  //             setPointRedemptionWarning(false);
  //         }
  //         setChecklimit(true);
  //         setTimeout(() => {
  //             setLoader(false);
  //         }, 100);
  //     }
  // };

  const onPressSubmit = async () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
      return;
    }
    if (
      threesholdLimit > remainingAmountStatus &&
      remainingAmountStatus.redemmable_amount
    ) {
      return toastShow(I18n.t(globalText.youDontHaveERedAmmount));
    }
    if (
      onChooseAmount &&
      onChooseAmount.reward_amount > remainingAmountStatus.redemmable_amount
    ) {
      return toastShow(I18n.t(globalText.youHaveLowAmountForRedemption));
    }

    // if (onChooseAmount && onChooseAmount.reward_amount < threesholdLimit) {
    //     return toastShow(
    //         I18n.t(globalText._redeemPointLimitMsg, {
    //             _threesholdLimit: threesholdLimit,
    //         }),
    //     );
    // }

    setPointRedemptionWarning(false);
    setLoader(true);

    let payload = {
      reward_type_id:
        onChooseAmount.reward_type_id && Number(onChooseAmount.reward_type_id),
      redemption_option_id:
        onChooseOption.redeemable_option_id &&
        Number(onChooseOption.redeemable_option_id),
      amount: onChooseAmount.reward_amount,
      option: onChooseOption.generic_value,
    };

    const {data, message} = await authApi.postDataToServer(
      Api.rewardRedeemptionRequestSubmit,
      previousPayload ? previousPayload : payload,
    );
    setLoader(false);

    if (!data) {
      setPreviousPayload(null);
      if (
        message &&
        message.validation_msg &&
        message.validation_msg.length > 0
      ) {
        toastShow(
          (message && message.validation_msg) ||
            I18n.t(globalText.somethingWentWrong),
          'LONG',
        );
        // onAddSocialProfile(I18n.t(globalText.upiLink));
        // setPreviousPayload(payload);
        return;
      }

      if (message != 'ok' || message != 'Ok') {
        onAddSocialProfile(I18n.t(globalText.upiLink));
        setPreviousPayload(payload);
      }
      toastShow((message && message) || I18n.t(globalText.somethingWentWrong));
      return;
    } else {
      setPreviousPayload(null);
      // alert("success");
      toastShow(I18n.t(globalText._redemptionSuccessMessage));

      setTimeout(() => {
        props.navigation.goBack();
      }, 100);
    }

    // setTimeout(() => {
    //   if (!previousPayload) {
    //     toastShow(I18n.t(globalText._redemptionSuccessMessage));
    //     setTimeout(() => {
    //       props.navigation.goBack();
    //     }, 100);
    //   }
    // }, 1000);
  };

  const onCall = (item, item1, index) => {
    props.navigation.navigate('Basic_Profile', {
      data: item,
      id: item1.sub_category_type_id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{padding: 5}}></View>
      {/* <NetworkLogger theme="dark" /> */}

      <CustomBackGround
        screen={
          <SafeAreaView style={styles.height100}>
            <CustomHeader
              headerName={I18n.t(globalText.redemptionRequest)}
              onPressLeftIcon={() => props.navigation.openDrawer()}
              threeDotNeed
              categotyData={categotyData && categotyData}
              onCall={(item, item1, index) => onCall(item, item1, index)}
            />
            {loader && <CustomLoader />}
            <View style={[styles.height100BackWhite, styles.padd80]}>
              <ScrollView>
                <View style={styles.padd80}>
                  <View style={styles.padd15}>
                    {remainingAmountStatus &&
                      Number(remainingAmountStatus.redemmable_amount) <
                        Number(threesholdLimit) && (
                        <View style={styles.redemptionRequestWarningMsgView}>
                          <Text style={styles.redemptionRequestWarningMsg}>
                            {I18n.t(globalText.redemptionRequestWarningMsg)}
                          </Text>
                        </View>
                      )}
                    <Text style={styles.redemptionRequestAmountTitle}>
                      {I18n.t(globalText.remainingBalance)}
                    </Text>
                    <View style={styles.redemptionRequestAmountView}>
                      <Text style={styles.redemptionRequestAmount}>
                        {currencyValue}
                        {remainingAmountStatus &&
                        remainingAmountStatus.remaining_balance
                          ? Number(
                              remainingAmountStatus.remaining_balance,
                            ).toFixed(2)
                          : '0.00'}
                      </Text>
                    </View>
                    <Text style={styles.redemptionRequestAmountTitle}>
                      {I18n.t(globalText.redeemableAmount)}
                    </Text>
                    <View style={styles.redemptionRequestAmountView}>
                      <Text style={styles.redemptionRequestAmount}>
                        {currencyValue}
                        {remainingAmountStatus &&
                        remainingAmountStatus.redemmable_amount
                          ? Number(
                              remainingAmountStatus.redemmable_amount,
                            ).toFixed(2)
                          : '0.00'}
                      </Text>
                    </View>
                    {threesholdLimit && threesholdLimit > 0 && (
                      <Text style={styles.redemptionRequestMinAmountThreshold}>
                        ({I18n.t(globalText.minThresholdLimit)} {currencyValue}{' '}
                        {threesholdLimit && threesholdLimit.toFixed(2)})
                      </Text>
                    )}
                    <View
                      style={[
                        styles.marT25,
                        Platform.OS == 'ios' && styles.zIndex2,
                      ]}>
                      <CustomDropDown
                        title={I18n.t(globalText.option)}
                        zIndex={2}
                        defaultValue={I18n.t(globalText.choose)}
                        // dropDStyleNew={styles.redemptionRequestDropDown}
                        dropDStyleNew={[
                          styles.redemptionRequestDropDown,
                          remainingAmountStatus &&
                            Number(remainingAmountStatus.redemmable_amount) <
                              Number(threesholdLimit) &&
                            styles.colorFaintGreyBackground,
                        ]}
                        open={openRewardPartnerOptions}
                        setOpen={setOpenRewardPartnerOptions}
                        value={rewardPartnerOption}
                        setValue={setRewardPartnerOption}
                        items={rewardPartnerOptionData}
                        setItems={setRewardPartnerOptionData}
                        displayKey={'generic_value'}
                        disabled={
                          remainingAmountStatus &&
                          Number(remainingAmountStatus.redemmable_amount) <
                            Number(threesholdLimit)
                        }
                        onItemChoose={async item => {
                          setAmount(null);
                          setOnChooseAmount({});
                          setPointRedemptionWarning(false);
                          let dt = await item;
                          setOnChooseOption({...dt});
                        }}
                        onOpen={() => setOpenAmount(false)}
                      />
                    </View>
                    {simpleValidator.current.message(
                      I18n.t(globalText.option),
                      rewardPartnerOption,
                      'required',
                    ) && (
                      <View style={[styles.marT10, styles.marL10]}>
                        <Text style={styles.redColorText}>
                          {I18n.t(globalText._theMessageMustBeRequired, {
                            _message: I18n.t(globalText.option),
                          })}
                        </Text>
                      </View>
                    )}

                    <View
                      style={[
                        styles.marT25,
                        Platform.OS == 'ios' && styles.zIndex1,
                      ]}>
                      <CustomDropDown
                        title={I18n.t(globalText.amount)}
                        zIndex={1}
                        defaultValue={I18n.t(globalText.choose)}
                        dropDStyleNew={[
                          styles.redemptionRequestDropDown,
                          remainingAmountStatus &&
                            Number(remainingAmountStatus.redemmable_amount) <
                              Number(threesholdLimit) &&
                            styles.colorFaintGreyBackground,
                        ]}
                        // dropDStyleNew={[
                        //     styles.redemptionRequestDropDown,
                        //     pointRedemptionWarning && styles.colorFaintGreyBackground,
                        // ]}
                        open={openAmount}
                        setOpen={setOpenAmount}
                        value={amount}
                        setValue={setAmount}
                        disabled={
                          remainingAmountStatus &&
                          Number(remainingAmountStatus.redemmable_amount) <
                            Number(threesholdLimit)
                        }
                        items={amountList}
                        setItems={setAmountList}
                        valueKey={'reward_type_id'}
                        labelKey={'amount_new'}
                        onItemChoose={async item => {
                          let dt = await item;
                          setOnChooseAmount({...dt});
                          // await setRewardTypeId(Number(item && item.reward_type_id));
                        }}
                        onOpen={() => setOpenRewardPartnerOptions(false)}
                      />
                    </View>
                    {Object.keys(onChooseOption).length > 0 &&
                      !isValue &&
                      simpleValidator.current.message(
                        I18n.t(globalText.amount),
                        amount,
                        'required',
                      ) && (
                        <View style={[styles.marT10, styles.marL10]}>
                          <Text style={styles.redColorText}>
                            {I18n.t(globalText._theMessageMustBeRequired, {
                              _message: I18n.t(globalText.amount),
                            })}
                          </Text>
                        </View>
                      )}

                    <View style={styles.redemptionRequestSubmitButtonView}>
                      <CustomButton
                        buttonName={I18n.t(globalText.submit)}
                        addButtonStyle={[
                          styles.redemptionRequestSubmitButton,
                          remainingAmountStatus &&
                          Number(remainingAmountStatus.redemmable_amount) <
                            Number(threesholdLimit)
                            ? {opacity: 0.5}
                            : null,
                        ]}
                        addButtonTextStyle={styles.font18}
                        onPress={() => onPressSubmit()}
                        activeOpacity={
                          remainingAmountStatus &&
                          Number(remainingAmountStatus.redemmable_amount) <
                            Number(threesholdLimit)
                            ? 1
                            : 0
                        }
                        disabled={
                          remainingAmountStatus &&
                          Number(remainingAmountStatus.redemmable_amount) <
                            Number(threesholdLimit)
                        }
                      />
                    </View>

                    {addSocialProfileModal && (
                      <>
                        <AddSocialProfile
                          name={isLinkName && isLinkName}
                          visible={addSocialProfileModal}
                          onRequestClose={() => setAddSocialProfileModal(false)}
                          onPressCancel={() => setAddSocialProfileModal(false)}
                          onPressSubmit={data => {
                            onPressSocialSubmit(data);
                            setAddSocialProfileModal(false);
                          }}
                          onPressOutside={() => setAddSocialProfileModal(false)}
                        />
                      </>
                    )}
                  </View>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        }
      />
    </View>
  );
};
export default RedemptionRequestForm;
