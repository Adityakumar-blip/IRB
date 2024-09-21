import {Component} from 'react';

export default class Api extends Component {
  // static environment = 'dev';
  static environment = 'prod';

  // Auth related endpoints
  // static authBaseUrl = Api.getAuthBaseUrl();
  // static countryList = `${Api.baseUrl}api/language/country_with_flag`;
  // static languageList = `${Api.baseUrl}api/language`;

  static baseUrl = Api.getApiBaseUrl();
  // static facebookLoginUrl = `${Api.authBaseUrl}/api/me/facebook-login/`;
  // static gmailLoginUrl = `${Api.authBaseUrl}/api/me/gmail-login/`;

  // AUTH
  static login = `${Api.baseUrl}/login`;
  static changePassword = `${Api.login}/changepassword`;
  static forgotPassword = `${Api.login}/forgotPassword`;
  static resetPassword = `${Api.login}/resetPassword`;
  static verifyWhetherEmailOrMobile = `${Api.login}/verify_whether_email_or_mobile`;

  //LANGUAGE
  static countryList = `${Api.baseUrl}/language/country_with_flag`;
  static languageList = `${Api.baseUrl}/language`;

  ///api/content_part/id
  static contentPart = `${Api.baseUrl}/content_part`;
  static contentPartId = `${Api.contentPart}/id`;

  //content_page_part
  static contentPagePart = `${Api.baseUrl}/content_page_part`;
  static contentPagePartId = `${Api.contentPagePart}/id`;

  // POLLS
  static polls = `${Api.baseUrl}/polls`;
  static usertakenPollList = `${Api.polls}/usertaken_poll_list`;
  static pollQuestionList = `${Api.polls}/poll_question_list`;
  static pollAnswerList = `${Api.polls}/poll_answer_list`;
  static pollImage = `${Api.polls}/poll_image`;
  static pollsQuestionAnswer = `${Api.polls}/poll_question_answer`;
  static pollsSavePollAnswer = `${Api.polls}/save_poll_answers`;
  static pollsUserQualification = `${Api.polls}/user_qualification_for_poll`;

  // POLL SYNOPSIS
  static pollSynopsis = `${Api.baseUrl}/poll_summary_synopsis`;
  static pollSynopsisGetClosePollId = `${Api.pollSynopsis}/get_close_poll_id`;
  static pollSynopsisQuestion = `${Api.pollSynopsis}/get_poll_question`;
  static pollSynopsisSummaryDetail = `${Api.pollSynopsis}/get_poll_summary_detail`;
  static pollSynopsisTags = `${Api.pollSynopsis}/get_poll_tags`;
  static pollSynopsisListSummaryByPolllTag = `${Api.pollSynopsis}/getlistsummarybypolltags`;

  // MY PROFILE
  static myProfile = `${Api.baseUrl}/my_profile`;
  static myProfileCategoryType = `${Api.myProfile}/category_type`;
  static myProfileCategoryList = `${Api.myProfile}/category_list`;
  static myProfileSubCategoryType = `${Api.myProfile}/sub_category_type`;
  static myProfileSubCategoryList = `${Api.myProfile}/sub_category`;
  static myProfileCategoryImage = `${Api.myProfile}/category_image`;
  static myProfileGetCategorySubcategory = `${Api.myProfile}/getcategorysubcategory`;
  static saveCategoryConsent = `${Api.myProfile}/save_category_consent`;

  // MY FAMILY
  static myFamily = `${Api.baseUrl}/my_family`;
  static myFamilyQuestionTypeList = `${Api.myFamily}/get_question_type_list`;
  static myFamilyQuestionList = `${Api.myFamily}/get_question_list`;
  static myFamilyGridSubQuestion = `${Api.myFamily}/get_grid_sub_question`;
  static myFamilyGlobalAnwserList = `${Api.myFamily}/get_global_answer_list`;
  static myFamilyParentChildQuestions = `${Api.myFamily}/get_parent_child_questions`;
  static myFamilyProfileAnswerList = `${Api.myFamily}/get_profile_answer_list`;
  static myFamilySaveSelectedAnswer = `${Api.myFamily}/save_selected_answer`;
  static myFamilyGetSelectedAnswer = `${Api.myFamily}/get_selected_answers`;
  static myFamilyGetParentChildQuestions = `${Api.myFamily}/GetParentChildQuestions`;
  static myFamilyGetQuestionListing = `${Api.myFamily}/question_ans_merge_api`;
  static myFamilyCheckOtherTabAnswerSaveOrNot = `${Api.myFamily}/check-is-answer-save `;

  static saveQuestionConsent = `${Api.myFamily}/save_questions_consent`;

