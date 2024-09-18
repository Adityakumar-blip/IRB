import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import CustomRadioButton from '../customRadio/index';
import styles from '../../helper/globalStyles';

const CustomRadioAndAns = props => {
    const { answer, onPressRadio } = props;

    return (
        <View style={styles.directionRow}>
            <View style={styles.width10}>
                <CustomRadioButton {...props} />
            </View>
            <TouchableOpacity onPress={onPressRadio} style={styles.width90}>
                <Text style={styles.customAnsText}>{answer}</Text>
            </TouchableOpacity>
        </View>
    );
};
export default CustomRadioAndAns;
