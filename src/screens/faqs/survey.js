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

const Survey = props => {
    const { onPress } = props;
    const data = [
        {
            question: I18n.t(globalText.faqSurveyQuestionOne),
            answer: I18n.t(globalText.faqSurveyQuestionOneAnswer),
        },
        {
            question: I18n.t(globalText.faqSurveyQuestionTwo),
            answer: I18n.t(globalText.faqSurveyQuestionTwoAnswer),
        },
        {
            question: I18n.t(globalText.faqSurveyQuestionThree),
            answer: I18n.t(globalText.faqSurveyQuestionThreeAnswer),
        },
        {
            question: I18n.t(globalText.faqSurveyQuestionFour),
            answer: I18n.t(globalText.faqSurveyQuestionFourAnswer),
        },
        {
            question: I18n.t(globalText.faqSurveyQuestionThree),
            answer: I18n.t(globalText.faqSurveyQuestionThreeAnswer),
        },
        {
            question: I18n.t(globalText.faqSurveyQuestionFive),
            answer: I18n.t(globalText.faqSurveyQuestionFiveAnswer),
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
                        onPress={() => onPress()}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
export default Survey;
