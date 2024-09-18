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
import { globalText } from '../../helper/globalText';
import colors from '../../styles/colors';
import I18n from '../../i18n/index';
import FastImage from 'react-native-fast-image';

const LatestTrollShareModal = props => {
    const { visible, onRequestClose, onPressFacebook, onPressTwitter, onPressLinkedin, onPressOutside } = props;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            swipeDirection="down"
            onRequestClose={onRequestClose}
        >
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
                            <Text style={styles.latTrollModalFirstTextStyle}>{I18n.t(globalText.shareVia)}</Text>
                            <View style={styles.latTrollBorderModalStyle} />
                            <View style={styles.latTrollModalMiddleStyle}>
                                <TouchableOpacity onPress={onPressFacebook}>
                                    <FastImage
                                        style={styles.latTrollModalImgFirstStyle}
                                        source={GlobalImages.facebookNewIcon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onPressTwitter}>
                                    <FastImage
                                        style={styles.latTrollModalImgSecondStyle}
                                        source={GlobalImages.twitterNewIcon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onPressLinkedin}>
                                    <FastImage
                                        style={styles.latTrollModalImgThirdStyle}
                                        source={GlobalImages.inNewIcon}
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
export default LatestTrollShareModal;
