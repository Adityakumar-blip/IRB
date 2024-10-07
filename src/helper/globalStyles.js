import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import colors, {default as Colors} from '../styles/colors';
const {width, height} = Dimensions.get('window');

const wp = value => {
  return (value / width) * 100 + '%';
};

const hp = value => {
  return (value / height) * 100 + '%';
};

const styles = StyleSheet.create({
  margin: {
    padding: 16,
  },
  container: {
    flex: 1,
  },
  height100BackWhite: {
    height: '100%',
    backgroundColor: Colors.WHITE,
  },
  simpleHeight50: {
    height: 50,
  },
  paddB10: {
    paddingBottom: 10,
  },
  fontSize12: {
    fontSize: 12,
  },
  accScreenBackFog: {
    backgroundColor: colors.WILD_SAND,
    padding: 10,
    width: width,
    flex: 1,
  },
  accRowView: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 20,
    paddingTop: 10,
  },
  accFirstView: {
    width: '38%',
  },
  accSecondView: {
    width: '20%',
  },
  accThirdView: {
    width: '35%',
  },
  accFourthView: {
    width: '20%',
  },
  accFifthView: {
    width: '35%',
  },
  accBorder: {
    borderWidth: 0.5,
    borderColor: colors.SILVER,
  },
  accFilterMain: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    //zIndex: 1,
    // marginTop: 5,
  },
  accDropDTextStyle: {
    color: colors.STEEL_GREY,
    fontSize: 14,
  },
  accFirstDropDView: {
    width: '40%',
  },
  accSecondDropDView: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  accCateDropStyle: {
    width: 120,
    height: 150,
  },
  accCateDropContStyle: {
    width: 120,
    borderRadius: 10,
    height: 35,
  },
  accfromDropConStyle: {
    width: 90,
    height: 150,
  },
  accFromStyle: {
    width: 90,
    borderRadius: 20,
    // height: 35,
    marginRight: 5,
  },
  accToDropConStyle: {
    width: 70,
    height: 150,
  },
  accToDropStyle: {
    width: 70,
    borderRadius: 20,
    height: 35,
  },
  accScrollContentStyle: {
    flexGrow: 1,
  },
  padd15: {
    padding: 15,
  },
  paddH15paddV8: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  bPImageStyle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    alignSelf: 'center',
    borderColor: 'grey',
    borderWidth: 1,
  },
  bPChangePhotoStyle: {
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    paddingVertical: 8,
    alignSelf: 'center',
    marginTop: 5,
  },
  bPChangePhotoTextStyle: {
    color: colors.RED_VOILET,
    fontSize: 14,
  },
  basicPBasciTextStyle: {
    color: colors.TOPAZ,
    marginTop: 16,
    marginBottom: 4,
  },
  basicProfNameStyle: {
    color: colors.TOPAZ,
    marginTop: 5,
    fontSize: 16,
    marginBottom: 8,
  },
  marT10: {
    marginTop: 10,
  },
  marginTop35: {
    marginTop: 35,
  },
  paddB100: {
    paddingBottom: 100,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  width48: {
    width: '48%',
  },
  bPMemberTextstyle: {
    paddingLeft: 9,
    color: colors.CASCADE,
    fontSize: 16,
    marginTop: 3,
  },
  marginT8: {
    marginTop: 8,
  },
  bP_buttonStyle: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 13,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderColor: colors.MOUNTAIN_MEADOW,
  },
  bPSocialMediaViewMain: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  bPSocialMediaFirstView: {
    marginLeft: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bPSocialMediaPlusStyle: {
    color: colors.SCARPA_FLOW,
    fontWeight: 'bold',
  },
  bPSocialMediaAddStyle: {
    color: colors.RED_VOILET,
    marginLeft: 5,
  },
  bPSocialMedieIconStyle: {
    height: 24,
    width: 24,
  },
  bPSocialMediaRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  bPSocialMediaBorderAllView: {
    marginLeft: 7,
    borderWidth: 1,
    padding: 4,
    alignSelf: 'baseline',
    // width: '80%',
    borderRadius: 5,
    borderColor: colors.MYSTIC,
  },
  bPTrashIconStyle: {
    height: 15,
    width: 12,
    marginLeft: 7,
  },
  bPGreyText: {
    color: colors.TOPAZ,
  },
  bPBorderStyle: {
    borderWidth: 0.5,
    borderColor: colors.MYSTIC,
    zIndex: -1,
  },
  zIndex10: {
    zIndex: 10,
  },
  zIndex5: {
    zIndex: 5,
  },
  zIndex4: {
    zIndex: 4,
  },
  zIndex3: {
    zIndex: 3,
  },
  zIndex2: {
    zIndex: 2,
  },
  zIndex1: {
    zIndex: 1,
  },
  zIndexMinus1: {
    zIndex: -1,
  },
  splashMainView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashIconstyle: {
    height: 200,
    width: 200,
  },
  bPFaintGreyText: {
    color: colors.OSLO_GRAY,
  },
  gInsTextStyle: {
    color: colors.TOPAZ,
    textAlign: 'center',
    lineHeight: 25,
    marginVertical: 7,
  },
  padd80: {
    paddingBottom: 80,
  },
  gInsRenderView: {
    width: '48%',
    margin: '1%',
  },
  cGlobInView: {
    flex: 1,
    backgroundColor: colors.ABBEY,
    opacity: 0.5,
  },
  cGlobFirstView: {
    height: 120,
  },
  cGlobInViewFirst: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  cGlobFirstText: {
    color: colors.ZIRCON,
    lineHeight: 19,
    margin: 10,
  },
  globInBackArrow: {
    width: 17,
    height: 15,
  },
  globInFirstText: {
    color: colors.CLOUD_BURST,
    fontSize: 25,
    lineHeight: 25,
    marginTop: 5,
  },
  globInShareIcon: {
    height: 20,
    width: 20,
    marginVertical: 12,
  },
  globInImageStyel: {
    height: 180,
    width: '100%',
    marginVertical: 12,
    backgroundColor: '#f9f9f9',
  },
  globInTextDescrp: {
    color: colors.CLOUD_BURST,
    fontSize: 14,
    lineHeight: 20,
  },
  padB50: {
    paddingBottom: 50,
  },
  marV10: {
    marginVertical: 10,
  },
  simpleCheckBox: {
    height: 22,
    width: 22,
    borderRadius: 6,
    borderColor: colors.DOVE_GRAY,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  simpleCheckBoxNew: {
    height: 22,
    width: 22,
    borderRadius: 6,
    // borderWidth: 2,
    backgroundColor: colors.DOVE_GRAY,
    borderColor: colors.DOVE_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyleCCBox: {
    height: 9,
    width: 12,
    alignItems: 'center',
  },
  sysnopsisTopicView: {
    //padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  sysnopsisTopicTextView: {
    paddingBottom: 5,
    borderRadius: 15,
    marginRight: 15,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 3,
    backgroundColor: colors.GALLERY,
  },
  sysnopsisTopicTextStyle: {
    fontSize: 16,
    color: colors.CLOUD_BURST,
    lineHeight: 25,
    alignSelf: 'baseline',
  },
  directionRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  quesTextStyle: {
    fontSize: 16,
    color: colors.OXFORD_BLUE,
    flexWrap: 'wrap',
    // whiteSpace: "pre-line"
    // width: '100%',
  },
  CustomDynamicFormMainView: {
    paddingBottom: 10,
  },
  CustomDFBorderView: {
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    borderColor: colors.MYSTIC,
  },
  CustomDFBorderViewNew: {
    paddingBottom: 15,
  },
  headerMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  width10AlignLeft: {
    width: '10%',
  },
  width10AlignRight: {
    width: '10%',
    alignItems: 'flex-end',
  },
  width80: {
    width: '80%',
  },
  headerFirstIconStyle: {
    height: 18,
    width: 18,
  },
  headerThreeDotStyle: {
    height: 20,
    width: 4,
  },
  headerTextStyle: {
    fontSize: 27,
    color: colors.CLOUD_BURST,
  },
  headerMainViewStyle: {
    marginHorizontal: 13,
    marginTop: 20,
    marginBottom: 10,
  },
  CSimpleRadioStyle: {
    height: 18,
    width: 18,
    borderRadius: 10,
    borderColor: '#030F29E5',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  CRadioStyle: {
    height: 12,
    width: 12,
    borderRadius: 10,
    backgroundColor: 'grey',
    alignItems: 'center',
  },
  customAnsText: {
    fontSize: 16,
    color: colors.OXFORD_BLUE,
    paddingLeft: 4,
  },
  width10: {
    width: '7%',
  },
  width90: {
    width: '90%',
  },
  cSHMainView: {
    flexDirection: 'row',
    width: '100%',
  },
  cSHIconStyle: {
    height: 9,
    width: 6,
    marginTop: 5,
  },
  cSHFirstView: {
    width: '38%',
  },
  blueTextStyle: {
    color: colors.CLOUD_BURST,
  },
  cSHSecondView: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenColor: {
    color: colors.FRUIT_SALAD,
  },
  cSHThirdView: {
    width: '35%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  cSHFourview: {
    width: '20%',
    flexDirection: 'row',
  },
  cSHFifthView: {
    width: '35%',
  },
  cSurvMainView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
  },
  width60: {
    width: '60%',
  },
  width70: {
    width: '70%',
  },
  cSurvFirstTextStyle: {
    fontSize: 16,
    color: colors.OXFORD_BLUE,
  },
  cSurvPintView: {
    width: '50%',
    alignItems: 'flex-end',
  },
  cSurvPointStyle: {
    fontSize: 18,
    color: colors.RED_VOILET,
  },
  cSurvGreenTextView: {
    borderWidth: 1,
    alignItems: 'baseline',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 10,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderColor: colors.MOUNTAIN_MEADOW,
  },
  cSurvGreenTextStyle: {
    color: Colors.WHITE,
    fontSize: 10,
    lineHeight: 15,
  },
  cSurvMiddleView: {
    flexDirection: 'row',
    width: '40%',
  },
  cSurveywidth30AlignEnd: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cSGreyColorStyle: {
    color: colors.TOPAZ,
  },
  cSurvImageStyle: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
  sWTabheaderScroll: {
    flexGrow: 0,
  },
  sWTabHeaderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: Colors.WHITE,
  },
  mainItem: {
    width: width,
  },
  swTabHeaderBar: {
    height: 2,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colors.RED_VOILET,
    position: 'absolute',
    bottom: 0,
  },
  pinkStyle: {
    color: colors.RED_VOILET,
  },
  paddR5: {
    paddingRight: 5,
  },
  sTCIconStyle: {
    height: 10.5,
    width: 6,
  },
  inputMainView: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.MYSTIC,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: Colors.WHITE,
    //elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inptStyle100: {
    color: colors.STEEL_GREY,
    width: '100%',
  },
  inptStyle90: {
    width: '90%',
  },
  inptStyle80: {
    width: '80%',
  },
  txtStyle: {
    color: colors.TOPAZ,
    marginTop: 5,
    fontSize: 16,
    marginBottom: 8,
  },
  redTxt: {
    color: 'red',
  },
  widthAlignCenter: {
    width: '10%',
    alignItems: 'center',
  },
  heightWidth20: {
    height: 20,
    width: 20,
  },
  cDropDStyle: {
    borderColor: colors.MYSTIC,
    borderWidth: 1,
  },
  cDropDownContainerStyle: {
    borderColor: colors.MYSTIC,
    borderWidth: 1,
    maxHeight: 150,
    position: 'absolute',
  },
  cDDsearchContainerStyle: {
    borderBottomColor: colors.MYSTIC,
    borderBottomWidth: 1,
  },
  cDDtextStyle: {},
  cDropDownHeadTxtStyle: {
    color: colors.TOPAZ,
    marginTop: 5,
    fontSize: 16,
    marginBottom: 8,
  },
  addSocialProfileMainView: {
    flex: 1,
    backgroundColor: colors.TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  addSocialProfileView: {
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 50,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
  },
  addSocialProfileTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  addSocialProfileButtonView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addSocialProfileSubmitButton: {
    paddingHorizontal: 27,
    paddingVertical: 10,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderColor: colors.MOUNTAIN_MEADOW,
  },
  addSocialProfileCancelButton: {
    paddingHorizontal: 27,
    paddingVertical: 10,
    backgroundColor: Colors.WHITE,
    borderColor: colors.MOUNTAIN_MEADOW,
  },
  marL15: {
    marginLeft: 15,
  },
  marT25: {
    marginTop: 25,
  },
  faqQuestText: {
    fontSize: 18,
    color: colors.CLOUD_BURST,
  },
  faqFATex: {
    color: colors.TOPAZ,
    marginTop: 10,
  },
  faqMainView: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  faqButtonstyle: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderColor: colors.MOUNTAIN_MEADOW,
  },
  faqQuesTextStyle: {
    color: colors.CLOUD_BURST,
    fontSize: 15,
  },
  faqAnswerTextStyle: {
    color: colors.TOPAZ,
    fontSize: 15,
    marginTop: 8,
  },
  faqPlusView: {
    width: '10%',
    alignItems: 'flex-end',
    alignSelf: 'baseline',
  },
  latTrllMainModalViewStyle: {
    width: '100%',
    backgroundColor: colors.WHITE,
    borderRadius: 5,
  },
  latTrllMainModalView: {
    flex: 1,
    backgroundColor: colors.TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  latTrollModalFirstTextStyle: {
    color: colors.TOPAZ,
    padding: 12,
  },
  latTrollBorderModalStyle: {
    borderWidth: 0.5,
    borderColor: colors.SILVER,
    // elevation: 10,
  },
  latTrollModalMiddleStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 20,
  },
  latTrollModalImgFirstStyle: {
    height: 35,
    width: 35,
    margin: 10,
  },
  latTrollModalImgSecondStyle: {
    height: 35,
    width: 35,
    margin: 10,
  },
  latTrollModalImgThirdStyle: {
    height: 30,
    width: 30,
    margin: 10,
  },
  lSFirstView: {
    flex: 1,
    backgroundColor: colors.TRANSPARENT,
    justifyContent: 'flex-end',
    padding: 10,
  },
  lSWhiteScreen: {
    backgroundColor: colors.WHITE,
    marginBottom: 15,
    borderRadius: 5,
  },
  lSCancelButtonStyle: {
    height: 50,
    backgroundColor: colors.ALTO,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.ALTO,
  },
  lSCancelButtonTextStyle: {
    textAlign: 'center',
    color: colors.DARK_BLUE,
    fontSize: 18,
    lineHeight: 24,
  },
  lsShareTextStyle: {
    color: colors.TOPAZ,
    textAlign: 'center',
    padding: 10,
  },
  lSSharDecrpStyle: {
    color: colors.TOPAZ,
    textAlign: 'center',
    fontSize: 12,
    paddingBottom: 20,
  },
  lSBorderstyle: {
    borderWidth: 0.5,
    borderColor: colors.SILVER_CHALICE,
  },
  lSBlueTextStyle: {
    paddingVertical: 15,
    textAlign: 'center',
    color: colors.DARK_BLUE,
    fontSize: 18,
  },
  width100: {
    width: '100%',
  },
  changePasswordContainer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  changePasswordContainer_1: {
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
  marT15: {
    marginTop: 15,
  },
  changePasswordView: {
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 25,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
  },
  ChangePasswordTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.OXFORD_BLUE,
    textAlign: 'center',
  },
  changePasswordButtonView: {
    marginTop: 30,
    alignItems: 'center',
  },
  changePasswordSubmitButton: {
    paddingHorizontal: 27,
    paddingVertical: 10,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderColor: colors.MOUNTAIN_MEADOW,
  },
  latestPoleImageView: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  latestPoleImage: {
    height: height * 0.3,
    width: width,
  },
  latestPoleQuestion: {
    color: colors.TOPAZ,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  latestPoleAnswerView: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginBottom: 10,
  },
  latestPoleAnswer: {
    fontSize: 16,
    lineHeight: 21,
  },
  latestPoleVoteView: {
    marginTop: 20,
    alignItems: 'center',
  },
  latestPoleShareView: {
    backgroundColor: colors.WHITE,
    elevation: 2.5,
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    // shadowColor: colors.COD_GRAY,
    shadowOffset: {width: -1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  latestPoleShareIcon: {
    height: 20,
    width: 20,
  },
  refferEarnLogoView: {
    alignItems: 'center',
    backgroundColor: colors.TEA_ROSE,
  },
  refferEarnLogo: {
    height: 150,
    width: 200,
    marginBottom: 20,
  },
  refferEarnWalletView: {
    // position: 'absolute',
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
  },
  refferEarnWalletView_1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refferEarnWallet: {
    height: 20,
    width: 20,
  },
  refferEarnStepView: {
    backgroundColor: colors.WHITE,
    padding: 15,
    paddingBottom: 80,
  },
  refferEarnStepTitle: {
    color: colors.CLOUD_BURST,
    fontWeight: 'bold',
    fontSize: 16,
  },
  refferEarnStepRenderView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    marginTop: 25,
  },
  refferEarnFragmentView: {
    flex: 0,
    backgroundColor: colors.TEA_ROSE,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  height100: {
    height: '100%',
  },
  pad15: {
    padding: 15,
  },
  padH10: {
    paddingHorizontal: 10,
  },
  marT30: {
    marginTop: 30,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  dashboardStatisticText: {
    fontSize: 20,
    color: colors.OXFORD_BLUE,
    lineHeight: 30,
  },
  dashboardProfileStatusText: {
    // fontSize: 16,
    color: colors.WHITE,
    lineHeight: 19,
  },
  dashboardCompleteButtonText: {
    paddingHorizontal: 27,
    paddingVertical: 13,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderColor: colors.MOUNTAIN_MEADOW,
  },
  dashBoardWhiteBack: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderWidth: 0.5,
    borderColor: colors.WHITE,
    borderRadius: 3,
    elevation: 10,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowOffset: {height: 1, width: 0},
    shadowRadius: 5,
  },
  dashBoardLiveSurveyMsg: {
    color: colors.CLOUD_BURST,
    fontSize: 22,
    paddingTop: 15,
  },
  font18: {
    fontSize: 18,
  },
  marT20: {
    marginTop: 20,
  },
  myFamilyQuetionTextStyle: {
    color: colors.OXFORD_BLUE,
    fontSize: 16,
    lineHeight: 21,
  },
  myFamilyPetsCountView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  myFamilyUpdateButtonView: {
    paddingTop: 30,
    alignItems: 'center',
  },
  myFamilyUpdateButton: {
    paddingHorizontal: 27,
    paddingVertical: 13,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderColor: colors.MOUNTAIN_MEADOW,
  },
  width16per: {
    width: '16%',
  },
  height30: {
    height: 30,
  },
  myFamilyPetsCountTextView: {
    height: 30,
    marginBottom: 5,
    justifyContent: 'center',
  },
  myFamilyPetsCountText: {
    textAlignVertical: 'center',
    color: colors.OXFORD_BLUE,
    lineHeight: 30,
  },
  myFamilyPetsMainView: {
    flexDirection: 'row',
    width: '84%',
  },
  myFamilyPetsNameView: {
    width: '16%',
    margin: 1,
    alignItems: 'center',
    marginBottom: 5,
  },
  myFamilyPetsName: {
    fontSize: 12,
    height: 30,
    color: colors.OXFORD_BLUE,
    lineHeight: 30,
    textAlignVertical: 'center',
  },
  myFamilyPetsCheckboxView: {
    marginBottom: 5,
    height: 30,
    justifyContent: 'center',
  },
  myFamilyEventMainView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  myFamilyEventView: {
    width: '33.33%',
    paddingRight: 5,
  },
  height40: {
    height: 40,
  },
  myFamilyEventNameView: {
    height: 30,
    marginTop: 15,
    justifyContent: 'center',
  },
  myFamilyEventName: {
    height: 30,
    lineHeight: 21,
  },
  myFamilyEventDidView: {
    width: '66.67%',
    flexDirection: 'row',
  },
  width50per: {
    width: '50%',
  },
  myFamilyEventDidText: {
    lineHeight: 20,
    color: colors.OXFORD_BLUE,
  },
  myFamilyEventCheckboxView: {
    height: 30,
    marginTop: 15,
    paddingHorizontal: 5,
  },
  pT10: {
    paddingTop: 10,
  },
  buttonStyle: {
    // width: 200,
    alignSelf: 'baseline',
    paddingHorizontal: 30,
    paddingVertical: 7,
    backgroundColor: colors.RED_VOILET,
    borderWidth: 0.5,
    borderColor: colors.RED_VOILET,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonTextstyle: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.WHITE,
  },
  buttonNewStyle: {
    // width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'baseline',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.RED_VOILET,
    borderWidth: 0.5,
    borderColor: colors.RED_VOILET,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonTextNewstyle: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.WHITE,
  },
  buttonImageStyle: {
    height: 15,
    width: 15,
    marginRight: 5,
  },

  lSurvTextStyle: {
    color: colors.OXFORD_BLUE,
    paddingHorizontal: 20,
    lineHeight: 19,
    paddingTop: 10,
    paddingBottom: 15,
  },
  lSurvwhiteText: {
    color: colors.WHITE,
    fontSize: 16,
    lineHeight: 21,
  },
  lSFirstViewMain: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: colors.TOWER_GRAY,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  lSurvStarStyle: {
    height: 15,
    width: 15,
    marginRight: 8,
  },
  paddH15PaddB15: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  middleView: {
    borderWidth: 0.5,
    borderColor: '#00000029',
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    shadowColor: colors.COD_GRAY,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  mar12: {
    margin: 12,
  },
  middleFirstView: {
    color: colors.OXFORD_BLUE,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
  },
  middleFirstViewText: {
    fontSize: 12,
    color: colors.OXFORD_BLUE,
    lineHeight: 16,
    paddingVertical: 11,
  },
  rowCenterSpaceBetw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  marT16: {
    marginTop: 16,
  },
  cLSClockIconstyle: {
    height: 11,
    width: 11,
    marginRight: 5,
  },
  cLSTimeTextStyle: {
    color: colors.OXFORD_BLUE,
    lineHeight: 19,
  },
  cLSDeskTStyle: {
    height: 12,
    width: 15,
    marginRight: 6,
  },
  cLSCellPhonStyle: {
    height: 12,
    width: 7,
    marginRight: 6,
  },
  cLSTabletStyle: {
    height: 12,
    width: 9,
  },
  CustomToggleView_1: {
    // borderWidth: 0.1,
    // justifyContent: "center",
    // alignItems: "flex-end",
    // marginRight: 15,
    // borderRadius: 15,
    padding: 2,
    height: 35,
    width: 55,
    borderRadius: 20,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  CustomToggleView_2: {
    alignItems: 'flex-end',
    backgroundColor: colors.APPLE,
  },
  customToggleInsideCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
    alignItems: 'flex-start',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  paddT10: {
    paddingTop: 10,
  },
  mar10: {
    margin: 15,
  },
  prAndSettSurveyText: {
    fontSize: 18,
    color: colors.OXFORD_BLUE,
    paddingBottom: 15,
  },
  prAndSettSurveyLastBttnView: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mar20: {
    margin: 20,
  },
  prAndSettSurveyResetBttn: {
    color: colors.MOUNTAIN_MEADOW,
    fontSize: 14,
  },
  fontSize14: {
    fontSize: 14,
  },
  prAndSettSurveySaveStyle: {
    paddingHorizontal: 0,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderWidth: 1,
    borderColor: colors.MOUNTAIN_MEADOW,
    paddingVertical: 10,
    width: 100,
    marginHorizontal: 10,
  },

  prAndSettSurveyCloseStyle: {
    paddingHorizontal: 0,
    backgroundColor: colors.RADICAL_RED,
    borderWidth: 1,
    borderColor: colors.RADICAL_RED,
    paddingVertical: 10,
    width: 100,
    marginHorizontal: 10,
  },
  prAndSettSurveyResetStyle: {
    paddingHorizontal: 0,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.MOUNTAIN_MEADOW,
    paddingVertical: 10,
    width: 100,
    marginHorizontal: 10,
  },
  pSFirstView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 20,
  },
  pSFirstIConStyle: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  pSPrivacyText: {
    color: colors.OXFORD_BLUE,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  pSBorderStyle: {
    borderWidth: 0.5,
    borderColor: colors.SILVER,
  },
  pSPassStyle: {
    color: colors.OXFORD_BLUE,
    fontSize: 18,
    lineHeight: 24,
  },
  pShidePassStyle: {
    color: colors.OXFORD_BLUE,
    fontSize: 18,
    lineHeight: 24,
  },
  pSEditStyle: {
    color: colors.DARK_BLUE,
    fontSize: 16,
  },
  pSTextStyle: {
    color: colors.TOPAZ,
    lineHeight: 22,
  },
  pSAcStatusStyle: {
    color: colors.OXFORD_BLUE,
    fontSize: 16,
    lineHeight: 21,
  },
  pSAppStyle: {
    color: colors.OXFORD_BLUE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  pSUnsubStyle: {
    fontSize: 16,
    lineHeight: 21,
    // paddingTop: 20,
    paddingBottom: 32,
    color: colors.DARK_BLUE,
    marginLeft: 1,
  },
  pSSettMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  pSSettTextStyle: {
    color: colors.OXFORD_BLUE,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  pSLastTextStyle: {
    color: colors.OXFORD_BLUE,
    fontSize: 16,
  },
  pCmainYellowView: {
    backgroundColor: colors.AMBER,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: 'baseline',
  },
  headerCountStyle: {
    fontSize: 12,
    lineHeight: 17,
    color: '#FAF3ED',
  },
  headerCountView: {
    backgroundColor: '#D83A78',
    // paddingHorizontal: 2,
    // paddingVertical: 2,
    height: 8,
    width: 8,
    borderRadius: 10,
    marginTop: -15,
    //marginLeft: 7,
  },
  cNAwardStyle: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
  cNMainHeadeView: {
    height: 50,
    backgroundColor: colors.ATHENS_GRAY,
    justifyContent: 'center',
  },
  cNMainHeadeStryle: {
    color: colors.BOULDER,
    fontSize: 16,
    lineHeight: 21,
    padding: 15,
  },
  cNMainview: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  width20Per: {
    width: '20%',
  },
  cNRefereIconStyle: {
    height: 26,
    width: 26,
    alignSelf: 'center',
  },
  height34width45: {
    height: 45,
    width: 45,
  },
  cNMiddleView: {
    width: '80%',
    flexDirection: 'row',
    marginTop: 10,
  },
  width80Per: {
    width: '80%',
  },
  cNdescrpTextStyle: {
    color: colors.OXFORD_BLUE,
    fontSize: 16,
  },
  cNMsgTextStyle: {
    fontSize: 16,
    lineHeight: 21,
    color: colors.BOULDER,
    marginTop: 5,
  },
  cNTimeTextStyle: {
    color: colors.BOULDER,
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  cMIFirstView: {
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: 'center',
  },
  unsubscribeModalTitle: {
    color: colors.OXFORD_BLUE,
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  unsubscribequestion: {
    color: colors.OXFORD_BLUE,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  unsubscribeOption: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  unsubscribeOptionText: {
    color: colors.DARK_BLUE,
    fontSize: 14,
  },
  unsubscribeDescription: {
    color: colors.DOVE_GRAY,
    lineHeight: 21,
    marginTop: 20,
  },
  unsubscribeDottedBorder: {
    borderWidth: 0.5,
    borderStyle: 'dashed',
    borderColor: colors.DOVE_GRAY,
    // marginTop: 10,
  },
  unsubscribeButtonView: {
    alignSelf: 'center',
    marginTop: 20,
  },
  unsubscribeButton: {
    paddingHorizontal: 27,
    paddingVertical: 11,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderColor: colors.MOUNTAIN_MEADOW,
  },
  width33per: {
    width: '33.33%',
  },
  referHeaderView: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.TEA_ROSE,
  },
  alignItemCenter: {
    alignItems: 'center',
  },
  referStepCount: {
    color: colors.WHITE,
    fontSize: 14,
  },
  refferEarnStepComponentView: {
    alignItems: 'center',
    marginBottom: 25,
  },
  refferEarnStepComponentView_1: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.RED_VOILET,
    borderRadius: 30,
  },
  refferEarnStepComponentImage: {
    height: 20,
    width: 20,
  },
  refferEarnStepComponentIndex: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: colors.BLUE_RIBBON,
    top: -5,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refferEarnStepComponentText: {
    textAlign: 'center',
    fontSize: 12,
    marginHorizontal: 5,
    color: colors.OXFORD_BLUE,
  },

  referNowEmailButtonView: {
    alignSelf: 'center',
    marginTop: 20,
  },
  referNowEmailButton: {
    paddingHorizontal: 27,
    paddingVertical: 10,
  },
  referNowIviteText: {
    color: colors.TOPAZ,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  redemptionRequestWarningMsgView: {
    backgroundColor: colors.AMBER,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: 'baseline',
  },
  redemptionRequestWarningMsg: {
    color: colors.OUTER_SPACE,
    lineHeight: 21,
  },
  redemptionRequestAmountTitle: {
    color: colors.TOPAZ,
    fontSize: 16,
    marginTop: 25,
  },
  redemptionRequestAmountView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  redemptionRequestAmount: {
    color: colors.ROSE,
    lineHeight: 16,
    marginLeft: 4,
  },
  redemptionRequestMinAmountThreshold: {
    color: colors.EMERALD,
    lineHeight: 19,
    fontSize: 12,
    marginTop: 2,
  },
  redemptionRequestDropDown: {
    height: 40,
    borderRadius: 3,
  },
  redemptionRequestSubmitButtonView: {
    alignSelf: 'center',
    marginTop: 50,
  },
  redemptionRequestSubmitButton: {
    paddingHorizontal: 27,
    paddingVertical: 9,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderColor: colors.MOUNTAIN_MEADOW,
  },
  pointConversionWarningMsg: {
    color: colors.OUTER_SPACE,
    lineHeight: 21,
  },
  pointConversionBalanceText: {
    color: colors.TOPAZ,
    fontSize: 16,
    marginTop: 25,
  },
  pointConversionAmount: {
    color: colors.ROSE,
    lineHeight: 16,
    marginLeft: 4,
    marginTop: 8,
  },
  pointConversionInput: {
    width: '85%',
    height: 45,
  },
  pointConversionSubmitButtonView: {
    alignSelf: 'center',
    marginTop: 50,
  },
  pointConversionSubmitButton: {
    paddingHorizontal: 27,
    paddingVertical: 9,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderColor: colors.MOUNTAIN_MEADOW,
  },
  needHelpShareText: {
    color: colors.CLOUD_BURST,
    fontSize: 16,
    lineHeight: 21,
  },
  needHelpQueryType: {
    fontSize: 16,
    color: colors.TOPAZ,
    marginBottom: 10,
  },
  needHelpQueryTypeDropDown: {
    height: 40,
    borderRadius: 3,
  },
  customCultureView: {
    flexDirection: 'row',
    //alignItems: 'center',
    padding: 10,
  },
  customCultureImageView: {
    height: 70,
    width: '20%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  customCultureImage: {
    height: 70,
    width: 70,
  },
  customCultureQuestionView: {
    paddingHorizontal: 15,
    width: '80%',
  },
  customCultureQuestion: {
    fontSize: 16,
    lineHeight: 28,
    color: colors.CLOUD_BURST,
  },
  customCultureViewBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#DBE2EA',
  },
  marR15: {
    marginRight: 15,
  },
  flex1PaddB80: {
    flex: 1,
    paddingRight: 120,
  },
  whiteText: {
    backgroundColor: Colors.WHITE,
  },
  topMinus130: {
    top: -130,
  },
  addSocailProfStyleText: {
    color: colors.OXFORD_BLUE,
  },
  greenText: {
    color: colors.MOUNTAIN_MEADOW,
  },
  profilePhotoText: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  changePhotoButtonView: {
    flexDirection: 'row',
    marginTop: 25,
  },
  changePhotoButtonView_1: {
    width: 60,
    alignItems: 'center',
  },
  changePhotoButtonImage: {
    height: 30,
    width: 30,
  },
  changePhotoButtonTitle: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    color: '#756F86',
  },
  changePgotoBackColor: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  changePhotoFirstView: {
    height: '75%',
    opacity: 0.4,
  },
  changePhotoSecondView: {
    height: '25%',
    padding: 15,
    backgroundColor: colors.WHITE,
  },
  changePhotoText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    color: '#756F86',
  },
  pad15: {
    padding: 15,
  },
  padH10: {
    paddingHorizontal: 10,
  },
  marT30: {
    marginTop: 30,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  dashboardProfileStatusText: {
    // fontSize: 14,
    color: colors.WHITE,
    lineHeight: 19,
  },
  dashboardCompleteButtonText: {
    paddingHorizontal: 27,
    paddingVertical: 13,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderColor: colors.MOUNTAIN_MEADOW,
  },
  dashBoardWhiteBack: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
    borderWidth: 0.5,
    borderColor: colors.WHITE,
    borderRadius: 3,
    elevation: 10,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowOffset: {height: 1, width: 0},
    shadowRadius: 5,
  },
  dashBoardLiveSurveyMsg: {
    color: colors.CLOUD_BURST,
    fontSize: 22,
    paddingTop: 15,
    fontStyle: 'italic',
  },
  menuStatusView: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    //marginTop: 8,
  },
  menuStatusViewNew: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    //marginVertical: 10,
  },
  width20: {
    width: '20%',
  },
  width80WithBorder: {
    width: '80%',
    borderBottomWidth: 0.5,
    borderColor: '#00000029',
  },
  menuBlueColor: {
    color: colors.OXFORD_BLUE,
    marginVertical: 3,
  },
  marT5: {
    marginTop: 5,
  },
  dashMenustyle: {
    opacity: 1,
    // width: '10%',
    alignItems: 'flex-end',
    top: 0,
    right: 0,
  },
  paddB20: {
    paddingBottom: 20,
  },
  dashProfColor: {
    color: colors.OXFORD_BLUE,
  },
  width20AligItCenter: {
    width: '20%',
    alignItems: 'center',
  },
  pinkColorStyle: {
    color: colors.RED_VOILET,
  },
  dashMenuContainerStyle: {
    bottom: 0,
    top: 0,
    marginLeft: 10,
    width: '60%',
  },
  emailRefFirstView: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  emailRefUnderViewView: {
    // paddingTop: 20,
    //paddingHorizontal: 15,
    paddingBottom: 25,
    backgroundColor: colors.WHITE,
    borderRadius: 5,
  },
  emailRefTitle: {
    color: '#756F86',
    textAlign: 'left',
    margin: 15,
  },
  paddH27paddV10: {
    paddingHorizontal: 27,
    paddingVertical: 10,
  },
  emailButtonView: {
    marginTop: 20,
    alignItems: 'center',
  },
  height45: {
    height: 45,
  },
  needHelpMessageInput: {
    height: 70,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.MYSTIC,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  padV10: {
    paddingVertical: 10,
  },
  needHelpAttachmentView: {
    marginTop: 20,
    color: colors.TOPAZ,
    lineHeight: 21,
    fontSize: 16,
  },
  needHelpBrowseButton: {
    // width: 120,
    marginTop: 10,
    backgroundColor: colors.EASTERN_BLUE,
    borderWidth: 1,
    borderColor: colors.EASTERN_BLUE,
    paddingVertical: 10,
    paddingHorizontal: 35,
  },
  needHelpBottomButtonView: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  m10: {
    margin: 10,
  },
  needHelpSubmitButton: {
    minWidth: 120,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderWidth: 1,
    borderColor: colors.MOUNTAIN_MEADOW,
    paddingVertical: 10,
  },
  needHelpResetButton: {
    minWidth: 120,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.MOUNTAIN_MEADOW,
    paddingVertical: 10,
  },
  needHelpResetButtonText: {
    color: colors.MOUNTAIN_MEADOW,
    fontSize: 14,
  },
  authenticationLogoStyle: {
    height: 80,
    width: '50%',
    position: 'absolute',
    top: 0,
    left: 15,
  },
  borderGrey: {
    borderWidth: 0.5,
    borderColor: colors.SILVER,
  },
  marH15: {
    marginHorizontal: 15,
  },
  height100AlignIJusCenter: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sLoginMainView: {
    height: '100%',
    padding: 15,
    justifyContent: 'center',
  },
  sLLogoStyle: {
    height: 50,
    width: 150,
    position: 'absolute',
    top: 0,
    left: 15,
  },
  sLContWithTextstyle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 19,
    color: colors.DOVE_GRAY,
  },
  sLfbGLogoMainStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  sLFbGoIconStyle: {
    height: 70,
    width: 70,
    borderRadius: 40,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    shadowColor: colors.ABBEY,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 15,
  },
  marR20: {
    marginRight: 20,
  },
  marL20: {
    marginLeft: 20,
  },
  sLFBStyle: {
    height: 70,
    width: 70,
    alignSelf: 'center',
    borderRadius: 40,
  },
  sLGoogleStyle: {
    height: 40,
    width: 40,
    alignSelf: 'center',
    borderRadius: 40,
  },
  sLOrTextStyle: {
    textAlign: 'center',
    marginBottom: 40,
    color: 'grey',
  },
  sLEmailTextStyle: {
    textAlign: 'center',
    // marginBottom: 40,
    fontSize: 20,
    color: colors.PURPLE_HEART,
    fontWeight: '400',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  signUpSelection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  authLogoStyleCommom: {
    height: 80,
    width: '50%',
    position: 'absolute',
    top: 0,
    left: 15,
  },
  loginMainScreen: {
    padding: 15,
    justifyContent: 'center',
    height: '100%',
  },
  loginPhoneInputIconView: {
    width: '10%',
    justifyContent: 'center',
    height: 40,
  },
  loginPhoneInputView: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    height: 40,
    justifyContent: 'center',
    color: '#222',
  },
  inputStyle: {
    color: 'black',
  },
  loginPasswordIconView: {
    width: '10%',
    height: 40,
    justifyContent: 'center',
  },
  loginPasswordInputView: {
    flexDirection: 'row',
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    height: 40,
  },
  loginPasswordInputView_1: {
    width: '85%',
    justifyContent: 'center',
  },
  loginPasswordEyeIconView: {
    width: '15%',
    borderLeftWidth: 1,
    borderLeftColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  loginForgetPasswordText: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    color: colors.DARK_BLUE,
  },
  loginButtonView: {
    marginTop: '25%',
    alignSelf: 'center',
  },
  authTabView: {
    alignSelf: 'center',
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.SILVER,
    borderRadius: 5,
    flexDirection: 'row',
  },
  authPasswordTab: {
    // padding: 13,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  authOtpTab: {
    // padding: 13,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  marT50: {
    marginTop: 50,
  },
  sTLTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },
  sTLTextViewFirst: {
    alignItems: 'center',
    height: 30,
  },
  sTLTextViewFirstTextStyle: {
    fontSize: 20,
    color: colors.OXFORD_BLUE,
    justifyContent: 'center',
  },
  sTLTextViewSecond: {
    alignItems: 'center',
    height: 30,
    marginTop: 20,
    borderBottomWidth: 1,
    color: 'grey',
  },
  sTLTextViewSecondTextStyle: {
    fontSize: 20,
    color: colors.RED_VOILET,
    justifyContent: 'center',
  },
  sTLTextMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  sTLTextInputFirstView: {
    width: '12%',
    height: 50,
    justifyContent: 'center',
  },
  sTLTextInputFirstViewIcon: {
    height: 25,
    width: 25,
  },
  sTLTextInputMiddleView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    justifyContent: 'space-between',
  },
  sTLTxtInView: {
    width: '48%',
    borderBottomWidth: 1,
    borderColor: 'grey',
    height: 50,
    justifyContent: 'center',
  },
  sTLViewButtonStyle: {
    alignSelf: 'center',
    marginTop: 80,
  },
  thankYouCheckView: {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.LIMA,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  thankYouTextStyle: {
    fontSize: 25,
    textAlign: 'center',
    color: colors.OXFORD_BLUE,
    paddingTop: 20,
  },
  thankYouOpTextstyle: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.OXFORD_BLUE,
    paddingTop: 2,
  },
  actModMainView: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  actModFirstView: {
    paddingTop: 10,
    alignSelf: 'center',
  },
  actModalView: {
    width: '100%',
    backgroundColor: colors.WHITE,
    borderRadius: 5,
  },
  actModTextstyle: {
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    fontSize: 18,
  },
  redColorText: {
    fontSize: 13,
    color: 'red',
  },
  actTextHereStyle: {
    color: colors.CORNFLOWER_BLUE,
    textDecorationLine: 'underline',
    textAlign: 'center',
    padding: 15,
  },
  signUpMainView: {
    height: '100%',
    padding: 15,
    justifyContent: 'space-between',
  },
  signUpFirstView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signUpLogoStyle: {
    height: 75,
    width: '50%',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  fontSize20: {
    fontSize: 20,
  },
  fontSize18: {
    fontSize: 18,
  },
  signUpTextStyle: {
    fontSize: 18,
    color: colors.CORNFLOWER_BLUE,
    fontWeight: 'bold',
  },
  signUpRowBView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    width: '100%',
    justifyContent: 'center',
  },
  signUpBorder: {
    borderWidth: 0.5,
    borderColor: 'grey',
    width: '90%',
    alignSelf: 'center',
  },
  signUpLoginButtonStyle: {
    width: '80%',
    paddingVertical: 12,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 30,
  },
  paddB40: {
    paddingBottom: 40,
  },
  privacyFirstText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 15,
  },
  privacySecondText: {
    fontSize: 18,
    color: colors.OXFORD_BLUE,
    paddingTop: 8,
  },
  privacyPointText: {
    fontSize: 16,
    color: colors.OXFORD_BLUE,
    paddingTop: 15,
    letterSpacing: 0.5,
  },
  privacyBorderstyle: {
    borderWidth: 0.4,
    borderColor: colors.CERULEAN_BLUE,
    marginVertical: 20,
  },
  privacyYourTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.OXFORD_BLUE,
    letterSpacing: 0.5,
  },
  privacyLastView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  marL30: {
    marginLeft: 30,
  },
  privacyCircleView: {
    borderWidth: 2.5,
    height: 25,
    width: 25,
    borderRadius: 20,
    borderColor: colors.DOVE_GRAY,
    justifyContent: 'center',
  },
  privacyCircleStyle: {
    height: 10,
    width: 10,
    borderRadius: 20,
    backgroundColor: colors.RED_VOILET,
    alignSelf: 'center',
  },
  privacyAgreeStyle: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.OXFORD_BLUE,
  },
  whiteTextBack: {
    backgroundColor: Colors.WHITE,
  },
  paddB150: {
    paddingBottom: 150,
  },
  fontSize15: {
    fontSize: 15,
  },
  backgroundColorWild: {
    backgroundColor: colors.WILD_SAND,
  },
  drawerCloseIconView: {
    position: 'absolute',
    top: '7%',
    right: '7%',
  },
  drawerCloseIcon: {
    height: 15,
    width: 15,
  },
  drawerNavigationScreenIcon: {
    height: 17,
    width: 17,
  },
  drawerScreenMainView: {
    marginTop: 80,
    paddingLeft: 15,
  },
  drawerScreenViewMainView_1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerScreenIcon: {
    height: 18,
    width: 18,
  },
  drawerScreenNameView: {
    width: '85%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.ALTO,
    paddingLeft: 10,
  },
  drawerScreenName: {
    color: colors.OXFORD_BLUE,
    lineHeight: 20,
  },
  drawerProfileImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  drawerProfileName: {
    paddingLeft: 15,
    fontSize: 18,
    color: colors.CLOUD_BURST,
  },
  drawerScreenIconView: {
    width: '15%',
    paddingVertical: 10,
  },
  drawerNotificationCountView: {
    position: 'absolute',
    right: -18,
    top: -3,
    backgroundColor: colors.ORANGE_PEEL,
    height: 15,
    // width: 15,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7.5,
  },
  drawerNotificationCount: {
    fontSize: 10,
    color: colors.WHITE,
  },
  borderBottomZero: {
    borderBottomWidth: 0,
  },
  alignSelfBaseline: {
    alignSelf: 'baseline',
  },
  alignSelfBaseline2: {
    alignSelf: 'baseline',
  },
  langModMainView: {
    width: '100%',
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    maxHeight: '95%',
  },
  langModView: {
    paddingTop: 10,
    paddingLeft: 20,
  },
  langModTextStyle: {
    marginLeft: 10,
    // paddingTop: 20,
    paddingLeft: 15,
  },
  rowAlignSelfItemCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  pickerCountryView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerCountryViewStyleNew: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  paddR5paddL5: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  loginHereText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6495EA',
    marginTop: 20,
    fontWeight: 'bold',
  },
  height25width25: {
    height: 25,
    width: 25,
  },
  rowTop25: {
    flexDirection: 'row',
    marginTop: 25,
  },
  width90PaddL5: {
    width: '90%',
    paddingLeft: 5,
  },
  cplProView: {
    alignSelf: 'center',
    height: '60%',
    borderRightWidth: 1,
    borderRightColor: 'grey',
  },
  width13JusCenter: {
    width: '13%',
    justifyContent: 'center',
  },
  width10per: {
    width: '10%',
  },
  compDropDownStyle: {
    paddingBottom: 5,
    fontSize: 16,
    lineHeight: 22,
  },
  completeProfileAgreementView: {
    width: '10%',
    justifyContent: 'flex-start',
  },
  completeProfileAgreement: {
    lineHeight: 22,
    fontSize: 16,
  },
  width90per: {
    width: '90%',
  },
  completeProfilePersonalGenderView: {
    flexDirection: 'row',
    marginTop: 25,
    zIndex: 1,
  },
  completeProfilePersonalGenderDropDown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeProfilePersonalGenderDropDownOpen: {
    position: 'absolute',
    left: '10%',
    right: 0,
    backgroundColor: colors.WHITE,
    top: '100%',
    zIndex: 1,
    padding: 10,
  },
  font16: {
    fontSize: 16,
  },
  flexRow: {
    flexDirection: 'row',
  },
  loginFieldIcon: {
    height: 25,
    width: 25,
    color: 'black',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  loginButtonLockIcon: {
    height: 18,
    width: 18,
  },
  otpTimerView: {
    marginTop: 20,
    alignItems: 'center',
  },
  otpTimer: {
    color: colors.TOPAZ,
    fontSize: 16,
  },
  dashboadrMenuIcon: {
    height: 16,
    width: 16,
  },
  backGroundWhite: {
    backgroundColor: Colors.WHITE,
  },
  paddB240: {
    paddingBottom: 240,
  },
  loaderContainer: {
    justifyContent: 'center',
    // position: 'absolute',
    opacity: 0.4,
    backgroundColor: '#000',
    width,
    flex: 1,
    //zIndex: 199,
    alignItems: 'center',
    flexDirection: 'column',
  },
  countryView: {
    width: '100%',
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    maxHeight: '95%',
  },
  countryRowview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 5,
    width: '100%',
  },
  countryIconStyle: {
    height: 20,
    width: 30,
    marginRight: 10,
    marginLeft: 5,
  },
  signUpIconStyle: {
    height: 15,
    width: 25,
    marginRight: 10,
  },
  paddB280: {
    paddingBottom: 280,
  },
  validationText: {
    marginTop: 3,
    fontSize: 13,
    color: 'red',
  },
  noRecordText: {
    flex: 1,
    justifyContent: 'center',
  },
  borderWidthZero: {
    borderWidth: 0,
  },
  renderHtmlStyleA: {
    fontStyle: 'normal',
    color: colors.CLOUD_BURST,
    textDecorationLine: 'none',
    fontSize: 16,
    lineHeight: 23,
  },
  renderHtmlStyleP: {
    fontStyle: 'normal',
    lineHeight: 23,
    color: colors.CLOUD_BURST,
    fontSize: 16,
    marginBottom: 16,
  },
  cSurvFirstTextStyleNew: {
    fontSize: 14,
    color: colors.OXFORD_BLUE,
  },
  shadowBox: {
    elevation: 10,
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowOffset: {height: 1, width: 0},
    shadowRadius: 5,
  },
  dashBoardLiveSurveyMsgNEw: {
    color: colors.CLOUD_BURST,
    fontSize: 18,
    paddingTop: 20,
    marginLeft: 10,
    marginBottom: 7,
    fontWeight: 'bold',
  },
  dashboardPointStatusView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dashboardPointStatusBox: {
    width: '49%',
    padding: 10,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    borderRadius: 4,
  },
  dashboardPointStatusIcon: {
    height: 50,
    width: 50,
  },
  dashboardPointStatusText: {
    marginVertical: 10,
    alignItems: 'center',
  },
  marB13: {
    marginBottom: 13,
  },
  dashboardLiveSurveyBox: {
    // flex: 0.5,
    width: width / 2 - 20,
    padding: 10,
    // margin: 3,
    marginRight: 0,
    //margin: 10,
    backgroundColor: colors.WHITE,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: colors.ATHENS_GRAY,
  },
  dashboardLiveSurveyBoxTitle: {
    fontSize: 12,
    color: colors.RED_VOILET,
    fontWeight: 'bold',
  },
  dashboardLiveSurveyId: {
    fontSize: 12,
    marginTop: 5,
    color: 'grey',
  },
  dashboardLiveSurveyContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  dashboardLiveSurveyContent: {
    fontSize: 12,
    color: 'grey',
  },
  dashboardLiveSurveyButton: {
    alignSelf: 'baseline',
    marginVertical: 8,
  },
  dashboardLatestPollButton: {
    padding: 10,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    borderColor: colors.RED_VOILET,
    borderRadius: 4,
    alignItems: 'center',
  },
  dashboardLatestPollButtonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dashboardLatestPollButtonIcon: {
    height: 12,
    width: 12,
    marginLeft: 10,
  },
  width100Row: {
    width: '100%',
    flexDirection: 'row',
  },
  colorTopaz: {
    color: colors.TOPAZ,
  },
  paddB200: {
    paddingBottom: 250,
  },
  cSurvMainViewNew: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
  },
  cSurvPintViewNew: {
    width: '40%',
    alignItems: 'flex-end',
  },
  rowAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cCheckBoxMultiSelectstyle: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
  },
  cCheckBoxMultiSecondStyle: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  colorGreyDashSPace: {
    color: colors.PURPLE_HEART,
    textAlign: 'center',
    // marginBottom: 40,
    fontSize: 16,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },

  height100CenterView: {
    height: '100%',
    justifyContent: 'center',
  },
  otpVericicationTextStyle: {
    textAlign: 'center',
    fontSize: 28,
    paddingBottom: 50,
    color: colors.OXFORD_BLUE,
  },
  paddB60: {
    paddingBottom: 60,
  },
  otpTextStyleFirst: {
    textAlign: 'center',
    color: colors.DOVE_GRAY,
    marginBottom: 4,
    fontSize: 16,
  },
  otpTextStyleSecond: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.DOVE_GRAY,
    marginBottom: 10,
    fontSize: 16,
  },
  otpVerificationTextInputStyle: {
    width: '70%',
    backgroundColor: colors.WHITE,
    alignSelf: 'center',
    height: 40,
    justifyContent: 'center',
    // marginBottom: 15,
  },
  otpVerificationTextInputStyleText: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  otpVerificationLastViewTextStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10,
  },
  otpVerificationRensendText: {
    textAlign: 'center',
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  otpVerificationTimerStyle: {
    textAlign: 'center',
    color: colors.MOUNTAIN_MEADOW,
    fontWeight: 'bold',
    fontSize: 16,
  },
  otpVerificationTextLast: {
    textAlign: 'center',
    color: colors.MOUNTAIN_MEADOW,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  otpVericicationVerifyStyle: {
    paddingHorizontal: 80,
    paddingVertical: 11,
    backgroundColor: colors.MOUNTAIN_MEADOW,
    borderColor: colors.MOUNTAIN_MEADOW,
    alignSelf: 'center',
  },
  otpVerificationErrorMsg: {
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginLeft: 10,
  },
  cNdescrpTextStyleRead: {
    color: colors.OXFORD_BLUE,
    fontWeight: 'bold',
    fontSize: 16,
  },
  width20AlignRight: {
    width: '20%',
    alignItems: 'flex-end',
  },
  colorsOXFORD_BLUE: {
    color: colors.OXFORD_BLUE,
  },
  rowAlignJustifyCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marR5: {
    marginRight: 5,
  },
  cDropDownContainerStyleNewFordropdowm: {
    borderColor: colors.MYSTIC,
    borderWidth: 1,
    height: 150,
    position: 'absolute',
  },
  accCalFirstView: {
    height: 50,
    width: 90,
    borderWidth: 1,
    borderColor: colors.MYSTIC,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  accCalSecondView: {
    height: 50,
    width: 100,
    borderWidth: 1,
    borderColor: colors.MYSTIC,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
    borderRadius: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  accCalDropMainView: {
    marginVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  accDropDownContainerStyleNew: {
    width: '85%',
    borderRadius: 1,
  },
  accDropDStyleNew: {
    width: '85%',
    borderRadius: 5,
  },
  colorGrey: {
    color: 'grey',
  },
  colorSize10: {
    color: colors.WHITE,
    fontSize: 10,
  },
  colorBlack: {
    backgroundColor: colors.ABBEY,
    opacity: 2,
  },
  accRewardNotificationStyle: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    backgroundColor: '#000',
    opacity: 1,
    width: '100%',
  },
  fontSize12ColorTopaz: {
    fontSize: 10,
    color: colors.TOPAZ,
  },
  fontSize12ColorBurst: {
    fontSize: 12,
    color: colors.CLOUD_BURST,
  },
  pointTabFirstView: {
    width: 100,
  },
  pointTabSecondView: {
    width: '16.7%',
    zIndex: 3,
  },
  pointTabThirdView: {
    width: '16.7%',
    zIndex: 2,
  },
  pointTabFourthView: {
    width: '16.7%',
  },
  pointTabFifthView: {
    width: '20%',
  },
  pointTabSixthView: {
    width: 70,
  },
  unsubscribeTextInput: {
    width: '100%',
    height: 45,
    alignItems: 'center',
  },
  sTLTxtInViewNew: {
    width: '48%',
    justifyContent: 'center',
  },
  sTLTextMainViewNew: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  width12Per: {
    width: '12%',
  },
  unRegisterMobileModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unRegisterMobileModalMainView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  mv20: {
    marginVertical: 20,
  },
  colorFaintGreyBackground: {
    backgroundColor: '#F9f9f9',
  },
  redTapListMainView: {
    flexDirection: 'row',
    marginVertical: 10,
    marginBottom: 20,
  },
  redTapListFirstView: {
    width: '25%',
  },
  redTapListsecondView: {
    width: '20%',
  },
  redTapListThirdView: {
    width: '35%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  redTapListFourthView: {
    width: '20%',
  },
  redTapPopView: {
    backgroundColor: 'black',
    padding: 10,
  },
  redTapPopTextStyle: {
    color: Colors.WHITE,
    fontSize: 12,
    marginLeft: 3,
  },
  redTapListDataView: {
    width: '25%',
  },
  redTapListDataSecondView: {
    width: '20%',
    flexDirection: 'row',
    zIndex: 2,
  },
  redTapListDataThirdView: {
    width: '35%',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: -1,
  },
  redTapListDataLastView: {
    width: '20%',
  },
  surveyTabDataMainView: {
    flexDirection: 'row',
    marginVertical: 10,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  surveyTapFirstView: {
    width: '25%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  surveyTapSecondView: {
    width: '25%',
  },
  surveyTapThirsView: {
    width: '25%',
    zIndex: 3,
  },
  surveyTapFourthView: {
    width: '25%',
    zIndex: -1,
  },
  padd10: {
    padding: 10,
  },
  surveyPopView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 3,
  },
  surveyPopViewText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 3,
  },
  width20Simple: {
    width: 20,
  },
  needHelpDocumentTextStyle: {
    marginTop: 2,
    color: 'grey',
  },
  paddR15: {
    paddingRight: 15,
  },
  marL35: {
    marginLeft: 35,
  },
  changePasswordYellowMessage: {
    marginTop: 20,
    backgroundColor: colors.AMBER,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  rewardPointTabFirstView: {
    width: '30%',
  },
  paddB250: {
    paddingBottom: 250,
  },
  headerTextStyleForgotPassword: {
    fontSize: 27,
    marginLeft: 20,
    color: colors.CLOUD_BURST,
  },
  forgotPasswordFirstView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
  },
  marL10: {
    marginLeft: 10,
  },
  forgotPasswordTextStyle: {
    textAlign: 'center',
    fontSize: 13,
    color: 'grey',
  },
  forgotPasswordbuttonStyle: {
    marginTop: 90,
    alignSelf: 'center',
  },
  paddH60: {
    paddingHorizontal: 60,
  },
  forgotPasswordMainview: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 50,
  },
  forgotPasswordBorderStyle: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: 'grey',
  },
  width15: {
    width: '15%',
  },
  forgotPasswordMiddleFirstView: {
    width: '15%',
    alignItems: 'center',
  },
  forgotPasswordMiddleSeocondView: {
    width: '80%',
  },
  notificationErrorMsg: {
    height: 100,
    justifyContent: 'center',
  },
  fontWeightNormal: {
    fontWeight: 'normal',
  },
  paddH30: {
    paddingHorizontal: 30,
  },
  paddT30: {
    paddingTop: 30,
  },
  resetPasswordText: {
    textAlign: 'center',
    fontSize: 13,
    color: 'grey',
    paddingBottom: 80,
  },
  paddL3: {
    paddingLeft: 3,
  },
  height40Static: {
    height: 40,
  },
  passwordVerificationText: {
    textAlign: 'center',
    fontSize: 27,
    paddingBottom: 80,
    color: colors.CLOUD_BURST,
  },
  greybackgroundCCC: {
    backgroundColor: '#ccc',
  },
  passwordVerificationResendText: {
    padding: 10,
    fontSize: 16,
    textDecorationLine: 'underline',
    color: colors.MOUNTAIN_MEADOW,
    textAlign: 'center',
    paddingTop: 20,
  },
  passwordVerificationButtonView: {
    alignSelf: 'center',
    paddingTop: 50,
  },
  marH24: {
    marginHorizontal: 24,
  },
  passwordVerificationOtpView: {
    height: 40,
    width: 40,
    textAlign: 'center',
    color: '#000',
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  passwordVerificationOtpMainView: {
    height: 60,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  passwordVerificationSimpleText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'grey',
    paddingBottom: 10,
  },
  passwordVerificationCell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
    textAlign: 'center',
  },
  passwordVerificationFocusCell: {
    borderColor: '#ccc',
  },
  passwordVerificationTimerText: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 20,
    color: 'grey',
  },
  marB5: {
    marginBottom: 5,
  },
  latesPollsTextStyle: {
    color: colors.RED_VOILET,
    fontWeight: 'bold',
  },
  forgotPasswordWebIconStyle: {
    height: 24,
    width: 24,
    // borderWidth: 0.4,
    // borderRadius: 100,
    // borderColor: 'grey',
  },
  borderPont5: {
    borderWidth: 0.5,
  },
  demoSurveyMainModalView: {
    flex: 1,
    backgroundColor: colors.TRANSPARENT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  demoSurveyMainModalViewStyle: {
    width: '100%',
    backgroundColor: colors.WHITE,
    borderRadius: 5,
    height: '95%',
    // padding: 15,
  },
  paddH40: {
    paddingHorizontal: 40,
  },
  demoSureyAuthButton: {
    padding: 10,
    paddingHorizontal: 40,
    alignSelf: 'baseline',
    backgroundColor: '#17AA56',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#17AA56',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    // alignSelf:'center',
    // elevation: 15,
  },
  demoSureyAuthButtonName: {
    color: colors.WHITE,
    fontSize: 16,
    textAlignVertical: 'center',
  },
  demoSurveyLastView: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: '10%',
  },
  height90: {
    height: '90%',
  },
  alignSelfFlexEnd: {
    alignSelf: 'flex-end',
  },
  padV20: {
    paddingVertical: 20,
  },
  authButton: {
    padding: 10,
    alignSelf: 'baseline',
    backgroundColor: '#17AA56',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#17AA56',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    // elevation: 15,
  },
  authButtonName: {
    fontWeight: 'bold',
    color: colors.WHITE,
    fontSize: 16,
    // justifyContent: 'center',
    textAlignVertical: 'center',
  },
  width15Static: {
    width: 15,
  },
  marR10: {
    marginRight: 10,
  },
  notificationMiddleViewStyle: {
    height: 50,
    justifyContent: 'center',
  },
  changePasswordContentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  permissionModalTextScreen: {
    textAlign: 'center',
    paddingBottom: 5,
    fontSize: 18,
    color: 'red',
  },
  girdFirstViewFirstStyle: {
    width: '25%',
    flexDirection: 'row',
  },
  girdFirstViewSecondStyle: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gridSecondViewMainStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
  },
  gridSecondViewFirstStyle: {
    width: '25%',
    flexDirection: 'row',
  },
  gridSecondViewSecondStyle: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flexShrinkOne: {
    flexShrink: 1,
  },
  fontSize12ColorTopazNew: {
    fontSize: 12,
    color: colors.TOPAZ,
  },
  pT20: {
    paddingTop: 20,
  },
  marBMinus20: {
    marginBottom: -20,
  },
  pT0: {
    paddingTop: 10,
  },
  padBMinus50: {
    paddingBottom: -50,
  },
  errorMsgBoxStyle: {
    padding: 10,
    width: '100%',
    backgroundColor: colors.AMBER,
    color: colors.WHITE,
    marginBottom: 10,
  },
  dashDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.92)',
    marginHorizontal: 0,
  },
  dashInactiveDotStyle: {
    width: 12,
    height: 12,
    borderRadius: 10,
    marginHorizontal: 0,
  },
  dashDotContainerStyle: {
    paddingVertical: 0,
    marginHorizontal: 0,
    bottom: 20,
    top: 20,
  },
  flexGrowOne: {
    flexGrow: 1,
  },
  blackColor: {
    color: Colors.ABBEY,
  },
  marM80: {
    marginTop: -80,
  },
  criteriaQuestionButton: {
    padding: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    backgroundColor: '#17AA56',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#17AA56',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    // alignSelf:'center',
    // elevation: 15,
  },
  fontSize12ColorTopazReWardTab: {
    fontSize: 10,
    color: colors.TOPAZ,
    fontWeight: 'bold',
  },
  accounTabLoaderMorebittonView: {
    marginTop: 10,
    backgroundColor: Colors.MOUNTAIN_MEADOW,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 3,
  },
  whiteTextColor: {
    color: Colors.WHITE,
  },
  marL5: {
    marginLeft: 5,
  },
  width100Static: {
    width: 100,
  },
  pT5: {
    paddingTop: 5,
  },
  colorTopazStyle: {
    color: colors.TOPAZ,
  },
  padBMinus20: {
    paddingBottom: -20,
  },
  heightStatic150: {
    // height: 150,
  },
  ml_3: {
    marginLeft: 3,
  },
  colorFaintGrey: {
    color: '#B3B6B7',
  },
  txtStyleNew: {
    color: colors.TOPAZ,
    marginTop: 5,
    fontSize: 16,
  },
  headerBold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorAlto: {
    color: colors.ALTO_NEW,
  },
  blackTransorm: {
    color: '#000',
    textTransform: 'capitalize',
  },
  font18BoldGrey: {
    textAlign: 'center',
    color: 'grey',
    fontWeight: 'bold',
  },
  textTransformStyle: {
    textTransform: 'capitalize',
  },
  editEmailPhoneScreen: {
    alignSelf: 'center',
    paddingTop: 20,
  },
  width25Static: {
    width: 20,
  },
  editDetailCell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Colors.grey_color,
    backgroundColor: Colors.WHITE,
    textAlign: 'center',
  },
  editDetailFocusCell: {
    borderColor: Colors.grey_color,
  },
  editDetailTextStyle: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5,
    color: colors.DARK_BLUE,
  },
  editDetailMaimViewStyle: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 20,
    borderRadius: 5,
  },
  paddT20: {
    paddingTop: 20,
  },
  errorMsgBoxStyleNew: {
    padding: 10,
    width: '100%',
    backgroundColor: colors.AMBER,
    color: colors.WHITE,
  },
  cDropDownContainerStyleNewFordropdowmNew: {
    borderColor: colors.MYSTIC,
    borderWidth: 1,
    minHeight: 150,
    maxHeight: 350,
    position: 'absolute',
  },
  cRewardBalancestyle: {
    paddingHorizontal: 4,
    paddingVertical: 5,
    backgroundColor: '#000',
  },
  cultureHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  sucessMsgBoxStyle: {
    padding: 10,
    width: '100%',
    backgroundColor: colors.MOUNTAIN_MEADOW,
    color: colors.WHITE,
    marginBottom: 10,
  },
});

export default styles;
