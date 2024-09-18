import I18n from '../i18n/index';
import { globalText } from '../helper/globalText';

export const constant = {
    GOOGLE_API_KEY: 'AIzaSyCyd_4mjxIyUTzNv0EL0cuAcWTU_8teqa8',
    A: 'approved',
    A1: 'approved',
    P: '_pendingReview',
    S: 'approved',
    R: '_blocked',
    privacyPolicyUrl: 'https://www.opinionbureau.com/privacy-policy',
    termsAndCondition: 'https://www.opinionbureau.com/t&c',
    firebaseShareLink: 'https://opinionbureau.page.link',
    facebookShareLink: 'https://www.facebook.com/sharer/sharer.php',
    facebookShareLinkNew: 'https://www.facebook.com/sharer.php',
    facebookShareDailog: 'https://www.facebook.com/dialog/feed?app_id=732128961367472&display=popup',
    twetterShareLink: 'https://twitter.com/intent/tweet?',
    whatsAppShareLink: 'whatsapp://send',
    // linkedinShareLink: 'https://www.linkedin.com/shareArticle?mini=true&summary=youtube&title=f1',
    linkedinShareLink: 'https://www.linkedin.com/sharing/share-offsite/',
    linkedinShareLinkNew: 'https://www.linkedin.com/shareArticle?mini=false&summary=IRB_INVITATION_LINK&title=Poll',
    // https://www.linkedin.com/sharing/share-offsite/?url=www.opinionbureau.com%2FsignUp%3FrefId%3D11352307
    // linkedinShareLink: 'https://www.linkedin.com/mwlite/feed/#share-modal?',
    //'https://www.linkedin.com/sharing/share-offsite/',
    //https://www.linkedin.com/shareArticle?mini=true&url={url}
    skypeShareLink: 'http://web.skype.com/share',
    ipsAddressApi: 'https://api.ipify.org/?format=json',
    ipsAddressApiNew: 'https://ipapi.co/json/',
    ipsAddressApiLocal: 'http://ipwho.is/',
    maxMindApi:
        'https://survey.irbureau.com/irbapi/maxmind?username=obappemailservice&password=7b419319cc073818b76ced480783bd33',
    dynamicValues: {
        reference_Link: '',
        reference_Id: null,
        profileSurvey: false,
        vendor_Id: null,
        source_Id: null,
    },
    whatsAppAndroidPlayStore: 'market://details?id=com.whatsapp',
    whatsAppIosPlayStore: 'http://itunes.apple.com/de/app/whatsapp-messenger/id310633997',
    sendEmailLink: 'https://survey.irbureau.com/irbapi/sendemail',
    sendMobileLink: 'https://survey.irbureau.com/irbapi/sendsms',
    livePollShare: 'https://www.opinionbureau.com/live-polls/',
};
