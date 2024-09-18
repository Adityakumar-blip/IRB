import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import styles from '../../helper/globalStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../styles/colors';
import { getAsyncStorage, getFormatedDate, getInThousand } from '../../utils/customFunctions';

const CustomRedemption = props => {
    const { reward_status, date, options, amount, requestID, onPressPopOver, isPopOver } = props;
    const [currencyValue, setCurrencyValue] = useState('');
    useEffect(() => {
        onPageInit();
    }, []);

    const onPageInit = async () => {
        const getCurrenctySymbol = await getAsyncStorage('currencySymbol');
        setCurrencyValue(getCurrenctySymbol && getCurrenctySymbol);
    };

    return (
        <View style={styles.flexRow}>
            <View style={styles.redTapListDataView}>
                <Text style={[styles.fontSize12, styles.blueTextStyle]}>{requestID ? requestID : '-'}</Text>
            </View>

            <View style={styles.redTapListDataSecondView}>
                <Popover
                    popoverStyle={styles.colorBlack}
                    displayArea={{ x: 25, y: -40, height: 200, width: 200 }}
                    isVisible={isPopOver}
                    onRequestClose={onPressPopOver}
                    mode={PopoverMode.TOOLTIP}
                    placement={PopoverPlacement.RIGHT}
                    from={
                        <TouchableOpacity onPress={onPressPopOver}>
                            <Text
                                style={[
                                    styles.fontSize12,
                                    {
                                        color: Colors.PURPLE_HEART,
                                        paddingRight: 5,
                                    },
                                ]}
                            >
                                {currencyValue}
                                {getInThousand(amount ? amount : 0)}
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
                            {currencyValue}
                            {amount ? amount : 0}
                        </Text>
                    </View>
                </Popover>
            </View>

            <View style={styles.redTapListDataThirdView}>
                {reward_status == 1 && <FontAwesome5 name="check" size={15} color={'green'} />}
                {reward_status == 2 && <MaterialCommunityIcons name="reload" size={20} color={'grey'} />}
                {reward_status == 3 && <Entypo name="cross" size={20} color={'red'} />}
                <Text style={[styles.fontSize12ColorTopazNew, styles.paddR15]}>{options}</Text>
            </View>

            <View style={styles.redTapListDataLastView}>
                <Text style={[styles.fontSize12, styles.blueTextStyle]}>{getFormatedDate(date, 'dd/mm/yyyy')}</Text>
            </View>
        </View>
    );
};
export default CustomRedemption;
