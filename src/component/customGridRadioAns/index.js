// ;
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import CustomCheckBox from '../customCheckBox/index';
import CustomRadioButton from '../customRadio/index';
import styles from '../../helper/globalStyles';

const CustomGridRadioAns = props => {
    const { onGridRadioSelected, ansData, subQData, checkbox } = props;
    const [answerData, setAnswerData] = useState(ansData);
    const [subQuestionData, setSubQData] = useState(subQData);
    const { height, width } = Dimensions.get('window');

    const onPressRadio = (subQues, ansList) => {
        let selectedAnswerId = [];
        subQuestionData.map((item1, index1) => {
            if (subQues.grid_subquestion_id == item1.grid_subquestion_id) {
                item1.ansId = ansList.question_answer_id;
                item1.answer = ansList.answer;
                item1.question_answer_id = ansList.question_answer_id;
            }
            selectedAnswerId.push(ansList.question_answer_id);
        });
        setSubQData([...subQuestionData]);
        let value = 0;
        subQuestionData.map((item, index) => {
            if (item.ansId) {
                value = value + 1;
            }
        });
        onGridRadioSelected(subQuestionData, value);
    };

    return (
        <View style={styles.width100}>
            <ScrollView
                horizontal
                // style={{ height: '100%' }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsHorizontalScrollIndicator={false}
            >
                <View
                    style={[
                        {
                            width: '100%',
                        },
                    ]}
                >
                    <View style={[styles.width100Row]}>
                        <View
                            style={[
                                styles.row,
                                {
                                    width: 100,
                                },
                            ]}
                        ></View>
                        <View
                            style={[
                                {
                                    width: subQuestionData && subQuestionData.length > 4 ? width : '75%',
                                },
                                styles.rowAround,
                            ]}
                        >
                            {subQuestionData &&
                                subQuestionData.length > 0 &&
                                subQuestionData.map((item, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.cCheckBoxMultiSecondStyle,
                                            {
                                                minWidth: 60,
                                                maxWidth: 150,
                                            },
                                        ]}
                                    >
                                        <Text numberOfLines={3} style={[styles.colorTopaz]}>
                                            {item.subquestion}
                                        </Text>
                                    </View>
                                ))}
                        </View>
                    </View>

                    {answerData &&
                        answerData.length > 0 &&
                        answerData.map((item, index) => (
                            <View key={index} style={[styles.width100Row, { paddingVertical: 5 }]}>
                                <View
                                    style={[
                                        styles.row,
                                        {
                                            width: 100,
                                        },
                                    ]}
                                >
                                    <Text style={styles.colorTopaz}>{item.answer}</Text>
                                </View>
                                <View
                                    style={[
                                        {
                                            width: subQuestionData && subQuestionData.length > 4 ? width : '75%',
                                        },
                                        styles.rowAround,
                                    ]}
                                >
                                    {subQuestionData &&
                                        subQuestionData.length > 0 &&
                                        subQuestionData.map((item1, index1) => (
                                            <View
                                                key={index1}
                                                style={[
                                                    styles.cCheckBoxMultiSecondStyle,
                                                    {
                                                        minWidth: 60,
                                                        maxWidth: 150,
                                                    },
                                                ]}
                                            >
                                                {!checkbox && (
                                                    <CustomRadioButton
                                                        checkValue={item1.ansId == item.question_answer_id}
                                                        onPressRadio={() => onPressRadio(item1, item)}
                                                    />
                                                )}
                                                {checkbox && (
                                                    <CustomCheckBox
                                                        checkValue={item.ansId == item1.question_answer_id}
                                                        onPressCheckBox={() => onPressRadio(item1, item)}
                                                    />
                                                )}
                                            </View>
                                        ))}
                                </View>
                            </View>
                        ))}
                </View>
            </ScrollView>
        </View>
    );
};
export default CustomGridRadioAns;
