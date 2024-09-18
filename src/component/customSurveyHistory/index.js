import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../helper/globalStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getFormatedDate, getAsyncStorage, getInThousand } from '../../utils/customFunctions';
import Colors from '../../styles/colors';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';

const CustomSurveyHistory = props => {
    const { status, surveyId, surveyAbout, amount, date, isPopOver, onPopOver } = props;
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
            <View style={styles.surveyTapFirstView}>
                <View>
                    {status == 'Terminated' && (
                        <Entypo name="cross" size={20} color={'red'} style={styles.width20Simple} />
                    )}
                    {status == 'Qualified – Approved' && (
                        <FontAwesome5 name="check" size={15} color={'green'} style={styles.width20Simple} />
                    )}
                    {status == 'Qualified – Pending' && (
                        <MaterialIcons name="refresh" size={15} color={'yellow'} style={styles.width20Simple} />
                    )}
                    {status == 'Qualified – Rejected' && (
                        <MaterialIcons name="highlight-remove" size={15} color={'red'} style={styles.width20Simple} />
                    )}
                    {status == 'Incomplete' && (
                        <MaterialCommunityIcons
                            name="timer-sand-complete"
                            size={15}
                            color={'white'}
                            style={styles.width20Simple}
                        />
                    )}
                    {status == 'Quota full' && (
                        <MaterialCommunityIcons name="lock" size={15} color={'#6666FF'} style={styles.width20Simple} />
                    )}
                </View>
                <Text
                    numberOfLines={3}
                    style={[styles.fontSize12, styles.blueTextStyle, styles.boldText, styles.width70]}
                >
                    {surveyId ? surveyId : '-'}
                </Text>
            </View>
            <View style={styles.surveyTapSecondView}>
                <Text numberOfLines={2} style={[styles.fontSize12, styles.blueTextStyle]}>
                    {surveyAbout ? surveyAbout : '-'}
                </Text>
            </View>
            {/* <View style={[styles.surveyTapThirsView, styles.rowCenter]}>
                <Text style={[styles.fontSize12, { color: Colors.PURPLE_HEART }]}>
                    {currencyValue}
                    {getInThousand(amount ? amount : 0)}
                </Text>
            </View> */}
            <View style={[styles.surveyTapThirsView, styles.rowCenter, { zIndex: 1 }]}>
                <Popover
                    popoverStyle={styles.colorBlack}
                    displayArea={{ x: 25, y: -50, height: 200, width: 200 }}
                    isVisible={isPopOver}
                    onRequestClose={onPopOver}
                    mode={PopoverMode.TOOLTIP}
                    placement={PopoverPlacement.RIGHT}
                    from={
                        <TouchableOpacity onPress={onPopOver}>
                            <Text style={[styles.fontSize12, { color: Colors.PURPLE_HEART }]}>
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

            <View style={styles.surveyTapFourthView}>
                <Text style={[styles.fontSize12, styles.blueTextStyle]}>{getFormatedDate(date, 'dd/mm/yyyy')}</Text>
            </View>
        </View>
    );
};

export default CustomSurveyHistory;
