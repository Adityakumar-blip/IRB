import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import CustomCheckBox from "../customCheckBox/index";
import styles from "../../helper/globalStyles";

const CustomCheckBoxAns = (props) => {
  const { answer, onPressCheckBox } = props;
  return (
    <View style={styles.directionRow}>
      <View style={styles.width10}>
        <CustomCheckBox {...props} />
      </View>
      <View style={styles.width90}>
        <TouchableOpacity onPress={onPressCheckBox}>
          <Text style={styles.customAnsText}>{answer}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomCheckBoxAns;
