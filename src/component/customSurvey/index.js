import React from 'react';
import { Image, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';

const CustomSurvey = props => {
    const { name, point, ticketName, liveSurvey, time, onPress } = props;
    return (
        <SafeAreaView>
            <View style={styles.cSurvMainView}>
                <View style={liveSurvey ? styles.width70 : styles.width60}>
                    <Text numberOfLines={1} style={styles.cSurvFirstTextStyle}>
                        {name}
                    </Text>
                </View>
                {!liveSurvey && (
                    <View style={styles.cSurvMiddleView}>
                        <View style={styles.cSurvPintView}>
                            <Text numberOfLines={1} style={styles.cSurvPointStyle}>
                                {point}
                            </Text>
                        </View>
                        <View style={styles.cSurvPintView}>
                            <TouchableOpacity style={ticketName && styles.cSurvGreenTextView} onPress={onPress}>
                                <Text style={styles.cSurvGreenTextStyle}>{ticketName}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {liveSurvey && (
                    <View style={styles.cSurveywidth30AlignEnd}>
                        <Image style={styles.cSurvImageStyle} source={GlobalImages.clockTimeICon} />
                        <Text style={styles.cSGreyColorStyle}>{time}</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};
export default CustomSurvey;
