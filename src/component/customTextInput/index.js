import { View, TextInput, Text, Image, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import styles from '../../helper/globalStyles';
import FastImage from 'react-native-fast-image';
import colors from '../../styles/colors';
import Feather from 'react-native-vector-icons/Feather';

const customTextInput = props => {
    const {
        txtInptStyle,
        keyboardType,
        placeholder,
        headerName,
        imp,
        textStyle,
        term,
        editable,
        onChangeText,
        placeholderTextColor,
        onBlur,
        secureTextEntry,
        defaultValue,
        multiline,
        maxLength,
        autoFocus,
        selectTextOnFocus,
        firstSource,
        endSource,
        endIconPress,
        inputMainViewNew,
    } = props;

    return (
        <View>
            {headerName && (
                <Text style={[styles.txtStyle, textStyle]}>
                    {headerName}
                    {imp && <Text style={styles.redTxt}> *</Text>}
                </Text>
            )}

            <View style={[styles.inputMainView, inputMainViewNew]}>
                {firstSource && (
                    <View style={styles.widthAlignCenter}>
                        <FastImage style={styles.heightWidth20} source={firstSource} />
                    </View>
                )}
                <TextInput
                    style={[
                        firstSource && endSource
                            ? styles.inptStyle80
                            : firstSource || endSource
                            ? styles.inptStyle90
                            : styles.inptStyle100,
                        txtInptStyle,
                    ]}
                    keyboardType={
                        keyboardType
                            ? keyboardType
                            : // : secureTextEntry
                            // ? secureTextEntry
                            Platform.OS === 'ios'
                            ? 'ascii-capable'
                            : 'visible-password'
                    }
                    placeholder={placeholder}
                    autoCorrect={false}
                    value={term}
                    editable={editable}
                    onChangeText={txt => onChangeText(txt)}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : colors.ALTO_NEW}
                    onBlur={onBlur}
                    secureTextEntry={secureTextEntry}
                    defaultValue={defaultValue}
                    multiline={multiline}
                    maxLength={maxLength}
                    autoFocus={autoFocus}
                    returnKeyLabel={'return'}
                    selectTextOnFocus={selectTextOnFocus}
                />
                {endSource && (
                    <TouchableOpacity style={styles.widthAlignCenter} onPress={endIconPress}>
                        <Feather name={'edit'} size={20} color={colors.SILVER_CHALICE} style={{}} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};
export default customTextInput;
