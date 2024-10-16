import React from 'react';
import { Pressable, View } from 'react-native';
import globalStyles from '../../helper/globalStyles';

const CustomSwitch = props => {
    const { switchEnable, onPressSwicth } = props;

    return (
        <Pressable
            style={[
                switchEnable
                    ? [globalStyles.CustomToggleView_1, globalStyles.CustomToggleView_2]
                    : globalStyles.CustomToggleView_1,
            ]}
            onPress={() => onPressSwicth()}
            activeOpacity={0.9}
        >
            <View style={globalStyles.customToggleInsideCircle}></View>
        </Pressable>
    );
};

export default CustomSwitch;
