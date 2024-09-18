import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { globalText } from '../../helper/globalText';
import styles from '../../helper/globalStyles';
import I18n from '../../i18n/index';

const CustomDropDown = props => {
    const {
        title,
        zIndex,
        dropDownContainerStyleNew,
        dropDStyleNew,
        defaultValue,
        textStyleNew,
        open,
        setOpen,
        value,
        setValue,
        items,
        setItems,
        displayKey,
        labelKey,
        valueKey,
        onItemChoose,
        placeholder,
        onOpen,
        disabled,
        onClose,
        labelProps,
        labelStyle,
        containerStyle,
        placeholderStyle,
        imp,
    } = props;

    return (
        <View>
            {title && (
                <Text style={styles.cDropDownHeadTxtStyle}>
                    {title}
                    {imp && <Text style={styles.redTxt}> *</Text>}
                </Text>
            )}
            <DropDownPicker
                dropDownDirection={'BOTTOM'}
                autoScroll
                listMode="SCROLLVIEW"
                // listMode="SCROLLVIEW"
                placeholder={placeholder ? placeholder : I18n.t(globalText.selectAnItem)}
                placeholderStyle={placeholderStyle}
                defaultValue={defaultValue}
                open={open}
                value={value}
                disabled={disabled}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onOpen={onOpen}
                zIndex={zIndex}
                onClose={onClose}
                onSelectItem={item => onItemChoose(item)}
                schema={{
                    label: labelKey ? labelKey : displayKey,
                    value: valueKey ? valueKey : displayKey,
                }}
                dropDownContainerStyle={[styles.cDropDownContainerStyle, dropDownContainerStyleNew]}
                style={[styles.cDropDStyle, dropDStyleNew]}
                searchContainerStyle={styles.cDDsearchContainerStyle}
                searchTextInputStyle={{ borderWidth: 0 }}
                textStyle={[styles.cDDtextStyle, textStyleNew]}
                labelProps={labelProps}
                labelStyle={labelStyle}
                containerStyle={containerStyle}
            />
        </View>
    );
};

export default CustomDropDown;
