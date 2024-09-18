import dynamicLinks from '@react-native-firebase/dynamic-links';
import {createDrawerNavigator, useDrawerStatus} from '@react-navigation/drawer';
import {
  DrawerActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Account_statement from '../screens/account_statement';
import AddSocialProfile from '../screens/addSocialProfile';
import Basic_Profile from '../screens/basic_profile';
// import RefferCollegue from "_screens/RefferrCollegue";

import Culture from '../screens/culture';
import Dashboard from '../screens/dashboard';
import GlobalInsight from '../screens/globalInsight';
import GlobalInsightDetail from '../screens/globalInsightDetail';
import LatestPoleTrend from '../screens/latestPoleTrend/index';
import LiveSurvey from '../screens/liveSurvey';
import NeedHelp from '../screens/needHelp';
import PointConversion from '../screens/pointConversion';
import PrivacyAndSetting from '../screens/privacyAndSetting';

import RefferCollegue from '../screens/refferCollegue/index';

import RedemptionRequestForm from '../screens/redemptionRequestForm';
import * as React from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import globalImages from '../helper/globalImages';
import styles from '../helper/globalStyles';
import {globalText} from '../helper/globalText';
import I18n from '../i18n/index';
import Auth from '../screens/authentication/index';
import Faq from '../screens/faqs/index';
import Notifications from '../screens/notification/index';
import ProfileHealthAndFitnes from '../screens/profileHealthAndFitnes/index';
import ProfileLeisureActivities from '../screens/profileLeisureActivities/index';
import ProfileOccupation from '../screens/profileOccupation/index';
import ProfileTechnology from '../screens/profileTechnology/index';
import RefferEarn from '../screens/reffeEarn/index';
import SharedService from '../services/sharedService';
import {
  SET_BACKGROUND_NOTIFICATION,
  SET_DEMO_SURVEY_STATUS,
  SET_ON_LOGOUT,
} from '../store/action';
import {
  clearAsyncStorage,
  getAsyncStorage,
  notificationType,
  setAsyncStorage,
} from '../utils/customFunctions';
import {Singular} from 'singular-react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = ({navigation}) => {
  const isDrawerOpen = useDrawerStatus();
  const dispatch = useDispatch();

  const [basicInfo, setBasicInfo] = React.useState({});
  const [notificationCount, setNotificationCount] = React.useState(0);
  const [isProfileImage, setProfileImage] = React.useState('');
  const [myProfileBaicProfileData, setMyProfileBaicProfileData] =
    React.useState(null);
  const [userData, setUserData] = React.useState({});

  const focused = useIsFocused();

  const handleDynamicLink = async link => {
    let url = link.url;
    if (url) {
      let storeConstant = null;
      if (url) {
        const arrUrl = url.split('?');
        const inviteCode = arrUrl[1];
        const allData = inviteCode.split('&');
        storeConstant = {
          reference_Link: allData[1] == 'true' ? '' : url,
          reference_Id: allData[0],
          profileSurvey: allData[1],
          vendor_Id: allData[2] ? allData[2] : '0',
          source_Id: allData[3] ? allData[3] : '0',
        };
        await setAsyncStorage('INVITE_URL', JSON.stringify(storeConstant));
        let payload = {
          demo_survey_taken:
            storeConstant.profileSurvey.toString() == 'true' ? 'NO' : 'YES',
        };
        dispatch(SET_DEMO_SURVEY_STATUS({...payload}));
        navigation.navigate('Dashboard', {refresh: true});
      } else {
        navigation.navigate('Dashboard', {refresh: true});
      }
    }
  };

  React.useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the is component unmounted, remove the listener
    return () => unsubscribe();
  });

  React.useEffect(() => {
    if (isDrawerOpen) onPageInit();
  }, [focused, isDrawerOpen]);

  const onPageInit = async () => {
    let userInfo = await JSON.parse(await getAsyncStorage('Login_Data'));
    setUserData(userInfo);
    await onGetDetails();
  };

  const onGetDetails = async () => {
    const basicMyProfileData = await JSON.parse(
      await getAsyncStorage('profileFirstValue'),
    );
    setMyProfileBaicProfileData(basicMyProfileData);
    const getBasicInfo = await JSON.parse(await getAsyncStorage('Login_Data'));
    const getCount = await getAsyncStorage('notification_count');
    const ProfileImage = await JSON.parse(
      await getAsyncStorage('ProfileImage'),
    );
    setProfileImage(ProfileImage);
    if (getBasicInfo && getBasicInfo && Object.keys(getBasicInfo).length > 0) {
      let temp = await getBasicInfo;
      setBasicInfo(temp);
    }
    setNotificationCount(getCount && getCount > -1 ? getCount : 0);
  };

  const onLogOutPress = async params => {
    Alert.alert(
      '',
      I18n.t(globalText._areYouSureWantToLogout),
      [
        {text: I18n.t(globalText.yes), onPress: () => confirmLogout()},
        {text: I18n.t(globalText.no)},
      ],
      {
        cancelable: true,
      },
    );
  };
  const confirmLogout = async () => {
    Singular.event('user_logout');

    await clearAsyncStorage();
    await dispatch(SET_ON_LOGOUT());

    navigation.replace('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.drawerCloseIconView}
        onPress={() => navigation.closeDrawer()}>
        <FastImage
          resizeMode="contain"
          source={globalImages.maskIcon}
          style={styles.drawerCloseIcon}
        />
      </TouchableOpacity>
      <View style={styles.drawerScreenMainView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Basic_Profile', {
              data: myProfileBaicProfileData && myProfileBaicProfileData,
              id:
                myProfileBaicProfileData &&
                myProfileBaicProfileData.items[0].sub_category_type_id,
            })
          }
          style={styles.drawerScreenViewMainView_1}>
          <View>
            <FastImage
              resizeMode="contain"
              source={
                isProfileImage && isProfileImage.length > 5
                  ? {uri: `data:image/png;base64,${isProfileImage}`}
                  : globalImages.userIconStatic
              }
              style={styles.drawerProfileImage}
            />
          </View>
          <Text style={styles.drawerProfileName}>
            {basicInfo && basicInfo.first_name && basicInfo.first_name}{' '}
            {basicInfo && basicInfo.last_name && basicInfo.last_name}
          </Text>
        </TouchableOpacity>
        <View style={styles.marT50}></View>
        <View style={styles.drawerScreenViewMainView_1}>
          <View style={styles.drawerScreenIconView}>
            <FastImage
              resizeMode="contain"
              source={globalImages.homeIcon}
              style={styles.drawerScreenIcon}
            />
          </View>

          <TouchableOpacity
            style={styles.drawerScreenNameView}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Dashboard');
            }}>
            <Text style={styles.drawerScreenName}>
              {I18n.t(globalText.home)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerScreenViewMainView_1}>
          <View style={styles.drawerScreenIconView}>
            <FastImage
              resizeMode="contain"
              source={globalImages.notificationIcon}
              style={styles.drawerScreenIcon}
            />
          </View>

          <TouchableOpacity
            style={styles.drawerScreenNameView}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Notifications');
            }}>
            <View style={styles.alignSelfBaseline}>
              <Text style={styles.drawerScreenName}>
                {I18n.t(globalText.notifications)}
              </Text>
              {notificationCount > 0 && (
                <View style={styles.drawerNotificationCountView}>
                  <Text style={styles.drawerNotificationCount}>
                    {notificationCount ? notificationCount : 0}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerScreenViewMainView_1}>
          <View style={styles.drawerScreenIconView}>
            <FastImage
              resizeMode="contain"
              source={globalImages.accountProfileIcon}
              style={styles.drawerScreenIcon}
            />
          </View>

          <TouchableOpacity
            style={styles.drawerScreenNameView}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Account_statement');
            }}>
            <Text style={styles.drawerScreenName}>
              {I18n.t(globalText.accStatement)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerScreenViewMainView_1}>
          <View style={styles.drawerScreenIconView}>
            <FastImage
              resizeMode="contain"
              source={globalImages.referEarnIcon}
              style={styles.drawerScreenIcon}
            />
          </View>

          <TouchableOpacity
            style={styles.drawerScreenNameView}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('RefferEarn');
            }}>
            <Text style={styles.drawerScreenName}>
              {I18n.t(globalText.referEarn)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerScreenViewMainView_1}>
          <View style={styles.drawerScreenIconView}>
            <FastImage
              resizeMode="contain"
              source={globalImages.latestPoleIcon}
              style={styles.drawerScreenIcon}
            />
          </View>

          <TouchableOpacity
            style={styles.drawerScreenNameView}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('LatestPoleTrend');
            }}>
            <Text style={styles.drawerScreenName}>
              {I18n.t(globalText.latestPoleAndTrend)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerScreenViewMainView_1}>
          <View style={styles.drawerScreenIconView}>
            <FastImage
              resizeMode="contain"
              source={globalImages.globalInsightIcon}
              style={styles.drawerScreenIcon}
            />
          </View>

          <TouchableOpacity
            style={styles.drawerScreenNameView}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('GlobalInsight');
            }}>
            <Text style={styles.drawerScreenName}>
              {I18n.t(globalText.globalInsights)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerScreenViewMainView_1}>
          <View style={styles.drawerScreenIconView}>
            <FastImage
              resizeMode="contain"
              source={globalImages.surveycheckIcon}
              style={styles.drawerScreenIcon}
            />
          </View>
          <TouchableOpacity
            style={styles.drawerScreenNameView}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('LiveSurvey');
            }}>
            <Text style={styles.drawerScreenName}>
              {I18n.t(globalText.liveSurvey)}
            </Text>
          </TouchableOpacity>
        </View>

        {userData?.membership_status == 'P' && (
          <View style={styles.drawerScreenViewMainView_1}>
            <View style={styles.drawerScreenIconView}>
              <FastImage
                resizeMode="contain"
                source={globalImages.referIcon}
                style={styles.drawerScreenIcon}
              />
            </View>

            <TouchableOpacity
              style={styles.drawerScreenNameView}
              onPress={() => {
                navigation.closeDrawer();
                navigation.navigate('RefferCollegue');
              }}>
              <Text style={styles.drawerScreenName}>
                {I18n.t(globalText.referCollegue)}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.drawerScreenViewMainView_1}>
          <View style={styles.drawerScreenIconView}>
            <FastImage
              resizeMode="contain"
              source={globalImages.privacyIcon}
              style={styles.drawerScreenIcon}
            />
          </View>

          <TouchableOpacity
            style={styles.drawerScreenNameView}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('PrivacyAndSetting');
            }}>
            <Text style={styles.drawerScreenName}>
              {I18n.t(globalText.privacyAndSett)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerScreenViewMainView_1}>
          <View style={styles.drawerScreenIconView}>
            <FastImage
              resizeMode="contain"
              source={globalImages.faqsLogoIcon}
              style={styles.drawerScreenIcon}
            />
          </View>

          <TouchableOpacity
            style={styles.drawerScreenNameView}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Faq');
            }}>
            <Text style={styles.drawerScreenName}>
              {I18n.t(globalText.faqs)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerScreenViewMainView_1}>
          <View style={styles.drawerScreenIconView}>
            <FastImage
              resizeMode="contain"
              source={globalImages.helpIcon}
              style={styles.drawerScreenIcon}
            />
          </View>

          <TouchableOpacity
            style={styles.drawerScreenNameView}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('NeedHelp');
            }}>
            <Text style={styles.drawerScreenName}>
              {I18n.t(globalText.help)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerScreenViewMainView_1}>
          <View style={styles.drawerScreenIconView}>
            <FastImage
              resizeMode="contain"
              source={globalImages.logoutIcon}
              style={styles.drawerScreenIcon}
            />
          </View>

          <TouchableOpacity
            style={[styles.drawerScreenNameView, styles.borderBottomZero]}
            onPress={async () => {
              navigation.closeDrawer();
              onLogOutPress();
            }}>
            <Text style={styles.drawerScreenName}>
              {I18n.t(globalText.logOut)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function DrawerNavigation({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        // gestureEnabled: false,
      })}>
      <Drawer.Screen name="Home" component={Home} />

      <Stack.Screen name="Basic_Profile" component={Basic_Profile} />
      <Stack.Screen name="AddSocialProfile" component={AddSocialProfile} />
      <Stack.Screen
        name="GlobalInsightDetail"
        component={GlobalInsightDetail}
      />
      <Stack.Screen name="LatestPoleTrend" component={LatestPoleTrend} />
      <Stack.Screen
        name="RedemptionRequestForm"
        component={RedemptionRequestForm}
      />
      <Stack.Screen name="PointConversion" component={PointConversion} />
      <Stack.Screen name="LiveSurvey" component={LiveSurvey} />
      <Stack.Screen name="Culture" component={Culture} />
      <Stack.Screen name="NeedHelp" component={NeedHelp} />
      <Stack.Screen name="RefferEarn" component={RefferEarn} />
      <Stack.Screen name="GlobalInsight" component={GlobalInsight} />
      <Stack.Screen name="Notifications" component={Notifications} />
      {/* <Stack.Screen name="RefferCollegue" component={RefferCollegue} /> */}
      <Stack.Screen name="PrivacyAndSetting" component={PrivacyAndSetting} />
      <Stack.Screen name="RefferCollegue" component={RefferCollegue} />
    </Stack.Navigator>
  );
}

