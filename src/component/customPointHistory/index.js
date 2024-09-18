import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import { getAsyncStorage } from '../../utils/customFunctions';
import styles from '../../helper/globalStyles';

const CustomPointHistory = props => {
    const {
        description,
        earned,
        converted,
        balance,
        date,
        real_remain_amount,
        real_convert_amount,
        real_earn_amount,
        isOpenPopupEarn,
        isOpenPopupConv,
        isOpenPopupRemainB,
        onEarnPopup,
        onConvertPopun,
        onRBalPoppup,
    } = props;

    const [currencyValue, setCurrencyValue] = useState('');

    useEffect(() => {
        onPageInit();
    }, []);

    const onPageInit = async () => {
        const getCurrenctySymbol = await getAsyncStorage('currencySymbol');
        setCurrencyValue(getCurrenctySymbol && getCurrenctySymbol);
    };

    return (
        <View style={styles.rowCenter}>
            <View style={styles.pointTabFirstView}>
                <Text
                    numberOfLines={3}
                    allowFontScaling
                    maxFontSizeMultiplier={14}
                    minimumFontScale={10}
                    style={[styles.blueTextStyle, styles.fontSize12, { width: '85%' }]}
                >
                    {description ? description : '-'}
                </Text>
            </View>
            <View style={[styles.pointTabSecondView, styles.row, { zIndex: 3 }]}>
                {earned ? (
                    <Popover
                        popoverStyle={styles.colorBlack}
                        displayArea={{ x: 25, y: -50, height: 200, width: 200 }}
                        isVisible={isOpenPopupEarn}
                        onRequestClose={onEarnPopup}
                        mode={PopoverMode.TOOLTIP}
                        placement={PopoverPlacement.RIGHT}
                        from={
                            <TouchableOpacity onPress={onEarnPopup}>
                                <Text style={[styles.blueTextStyle, styles.fontSize12]}>
                                    {/* {currencyValue} */}
                                    {earned}
                                </Text>
                            </TouchableOpacity>
                        }
                    >
                        <View
                            style={{
                                paddingHorizontal: 4,
                                paddingVertical: 5,
                                backgroundColor: '#000',
                            }}
                        >
                            <Text style={[styles.fontSize12, { color: '#FFFFFF' }]}>
                                {/* {currencyValue} */}
                                {real_earn_amount}
                            </Text>
                        </View>
                    </Popover>
                ) : (
                    <Text
                        allowFontScaling
                        maxFontSizeMultiplier={14}
                        style={[styles.blueTextStyle, styles.width90, styles.fontSize12]}
                    >
                        {earned ? earned : '-'}
                    </Text>
                )}
            </View>
            <View style={[styles.pointTabThirdView, styles.row, { zIndex: 2 }]}>
                {converted ? (
                    <Popover
                        popoverStyle={styles.colorBlack}
                        displayArea={{ x: 25, y: -50, height: 200, width: 200 }}
                        isVisible={isOpenPopupConv}
                        onRequestClose={onConvertPopun}
                        mode={PopoverMode.TOOLTIP}
                        placement={PopoverPlacement.RIGHT}
                        from={
                            <TouchableOpacity onPress={onConvertPopun}>
                                <Text style={[styles.blueTextStyle, styles.fontSize12]}>
                                    {/* {currencyValue} */}
                                    {converted}
                                </Text>
                            </TouchableOpacity>
                        }
                    >
                        <View
                            style={{
                                paddingHorizontal: 4,
                                paddingVertical: 5,
                                backgroundColor: '#000',
                            }}
                        >
                            <Text style={[styles.fontSize12, { color: '#FFFFFF' }]}>
                                {/* {currencyValue} */}
                                {real_convert_amount}
                            </Text>
                        </View>
                    </Popover>
                ) : (
                    <Text
                        allowFontScaling
                        maxFontSizeMultiplier={14}
                        style={[styles.blueTextStyle, styles.width90, styles.fontSize12]}
                    >
                        {converted ? converted : '-'}
                    </Text>
                )}
            </View>
            <View style={[styles.pointTabFourthView, styles.row, { zIndex: 1 }]}>
                {/* <Text
                    allowFontScaling
                    maxFontSizeMultiplier={14}
                    style={[styles.blueTextStyle, styles.width90, styles.fontSize12]}
                >
                    {balance ? balance : '-'}
                </Text> */}
                <Popover
                    popoverStyle={styles.colorBlack}
                    displayArea={{ x: 25, y: -50, height: 200, width: 200 }}
                    isVisible={isOpenPopupRemainB}
                    onRequestClose={onRBalPoppup}
                    mode={PopoverMode.TOOLTIP}
                    placement={PopoverPlacement.RIGHT}
                    from={
                        <TouchableOpacity onPress={onRBalPoppup}>
                            <Text style={[styles.blueTextStyle, styles.fontSize12]}>
                                {/* {currencyValue} */}
                                {balance}
                            </Text>
                        </TouchableOpacity>
                    }
                >
                    <View
                        style={{
                            paddingHorizontal: 4,
                            paddingVertical: 5,
                            backgroundColor: '#000',
                        }}
                    >
                        <Text style={[styles.fontSize12, { color: '#FFFFFF' }]}>
                            {/* {currencyValue} */}
                            {real_remain_amount}
                        </Text>
                    </View>
                </Popover>
            </View>
            <View style={styles.pointTabFifthView}>
                {date && (
                    <Text allowFontScaling maxFontSizeMultiplier={14} style={[styles.blueTextStyle, styles.fontSize12]}>
                        {date ? date : ''}
                    </Text>
                )}
            </View>
        </View>
    );
};
export default CustomPointHistory;
