/* eslint-disable react/jsx-key */
import React from 'react';
import { Modal, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../helper/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/colors';

const LanguageModal = props => {
    const { visible, onRequestClose, data, onPressClose, onSetValue, languageName, languageSelect } = props;

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
                <View style={styles.langModMainView}>
                    <TouchableOpacity onPress={onPressClose} style={[styles.langModView, styles.paddB20]}>
                        <AntDesign name={'close'} size={20} color={colors.ABBEY} />
                    </TouchableOpacity>
                    <ScrollView>
                        {data &&
                            data.length > 0 &&
                            data.map((item, index) => (
                                <View style={styles.paddB20}>
                                    <TouchableOpacity onPress={() => onSetValue(item)}>
                                        <Text style={styles.langModTextStyle}>{item.language}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        {/* {data && data.length == 0 && (
                            <View style={styles.paddB20}>
                                <TouchableOpacity onPress={() => onSetValue(item)}>
                                    <Text style={styles.langModTextStyle}>English</Text>
                                </TouchableOpacity>
                            </View>
                        )} */}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};
export default LanguageModal;