function Home() {
  const navigation = useNavigation();
  const state = useSelector(state => state.state.BACKGROUND_NOTIFICATION);
  const dispatch = useDispatch();

  const navigateTo = async type => {
    if (Platform.OS == 'android' || Platform.OS == 'ios') {
      const pushAction = DrawerActions.jumpTo(await notificationType(type));
      await navigation.dispatch(pushAction);
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      let state = navigation.getState();
      if (
        state &&
        state?.history?.findIndex(it => it.type === 'drawer') !== -1
      ) {
        // Drawer is open
        handleDrawerOpen();
      } else {
        // Drawer is closed
        handleDrawerClose();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleDrawerOpen = () => {
    // Your logic when the drawer opens
    Singular.event('SideMenu_open');
    console.log('Drawer opened');
  };

  const handleDrawerClose = () => {
    // Your logic when the drawer closes
    Singular.event('SideMenu_close');
    console.log('Drawer closed');
  };
  React.useEffect(() => {
    (async () => {
      if (state) {
        // if (Platform.OS == 'android' && navigation?.canGoBack()) {
        //     await navigation.goBack();
        // }
        await navigateTo(state);
        setTimeout(() => {
          dispatch(SET_BACKGROUND_NOTIFICATION(''));
        }, 1000);
      }
    })();
  }, [state]);

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}
      backBehavior="history"
      useLegacyImplementation>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Account_statement" component={Account_statement} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      <Drawer.Screen name="RefferEarn" component={RefferEarn} />
      <Drawer.Screen
        name="LatestPoleTrend"
        component={LatestPoleTrend}
        options={{unmountOnBlur: true}}
      />
      <Drawer.Screen name="GlobalInsight" component={GlobalInsight} />
      <Drawer.Screen
        name="LiveSurvey"
        component={LiveSurvey}
        options={{unmountOnBlur: true}}
      />

      <Drawer.Screen
        name="RefferCollegue"
        component={RefferCollegue}
        options={{unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="PrivacyAndSetting"
        component={PrivacyAndSetting}
        options={{unmountOnBlur: true}}
      />
      <Drawer.Screen name="Auth" component={Auth} />
      <Drawer.Screen name="Faq" component={Faq} />
      <Drawer.Screen
        name="RedemptionRequestForm"
        component={RedemptionRequestForm}
        options={{unmountOnBlur: true}}
      />
      <Drawer.Screen
        name="PointConversion"
        component={PointConversion}
        options={{unmountOnBlur: true}}
      />
      <Drawer.Screen name="Basic_Profile" component={Basic_Profile} />
      <Drawer.Screen name="ProfileOccupation" component={ProfileOccupation} />
      <Drawer.Screen
        name="ProfileHealthAndFitnes"
        component={ProfileHealthAndFitnes}
      />
      <Drawer.Screen
        name="ProfileLeisureActivities"
        component={ProfileLeisureActivities}
      />
      <Drawer.Screen name="ProfileTechnology" component={ProfileTechnology} />
      <Drawer.Screen
        name="NeedHelp"
        component={NeedHelp}
        options={{swipeEnabled: false}}
      />
    </Drawer.Navigator>
  );
}
