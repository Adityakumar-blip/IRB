import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import styles from '../../helper/globalStyles';
import FastImage from '../../component/FastImage';

const RefferEarnStepComponent = props => {
  const {source, description, stepNumber} = props;
  return (
    <View style={styles.refferEarnStepComponentView}>
      <View style={styles.refferEarnStepComponentView_1}>
        <FastImage
          source={source}
          resizeMode={'contain'}
          style={styles.refferEarnStepComponentImage}
        />
        <View style={styles.refferEarnStepComponentIndex}>
          <Text style={styles.referStepCount}>{stepNumber}</Text>
        </View>
      </View>
      <View style={styles.marT15}>
        <Text style={styles.refferEarnStepComponentText}>{description}</Text>
      </View>
    </View>
  );
};

export default RefferEarnStepComponent;
