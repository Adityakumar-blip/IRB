import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import CustomBackGround from "../../component/customBackground/index";
import CustomHeader from "../../component/customHeader/index";
import styles from "../../helper/globalStyles";
import CustomButton from "../../component/customButton/index";
import CustomTextInput from "../../component/customTextInput/index";
import { globalText } from "../../helper/globalText";
import colors from "../../styles/colors";
import I18n from "../../i18n/index";
import CustomValidation from "../../utils/CustomValidation";
import SimpleReactValidator from "simple-react-validator";
import authApi from "../../utils/authApi";
import Api from "../../utils/api";
import { toastShow, getAsyncStorage } from "../../utils/customFunctions";
import CustomLoader from "../../component/customLoader/index";
import { Singular } from "singular-react-native";

const PointConversion = (props) => {
  const simpleValidator = useRef(new SimpleReactValidator());
  const [loader, setLoader] = useState(false);
  const [pointConversion, setPointConversion] = useState(null);
  const [allValid, setAllValid] = useState(true);

  const [threesholdLimit, setThreesholdLimit] = useState({});
  const [redeemableAmount, setRedeemableAmount] = useState({});
  const [remainingBalance, setRemainingBalance] = useState({});

  const [pointConversionWarning, setPointConversionWarning] = useState(false);

  const [categotyData, setCategotyData] = useState([]);
  useEffect(() => {
    Singular.event("PointConversion");
    onPageInit();
  }, []);

  const onPageInit = async () => {
    setLoader(true);
    const isProfileMenuData = await JSON.parse(
      await getAsyncStorage("myProfileData")
    );
    setCategotyData(isProfileMenuData);
    await getThresholdLimit();
    await getRemainingBalance();
    await getRedeemablePoint();
    setLoader(false);
  };

  useEffect(() => {
    onValidationCheck();
  }, [redeemableAmount, threesholdLimit, pointConversionWarning]);

  const onValidationCheck = () => {
    let amt =
      Number(redeemableAmount.earnedPoint) -
      Number(redeemableAmount.point_redeemed);
    if (amt < threesholdLimit.redemption_point_cash_conversion) {
      setPointConversionWarning(true);
    } else {
      setPointConversionWarning(false);
    }
  };

  const getThresholdLimit = async () => {
    const { data, message } = await authApi.getDataFromServer(
      Api.pointsConversionThresholdLimit
    );
    if (!data) {
      toastShow((message && message) || I18n.t(globalText.somethingWentWrong));
      return;
    }
    const temp = await data.data[0];
    setThreesholdLimit(temp);
  };

  const getRedeemablePoint = async () => {
    const { data, message } = await authApi.getDataFromServer(
      Api.pointsConversionRedeemablePoint
    );
    if (!data) {
      toastShow((message && message) || I18n.t(globalText.somethingWentWrong));
      return;
    }
    const temp = await data.data;
    setRedeemableAmount(temp);
  };

  const getRemainingBalance = async () => {
    const { data, message } = await authApi.getDataFromServer(
      Api.pointsConversionRemainingBalance
    );
    if (!data) {
      toastShow((message && message) || I18n.t(globalText.somethingWentWrong));
      return;
    }
    const temp = await data.data;
    setRemainingBalance(temp);
  };

  const onPressSubmit = async () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      setAllValid(false);
      simpleValidator.current.showMessages();
      return;
    }
    let amt =
      Number(redeemableAmount.earnedPoint) -
      Number(redeemableAmount.point_redeemed);
    if (amt < Number(threesholdLimit.redemption_point_cash_conversion)) {
      return toastShow(
        I18n.t(globalText.pointConversionRedeemabaleIssue, {
          _point: threesholdLimit.redemption_point_cash_conversion,
        })
      );
    }
    // if (
    //     pointConversion &&
    //     threesholdLimit &&
    //     threesholdLimit.redemption_point_cash_conversion &&
    //     pointConversion < Number(threesholdLimit.redemption_point_cash_conversion)
    // ) {
    // return toastShow(
    //     I18n.t(globalText._converPointLimitMsg, {
    //         _redemptionPoint: threesholdLimit.redemption_point_cash_conversion,
    //     }),
    // );
    // }
    if (pointConversion > amt) {
      return toastShow(I18n.t(globalText.pointConversionWarningMsg));
    }
    if (pointConversion > remainingBalance.remaining_balance) {
      return toastShow(I18n.t(globalText._yoHaveLowBalanace));
    }
    setPointConversionWarning(false);
    setLoader(true);
    let payload = {
      remaining_balance: remainingBalance && remainingBalance.remaining_balance,
      points_requested: pointConversion && pointConversion,
    };
    const { data, message } = await authApi.postDataToServer(
      Api.pointsConversionRewardRedeemRequest,
      payload
    );
    setLoader(false);
    if (!data) {
      message == "pointConvertRequestTimeLesser"
        ? // ? toastShow(I18n.t(globalText.pointConvertRequestTimeLesser))
          toastShow(
            I18n.t(globalText._timeLimitMsg, {
              _num: 5,
            }),
            "LONG"
          )
        : message == "totalPointConvertRequestInOneDayExceed"
        ? // ? toastShow(I18n.t(globalText.totalPointConvertRequestInOneDayExceed))
          toastShow(I18n.t(globalText._twoReqMsg), "LONG")
        : toastShow(
            (message && message) || I18n.t(globalText.somethingWentWrong)
          );
      return;
    }
    props.navigation.goBack();
    setTimeout(() => {
      toastShow(I18n.t(globalText._pointConversionSuccessMessage));
    }, 1000);
  };

  const onCall = (item, item1, index) => {
    props.navigation.navigate("Basic_Profile", {
      data: item,
      id: item1.sub_category_type_id,
    });
  };

  return (
    <View style={styles.container}>
      <CustomBackGround
        screen={
          <SafeAreaView style={styles.height100}>
            <CustomHeader
              headerName={I18n.t(globalText.pointConversionForm)}
              onPressLeftIcon={() => props.navigation.openDrawer()}
              threeDotNeed
              categotyData={categotyData && categotyData}
              onCall={(item, item1, index) => onCall(item, item1, index)}
            />
            {loader && <CustomLoader />}
            <View style={styles.height100BackWhite}>
              <ScrollView>
                <View style={styles.padd80}>
                  <View style={styles.padd15}>
                    {pointConversionWarning && (
                      <View style={styles.pCmainYellowView}>
                        <Text style={styles.pointConversionWarningMsg}>
                          {I18n.t(globalText.pointConversionWarningMsg)}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.pointConversionBalanceText}>
                      {I18n.t(globalText.remainingBalance)}
                    </Text>

                    <Text style={styles.pointConversionAmount}>
                      {remainingBalance && remainingBalance.remaining_balance
                        ? typeof Number(remainingBalance.remaining_balance) ==
                          "number"
                          ? Number(remainingBalance.remaining_balance)
                          : 0
                        : 0}
                    </Text>
                    <Text style={styles.pointConversionBalanceText}>
                      {I18n.t(globalText.redeemablePoint)}
                    </Text>
                    <Text style={styles.pointConversionAmount}>
                      {redeemableAmount.earnedPoint
                        ? Number(redeemableAmount.earnedPoint) -
                          Number(redeemableAmount.point_redeemed)
                        : 0}
                    </Text>
                    <Text style={styles.redemptionRequestMinAmountThreshold}>
                      ({I18n.t(globalText.minThresholdLimit)}{" "}
                      {threesholdLimit.redemption_point_cash_conversion &&
                        threesholdLimit.redemption_point_cash_conversion}
                      )
                    </Text>
                    <View style={styles.marT25}>
                      <CustomTextInput
                        headerName={I18n.t(globalText.enterPointConversion)}
                        inputMainViewNew={[
                          styles.pointConversionInput,
                          pointConversionWarning
                            ? styles.colorFaintGreyBackground
                            : null,
                        ]}
                        txtInptStyle={styles.height100}
                        keyboardType="number-pad"
                        onChangeText={(txt) => setPointConversion(Number(txt))}
                        onBlur={() =>
                          CustomValidation.onBlurField(
                            simpleValidator,
                            allValid,
                            I18n.t(globalText.enterPointConversion)
                          )
                        }
                        editable={!pointConversionWarning}
                      />
                    </View>
                    {simpleValidator.current.message(
                      I18n.t(globalText.enterPointConversion),
                      pointConversion,
                      "required|integer|numeric|min:1,num"
                    ) && (
                      <View style={styles.marT10}>
                        <Text style={styles.redColorText}>
                          {I18n.t(globalText._theMessageMustBeRequired, {
                            _message: I18n.t(globalText.enterPointConversion),
                          })}
                        </Text>
                      </View>
                    )}
                    <View style={styles.pointConversionSubmitButtonView}>
                      <CustomButton
                        buttonName={I18n.t(globalText.submit)}
                        addButtonStyle={[
                          styles.pointConversionSubmitButton,
                          pointConversionWarning && pointConversionWarning
                            ? { opacity: 0.5 }
                            : null,
                        ]}
                        addButtonTextStyle={styles.font18}
                        onPress={() => {
                          // if (!pointConversionWarning) {
                          onPressSubmit();
                          // }
                        }}
                        activeOpacity={
                          pointConversionWarning && pointConversionWarning
                            ? 1
                            : 0
                        }
                        disabled={
                          pointConversionWarning && pointConversionWarning
                        }
                      />
                    </View>
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
export default PointConversion;
