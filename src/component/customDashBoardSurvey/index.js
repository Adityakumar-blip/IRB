import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';

const CustomDashBoradSurvey = props => {
    const { pointRedeemed, pointEarned, rewardsEarn, surveyQualifed } = props;

    return (
        <SafeAreaView>
            <View style={styles.cSurvMainView}>
                <View style={styles.width60}>
                    <Text numberOfLines={1} style={styles.cSurvFirstTextStyle}>
                        {I18n.t(globalText.surveyQualified)}
                    </Text>
                </View>
                <View style={styles.cSurvPintViewNew}>
                    <Text style={styles.cSurvPointStyle}>{surveyQualifed}</Text>
                </View>
            </View>
            <View style={styles.cSurvMainView}>
                <View style={styles.width60}>
                    <Text numberOfLines={1} style={styles.cSurvFirstTextStyle}>
                        {I18n.t(globalText.rewardsEarned)}
                    </Text>
                </View>
                <View style={styles.cSurvPintViewNew}>
                    <Text style={styles.cSurvPointStyle}>{rewardsEarn}</Text>
                </View>
            </View>
            <View style={styles.cSurvMainView}>
                <View style={styles.width60}>
                    <Text numberOfLines={1} style={styles.cSurvFirstTextStyle}>
                        {I18n.t(globalText.pointsEarned)}
                    </Text>
                </View>
                <View style={styles.cSurvPintViewNew}>
                    <Text style={styles.cSurvPointStyle}>{pointEarned}</Text>
                </View>
            </View>
            <View style={styles.cSurvMainView}>
                <View style={styles.width60}>
                    <Text numberOfLines={1} style={styles.cSurvFirstTextStyle}>
                        {I18n.t(globalText.redeemed)}
                    </Text>
                </View>
                <View style={styles.cSurvPintViewNew}>
                    <Text style={styles.cSurvPointStyle}>{pointRedeemed}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default CustomDashBoradSurvey;