  // BASIC INFO
  static basicInfo = `${Api.baseUrl}/basic_info`;
  static basicInformation = `${Api.baseUrl}/basic_info/basic_info`;
  static basicInfoValidationMsg = `${Api.basicInfo}/validation_msg`;
  static basicInfoImage = `${Api.basicInfo}/image`;
  static basicInfoZipFormat = `${Api.basicInfo}/zip_format`;
  static basicInfoGenderByCulture = `${Api.basicInfo}/gender_by_culture`;
  static basicInfoState = `${Api.basicInfo}/state`;
  static basicInfoLang = `${Api.basicInfo}/lang`;
  static basicInfoQuestionList = `${Api.basicInfo}/questionList`;
  static basicInfoAnswerList = `${Api.basicInfo}/getQuestionAnswers`;
  static basicInfoAddSocialProfile = `${Api.basicInfo}/addsocialprofile`;
  static basicInfoUpdateUserProfile = `${Api.basicInfo}/updateuserprofile`;
  static basicInfoUoloadImage = `${Api.basicInfo}/updateprofileimage`;
  static basicInfoContactInfo = `${Api.basicInfo}/updatecontactinfo`;
  static basicInfoUpdateEmailOrPhone = `${Api.basicInfo}/update_email_or_Phone_no`;
  static removePreselectedAnswers = `${Api.basicInfo}/removePreselectedAnswers`;

  // PRIVACY SETTING
  static privacySetting = `${Api.baseUrl}/privacy_setting`;
  static privacySettingGetVallidationMsg = `${Api.privacySetting}/get_validation_msg`;
  static privacySettingGetPrivacyPolicyDate = `${Api.privacySetting}/get_privacy_policy_update_date`;
  static privacySettingAcceptedDate = `${Api.privacySetting}/accepted_date`;
  static privacySettingGetAccoutstatus = `${Api.privacySetting}/get_account_status`;
  static privacySettingSureveyPrefernceQuestion = `${Api.privacySetting}/survey_preferences_question`;
  static privacySettingSureveyPrefernceQuestionMerge = `${Api.privacySetting}/survey_preferences_question_merge`;
  static privacySettingSureveyPrefernceQuestionAdd = `${Api.privacySetting}/surveypreferencesquestionadd`;
  static privacySettingGetPrivacySelectedAnswer = `${Api.privacySetting}/get_privacy_selected_answers`;
  static privacySettingSavePrivacySelectedAnswer = `${Api.privacySetting}/save_privacy_selected_answer`;
  static privacySettingResetSlectedAnswer = `${Api.privacySetting}/reset_selected_answers`;
  static privacySettingSitePreferenceQuestion = `${Api.privacySetting}/site_preference_question`;
  static privacySettingPIIInformation = `${Api.privacySetting}/get_pii_information`;
  static privacySettingAddPIInformation = `${Api.privacySetting}/add_pii_information`;

  // NOTIFICATION
  static notification = `${Api.baseUrl}/notification`;
  static notificationNewNotification = `${Api.notification}/newnotification`;
  static notificationClearAll = `${Api.notification}/clearall`;
  static notificationCount = `${Api.notification}/notificationcount`;
  static notificationMasterNotification = `${Api.notification}/masternotificationlist`;
  static notificationUpdateAsRead = `${Api.notification}/update_notification_as_read`;

  // REWARDTABS
  static rewards_tab = `${Api.baseUrl}/rewards_tab`;
  static rewardTabCateogry = `${Api.rewards_tab}/rewards_category_listing`;
  static rewardTabListing = `${Api.rewards_tab}/rewardTabdata`;

  // POINTSTAB
  static pointsTab = `${Api.baseUrl}/points_tab`;
  static getPointCategoty = `${Api.pointsTab}/get_points_category`;
  static userPollList = `${Api.pointsTab}/user_poll_list`;
  static pointConverted = `${Api.pointsTab}/point_converted`;
  static pointConvertedMerge = `${Api.pointsTab}/point_converted_merge`;

  // REDEMPTION TAB
  static redemptionTab = `${Api.baseUrl}/redemption_tab`;
  static getListOfRedeemptionTable = `${Api.redemptionTab}/get_list_of_redeemption_status`;
  static opinionbRewardList = `${Api.redemptionTab}/opinionb_reward_list`;

  // api/survey_history_tab/get_list_of_status
  static surveyHistoryTab = `${Api.baseUrl}/survey_history_tab`;
  static surveyHistoryTabGetListOfStatus = `${Api.surveyHistoryTab}/get_list_of_status`;

  // UNSUBSCRIBE
  static unsubscibe = `${Api.baseUrl}/unsubscribe/unsubscribe`;

