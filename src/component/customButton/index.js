import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from '../FastImage';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';

const CustomButton = props => {
  const {
    buttonName,
    addButtonStyle,
    addButtonTextStyle,
    onPress,
    needImageinButton,
    buttonImageStyleNew,
    source,
    vectorIcon,
    disabled,
    activeOpacity,
  } = props;

  return (
    <View>
      {!needImageinButton && (
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onPress}
          style={[styles.buttonStyle, addButtonStyle]}
          disabled={disabled}>
          <Text style={[styles.buttonTextstyle, addButtonTextStyle]}>
            {buttonName}
          </Text>
        </TouchableOpacity>
      )}

      {needImageinButton && (
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onPress}
          style={[styles.buttonNewStyle, addButtonStyle]}>
          <FastImage
            style={[styles.buttonImageStyle, buttonImageStyleNew]}
            source={source ? source : GlobalImages.surveyorIcon}
            resizeMode={'contain'}
          />
          <Text style={[styles.buttonTextNewstyle, addButtonTextStyle]}>
            {buttonName}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default CustomButton;
