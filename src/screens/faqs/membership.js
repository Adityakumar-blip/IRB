import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../component/customButton/index';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import colors from '../../styles/colors';
import sampleData from '../../helper/sampleData';

const Membership = props => {
    const { onPress } = props;
    let data = [
        {
            question: I18n.t(globalText.faqMemberShipQuestionFirst),
            answer: I18n.t(globalText.faqMemberShipQuestionFirstAnswer),
        },
        {
            question: I18n.t(globalText.faqMemberShipQuestionSecond),
            answer: I18n.t(globalText.faqMemberShipQuestionSecondAnswer),
        },
        {
            question: I18n.t(globalText.faqMemberShipQuestionThird),
            answer: I18n.t(globalText.faqMemberShipQuestionThirdAnswer),
        },
        {
            question: I18n.t(globalText.faqMemberShipQuestionFourth),
            answer: I18n.t(globalText.faqMemberShipQuestionFourthAnswer),
        },
        {
            question: I18n.t(globalText.faqMemberShipQuestionFifth),
            answer: I18n.t(globalText.faqMemberShipQuestionFifthAnswer),
        },
        {
            question: I18n.t(globalText.faqMemberShipQuestionSix),
            answer: I18n.t(globalText.faqMemberShipQuestionSixAnswer),
        },
        {
            question: I18n.t(globalText.faqMemberShipQuestionSeven),
            answer: I18n.t(globalText.faqMemberShipQuestionSevenAnswer),
        },
        {
            question: I18n.t(globalText.faqMemberShipQuestionEight),
            answer: I18n.t(globalText.faqMemberShipQuestionEightAnwser),
        },
        {
            question: I18n.t(globalText.faqMemberShipQuestionNine),
            answer: I18n.t(globalText.faqMemberShipQuestionNineAnswer),
        },
        {
            question: I18n.t(globalText.faqMemberShipQuestionTen),
            answer: I18n.t(globalText.faqMemberShipQuestionTenAnswer),
        },
        {
            question: I18n.t(globalText.faqMemberShipQuestionEeleven),
            answer: I18n.t(globalText.faqMemberShipQuestionEelevenAnswer),
        },
        {
            question: I18n.t(globalText.faqMemberShipQuestionTwelve),
            answer: I18n.t(globalText.faqMemberShipQuestionTwelveAnswer),
        },
    ];
    const [selIndex, setSelIndex] = useState(-1);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={[styles.padd15, styles.paddB100]}>
                    <Text style={styles.faqQuestText}>{I18n.t(globalText.questions)}</Text>

                    <Text style={styles.faqFATex}>{I18n.t(globalText.frequentlyAsked)}</Text>

                    <View style={styles.marT10}>
                        {data &&
                            data.map((item, index) => {
                                return (
                                    <View key={index} style={styles.faqMainView}>
                                        <View style={styles.width90}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (selIndex == index) {
                                                        setSelIndex(-1);
                                                        return;
                                                    }
                                                    setSelIndex(index);
                                                }}
                                            >
                                                <Text style={styles.faqQuesTextStyle}>{item.question}</Text>
                                            </TouchableOpacity>
                                            {selIndex == index && (
                                                <Text style={styles.faqAnswerTextStyle}>{item.answer}</Text>
                                            )}
                                        </View>
                                        <TouchableOpacity
                                            style={styles.faqPlusView}
                                            onPress={() => {
                                                if (selIndex == index) {
                                                    setSelIndex(-1);
                                                    return;
                                                }
                                                setSelIndex(index);
                                            }}
                                        >
                                            <Entypo
                                                name={selIndex === index ? 'minus' : 'plus'}
                                                size={22}
                                                color={colors.RADICAL_RED}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                    </View>
                    <CustomButton
                        needImageinButton
                        buttonName={I18n.t(globalText.stillNeedHelp)}
                        source={GlobalImages.handIcon}
                        addButtonStyle={styles.faqButtonstyle}
                        onPress={onPress}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
export default Membership;
