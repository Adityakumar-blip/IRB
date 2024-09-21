/* eslint-disable quotes */
import React, {useState, Fragment, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Linking,
  Platform,
} from 'react-native';
import CustomButton from '../../component/customButton/index';
import CustomHeader from '../../component/customHeader/index';
import globalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
import colors from '../../styles/colors';
import EmailReferral from '../emailReferral/index';
import ReferNow from '../referNow/index';
import RefferEarnStepComponent from './refferEarnStepComponent';
import FocusAwareStatusBar from '../../component/customStatusBar/index';
import I18n from '../../i18n/index';
import {getAsyncStorage, toastShow} from '../../utils/customFunctions';
import CustomLoader from '../../component/customLoader/index';
import {constant} from '../../utils/constants';
import {firebase} from '@react-native-firebase/dynamic-links';
import FastImage from '../../component/FastImage';
import Share, {Social} from 'react-native-share';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import {MenuProvider} from 'react-native-popup-menu';
import {ShareDialog} from 'react-native-fbsdk';
import {Singular} from 'singular-react-native';

const RefferEarn = props => {
  const [isReferModal, setReferModal] = useState(false);
  const [isEmailModal, setEmailModal] = useState(false);
  const [isUserDetail, setUserDetail] = useState(null);
  const [loader, setLoader] = useState(false);
  const [categotyData, setCategotyData] = useState([]);
  const [imageSource, setImageSource] = useState([
    {
      id: 1,
      source: globalImages.friendsIcon,
      description: I18n.t(globalText.referStep_1),
    },
    {
      id: 2,
      source: globalImages.referralIcon,
      description: I18n.t(globalText.referStep_2),
    },
    {
      id: 3,
      source: globalImages.basicSetupIcon,
      description: I18n.t(globalText.referStep_3),
    },
    {
      id: 5,
      source: globalImages.bonusIcon,
      description: I18n.t(globalText.referStep_5),
    },
    {
      id: 4,
      source: globalImages.surveyIcon,
      description: I18n.t(globalText.referStep_4),
    },
  ]);
  const [isReferAmount, setReferAmount] = useState({});

  useEffect(() => {
    onPageInit();
    Singular.event('refer&earn');
  }, []);

  const onPageInit = async () => {
    setLoader(true);
    const getBasicInfo = await JSON.parse(await getAsyncStorage('Login_Data'));
    setUserDetail(getBasicInfo && getBasicInfo);
    const isProfileMenuData = await JSON.parse(
      await getAsyncStorage('myProfileData'),
    );
    setCategotyData(isProfileMenuData);
    await getReferAmount();
    setLoader(false);
  };

  const getReferAmount = async () => {
    const endPoint = Api.referAndEarn_earn_xx;
    const {data, message} = await AuthApi.getDataFromServer(endPoint);
    if (!data) {
      toastShow(message);
      return;
    }
    let isData = data && data.data;
    setReferAmount(isData);
  };

  const generateLink = async id => {
    const link = await firebase.dynamicLinks().buildShortLink({
      link: `https://opinionbureau.page.link/?${id}&${'false'}&${'0'}`,
      android: {
        packageName: 'com.opinionbureau',
        fallbackUrl: 'https://opinionbureau.page.link',
      },
      ios: {
        bundleId: 'com.ios.opinionbureau',
      },
      domainUriPrefix: 'https://opinionbureau.page.link',
      // otherPlatform: {
      //     fallbackUrl: `https://irbproject.page.link`,
      // },
    });
    return link;
  };

  const onShare = async type => {
    setReferModal(false);

    let eventname = 'Refer_though_' + type;
    Singular.event(eventname);
    let shareParameter = [];
    const getLink = await generateLink(isUserDetail.userid);
    const newLink = getLink;
    if (getLink) {
      type == 'facebook'
        ? shareParameter.push('u=' + encodeURI(getLink))
        : type == 'twitter'
        ? shareParameter.push('url=' + encodeURI(getLink))
        : type == 'liknedin'
        ? shareParameter.push('url=' + encodeURI(getLink))
        : null;
    }

    if (type == 'liknedin' && Platform.OS !== 'ios') {
      Share.shareSingle({
        url: newLink,
        social: Share.Social.LINKEDIN,
        showAppsToView: false,
      });
      //}
      // else if (type == 'facebk') {
      //     // Share.shareSingle({
      //     //     title: 'shareVia',
      //     //     message: 'I am message',
      //     //     caption: 'I am a caption',
      //     //     url: newLink,
      //     //     social: Share.Social.FACEBOOK,
      //     //     contentDescription: 'Facebook sharing is easy!',
      //     //     quote: 'I am quote',
      //     //     type: 'url',
      //     // });
      //     let photoUri = 'https://www.opinionbureau.com/images/logo-large.png';
      //     const shareLinkContent = {
      //         contentType: 'photo',
      //         contentUrl: newLink,
      //         photos: [{ imageUrl: photoUri }],
      //     };
      //     ShareDialog.show(shareLinkContent);
    } else {
      const url =
        type == 'facebook'
          ? `http://www.facebook.com/sharer.php?u=${newLink}`
          : type == 'twitter'
          ? constant['twetterShareLink'] + shareParameter.join('&')
          : type == 'whatsup'
          ? `${constant['whatsAppShareLink']}?text=${newLink}`
          : type == 'liknedin'
          ? // `${constant['linkedinShareLink']}?url=${newLink}`
            `${constant['linkedinShareLinkNew']}&url=${newLink}`
          : type == 'skype'
          ? `${constant['skypeShareLink']}?url=${newLink}`
          : null;

      Linking.openURL(url)
        .then(res => {
          // Alert.alert(`${type} Opened`);
        })
        .catch(() => {
          type == 'whatsup'
            ? Linking.openURL(
                Platform.OS == 'ios'
                  ? constant['whatsAppIosPlayStore']
                  : constant['whatsAppAndroidPlayStore'],
              )
            : null;
        });
    }
  };

  const onCall = (item, item1, index) => {
    props.navigation.navigate('Basic_Profile', {
      data: item,
      id: item1.sub_category_type_id,
    });
  };

  return (
    <MenuProvider>
      <Fragment>
        <SafeAreaView style={styles.refferEarnFragmentView}></SafeAreaView>
        <SafeAreaView style={styles.height100}>
          {loader && <CustomLoader />}
          <FocusAwareStatusBar
            barStyle="dark-content"
            translucent={true}
            backgroundColor={colors.TEA_ROSE}
          />
          <ScrollView bounces={false} style={styles.height100BackWhite}>
            <View style={styles.referHeaderView}>
              <CustomHeader
                headerName={I18n.t(globalText.referAndEarn)}
                drawer
                onPressLeftIcon={() => props.navigation.openDrawer()}
                threeDotNeed
                categotyData={categotyData && categotyData}
                onCall={(item, item1, index) => onCall(item, item1, index)}
              />
            </View>

            <View style={styles.refferEarnLogoView}>
              <FastImage
                source={globalImages.refferLogoIcon}
                resizeMode="contain"
                style={styles.refferEarnLogo}
              />
              <View style={styles.refferEarnWalletView}>
                <View style={styles.refferEarnWalletView_1}>
                  <FastImage
                    source={globalImages.walletIcon}
                    resizeMode={'contain'}
                    style={styles.refferEarnWallet}
                  />

                  <View style={styles.ph10}>
                    <Text style={styles.fontSize12}>
                      {I18n.t(globalText.referFriendAndEarnXX, {
                        _earn: isReferAmount.currency_symbol
                          ? `${isReferAmount.currency_symbol} ${isReferAmount.reward_amount}`
                          : '',
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.refferEarnStepView}>
              <Text style={styles.refferEarnStepTitle}>
                {I18n.t(globalText.howItWork)}
              </Text>
              <View style={styles.refferEarnStepRenderView}>
                {imageSource &&
                  imageSource.map((item, index) => (
                    <View key={index} style={styles.width33per}>
                      <RefferEarnStepComponent
                        source={item.source}
                        description={item.description}
                        stepNumber={item.id}
                      />
                    </View>
                  ))}
              </View>

              <View style={styles.alignItemCenter}>
                <CustomButton
                  needImageinButton
                  buttonName={I18n.t(globalText.referNow)}
                  source={globalImages.shareWhiteIcon}
                  onPress={() => setReferModal(true)}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        {isReferModal && (
          <ReferNow
            onRequestClose={() => setReferModal(false)}
            onPress={() => {
              setEmailModal(true);
              setReferModal(false);
            }}
            onPressFacebook={() => onShare('facebook')}
            onPressTwitter={() => onShare('twitter')}
            onPressWhatsApp={() => onShare('whatsup')}
            onPressLinkedIn={() => onShare('liknedin')}
            onPressSkype={() => onShare('skype')}
            onPressOutside={() => {
              setReferModal(false);
              setEmailModal(false);
            }}
          />
        )}

        {isEmailModal && (
          <EmailReferral
            userDetials={isUserDetail}
            onRequestClose={() => setEmailModal(false)}
            onPress={() => {
              setEmailModal(false);
              // props.navigation.navigate('Faq');
            }}
            onPressOutside={() => {
              setReferModal(false);
              setEmailModal(false);
            }}
          />
        )}
      </Fragment>
    </MenuProvider>
  );
};

export default RefferEarn;
