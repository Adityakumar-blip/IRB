import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { globalText } from '../../helper/globalText';
import GlobalImages from '../../helper/globalImages';
import CustomButton from '../customButton/index';
import styles from '../../helper/globalStyles';
import I18n from '../../i18n/index';

const CustomLiveSurvey = props => {
    const { headFirstText, dollar, name, desrp, time, onPress, currencyValue } = props;

    return (
        <View style={[styles.paddH15PaddB15]}>
            <View style={styles.lSFirstViewMain}>
                <View>
                    <Text style={styles.lSurvwhiteText}>{headFirstText}</Text>
                </View>
                <View style={styles.rowCenter}>
                    <FastImage style={styles.lSurvStarStyle} source={GlobalImages.starIcon} />
                    <Text style={styles.lSurvwhiteText}>
                        {currencyValue + ' '} {dollar}
                    </Text>
                </View>
            </View>

            <View style={styles.middleView}>
                <View style={styles.mar12}>
                    <Text style={styles.middleFirstView}>{name}</Text>
                    <Text style={styles.middleFirstViewText}>{desrp}</Text>

                    <View style={styles.rowCenterSpaceBetw}>
                        <View style={styles.rowCenter}>
                            <FastImage style={styles.cLSClockIconstyle} source={GlobalImages.clockTimeICon} />
                            <Text style={styles.cLSTimeTextStyle}>{time}</Text>
                        </View>
                        <View style={styles.rowCenter}>
                            <FastImage style={styles.cLSDeskTStyle} source={GlobalImages.desktopIcon} />
                            <FastImage style={styles.cLSCellPhonStyle} source={GlobalImages.cellPhoneIcon} />
                            <FastImage style={styles.cLSTabletStyle} source={GlobalImages.tabletIcon} />
                        </View>
                    </View>
                    <View style={styles.marT16}>
                        <CustomButton needImageinButton buttonName={I18n.t(globalText.takeSurvey)} onPress={onPress} />
                    </View>
                </View>
            </View>
        </View>
    );
};
export default CustomLiveSurvey;
