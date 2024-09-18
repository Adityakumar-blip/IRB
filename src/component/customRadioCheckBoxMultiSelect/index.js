import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';
//import CustomRadioButton from '../customRadio/index';
import styles from '../../helper/globalStyles';
import CustomCheckBox from '../customCheckBox/index';

const CustomRadioCheckBoxMultiSelect = props => {
    const { height, width } = Dimensions.get('window');

    const { onGridRadioSelected, ansData, subQData, checkbox } = props;
    const [answerData, setAnswerData] = useState(ansData);
    const [subQuestionData, setSubQData] = useState(subQData);

    useEffect(() => {
        answerData.map((item, index) => {
            if (item && !item.selectedObj) {
                item.selectedObj = [];
            }
        });
        setAnswerData([...answerData]);
    }, []);

    const onPressCheckBox = (subQues, ansList) => {
        answerData.map((item, index) => {
            if (ansList.key != 'N') {
                if (item.key == 'N') {
                    item[subQues.grid_subquestion_id] = null;
                    item.selectedObj.map((i, j) => {
                        if (i.grid_subquestion_id == subQues.grid_subquestion_id) {
                            item.selectedObj.splice(j, 1);
                        }
                    });
                }
                if (ansList.question_answer_id == item.question_answer_id) {
                    if (item[subQues.grid_subquestion_id] == subQues.grid_subquestion_id) {
                        item.selectedObj.map((i, j) => {
                            if (i.grid_subquestion_id == subQues.grid_subquestion_id) {
                                item.selectedObj.splice(j, 1);
                            }
                        });
                        item[subQues.grid_subquestion_id] = null;
                        setAnswerData([...answerData]);
                        return;
                    } else {
                        item.selectedObj.push({ ...subQues, ansId: item.question_answer_id });
                        item[subQues.grid_subquestion_id] = subQues.grid_subquestion_id;
                        setAnswerData([...answerData]);
                        return;
                    }
                }
            } else {
                if (ansList.key == 'N' && item.key == 'N') {
                    if (item[subQues.grid_subquestion_id] == subQues.grid_subquestion_id) {
                        item.selectedObj.map((i, j) => {
                            if (i.grid_subquestion_id == subQues.grid_subquestion_id) {
                                item.selectedObj.splice(j, 1);
                            }
                        });
                        item[subQues.grid_subquestion_id] = null;
                        setAnswerData([...answerData]);
                        // return;
                    } else {
                        item.selectedObj.push({ ...subQues, ansId: item.question_answer_id });
                        item[subQues.grid_subquestion_id] = subQues.grid_subquestion_id;
                        setAnswerData([...answerData]);
                        //return;
                    }
                } else {
                    item[subQues.grid_subquestion_id] = null;
                    item.selectedObj.map((i, j) => {
                        if (i.grid_subquestion_id == subQues.grid_subquestion_id) {
                            item.selectedObj.splice(j, 1);
                        }
                    });
                }
            }
        });
        onGridRadioSelected(answerData);
    };

    return (
        <View style={styles.width100}>
            <ScrollView
                horizontal
                //</View>scrollEnabled={subQuestionData.length > 4 ? true : false}
                style={{}}
                contentContainerStyle={{ flexGrow: 1 }}
                showsHorizontalScrollIndicator={false}
            >
                <View
                    style={[
                        {
                            width: subQuestionData && subQuestionData.length < 5 ? width : null,
                            paddingRight: subQuestionData && subQuestionData.length > 4 ? 150 : null,
                        },
                    ]}
                >
                    <View style={styles.row}>
                        <View
                            style={[
                                styles.row,
                                {
                                    width: subQuestionData && subQuestionData.length > 4 ? 70 : '25%',
                                },
                            ]}
                        ></View>
                        <View
                            style={[
                                {
                                    width:
                                        subQuestionData && subQuestionData.length > 4
                                            ? `${(100 * subQuestionData.length * 1) / subQuestionData.length}%`
                                            : '75%',
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
                                            {
                                                width:
                                                    subQuestionData.length > 4
                                                        ? 100
                                                        : `${100 / subQuestionData.length}%`,
                                            },
                                            styles.alignItemCenter,
                                        ]}
                                    >
                                        <Text style={[styles.colorTopaz, styles.textCenter]}>{item.subquestion}</Text>
                                    </View>
                                ))}
                        </View>
                    </View>

                    {answerData &&
                        answerData.length > 0 &&
                        answerData.map((item, index) => (
                            <View
                                key={index}
                                // style={styles.cCheckBoxMultiSelectstyle}
                                style={[styles.width100Row, { paddingVertical: 5 }]}
                            >
                                <View
                                    style={[
                                        {
                                            width: subQuestionData && subQuestionData.length > 4 ? 70 : '25%',
                                        },
                                        styles.row,
                                    ]}
                                >
                                    <Text style={styles.colorTopaz}>{item.answer}</Text>
                                </View>
                                <View
                                    style={[
                                        {
                                            width:
                                                subQuestionData && subQuestionData.length > 4
                                                    ? `${(100 * subQuestionData.length * 1) / subQuestionData.length}%`
                                                    : '75%',
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
                                                    {
                                                        width:
                                                            subQuestionData.length > 4
                                                                ? 20
                                                                : `${100 / subQuestionData.length}%`,
                                                    },
                                                    styles.cCheckBoxMultiSecondStyle,
                                                ]}
                                            >
                                                <CustomCheckBox
                                                    checkValue={
                                                        item[item1.grid_subquestion_id] == item1.grid_subquestion_id
                                                    }
                                                    onPressCheckBox={() => onPressCheckBox(item1, item)}
                                                />
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
export default CustomRadioCheckBoxMultiSelect;
