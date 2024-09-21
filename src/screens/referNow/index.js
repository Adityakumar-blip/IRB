import React from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import CustomButton from '../../component/customButton/index';
import colors from '../../styles/colors';
import {globalText} from '../../helper/globalText';
import I18n from '../../i18n/index';
import FastImage from '../../component/FastImage';

const ReferNow = props => {
  const {
    visible,
    onRequestClose,
    onPress,
    onPressFacebook,
    onPressTwitter,
    onPressWhatsApp,
    onPressLinkedIn,
    onPressSkype,
    onPressOutside,
  } = props;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      swipeDirection="down"
      onRequestClose={onRequestClose}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={colors.TRANSPARENT}
        opacity={0.1}
        statusBarTranslucent
      />
      <TouchableWithoutFeedback onPress={() => onPressOutside()}>
        <View style={styles.latTrllMainModalView}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.latTrllMainModalViewStyle}>
              <Text style={styles.latTrollModalFirstTextStyle}>
                {I18n.t(globalText.referNow)}
              </Text>
              <View style={styles.latTrollBorderModalStyle} />
              <View style={styles.referNowEmailButtonView}>
                <CustomButton
                  buttonName={I18n.t(globalText.emailToReferal)}
                  addButtonStyle={styles.referNowEmailButton}
                  onPress={onPress}
                />
              </View>
              <Text style={styles.referNowIviteText}>
                {I18n.t(globalText.referNowIviteText)}
              </Text>
              <View style={styles.latTrollModalMiddleStyle}>
                {/* <TouchableOpacity onPress={onPressFacebook}>
                                    <FastImage
                                        style={styles.latTrollModalImgFirstStyle}
                                        source={GlobalImages.facebookNewIcon}
                                    />
                                </TouchableOpacity> */}
                <TouchableOpacity onPress={onPressTwitter}>
                  <FastImage
                    style={styles.latTrollModalImgSecondStyle}
                    source={GlobalImages.twitterNewIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressWhatsApp}>
                  <FastImage
                    style={styles.latTrollModalImgSecondStyle}
                    source={GlobalImages.whatsAppIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressLinkedIn}>
                  <FastImage
                    style={styles.latTrollModalImgThirdStyle}
                    source={GlobalImages.inNewIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressSkype}>
                  <FastImage
                    style={styles.latTrollModalImgSecondStyle}
                    source={GlobalImages.skypeNewIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default ReferNow;