  // REDEMPTION_REQUEST
  static redeemptionRequest = `${Api.baseUrl}/redemption_request`;
  static rewardPartnerOption = `${Api.redeemptionRequest}/rewardpartneroption`;
  static rewardPartnerOptionAmount = `${Api.redeemptionRequest}/rewardpartneroptionamount`;
  static threesholdLimit = `${Api.redeemptionRequest}/thresholdlimit`;
  static rewardRedeemptionRequestSubmit = `${Api.redeemptionRequest}/rewardredeemrequestsubmit`;
  static redemmableAmountRemainingBalance = `${Api.redeemptionRequest}/redemmableamountremainingbalance`;

  // POINT_CONVERSION
  static pointsConversion = `${Api.baseUrl}/points_conversion`;
  static pointsConversionThresholdLimit = `${Api.pointsConversion}/thresholdlimit`;
  static pointsConversionRedeemablePoint = `${Api.pointsConversion}/redemablepoint`;
  static pointsConversionRemainingBalance = `${Api.pointsConversion}/remaining_balance`;
  static pointsConversionRewardRedeemRequest = `${Api.pointsConversion}/rewardredeemrequestsubmit`;

  // DASHBOARD
  static dashboard = `${Api.baseUrl}/dashboard`;
  static getDashboardDetail = `${Api.dashboard}/dashboard`;
  static getLiveSurveyList = `${Api.dashboard}/liveserveyscreen`;

  //NEED_HELP
  static needHelp = `${Api.baseUrl}/need_help`;
  static need_help = `${Api.needHelp}/needHelp`;

  //REFER_AND_EARN
  static referAndEarn = `${Api.baseUrl}/refer_and_earn`;
  static refer_and_earn = `${Api.referAndEarn}/referAndEarn`;
  static referAndEarn_earn_xx = `${Api.referAndEarn}/earn_xx`;

  // Premimum Refer collegue.
  static premiumReffer = `${Api.baseUrl}/premium_refer_colleague`;
  static premiumRefferUser = `${Api.premiumReffer}/get_premium_refer_user_data`;
  static savePremiumCollegue = `${Api.premiumReffer}/save_premium_refer_user`;

  //SIGNUP
  static signUp = `${Api.baseUrl}/signup`;
  static signupSignUP = `${Api.signUp}/signup`;
  static signUpDetail = `${Api.signUp}/completeyourprofiletoearnXXXXpoints`;
  static signupSinupEmailVerificationApi = `${Api.signUp}/signUpEmailMobileVerficationApi`;
  static signupSinupCheckAge = `${Api.signUp}/checkAge`;
  static signupSinupDemoSurveyMail = `${Api.signUp}/demo_survey_mail`;
  static sendSmsOrEmailOtp = `${Api.signUp}/send_sms_or_email_otp`;
  static checkRegPerSignUp = `${Api.signUp}/check_registration_permission`;
  static signUpUserDeviceData = `${Api.signUp}/save_in_ob_app_user_visit_track`;
  static signUpGdprStatus = `${Api.signUp}/add_gdpr_status`;

  //DEMOSURVEY
  static demoSurvey = `${Api.baseUrl}/demo_servey`;
  static demoSurveyProfileSurveyId = `${Api.demoSurvey}/profile_survey_id`;
  static demoSurveyListOfQuestions = `${Api.demoSurvey}/listofquestions`;
  static demoSurveyCompleteDemoServey = `${Api.demoSurvey}/completedemoservey`;
  static demoSurveyDemoSaveSelectedAns = `${Api.demoSurvey}/demo_save_selected_ans`;
  static demoSurveyDemoMergeApi = `${Api.demoSurvey}/demo_survey_merge`;

  constructor(props) {
    super(props);
    this.state = {};
    this.getBaseUrl = this.getBaseUrl.bind(this);
  }

  // Get auth base URL of APIs
  static getAuthBaseUrl() {
    let url = '';
    const env = Api.environment;
    switch (env) {
      case 'prod':
        url = '';
        break;
      // Default: development server
      default:
        url = 'sample';
        break;
    }
    return url;
  }

  // Get after auth base URL of APIs
  static getApiBaseUrl() {
    let url = '';
    const env = Api.environment;
    switch (env) {
      case 'prod':
        // url = "https://obiapp.opinionbureau.com/api3";
        url = 'https://obiapp.opinionbureau.com/api';
        // url = 'https://obiapp.opinionbureau.com/api2';
        break;
      // Default: development server
      default:
        // url = 'http://192.168.0.200:3000/api';
        // url = 'https://obiapp.opinionbureau.com/api';

        url = 'https://obiapp.opinionbureau.com/api2';
        // url = 'http://192.168.0.177:3000/api';
        // url = 'http://13.234.126.109:3002/api';
        // url = 'http://localhost:3002/api';
        // url = 'https://6u83d6glo0.execute-api.ap-south-1.amazonaws.com/dev/api';
        break;
    }
    return url;
  }
}
