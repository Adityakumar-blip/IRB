import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button } from 'react-native';
import RNModal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from '../../helper/globalStyles';

const MobileNotRegisterModal = props => {
    const { isModalVisible, setModalVisible, message } = props;

    return (
        <RNModal
            isVisible={isModalVisible}
            onSwipeCancel={() => setModalVisible(false)}
            onBackdropPress={() => setModalVisible(false)}
            onBackButtonPress={() => setModalVisible(false)}
            // animationInTiming={800}
            // animationOutTiming={800}
            // animationIn={'bounceIn'}
            // animationOut={'bounceOut'}
        >
            <View style={styles.unRegisterMobileModalView}>
                <View style={styles.unRegisterMobileModalMainView}>
                    <View style={styles.alignSelfEnd}>
                        <Entypo name="cross" size={25} onPress={() => setModalVisible(false)} />
                    </View>
                    <View style={styles.mv20}>
                        <Text style={styles.font18BoldGrey}>{message}</Text>
                    </View>
                </View>
            </View>
        </RNModal>
    );
};

export default MobileNotRegisterModal;
