import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../styles/colors';
import styles from '../../helper/globalStyles';
import Feather from 'react-native-vector-icons/Feather';

const DropDown = props => {
    const { title, zIndex, dropDownContainerStyleNew, dropDStyleNew, defaultValue, textStyleNew } = props;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [items, setItems] = useState([
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
    ]);

    return (
        <View>
            {title && <Text style={styles.cDropDownHeadTxtStyle}>{title}</Text>}
            <DropDownPicker
                // multiple={true}
                // min={0}
                // max={5}
                dropDownDirection={'BOTTOM'}
                autoScroll
                listMode="SCROLLVIEW"
                placeholder={defaultValue}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                zIndex={zIndex}
                dropDownContainerStyle={[styles.cDropDownContainerStyle, dropDownContainerStyleNew]}
                style={[styles.cDropDStyle, dropDStyleNew]}
                searchContainerStyle={styles.cDDsearchContainerStyle}
                searchTextInputStyle={styles.borderWidthZero}
                textStyle={[styles.cDDtextStyle, textStyleNew]}
                {...props}
                // TickIconComponent={({ style }) => (
                //     <Feather name={'check-square'} size={20} color={colors.ORANGE_PEEL} style={{}} />
                // )}
                // CloseIconComponent={({ style }) => (
                //     <Feather name={'check-circle'} size={20} color={colors.ORANGE_PEEL} style={{}} />
                // )}
                // hideSelectedItemIcon={false}
            />
        </View>
    );
};

export default DropDown;
