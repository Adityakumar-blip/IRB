import React from 'react';
import { View, Text, StatusBar, Modal, TouchableOpacity } from 'react-native';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import colors from '../../styles/colors';
import I18n from '../../i18n/index';

const LatestPollShareModalNew = props => {
    const { visible, onRequestClose, onPressCancel, onPressSharePoll, onPressEntirePoll } = props;
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
            <View style={styles.lSFirstView}>
                <View>
                    <View style={styles.lSWhiteScreen}>
                        <Text style={styles.lsShareTextStyle}>{I18n.t(globalText.share)}</Text>
                        <Text style={styles.lSSharDecrpStyle}>
                            {I18n.t(globalText.doYouWantToShareThisPollOrEntirePollCatalogues)}
                        </Text>
                        <View style={styles.lSBorderstyle} />
                        <TouchableOpacity onPress={onPressSharePoll}>
                            <Text style={styles.lSBlueTextStyle}>{I18n.t(globalText.shareThisPoll)}</Text>
                        </TouchableOpacity>
                        <View style={styles.lSBorderstyle} />
                        <TouchableOpacity onPress={onPressEntirePoll}>
                            <Text style={styles.lSBlueTextStyle}>{I18n.t(globalText.entirePollCatalogue)}</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.lSCancelButtonStyle} onPress={onPressCancel}>
                        <Text style={styles.lSCancelButtonTextStyle}>{I18n.t(globalText.cancel)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default LatestPollShareModalNew;
