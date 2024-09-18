import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from '../../helper/globalStyles';

const CustomRadioButton = props => {
    const { checkValue, onPressRadio } = props;
    return (
        <TouchableOpacity
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            onPress={onPressRadio}
            style={styles.CSimpleRadioStyle}
        >
            {checkValue && <View style={styles.CRadioStyle} />}
        </TouchableOpacity>
    );
};
export default CustomRadioButton;
