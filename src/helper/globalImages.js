import {Image} from 'react-native';
import FastImage from '../component/FastImage';

const imageUrl = img => {
  return {
    uri: Image.resolveAssetSource(img).uri,
    // priority: FastImage.priority.normal,
  };
};

function memoizedImageUrl() {
  let cache = {};

  return function (key, path) {
    if (key in cache) {
      return cache[key];
    } else {
      const img = imageUrl(path);
      cache[key] = img;
      return cache[key];
    }
  };
}

const memoizedFunc = memoizedImageUrl();

const imagesObj = {
  infoIcon: memoizedFunc('infoIcon', require('../assets/info.png')),

  userIconStatic: memoizedFunc(
    'userIconStatic',
    require('../assets/userImage.png'),
  ),
  fbIcon: memoizedFunc('fbIcon', require('../assets/fb.png')),
  linkedinIcon: memoizedFunc('linkedinIcon', require('../assets/in.png')),
  skypeIcon: memoizedFunc('skypeIcon', require('../assets/skype.png')),
  upiIcon: memoizedFunc('upiIcon', require('../assets/upi.jpg')),
  trashIcon: memoizedFunc('trashIcon', require('../assets/trash.png')),
  twitterIcon: memoizedFunc('twitterIcon', require('../assets/twitter.png')),
  webIcon: memoizedFunc('webIcon', require('../assets/web.png')),
  drawerStatic: memoizedFunc(
    'drawerStatic',
    require('../assets/drawerStatic.png'),
  ),
  cameraIcon: memoizedFunc('cameraIcon', require('../assets/camera.png')),
  componentIcon: memoizedFunc(
    'componentIcon',
    require('../assets/Component.png'),
  ),
  handIcon: memoizedFunc('handIcon', require('../assets/hand.png')),
  backgroundImage: memoizedFunc(
    'backgroundImage',
    require('../assets/backgroundImage.png'),
  ),
  logoIcon: memoizedFunc('logoIcon', require('../assets/logo.png')),
  sampleImageFirst: memoizedFunc(
    'sampleImageFirst',
    require('../assets/sampleImageFirst.png'),
  ),
  sampleImageSecond: memoizedFunc(
    'sampleImageSecond',
    require('../assets/sampleImageSecond.png'),
  ),
  shareIcon: memoizedFunc('shareIcon', require('../assets/share.png')),
  sampleImageThree: memoizedFunc(
    'sampleImageThree',
    require('../assets/sampleImageThree.png'),
  ),
  surveyorIcon: memoizedFunc('surveyorIcon', require('../assets/surveyor.png')),
  checkIcon: memoizedFunc('checkIcon', require('../assets/Check.png')),
  arrowIcon: memoizedFunc('arrowIcon', require('../assets/arrow.png')),
  threeDotIcon: memoizedFunc('threeDotIcon', require('../assets/threeDot.png')),
  crossIcon: memoizedFunc('crossIcon', require('../assets/cross.png')),
  rupeeBlueIcon: memoizedFunc(
    'rupeeBlueIcon',
    require('../assets/rupeeBlue.png'),
  ),
  rupeeGreenIcon: memoizedFunc(
    'rupeeGreenIcon',
    require('../assets/ruppeGreen.png'),
  ),
  clockTimeICon: memoizedFunc(
    'clockTimeICon',
    require('../assets/clock-time.png'),
  ),
  smartphoneIcon: memoizedFunc(
    'smartphoneIcon',
    require('../assets/smartphone.png'),
  ),
  facebookNewIcon: memoizedFunc(
    'facebookNewIcon',
    require('../assets/facebookNew.png'),
  ),
  inNewIcon: memoizedFunc('inNewIcon', require('../assets/inNew.png')),
  twitterNewIcon: memoizedFunc(
    'twitterNewIcon',
    require('../assets/twitterNew.png'),
  ),
  sharePinkIcon: memoizedFunc(
    'sharePinkIcon',
    require('../assets/sharePink.png'),
  ),
  cultureDemoIcon: memoizedFunc(
    'cultureDemoIcon',
    require('../assets/cultureDemo.png'),
  ),
  refferLogoIcon: memoizedFunc(
    'refferLogoIcon',
    require('../assets/refferLogo.png'),
  ),
  walletIcon: memoizedFunc('walletIcon', require('../assets/wallet.png')),
  friendsIcon: memoizedFunc('friendsIcon', require('../assets/friends.png')),
  referralIcon: memoizedFunc('referralIcon', require('../assets/referral.png')),
  basicSetupIcon: memoizedFunc(
    'basicSetupIcon',
    require('../assets/basicSetup.png'),
  ),
  bonusIcon: memoizedFunc('bonusIcon', require('../assets/bonus.png')),
  surveyIcon: memoizedFunc('surveyIcon', require('../assets/survey.png')),
  shareWhiteIcon: memoizedFunc(
    'shareWhiteIcon',
    require('../assets/shareWhite.png'),
  ),
  cellPhoneIcon: memoizedFunc(
    'cellPhoneIcon',
    require('../assets/cellPhone.png'),
  ),
  desktopIcon: memoizedFunc('desktopIcon', require('../assets/desktop.png')),
  starIcon: memoizedFunc('starIcon', require('../assets/star.png')),
  tabletIcon: memoizedFunc('tabletIcon', require('../assets/tablet.png')),
  settingsIcon: memoizedFunc('settingsIcon', require('../assets/settings.png')),
  shieldLockIcon: memoizedFunc(
    'shieldLockIcon',
    require('../assets/shieldLock.png'),
  ),
  whatsAppIcon: memoizedFunc('whatsAppIcon', require('../assets/whatsApp.png')),
  skypeNewIcon: memoizedFunc('skypeNewIcon', require('../assets/skypeNew.png')),
  awardIcon: memoizedFunc('awardIcon', require('../assets/award.png')),
  bagIcon: memoizedFunc('bagIcon', require('../assets/bag.png')),
  handNewIcon: memoizedFunc('handNewIcon', require('../assets/handNew.png')),
  handNewRedIcon: memoizedFunc(
    'handNewRedIcon',
    require('../assets/handNewRed.png'),
  ),
  familyIcon: memoizedFunc('familyIcon', require('../assets/family.png')),
  homeIcon: memoizedFunc('homeIcon', require('../assets/home.png')),
  notificationIcon: memoizedFunc(
    'notificationIcon',
    require('../assets/notification.png'),
  ),
  accountProfileIcon: memoizedFunc(
    'accountProfileIcon',
    require('../assets/accountProfile.png'),
  ),
  referEarnIcon: memoizedFunc(
    'referEarnIcon',
    require('../assets/referEarn.png'),
  ),
  latestPoleIcon: memoizedFunc(
    'latestPoleIcon',
    require('../assets/latestPole.png'),
  ),
  globalInsightIcon: memoizedFunc(
    'globalInsightIcon',
    require('../assets/globalInsight.png'),
  ),
  referIcon: memoizedFunc('referIcon', require('../assets/b2bsurvey.png')),

  privacyIcon: memoizedFunc('privacyIcon', require('../assets/privacy.png')),
  helpIcon: memoizedFunc('helpIcon', require('../assets/help.png')),
  logoutIcon: memoizedFunc('logoutIcon', require('../assets/logout.png')),
  maskIcon: memoizedFunc('maskIcon', require('../assets/mask.png')),
  genderIcon: memoizedFunc('genderIcon', require('../assets/gender.png')),
  googleIcom: memoizedFunc('googleIcom', require('../assets/google.png')),
  blackBoxIcon: memoizedFunc('blackBoxIcon', require('../assets/blackBox.png')),
  blackheartIcon: memoizedFunc(
    'blackheartIcon',
    require('../assets/blackheart.png'),
  ),
  blackLocationIcon: memoizedFunc(
    'blackLocationIcon',
    require('../assets/blackLocation.png'),
  ),
  technologyIcon: memoizedFunc(
    'technologyIcon',
    require('../assets/technology.png'),
  ),
  backArrowIcon: memoizedFunc(
    'backArrowIcon',
    require('../assets/backArrow.jpeg'),
  ),
  mailIcon: memoizedFunc('mailIcon', require('../assets/mail.png')),
  callIcon: memoizedFunc('callIcon', require('../assets/call.png')),
  passwordIcon: memoizedFunc('passwordIcon', require('../assets/password.png')),
  passwordVisibleIcon: memoizedFunc(
    'passwordVisibleIcon',
    require('../assets/passwordVisible.png'),
  ),
  passwordWhiteIcon: memoizedFunc(
    'passwordWhiteIcon',
    require('../assets/password_white.png'),
  ),
  userWhiteIcon: memoizedFunc(
    'userWhiteIcon',
    require('../assets/user_white.png'),
  ),
  userIcon: memoizedFunc('userIcon', require('../assets/user.png')),
  womanIcon: memoizedFunc('womanIcon', require('../assets/woman.png')),
  indiaFlagIcon: memoizedFunc(
    'indiaFlagIcon',
    require('../assets/indiaFlag.png'),
  ),
  faqsLogoIcon: memoizedFunc('faqsLogoIcon', require('../assets/faqsLogo.png')),
  reedemableDashboardIcon: memoizedFunc(
    'reedemableDashboardIcon',
    require('../assets/reedemableDashboard.jpg'),
  ),
  rewardDashboardIcon: memoizedFunc(
    'rewardDashboardIcon',
    require('../assets/rewardDashboard.jpg'),
  ),
  starDashboardIcon: memoizedFunc(
    'starDashboardIcon',
    require('../assets/starDashboard.jpg'),
  ),
  arrowDashboardICon: memoizedFunc(
    'arrowDashboardICon',
    require('../assets/arrowDashboard.jpg'),
  ),
  clockDashboardICon: memoizedFunc(
    'clockDashboardICon',
    require('../assets/clockDashboard.jpg'),
  ),
  nAccountApproved: memoizedFunc(
    'nAccountApproved',
    require('../assets/nAccountApproved.png'),
  ),
  nAccountRejected: memoizedFunc(
    'nAccountRejected',
    require('../assets/nAccountRejected.png'),
  ),
  nBonus: memoizedFunc('nBonus', require('../assets/nBonus.png')),
  nCongratulations: memoizedFunc(
    'nCongratulations',
    require('../assets/notification_congratulations.png'),
  ),
  nCouponRrejected: memoizedFunc(
    'nCouponRrejected',
    require('../assets/notification_coupon_rejected.png'),
  ),
  nCouponReward: memoizedFunc(
    'nCouponReward',
    require('../assets/notification_coupon_reward.png'),
  ),
  nMissedYou: memoizedFunc(
    'nMissedYou',
    require('../assets/notification_missed_you.png'),
  ),
  nOfferEnds: memoizedFunc(
    'nOfferEnds',
    require('../assets/notification_offer_ends.png'),
  ),
  nPollPoint: memoizedFunc(
    'nPollPoint',
    require('../assets/notification_poll_point.png'),
  ),
  nReferralReward: memoizedFunc(
    'nReferralReward',
    require('../assets/notification_referral_reward.png'),
  ),
  nSurvey: memoizedFunc(
    'nSurvey',
    require('../assets/notification_survey.png'),
  ),
  sampleIcon: memoizedFunc('sampleIcon', require('../assets/sample.jpeg')),
  surveycheckIcon: memoizedFunc(
    'surveycheckIcon',
    require('../assets/surveycheck.jpeg'),
  ),
  reestPasswordWebIcon: memoizedFunc(
    'reestPasswordWebIcon',
    require('../assets/reestPasswordWeb.png'),
  ),
  editIcon: memoizedFunc('editIcon', require('../assets/edit.png')),
  gif1: memoizedFunc('gif1', require('../assets/gif1.gif')),
  gif2: memoizedFunc('gif2', require('../assets/gif2.gif')),
  b2bsurvey: memoizedFunc('b2bsurvey', require('../assets/b2bsurvey.png')),
};
export default imagesObj;
