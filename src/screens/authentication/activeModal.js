import React from 'react';
import { Modal, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import colors from '../../styles/colors';
import I18n from '../../i18n/index';

const ActiveModal = props => {
    const { visible, onRequestClose, onPress, onPressTap } = props;

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
                    <View style={styles.actModFirstView}>
                        <Ionicons name={'location-outline'} size={30} color={colors.CORNFLOWER_BLUE} />
                    </View>
                    <View style={{}}>
                        <TouchableOpacity
                            onPress={() => {
                                onPressTap();
                            }}
                        >
                            <Text style={styles.actModTextstyle}>
                                <Text onPress={() => {}} style={styles.redTxt}>
                                    {I18n.t(globalText.sorry)}
                                </Text>
                                <Text onPress={() => {}}>{I18n.t(globalText.weAreAvlCountry)}</Text>
                                <Text
                                    onPress={() => {
                                        onPressTap();
                                    }}
                                    style={styles.actTextHereStyle}
                                >
                                    {I18n.t(globalText.here)}
                                </Text>

                                {I18n.t(globalText.dot)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default ActiveModal;
