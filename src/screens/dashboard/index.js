import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useRef, useState, useEffect} from 'react';
import {
  Alert,
  BackHandler,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  AppState,
} from 'react-native';
import FastImage from '../../component/FastImage';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomBackground from '../../component/customBackground/index';
import CustomButton from '../../component/customButton/index';
import CustomDashBoradSurvey from '../../component/customDashBoardSurvey';
import CustomLoader from '../../component/customLoader/index';
import globalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
// import I18n from '../../i18n/index';
import colors from '../../styles/colors';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import {
  getAsyncStorage,
  setAsyncStorage,
  toastShow,
} from '../../utils/customFunctions';
import DemoSurvey from '../DemoSurvey/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SharedService from '../../services/sharedService/index';
import {useNavigationState} from '@react-navigation/native';
import UpdateEmailMobile from '../updateEmailMobile';
import {useDispatch, useSelector} from 'react-redux';
import {SET_DEMO_SURVEY_STATUS} from '../../store/action';
import CustomHeader from '../../component/customHeader/index';
import NetworkLogger from 'react-native-network-logger';
// import { Singular, sngLog } from "singular-react-native";
import DeviceInfo from 'react-native-device-info';
import {useTranslation} from 'react-i18next';

const Dashboard = props => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const store = useSelector(state => state.state.CHECK_DEMO_SURVEY);
  let renderCount = 0;
  const _carousel = useRef(null);
  const [categotyData, setCategotyData] = useState([]);
  const [isDashboardData, setDashboardData] = useState({});
  const [loader, setLoader] = useState(false);
  const [basicInfo, setBasicInfo] = useState({});
  const [currencyValue, setCurrencyValue] = useState('');
  const [modal, setModal] = useState(false);
  const [isLinkData, setLinkData] = useState(null);
  const [isLiveSurveyData, setLiveSurveyData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCompleteDemoSurvey, setCompleteDemoSurvey] = useState(false);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [isEditDetails, setEditDetails] = useState(false);
  const [isEmailPhoneVerify, setEmailPhoneVerify] = useState({
    status: false,
    value: '',
  });

  const {width: screenWidth, height: screenHeight} = useWindowDimensions();
  const state = useNavigationState(state => state);
  const routeName = state.routeNames[state.index];
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      // const subscribe = AppState.addEventListener('change', handleChange);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        // subscribe.remove('change', handleChange);
      };
    }, []),
  );

  const checkForNetwork = async () => {
    await SharedService.networkChanged.subscribe(changed => {
      if (changed.isInternetReachable == null) {
        return;
      }
      if (!changed.isInternetReachable) {
        // onPageInit();
      } else {
        onPageInit();
      }
    });
  };

  useEffect(() => {
    // Singular.event("dashboard");

    let checkRefresh =
      props.route && props.route.params && props.route.params.refresh;
    if (checkRefresh) {
      onClickLink();
    }
  }, [props.route.params]);

  useEffect(() => {
    if (isFocused) {
      onPageInit(true);
    }
    return () => {
      cleanUp();
    };
  }, [isFocused]);

  const cleanUp = () => {
    setCategotyData([]);
    setDashboardData({});
  };

  useEffect(() => {
    if (
      store &&
      store.demo_survey_taken == 'NO' &&
      isCompleteDemoSurvey &&
      renderCount.toString() == '0'
    ) {
      setModal(true);
    }
  }, [isCompleteDemoSurvey]);

  const onBackPress = () => {
    Alert.alert(
      '',
      t(globalText.appExitMessage),
      [
        {text: t(globalText.yes), onPress: () => BackHandler.exitApp()},
        {text: t(globalText.no)},
      ],
      {cancelable: true},
    );
    return true;
  };

  const onCall = (item, item1, index) => {
    props.navigation.navigate('Basic_Profile', {
      data: item,
      id: item1.sub_category_type_id,
    });
  };

  const onClickLink = async () => {
    const checkData = await JSON.parse(await getAsyncStorage('INVITE_URL'));
    setLinkData(checkData && checkData);
    const getBasicInfo = await JSON.parse(await getAsyncStorage('Login_Data'));
    setBasicInfo(getBasicInfo);
    if (
      checkData &&
      checkData.profileSurvey == 'true' &&
      getBasicInfo.userid == checkData.reference_Id
    ) {
      setLoader(true);
      await onPageInit();
      let isData = {
        profileSurvey: false,
        reference_Id: checkData.reference_Id,
        reference_Link: checkData.reference_Link,
        source_Id: checkData.source_Id,
        vendor_Id: checkData.vendor_Id,
      };
      await setAsyncStorage('INVITE_URL', JSON.stringify(isData));
      let value = await JSON.parse(await getAsyncStorage('INVITE_URL'));
      setLinkData(value);
      setLoader(false);
    } else {
      // setLoader(false);
      return;
    }
  };

  const onPageInit = async (loader = true) => {
    setLoader(true);

    // let userInfo = await JSON.parse(await getAsyncStorage("Login_Data"));

    // alert(JSON.stringify(userInfo));
    // setLoader(loader ? true : false);
    const appLanguage = await getAsyncStorage('appLanguage');
    if (appLanguage) {
      i18n.changeLanguage(appLanguage);
    }
    const getBasicInfo = await JSON.parse(await getAsyncStorage('Login_Data'));
    setBasicInfo(getBasicInfo);
    // const isProfileMenuData = await JSON.parse(await getAsyncStorage('myProfileData'));
    // if (isProfileMenuData) {
    //     setCategotyData([...isProfileMenuData]);
    // } else {
    getcategorysubcategory();
    // }
    if (
      store &&
      store.demo_survey_taken == 'NO' &&
      renderCount.toString() == '0' &&
      getBasicInfo.demo_survey_taken == 'N'
    ) {
      // setLoader(true);
      setLoader(false);
      // setModal(true);
      setCompleteDemoSurvey(true);
      return;
    } else {
      await getDashboardDetail();
    }
    setCurrencyValue(
      getBasicInfo &&
        getBasicInfo.currency_symbol &&
        getBasicInfo.currency_symbol,
    );
    setLoader(false);
  };

  const getcategorysubcategory = async () => {
    const {data, message} = await AuthApi.getDataFromServer(
      Api.myProfileGetCategorySubcategory,
    );
    if (!data) {
      if (message) {
        toastShow(message);
        return;
      }
    }
    const isData = data && data.data && data.data.data;
    if (isData) {
      let count = 0;
      isData.map((item, index) => {
        if (item.category_id == '1') {
          item.items.map((i, j) => {
            if (i.name == t(globalText._basicProfileNew)) {
              count = count + 1;
            }
          });
        }
      });
      if (count == 0) {
        isData.map((item, index) => {
          if (index == 0) {
            item.items.unshift({
              name: t(globalText._basicProfileNew),
              sub_category_type: t(globalText._basicProfileNew),
              sub_category_type_id: 0,
            });
          }
        });
      }
      let profileFirstValue = isData[0];
      await setAsyncStorage(
        'profileFirstValue',
        JSON.stringify(profileFirstValue),
      );
      await setAsyncStorage('myProfileData', JSON.stringify([...isData]));
      setCategotyData([...isData]);
    }
  };

  const getDashboardDetail = async () => {
    const endPoint = `${Api.getDashboardDetail}`;
    const {data, message} = await AuthApi.getDataFromServer(endPoint);
    if (!data) {
      toastShow(t(globalText.somethingWentWrong));
      return;
    }
    if (data && data.data && Object.keys(data.data).length > 0) {
      let isData = await data.data;
      setDashboardData(isData);
      await setAsyncStorage(
        'notification_count',
        JSON.stringify(isData.notification_count),
      );
      if (typeof isData['latest surveys'] != 'string') {
        let isDataNEw =
          isData['latest surveys'] &&
          isData['latest surveys'].length > 0 &&
          isData['latest surveys'].filter((i, j) => j < 2);
        setLiveSurveyData(isDataNEw ? isDataNEw : []);
      }
      let getBasicInfo = await JSON.parse(await getAsyncStorage('Login_Data'));
      if (
        isData &&
        isData.demo_survey_taken &&
        isData.demo_survey_taken == 'N'
      ) {
        getBasicInfo.demo_survey_taken = 'N';
        await setAsyncStorage('Login_Data', JSON.stringify(getBasicInfo));
        setBasicInfo(getBasicInfo);
      } else {
        getBasicInfo.demo_survey_taken = 'Y';
        await setAsyncStorage('Login_Data', JSON.stringify(getBasicInfo));
        setBasicInfo(getBasicInfo);
      }
    }
  };

  const _renderItem = ({item, index}) => {
    if (index < 5) {
      return (
        <View style={styles.row}>
          <View key={index} style={styles.dashboardLiveSurveyBox}>
            <Text style={styles.dashboardLiveSurveyBoxTitle}>
              {/* {t(globalText._yourProfessionSurveys)} */}
              {item?.surveyTitle}
            </Text>

            <Text style={styles.dashboardLiveSurveyId}>{item.surveyCode}</Text>

            <View style={styles.dashboardLiveSurveyContentView}>
              <View style={styles.marR5}>
                <MaterialCommunityIcons
                  name="clock-time-three-outline"
                  size={15}
                  color={'grey'}
                />
              </View>
              <Text style={styles.dashboardLiveSurveyContent}>
                {item.loi}:00 {t(globalText._mins)}
              </Text>
            </View>

            <View style={styles.dashboardLiveSurveyContentView}>
              <View style={styles.marR5}>
                <Feather name="star" size={15} color={'grey'} />
              </View>
              <Text style={styles.dashboardLiveSurveyContent}>
                {currencyValue} {item.cpi}
              </Text>
            </View>

            <View style={styles.alignSelfCenter}>
              <TouchableOpacity
                style={[
                  styles.cSurvGreenTextView,
                  styles.dashboardLiveSurveyButton,
                ]}
                onPress={async () =>
                  await Linking.openURL(item.takeSurveyLink)
                }>
                <Text style={styles.cSurvGreenTextStyle}>
                  {t(globalText._takeTheSurvey)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {index == isLiveSurveyData.length - 1 && (
            <View
              style={{
                width: screenWidth / 2 - 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons
                name="arrow-forward-circle"
                size={40}
                onPress={() => props.navigation.navigate('LiveSurvey')}
              />
            </View>
          )}
        </View>
      );
    }
  };

  const pagination = (dotLen = 0) => {
    return (
      <SafeAreaView style={[styles.container, styles.alignItemCenter]}>
        <View
          style={{
            alignItems: 'center',
            width: screenWidth,
          }}>
          {/* <Pagination
            activeDotIndex={activeSlide}
            dotsLength={dotLen}
            dotStyle={styles.dashDotStyle}
            inactiveDotStyle={styles.dashInactiveDotStyle}
            dotColor={colors.RED_VOILET}
            inactiveDotColor={colors.WHITE}
            inactiveDotScale={1}
            inactiveDotOpacity={0.8}
            containerStyle={styles.dashDotContainerStyle}
            carouselRef={_carousel}
          /> */}
        </View>
      </SafeAreaView>
    );
  };

  const checkEmailVerified = async () => {
    if (basicInfo && (!basicInfo.username || basicInfo.username == '')) {
      setEditDetails(true);
      return;
    }
    props.navigation.navigate('RedemptionRequestForm');
  };

  const getLoginData = async () => {
    const getBasicInfo = await JSON.parse(await getAsyncStorage('Login_Data'));
    setBasicInfo(getBasicInfo);
  };

  return (
    <>
      {/* <View style={{height:30}}></View>
      <View style={{height:260}}>
                <NetworkLogger theme="dark" />
            </View> */}

      {modal && (
        <DemoSurvey
          visible={modal}
          onPressCross={async () => {
            // await setAsyncStorage('demoCount', JSON.stringify('1'));
            let payload = {
              demo_survey_taken: 'YES',
            };
            dispatch(SET_DEMO_SURVEY_STATUS({...payload}));
            setCompleteDemoSurvey(false);
            setModal(false);
            renderCount++;
            await onPageInit();
          }}
          onPressClose={async value => {
            // await setAsyncStorage('demoCount', JSON.stringify('1'));
            let payload = {
              demo_survey_taken: 'YES',
            };
            dispatch(SET_DEMO_SURVEY_STATUS({...payload}));
            setCompleteDemoSurvey(false);
            setModal(false);
            renderCount++;
            if (value && value.length > 0) {
              isEmailPhoneVerify.status = true;
              isEmailPhoneVerify.value = value;
              setEmailPhoneVerify({...isEmailPhoneVerify});
            } else {
              await onPageInit();
            }
          }}
          onRequestClose={async () => {
            // await setAsyncStorage('demoCount', JSON.stringify('1'));
            let payload = {
              demo_survey_taken: 'YES',
            };
            dispatch(SET_DEMO_SURVEY_STATUS({...payload}));
            setCompleteDemoSurvey(false);
            setModal(false);
            renderCount++;
            await onPageInit();
          }}
        />
      )}

      {isEditDetails && (
        <UpdateEmailMobile
          isName={'email'}
          onRequestClose={() => setEditDetails(false)}
          onPressCross={() => setEditDetails(false)}
          isFirstName={basicInfo && basicInfo.first_name}
          onSetUpdatedEmailOrMobile={async () => {
            setLoader(true);
            await getLoginData();
            setLoader(false);
            setEditDetails(false);
          }}
        />
      )}

      {isEmailPhoneVerify && isEmailPhoneVerify.status && (
        <UpdateEmailMobile
          isName={isEmailPhoneVerify.value}
          onRequestClose={async () => {
            renderCount++;
            setEmailPhoneVerify(false);
            await onPageInit();
          }}
          onPressCross={async () => {
            renderCount++;
            setEmailPhoneVerify(false);
            await onPageInit();
          }}
          onSetUpdatedEmailOrMobile={async () => {
            renderCount++;
            setEmailPhoneVerify(false);
            await onPageInit();
          }}
          isFirstName={basicInfo && basicInfo.first_name}
        />
      )}

      <View style={styles.container}>
        <CustomBackground
          screen={
            <View style={styles.height100}>
              {/* {loader && <CustomLoader isVisible={loader} />} */}
              <CustomHeader
                headerName={t(globalText.dashboard)}
                onPressLeftIcon={() => props.navigation.openDrawer()}
                threeDotNeed
                categotyData={categotyData && categotyData}
                onCall={(item, item1, index) => onCall(item, item1, index)}
              />

              {/* <View style={styles.headerMainViewStyle}>
                                    <View style={styles.headerMainView}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                props.navigation.openDrawer();
                                            }}
                                            style={styles.width10AlignLeft}
                                        >
                                            <MaterialIcons name={'menu'} size={25} color={colors.ABBEY} />
                                        </TouchableOpacity>
                                        <View style={styles.width80}>
                                            <View style={styles.rowCenter}>
                                                <Text numberOfLines={1} style={styles.headerTextStyle}>
                                                    {t(globalText.dashboard)}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.width10AlignRight}>
                                            <Menu style={styles.dashMenustyle}>
                                                <MenuTrigger>
                                                    <Entypo
                                                        name={'dots-three-vertical'}
                                                        size={20}
                                                        color={colors.ABBEY}
                                                    />
                                                </MenuTrigger>
                                                <MenuOptions
                                                    optionsContainerStyle={[
                                                        styles.dashMenuContainerStyle,
                                                        {
                                                            marginTop:
                                                                Platform.OS == 'ios'
                                                                    ? 40
                                                                    : StatusBar.currentHeight + 10,
                                                        },
                                                    ]}
                                                >
                                                    <ScrollView>
                                                        <View style={styles.paddB20}>
                                                            <View style={[styles.menuStatusView, styles.marT10]}>
                                                                <View style={styles.width20} />
                                                                <View style={styles.width80}>
                                                                    <Text style={styles.dashProfColor}>
                                                                        {t(globalText.myProfile)}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            {categotyData &&
                                                                categotyData.length > 0 &&
                                                                categotyData.map((item, index) => (
                                                                    <View key={index} style={styles.marT10}>
                                                                        <View style={styles.menuStatusView}>
                                                                            <View style={styles.width20AligItCenter}>
                                                                                <FastImage
                                                                                    resizeMode={'contain'}
                                                                                    style={styles.dashboadrMenuIcon}
                                                                                    source={
                                                                                        item.category_type_mobile_image
                                                                                            ? {
                                                                                                  uri: item.category_type_mobile_image,
                                                                                              }
                                                                                            : globalImages.familyIcon
                                                                                    }
                                                                                />
                                                                            </View>
                                                                            <View style={styles.width80}>
                                                                                <Text style={styles.pinkColorStyle}>
                                                                                    {item.category_name}
                                                                                </Text>
                                                                            </View>
                                                                        </View>
                                                                        <View
                                                                            style={[
                                                                                styles.menuStatusView,
                                                                                styles.marT5,
                                                                            ]}
                                                                        >
                                                                            <View style={styles.width20} />
                                                                            <View
                                                                                style={styles.width80WithBorder}
                                                                            ></View>
                                                                        </View>

                                                                        {item.items &&
                                                                            item.items.length > 0 &&
                                                                            item.items.map((item1, index1) => (
                                                                                <View
                                                                                    key={index1}
                                                                                    style={styles.menuStatusView}
                                                                                >
                                                                                    <View style={styles.width20} />
                                                                                    <View
                                                                                        style={[
                                                                                            categotyData.length - 1 ==
                                                                                                index &&
                                                                                            item.items.length - 1 ==
                                                                                                index1
                                                                                                ? styles.width80
                                                                                                : styles.width80WithBorder,
                                                                                        ]}
                                                                                    >
                                                                                        {item1.sub_category_type && (
                                                                                            <MenuOption
                                                                                                style={{}}
                                                                                                onSelect={() => {
                                                                                                    onCall(
                                                                                                        item,
                                                                                                        item1,
                                                                                                        index,
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                <Text
                                                                                                    style={
                                                                                                        styles.menuBlueColor
                                                                                                    }
                                                                                                >
                                                                                                    {item1.sub_category_type &&
                                                                                                        item1.sub_category_type}
                                                                                                </Text>
                                                                                            </MenuOption>
                                                                                        )}
                                                                                    </View>
                                                                                </View>
                                                                            ))}
                                                                    </View>
                                                                ))}
                                                        </View>
                                                    </ScrollView>
                                                </MenuOptions>
                                            </Menu>
                                        </View>
                                    </View>
                                </View> */}
              <ScrollView>
                <View style={styles.pad15}>
                  <View>
                    <Text style={styles.dashboardStatisticText}>
                      {t(globalText._Hi)}{' '}
                      {`${
                        basicInfo && basicInfo.first_name
                          ? basicInfo.first_name
                          : ''
                      } ${
                        basicInfo && basicInfo.last_name
                          ? basicInfo.last_name
                          : ''
                      }!`}{' '}
                      {t(globalText._dashbaordTextThisIsYourStatistics, {
                        _year: basicInfo?.membersinceyear
                          ? basicInfo?.membersinceyear
                          : '',
                      })}
                    </Text>
                  </View>

                  <View style={styles.marT15}>
                    <View style={styles.dashBoardWhiteBack}>
                      <CustomDashBoradSurvey
                        surveyQualifed={
                          isDashboardData && isDashboardData['survey qualified']
                            ? Number(isDashboardData['survey qualified'])
                            : 0
                        }
                        rewardsEarn={
                          isDashboardData && isDashboardData['reward earned']
                            ? isDashboardData['reward earned']
                                .toString()
                                .indexOf('.') == -1
                              ? currencyValue +
                                ' ' +
                                Number(
                                  isDashboardData['reward earned'],
                                ).toFixed(2)
                              : currencyValue +
                                ' ' +
                                Number(
                                  isDashboardData['reward earned'],
                                ).toFixed(2)
                            : currencyValue + ' ' + '0.00'
                        }
                        pointEarned={
                          isDashboardData && isDashboardData['point earned']
                            ? Number(isDashboardData['point earned'])
                            : 0
                        }
                        pointRedeemed={
                          isDashboardData && isDashboardData['point redeemed']
                            ? Number(isDashboardData['point redeemed'])
                              ? currencyValue +
                                ' ' +
                                Number(
                                  isDashboardData['point redeemed'],
                                ).toFixed(2)
                              : currencyValue + ' ' + '0.00'
                            : currencyValue + ' ' + '0.00'
                        }
                      />
                    </View>
                  </View>
                  <>
                    <View
                      style={[styles.dashboardPointStatusView, styles.marT25]}>
                      <View
                        style={[
                          styles.shadowBox,
                          styles.dashboardPointStatusBox,
                        ]}>
                        <FastImage
                          source={globalImages.reedemableDashboardIcon}
                          style={styles.dashboardPointStatusIcon}
                          resizeMode="contain"
                        />
                        <View style={styles.dashboardPointStatusText}>
                          <Text style={styles.cSurvFirstTextStyleNew}>
                            {t(globalText._yourRedeemable)}
                          </Text>
                          <Text style={styles.cSurvFirstTextStyleNew}>
                            {t(globalText._balanceToday)}
                          </Text>
                        </View>
                        <View style={styles.marB13}>
                          <Text style={styles.cSurvPointStyle}>
                            {currencyValue + ' '}
                            {isDashboardData['Redeemable Balance today']
                              ? isDashboardData['Redeemable Balance today']
                                  .toString()
                                  .indexOf('.') == -1
                                ? isDashboardData[
                                    'Redeemable Balance today'
                                  ].toFixed(2)
                                : isDashboardData[
                                    'Redeemable Balance today'
                                  ].toFixed(2)
                              : '0.00'}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={[styles.cSurvGreenTextView, styles.marB5]}
                          onPress={() => checkEmailVerified()}>
                          <Text style={styles.cSurvGreenTextStyle}>
                            {t(globalText._Redeem)}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={[
                          styles.shadowBox,
                          styles.dashboardPointStatusBox,
                        ]}>
                        <FastImage
                          source={globalImages.rewardDashboardIcon}
                          style={styles.dashboardPointStatusIcon}
                          resizeMode="contain"
                        />
                        <View style={styles.dashboardPointStatusText}>
                          <Text style={styles.cSurvFirstTextStyleNew}>
                            {t(globalText._rewardPoint)}
                          </Text>
                          <Text style={styles.cSurvFirstTextStyleNew}>
                            {t(globalText.balance)}
                          </Text>
                        </View>
                        <View style={styles.marB13}>
                          <Text style={styles.cSurvPointStyle}>
                            {isDashboardData['Reward Point balance']
                              ? isDashboardData['Reward Point balance']
                                  .toString()
                                  .indexOf('.') == -1
                                ? isDashboardData['Reward Point balance']
                                : ''
                              : 0}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={[styles.cSurvGreenTextView, {marginBottom: 5}]}
                          onPress={() =>
                            props.navigation.navigate('PointConversion')
                          }>
                          <Text style={styles.cSurvGreenTextStyle}>
                            {t(globalText._convert)}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                  {isLiveSurveyData && isLiveSurveyData.length > 0 && (
                    <View>
                      <Text
                        numberOfLines={1}
                        style={styles.dashBoardLiveSurveyMsgNEw}>
                        {t(globalText.liveSurvey)}
                      </Text>
                      {/* <Carousel
                        // loopClonesPerSide={2}
                        layout={'default'}
                        ref={_carousel}
                        data={isLiveSurveyData}
                        renderItem={_renderItem}
                        sliderWidth={screenWidth}
                        itemWidth={(screenWidth - 20) / 2}
                        useScrollView={true}
                        // loop={true}
                        onSnapToItem={index => setActiveSlide(index)}
                        enableSnap
                        // pagingEnabled
                        activeSlideAlignment={'start'}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                      /> */}
                      {pagination(isLiveSurveyData && isLiveSurveyData.length)}
                    </View>
                  )}
                  <View style={styles.marginTop35}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('LatestPoleTrend')
                      }
                      style={styles.dashboardLatestPollButton}>
                      <View style={styles.dashboardLatestPollButtonView}>
                        <Text>
                          {t(globalText._goToThe)}{' '}
                          <Text style={styles.latesPollsTextStyle}>
                            {t(globalText._latestPolls)}
                          </Text>
                        </Text>
                        <FastImage
                          source={globalImages.arrowDashboardICon}
                          style={styles.dashboardLatestPollButtonIcon}
                          resizeMode="contain"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.padH10, styles.marT30]}>
                    <Text style={styles.dashboardProfileStatusText}>
                      {/* {t(globalText.dashScrp)} */}
                      {t(globalText._dashbaordComplition, {
                        _percentage: isDashboardData.percentage
                          ? isDashboardData.percentage
                          : '0%',
                      })}
                    </Text>
                  </View>

                  {isDashboardData.percentage && isDashboardData.percentage && (
                    <View style={[styles.marT30, styles.alignSelfCenter]}>
                      <CustomButton
                        buttonName={
                          isDashboardData.percentage &&
                          isDashboardData.percentage !== '100%'
                            ? t(globalText.completeYrProfile)
                            : t(globalText.editYourProfile)
                        }
                        addButtonStyle={styles.dashboardCompleteButtonText}
                        addButtonTextStyle={styles.font18}
                        onPress={() =>
                          props.navigation.navigate('Basic_Profile', {
                            data: categotyData[0],
                            id: 0,
                          })
                        }
                      />
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          }
        />
      </View>
    </>
  );
};

export default Dashboard;
