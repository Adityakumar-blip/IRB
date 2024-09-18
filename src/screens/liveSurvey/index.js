import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Linking,
  Platform,
} from "react-native";
import CustomBackGround from "../../component/customBackground/index";
import CustomHeader from "../../component/customHeader/index";
import CustomLiveSurvey from "../../component/customLiveSurvey/index";
import styles from "../../helper/globalStyles";
import { globalText } from "../../helper/globalText";
import I18n from "../../i18n/index";
import Api from "../../utils/api";
import AuthApi from "../../utils/authApi";
import CustomLoader from "../../component/customLoader/index";
import { toastShow, getAsyncStorage } from "../../utils/customFunctions";
import { useIsFocused } from "@react-navigation/native";
// import { Image, G } from 'react-native-svg';

import Svg, { SvgUri, Image } from "react-native-svg";
import { Singular } from "singular-react-native";

const LiveSurvey = (props) => {
  const [loader, setLoader] = useState(false);
  const [isLiveSurevyData, setLiveSurevyData] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [currencyValue, setCurrencyValue] = useState("");
  const isFocused = useIsFocused();
  const [categotyData, setCategotyData] = useState([]);

  useEffect(() => {
    Singular.event("liveSurvey");
    onPageInit();
    return () => {
      cleanUp();
    };
  }, [isFocused]);

  const cleanUp = () => {
    setLiveSurevyData([]);
  };

  const onPageInit = async () => {
    setLoader(true);
    const getCurrenctySymbol = await getAsyncStorage("currencySymbol");
    const isProfileMenuData = await JSON.parse(
      await getAsyncStorage("myProfileData")
    );
    setCategotyData(isProfileMenuData);
    setCurrencyValue(getCurrenctySymbol && getCurrenctySymbol);
    await getLiveSurveyList();
    setLoader(false);
  };

  const getLiveSurveyList = async () => {
    const endPoint = `${Api.getLiveSurveyList}`;
    // const endPoint = 'https://msobversion.pasmt.com/api/panelistreward/11068161';
    const { data, message } = await AuthApi.getDataFromServer(endPoint);
    if (!data) {
      setDataLoaded(true);
      toastShow(message);
      return;
    }
    if (data && data.data && data.data.data) {
      const isData = await data.data.data;
      if (typeof isData != "string") {
        setLiveSurevyData(isData && isData);
      } else {
        setLiveSurevyData([]);
      }
      setDataLoaded(true);
    } else {
      setLiveSurevyData([]);
      setDataLoaded(true);
    }
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
              headerName={I18n.t(globalText.liveSurvey)}
              onPressLeftIcon={() => props.navigation.openDrawer()}
              threeDotNeed
              categotyData={categotyData && categotyData}
              onCall={(item, item1, index) => onCall(item, item1, index)}
            />

            {loader && <CustomLoader />}
            <View style={styles.height100BackWhite}>
              {/* <SvgUri
                                width={30}
                                height={30}
                                uri={'https://www.opinionbureau.com/images/flags/4x3/af.svg'}
                            /> */}

              <Text style={styles.lSurvTextStyle}>
                {I18n.t(globalText._livesurveyCountMsg, {
                  _count:
                    isDataLoaded &&
                    isLiveSurevyData &&
                    isLiveSurevyData.length > 0
                      ? isLiveSurevyData.length
                      : 0,
                })}
              </Text>
              {isDataLoaded &&
              isLiveSurevyData &&
              isLiveSurevyData.length > 0 ? (
                <ScrollView>
                  <View style={styles.padd80}>
                    {isLiveSurevyData &&
                      isLiveSurevyData.length > 0 &&
                      isLiveSurevyData.map((item, index) => (
                        <CustomLiveSurvey
                          currencyValue={currencyValue}
                          key={item.surveyId}
                          headFirstText={item.surveyCode}
                          dollar={item.cpi}
                          name={item.surveyTitle}
                          desrp={item.surveyDescription}
                          time={`${item.loi}:00 ${I18n.t(globalText._mins)}`}
                          onPress={async () =>
                            await Linking.openURL(item.takeSurveyLink)
                          }
                        />
                      ))}
                  </View>
                </ScrollView>
              ) : (
                isDataLoaded && (
                  <View style={styles.noRecordText}>
                    <Text style={styles.textCenter}>
                      {I18n.t(globalText.noRecordFound)}
                    </Text>
                  </View>
                )
              )}
            </View>
          </SafeAreaView>
        }
      />
    </View>
  );
};
export default LiveSurvey;
