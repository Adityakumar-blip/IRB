import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import styles from '../../helper/globalStyles';

const AuthButton = ({
    onPress,
    buttonName,
    leftIcon,
    rightIcon,
    authButtonStyle,
    disabled,
    buttonStyle,
    rightIconStyle,
    rightIconNew,
}) => {
    return (
        <View>
            {buttonName && buttonName.length > 0 && (
                <TouchableOpacity style={[styles.authButton, authButtonStyle]} onPress={onPress} disabled={disabled}>
                    {leftIcon && <View style={styles.marR10}>{leftIcon}</View>}
                    <Text style={[styles.authButtonName, { textTransform: 'uppercase' }, buttonStyle]}>
                        {buttonName}
                    </Text>
                    {rightIcon && (
                        <Feather
                            name={'chevron-right'}
                            size={20}
                            color={colors.WHITE}
                            style={[styles.width15Static, rightIconStyle]}
                        />
                    )}
                    {rightIconNew && (
                        <Feather
                            name={'chevron-right'}
                            size={20}
                            color={colors.WHITE}
                            style={[styles.width15Static, rightIconStyle]}
                        />
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
};

export default AuthButton;
