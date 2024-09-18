import React from 'react';
import { Modal, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import colors from '../../styles/colors';
import I18n from '../../i18n/index';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ActiveModal = props => {
    const { visible, onRequestClose, onPressClose } = props;

    return (
        <Modal visible={visible} transparent={true} onRequestClose={onRequestClose}>
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.TRANSPARENT}
                opacity={0.1}
                statusBarTranslucent
            />
            <View style={styles.actModMainView}>
                <View style={styles.actModalView}>
                    <TouchableOpacity
                        onPress={onPressClose}
                        style={{
                            alignSelf: 'flex-end',
                            justifyContent: 'flex-end',
                            marginTop: 10,
                            marginRight: 10,
                        }}
                    >
                        <AntDesign name={'close'} size={20} color={colors.ABBEY} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 14,
                            paddingHorizontal: 15,
                            paddingTop: 10,
                            paddingBottom: 20,
                            textAlign: 'center',
                            color: 'red',
                        }}
                    >
                        {I18n.t(globalText.thankYouComeAgain)}
                    </Text>
                </View>
            </View>
        </Modal>
    );
};
export default ActiveModal;
