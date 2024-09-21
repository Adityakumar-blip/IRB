import React from 'react';
import {TouchableOpacity} from 'react-native';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import FastImage from '../FastImage';

const CustomCheckBox = props => {
  const {checkValue, onPressCheckBox} = props;
  return (
    <TouchableOpacity
      onPress={onPressCheckBox}
      style={checkValue ? styles.simpleCheckBoxNew : styles.simpleCheckBox}>
      {checkValue && (
        <FastImage
          style={styles.imageStyleCCBox}
          source={GlobalImages.checkIcon}
          resizeMode={'contain'}
        />
      )}
    </TouchableOpacity>
  );
};
export default CustomCheckBox;
