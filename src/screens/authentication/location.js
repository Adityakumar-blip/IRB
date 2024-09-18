import React from 'react';
import { Modal, StatusBar, StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import styles from '../../helper/globalStyles';
import Octicons from 'react-native-vector-icons/Octicons';
import { globalText } from '../../helper/globalText';
import colors from '../../styles/colors';

const LocationModal = props => {
    const { visible, onRequestClose, onPress } = props;

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
            <View style={styles.actModMainView}>
                <View style={stylesNew.loactionFirstView}>
                    <View>
                        <View style={styles.actModFirstView}>
                            <Octicons name={'location'} size={25} color={colors.CORNFLOWER_BLUE} />
                        </View>
                        <View style={stylesNew.marV13}>
                            <Text style={stylesNew.locTextStyle}>
                                Allow <Text style={{ fontWeight: 'bold' }}>Opinion Bureau</Text> to
                            </Text>
                            <Text style={stylesNew.locTextStyle}>detect your loaction</Text>
                        </View>
                        <View style={stylesNew.locBorderStyle}>
                            <TouchableOpacity onPress={onPress}>
                                <Text style={stylesNew.locBlueText}>Allow all the time</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={stylesNew.locBorderStyle}>
                            <TouchableOpacity onPress={onPress}>
                                <Text style={stylesNew.locBlueText}>Allow only while the app is in use</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={stylesNew.locBorderStyle}>
                            <TouchableOpacity onPress={onPress}>
                                <Text style={stylesNew.locBlueText}>Deny</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={stylesNew.locBorderStyle}>
                            <TouchableOpacity onPress={onPress}>
                                <Text style={stylesNew.locBlueText}>Deny & don't ask again</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default LocationModal;

const stylesNew = StyleSheet.create({
    loactionFirstView: {
        //width: '100%',
        width: '90%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        //paddingHorizontal: 30,
    },
    marV13: {
        marginVertical: 13,
    },
    locTextStyle: {
        textAlign: 'center',
        fontSize: 16,
    },
    locBorderStyle: {
        borderTopWidth: 0.5,
        height: 50,
        justifyContent: 'center',
        borderColor: 'grey',
    },
    locBlueText: { textAlign: 'center', color: '#6495ED' },
});
