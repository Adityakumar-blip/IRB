import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';

const CustomDropDownAnswerNew = props => {
    const {
        title,
        zIndex,
        dropDownContainerStyleNew,
        dropDStyleNew,
        defaultValue,
        textStyleNew,
        itemsData,
        displayKey,
        onItemChoose,
        multiple,
        onOpen,
        onClose,
        isOpenCheck,
        isValuePreSelected,
        defaultValueShow,
        labelKey,
        maxHeight,
        isArray,
    } = props;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(multiple ? [] : '');
    const [items, setItems] = useState([...itemsData]);
    const [isValue, setValueCheck] = useState([...itemsData]);

    useEffect(() => {
        setOpen(isOpenCheck);
    }, [isOpenCheck]);

    useEffect(() => {
        if (multiple) {
            let val = [];
            items.map((item, index) => {
                if (item.selected) {
                    val.push(item.answer);
                }
            });
            setValue([...val]);
        } else {
            items.map((item, index) => {
                if (item.selected) {
                    setValue(item.answer);
                }
            });
        }
    }, [isOpenCheck, isArray]);

    return (
        <View>
            {title && <Text style={styles.cDropDownHeadTxtStyle}>{title}</Text>}
            <DropDownPicker
                dropDownDirection={'BOTTOM'}
                autoScroll
                min={0}
                max={100}
                multiple={multiple}
                listMode="SCROLLVIEW"
                placeholder={defaultValue ? defaultValue : I18n.t(globalText.selectAnItem)}
                defaultValue={defaultValueShow}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multipleText={
                    multiple
                        ? value && value.length > 0
                            ? I18n.t(globalText._countItemHasSelected, {
                                  _count: value.length,
                              })
                            : null
                        : null
                }
                zIndex={zIndex}
                onOpen={onOpen}
                onClose={onClose}
                dropDownContainerStyle={dropDownContainerStyleNew}
                style={[styles.cDropDStyle, dropDStyleNew]}
                searchContainerStyle={styles.cDDsearchContainerStyle}
                maxHeight={maxHeight}
                searchTextInputStyle={styles.borderWidthZero}
                textStyle={[styles.cDDtextStyle, textStyleNew]}
                schema={{
                    label: displayKey,
                    value: displayKey,
                }}
                onSelectItem={item => onItemChoose(item)}
            />
        </View>
    );
};

export default CustomDropDownAnswerNew;
