import React, {useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import FastImage from '../../component/FastImage';
import AuthButton from '../../component/authButton/index';
import CustomBackground from '../../component/customBackground/index';
import CustomLoader from '../../component/customLoader/index';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
import I18n from '../../i18n/index';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import {getAsyncStorage, setAsyncStorage} from '../../utils/customFunctions';

const Privacy = props => {
  const [isAgree, setAgree] = useState('');
  const [loader, setLoader] = useState(false);

  const onPressNext = async () => {
    if (isAgree == '') {
      Alert.alert('', I18n.t(globalText.privacyAgreeMessage));
      return;
    }
    if (isAgree == 'AGREE') {
      let GDPR_Status = 1;
      await setAsyncStorage('GDPR_Status', GDPR_Status.toString());
      await onSaveGdprValue(1);
      props.navigation.navigate('SocailLogin');
    } else {
      await onSaveGdprValue(0);
      props.navigation.goBack();
    }
  };

  const onSaveGdprValue = async value => {
    setLoader(true);
    const language_data = await JSON.parse(
      await getAsyncStorage('langauge_data'),
    );
    // const deviceId = await DeviceInfo.getDeviceId();
    const deviceId = await DeviceInfo.getUniqueId();
    const payload = {
      device_id: deviceId,
      gdpr_status: value,
      country_id: language_data.country_id,
    };
    const {data, message} = await AuthApi.postDataToServer(
      Api.signUpGdprStatus,
      payload,
    );
    setLoader(false);
    if (!data) {
      return;
    }
  };

  return (
    <View style={styles.container}>
      <CustomBackground
        screen={
          <View style={styles.height100}>
            {loader && <CustomLoader />}
            <ScrollView style={styles.padd15}>
              <View style={styles.paddB40}>
                <FastImage
                  style={styles.signUpLogoStyle}
                  source={GlobalImages.logoIcon}
                  resizeMode={'contain'}
                />
                <View>
                  <Text style={styles.privacyFirstText}>
                    {I18n.t(globalText.yourPrivacyIsOurTopPriority)}
                  </Text>
                  <Text style={styles.privacySecondText}>
                    {I18n.t(globalText.weWelcomTextPrivacy)}
                  </Text>

                  <Text style={styles.privacyPointText}>
                    {I18n.t(globalText.privcyFirstPoint)}
                  </Text>
                  <Text style={styles.privacyPointText}>
                    {I18n.t(globalText.privcySecondPoint)}
                  </Text>
                  <Text style={styles.privacyPointText}>
                    {I18n.t(globalText.privcyThirdPoint)}
                  </Text>
                  <Text style={styles.privacyPointText}>
                    {I18n.t(globalText.privcyFourPoint)}
                  </Text>
                </View>
                <View style={styles.privacyBorderstyle} />
                <Text style={styles.privacyYourTextStyle}>
                  {I18n.t(globalText.yourPrivacyIsOurTopPriority)}
                </Text>
                <View style={styles.privacyLastView}>
                  <TouchableOpacity
                    style={styles.rowCenter}
                    onPress={() => setAgree('AGREE')}>
                    <View style={styles.privacyCircleView}>
                      {isAgree == 'AGREE' && (
                        <View style={styles.privacyCircleStyle} />
                      )}
                    </View>
                    <Text style={styles.privacyAgreeStyle}>
                      {I18n.t(globalText.iAgree)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.rowCenter, styles.marL30]}
                    onPress={() => setAgree('DISAGREE')}>
                    <View style={styles.privacyCircleView}>
                      {isAgree == 'DISAGREE' && (
                        <View style={styles.privacyCircleStyle} />
                      )}
                    </View>
                    <Text style={styles.privacyAgreeStyle}>
                      {I18n.t(globalText.iDontAgree)}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.alignSelfCenter}>
                  <AuthButton
                    buttonName={I18n.t(globalText.next)}
                    rightIcon
                    onPress={() => onPressNext()}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        }
      />
    </View>
  );
};

export default Privacy;
