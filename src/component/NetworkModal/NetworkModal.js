import React from 'react';
import { Text, View, Modal } from 'react-native';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import styles from './styles';

const NetworkModal = props => {
    const { stateStatus } = props;
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={stateStatus}
                backdropOpacity={1}
                backdropColor={'green'}
            >
                <View style={styles.modalShade}>
                    <View style={styles.containerHeight}>
                        <View style={styles.modalContainer}>
                            <View>
                                <Text style={styles.redTextstyle}>{I18n.t(globalText._connectionFailed)}</Text>
                            </View>
                            <View style={styles.marT5Per}>
                                <Text style={styles.textCenter}>
                                    {I18n.t(globalText._pleaseCheckYourInternetConnection)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default NetworkModal;
