/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Platform, StatusBar } from 'react-native';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
// import CustomPopover from '../customPopover';
import styles from '../../helper/globalStyles';
import { getAsyncStorage } from '../../utils/customFunctions';

const CustomStateHistory = props => {
    const [currencyValue, setCurrencyValue] = useState('');
    const {
        description,
        earned,
        redemm,
        balance,
        date,
        openNotification,
        isOpen,
        onRequestClose,
        onPress,
        message,
        eranColor,
        index,
        redeemColor,
        redeem_message,
        checkEarn,
        real_remain_amount,
        isOpenPopupRedeem,
        onPopOverRedeem,
        isOpenPopupRemB,
        onPopOverRemb,
        isOpenPopOverEarm,
        onPopOverEarn,
    } = props;

    useEffect(() => {
        onPageInit();
    }, []);

    const onPageInit = async () => {
        const getCurrenctySymbol = await getAsyncStorage('currencySymbol');
        setCurrencyValue(getCurrenctySymbol && getCurrenctySymbol);
    };

    const [remainBalancePopover, setRemainBalancePopover] = useState(false);
    const [redeemedBalancePopover, setRedeemedBalancePopover] = useState(false);

    return (
        <View style={styles.rowCenter}>
            <View style={styles.rewardPointTabFirstView}>
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
            <View style={[styles.pointTabSecondView, styles.row]}>
                <Popover
                    isVisible={isOpenPopOverEarm}
                    popoverStyle={styles.colorBlack}
                    mode={PopoverMode.TOOLTIP}
                    onRequestClose={onPopOverEarn}
                    //backgroundStyle={{ opacity: 10, backfaceVisibility: 'hidden' }}
                    displayArea={{ x: 0, y: -40, height: 100, width: 300 }}
                    placement={'right'}
                    from={
                        <TouchableOpacity style={styles.row} onPress={onPopOverEarn}>
                            <Text
                                style={[
                                    eranColor == 'green'
                                        ? styles.greenColor
                                        : eranColor == 'red'
                                        ? styles.redColorText
                                        : eranColor == 'black'
                                        ? null
                                        : styles.blueTextStyle,
                                    styles.fontSize12,
                                ]}
                            >
                                {currencyValue}
                                {earned}
                            </Text>
                        </TouchableOpacity>
                    }
                >
                    <View style={[styles.accRewardNotificationStyle, { zIndex: JSON.parse(index) }]}>
                        <Text style={styles.colorSize10}>{message}</Text>
                    </View>
                </Popover>
            </View>
            <View style={[styles.pointTabThirdView, styles.row, { zIndex: 2 }]}>
                <Popover
                    // isVisible={openIsRedeem && isRedeemOpen ? true : false}
                    isVisible={isOpenPopupRedeem}
                    popoverStyle={styles.colorBlack}
                    mode={PopoverMode.TOOLTIP}
                    // onRequestClose={onRequestRedeemClose}
                    onRequestClose={onPopOverRedeem}
                    //backgroundStyle={{ opacity: 10, backfaceVisibility: 'hidden' }}
                    displayArea={{ x: 0, y: -40, height: 100, width: 300 }}
                    placement={PopoverPlacement.RIGHT}
                    from={
                        <TouchableOpacity style={styles.row} onPress={onPopOverRedeem}>
                            <Text
                                style={[
                                    styles.blueTextStyle,
                                    styles.fontSize12,
                                    redeemColor == 'red' ? styles.redColorText : styles.blueTextStyle,
                                    styles.fontSize12,
                                ]}
                            >
                                {currencyValue}
                                {redemm}
                            </Text>
                        </TouchableOpacity>
                    }
                >
                    <View style={[styles.accRewardNotificationStyle, { zIndex: JSON.parse(index) }]}>
                        <Text style={styles.colorSize10}>{redeem_message}</Text>
                    </View>
                </Popover>
            </View>
            <View style={[styles.pointTabFourthView, styles.row, { zIndex: 1 }]}>
                {/* <Text style={[styles.blueTextStyle, styles.width90, styles.fontSize12]}>
                    {currencyValue}
                    {balance}
                </Text> */}
                {/* <CustomPopover></CustomPopover> */}
                <Popover
                    popoverStyle={styles.colorBlack}
                    displayArea={{ x: 25, y: -50, height: 200, width: 200 }}
                    isVisible={isOpenPopupRemB}
                    onRequestClose={onPopOverRemb}
                    mode={PopoverMode.TOOLTIP}
                    placement={PopoverPlacement.RIGHT}
                    from={
                        <TouchableOpacity onPress={onPopOverRemb}>
                            <Text style={[styles.blueTextStyle, styles.fontSize12]}>
                                {currencyValue}
                                {balance}
                            </Text>
                        </TouchableOpacity>
                    }
                >
                    <View style={styles.cRewardBalancestyle}>
                        <Text style={[styles.fontSize12, styles.whiteTextColor]}>
                            {currencyValue}
                            {real_remain_amount}
                        </Text>
                    </View>
                </Popover>
            </View>
            <View style={styles.pointTabFifthView}>
                <Text style={[styles.blueTextStyle, styles.fontSize12]}>{date}</Text>
            </View>
        </View>
    );
};
export default CustomStateHistory;
