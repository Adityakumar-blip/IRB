import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Api from '../../utils/api';
import I18n from '../../i18n/index';
import {globalText} from '../../helper/globalText';
import colors from '../../styles/colors';
import authApi from '../../utils/authApi';
import {toastShow, getAsyncStorage} from '../../utils/customFunctions';
import AuthApi from '../../utils/authApi';
// import NetworkLogger from "react-native-network-logger";
import CustomLoader from '../../component/customLoader/index';
import CustomHeader from '../../component/customHeader/index';
import CustomBackGround from '../../component/customBackground/index';
import {Singular} from 'singular-react-native';
import {firebase} from '@react-native-firebase/dynamic-links';

const RefferCollegue = props => {
  const refferEmpty = [
    {
      referred_user_name: '',
      referred_user_emailId: '',
      link: 'opinionburesu',
      editable: true,
    },
    {
      referred_user_name: '',
      referred_user_emailId: '',
      link: 'opinionburesu',
      editable: true,
    },
    {
      referred_user_name: '',
      referred_user_emailId: '',
      link: 'opinionburesu',
      editable: true,
    },
    {
      referred_user_name: '',
      referred_user_emailId: '',
      link: 'opinionburesu',
      editable: true,
    },
    {
      referred_user_name: '',
      referred_user_emailId: '',
      link: 'opinionburesu',
      editable: true,
    },
  ];
  const [refferalList, setReferList] = useState(refferEmpty);
  const [isErrorMessage, setErrorMessage] = useState('');
  const [errorIndex, setErrorIndex] = useState(null);
  const [loader, setLoader] = useState(true);

  const [isLoading, setLoading] = useState(false);

  const [currentData, setCurrentData] = useState();

  const [allRefer, setAllRefer] = useState();

  const [currentIndex, setCurrentIndex] = useState(null);
  const [categotyData, setCategotyData] = useState([]);

  const [isUserDetail, setUserDetail] = useState(null);
  const [link, setLink] = useState(null);

  const [disableBtn, setDisable] = useState(false);

  useEffect(() => {
    // alert("d");
    getPremiumRefferalList();
    Singular.event('refferCollegue');
  }, []);

  const getPremiumRefferalList = async () => {
    const {data, message} = await authApi.getDataFromServer(
      Api.premiumRefferUser,
    );

    setReferList(refferEmpty);
    const referData = data?.data?.data;

    setAllRefer(referData);

    let referLength = referData.length <= 5 ? referData.length : 5;
    if (referData?.length > 0) {
      for (let j = 0; j < referLength; j++) {
        refferalList[j] = referData[j];
        refferalList[j]['editable'] = false;
      }
      setReferList(refferalList);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <View style={styles.inputMainContainer}>
          <View
            style={[
              styles.inputContainer,
              errorIndex == index && isErrorMessage
                ? {borderWidth: 1, borderColor: 'red'}
                : null,
            ]}>
            <TextInput
              placeholder={I18n.t(globalText.reffer_name)}
              onChangeText={value => {
                updateValue(index, value, 'referred_user_name');
              }}
              onBlur={() => {}}
              value={item.referred_user_name}
              editable={item.editable}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              errorIndex == index && isErrorMessage
                ? {borderWidth: 1, borderColor: 'red'}
                : null,
            ]}>
            <TextInput
              placeholder={I18n.t(globalText.reffer_email)}
              onChangeText={value => {
                updateValue(index, value, 'referred_user_emailId');
              }}
              onBlur={() => {}}
              value={item.referred_user_emailId}
              editable={item.editable}
            />
          </View>
        </View>
      </>
    );
  };
  const savePremiumUser = async (index, item) => {
    // if (index) {

    // setSaving(true);

    let editableCount = 0;
    for (let i = 0; i < refferalList.length; i++) {
      if (!refferalList[i]['editable']) {
        editableCount++;
      }
    }

    if (editableCount == refferalList.length) {
      setErrorMessage('');
      return;
    }

    if (
      !currentData?.referred_user_name &&
      !currentData?.referred_user_emailId
    ) {
      setErrorMessage(I18n.t(globalText.pls_enter_details));
      return;
    }

    if (!currentData.referred_user_name) {
      setErrorMessage(I18n.t(globalText.pls_enter_refferal_name));

      return;
    }

    if (!currentData.referred_user_emailId) {
      setErrorMessage(I18n.t(globalText.pls_enter_refferal_email));
      return;
    }

    let emailExist = allRefer.findIndex(
      reffer =>
        reffer.referred_user_emailId == currentData?.referred_user_emailId,
    );
    if (emailExist > -1) {
      let message =
        I18n.t(globalText.you_have_already_refer) +
        ' ' +
        currentData?.referred_user_emailId;
      setErrorMessage(message);
      return;
    }

    setErrorMessage('');
    setLoader(true);
    setDisable(true);

    let country = JSON.parse(await getAsyncStorage('langauge_data'));
    const payloadToCheck = {
      email: item.referred_user_emailId,
      country_id: country?.country_id,
    };
    const {data, message} = await AuthApi.postDataToServer(
      Api.signupSinupEmailVerificationApi,
      payloadToCheck,
    );

    setErrorIndex(index);
    if (!data) {
      message == '"email" must be a valid email'
        ? setErrorMessage(I18n.t(globalText.enterAValidAndActiveEmailAddress))
        : toastShow(message && message);
      setLoader(false);
      setLoading(false);
      setDisable(false);
      return;
    }
    let resData = data && data.data;
    if (resData.email != 'success') {
      resData.email == '"email" must be a valid email'
        ? setErrorMessage(I18n.t(globalText.enterAValidAndActiveEmailAddress))
        : resData.email == 'Email is not valid'
        ? setErrorMessage(I18n.t(globalText.enterAValidAndActiveEmailAddress))
        : resData.email == 'Email is already exist'
        ? setErrorMessage(I18n.t(globalText.userIsAlreadyExist))
        : null;
      setLoader(false);
      setLoading(false);
      setDisable(false);

      return;
    }
    setErrorMessage('');
    setErrorIndex(null);

    if (item?.value) {
      delete item.value;
    }

    setTimeout(async () => {
      setLoader(true);
      let obj = {
        referral_name: '',
        referral_email_id: '',
        link: '',
      };

      for (let i = 0; i < refferEmpty.length; i++) {
        if (refferalList[i]['referred_user_name']) {
          obj.referral_name += refferalList[i]['referred_user_name'] + ',';
          obj.referral_email_id +=
            refferalList[i]['referred_user_emailId'] + ',';
          obj.link = link;
        }
      }

      let refferList = obj.referral_name.split(',');

      obj.referral_name = refferList.splice(0, refferList.length - 1);

      obj.referral_name = obj.referral_name.toString();

      let refferEmailList = obj.referral_email_id.split(',');

      obj.referral_email_id = refferEmailList.splice(
        0,
        refferEmailList.length - 1,
      );

      obj.referral_email_id = obj.referral_email_id.toString();

      const payload = {
        items: [obj],
      };

      // setLoader(true);

      const {dataReffer, messageReffer} = await authApi.postDataToServer(
        Api.savePremiumCollegue,
        payload,
      );
      setDisable(false);

      setLoader(false);
      setLoading(false);
      toastShow(messageReffer);
      setCurrentData(null);
      getPremiumRefferalList();
    }, 500);
  };

  const updateValue = (index, value, key) => {
    refferalList[index][key] = value;
    const updatedData = [...refferalList];
    updatedData[index] = {...updatedData[index], value: value};

    let email = updatedData[index]['referred_user_emailId'];

    setCurrentData(updatedData[index]);
    setCurrentIndex(index);

    setReferList(updatedData);
  };

  useEffect(() => {
    onPageInit();
  }, []);
  const onPageInit = async () => {
    const getBasicInfo = await JSON.parse(await getAsyncStorage('Login_Data'));
    const getLink = await generateLink(getBasicInfo.userid);
    setLink(getLink);

    setUserDetail(getBasicInfo && getBasicInfo);

    const isProfileMenuData = await JSON.parse(
      await getAsyncStorage('myProfileData'),
    );
    if (isProfileMenuData) {
      setCategotyData(isProfileMenuData);
    }
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
  useEffect(() => {}, []);

  const onCall = (item, item1, index) => {
    props.navigation.navigate('Basic_Profile', {
      data: item,
      id: item1.sub_category_type_id,
    });
  };

  return (
    <>
      {loader && <CustomLoader isVisible={loader} />}

      <View style={{padding: 1}}></View>

      <View style={styles.container}>
        <CustomBackGround
          screen={
            <SafeAreaView style={styles.height100}>
              <CustomHeader
                headerName={I18n.t(globalText.referCollegue)}
                onPressLeftIcon={() => {
                  props.navigation.openDrawer();
                }}
                threeDotNeed
                categotyData={categotyData && categotyData}
                onCall={(item, item1, index) => onCall(item, item1, index)}
              />

              <View style={styles.subContainer}>
                <View
                  style={{marginBottom: 30, padding: 10, textAlign: 'center'}}>
                  <Text style={styles.title}>
                    {I18n.t(globalText.Earn)} {I18n.t(globalText.Currency)}
                    {'100 '}
                    {I18n.t(globalText.On_succcessful_signup)}
                  </Text>
                  <Text style={{textAlign: 'center'}}>
                    {I18n.t(globalText.please_fill_email_ids)}
                  </Text>
                </View>

                <Text style={{textAlign: 'center', color: 'red'}}>
                  {isErrorMessage ? isErrorMessage : ''}
                </Text>
                <FlatList
                  nestedScrollEnabled={true}
                  data={refferalList}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index}
                  onEndReachedThreshold={0.3}
                  extraData={refferalList}
                />
              </View>

              <View
                style={{
                  padding: 20,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    // setLoading(true)
                    savePremiumUser(currentIndex, currentData);
                  }}
                  disabled={disableBtn}>
                  <View style={styles.btnContainer}>
                    <Text style={{padding: 4, margin: 6}}>
                      {I18n.t(globalText.Invite)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 30,
  },
  subContainer: {
    // margin:10
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },

  inputContainer: {
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    borderColor: colors.MYSTIC,
    borderRadius: 4,
    paddingHorizontal: 0,
    width: 170,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.MYSTIC,
    borderRadius: 5,
    // margin: 50,
    width: 150,
    textAlign: 'center',
  },
});
export default RefferCollegue;
