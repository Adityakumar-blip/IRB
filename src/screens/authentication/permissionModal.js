import React from 'react';
import { Modal, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../helper/globalStyles';
import colors from '../../styles/colors';

const PermissionModal = props => {
    const { visible, data, onPressClose, onSetValue, languageName, languageSelect } = props;

    return (
        <Modal visible={visible} animationType="slide" transparent={true} swipeDirection="down">
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.TRANSPARENT}
                opacity={0.1}
                statusBarTranslucent
            />
            <View style={styles.actModMainView}>
                <View style={styles.langModMainView}>
                    <View style={styles.padd10}>
                        <Text style={styles.permissionModalTextScreen}>Permission Denied!</Text>
                        <Text style={styles.textCenter}>You need to turn on your App location</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default PermissionModal;
