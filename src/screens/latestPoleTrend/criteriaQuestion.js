/* eslint-disable no-const-assign */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { Modal, StatusBar, View, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../../helper/globalStyles';
import colors from '../../styles/colors';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomDynamicForm from '../../component/customDynamicForm/index';
import CustomRadioAndAns from '../../component/CustomRadioAndAns/index';
import CustomCheckBoxAns from '../../component/CustomCheckBoxAns/index';
import CustomDropDownAnswer from '../../component/CustomDropwDownAnswer/index';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import CustomLoader from '../../component/customLoader/index';
import { useFocusEffect } from '@react-navigation/native';
import CustomTextInput from '../../component/customTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomGridRadioAns from '../../component/customGridRadioAns/index';
import CustomRadioCheckBoxMultiSelect from '../../component/customRadioCheckBoxMultiSelect/index';
import { cleanObjects, getAsyncStorage, setAsyncStorage, toastShow } from '../../utils/customFunctions';

const DemoSurvey = props => {
    let count = 0;
    const { visible, onRequestClose, onPressCross, data, onPreviousScreen } = props;
    const [isDataQuestionAnswer, setDataQuestionAnswer] = useState(data);
    const [loader, setLoader] = useState(false);
    const [isCheckValue, setCheckValue] = useState(true);
    const [isOpenIndex, setOpenIndex] = useState(-1);

    const onCallSelection = (quesValue, ansValue, subItem) => {
        isDataQuestionAnswer.map((item1, index1) => {
            switch (quesValue.question_type) {
                case '1':
                    if (quesValue.question_id == item1.question_id) {
                        item1.answer_arr.map((item, index) => {
                            if (ansValue.question_answer_id == item.question_answer_id) {
                                item.selected = true;
                            } else {
                                item.selected = false;
                            }
                        });
                    }
                    setDataQuestionAnswer([...isDataQuestionAnswer]);
                    break;
                case '2':
                    if (quesValue.question_id == item1.question_id) {
                        item1.answer_arr.map((item, index) => {
                            if (ansValue.question_answer_id == item.question_answer_id) {
                                item.selected = true;
                            } else {
                                item.selected = false;
                            }
                        });
                    }
                    setDataQuestionAnswer([...isDataQuestionAnswer]);
                    break;

                case '3':
                    if (quesValue.question_id == item1.question_id) {
                        item1.answer_arr.map((item, index) => {
                            if (ansValue.question_answer_id == item.question_answer_id) {
                                item.selected = !item.selected;
                            }
                        });
                    }
                    setDataQuestionAnswer([...isDataQuestionAnswer]);
                    break;

                case '4':
                    if (quesValue.question_id == item1.question_id) {
                        item1.answer_arr.map((item, index) => {
                            if (ansValue.length > 0) {
                                ansValue.map((i, j) => {
                                    if (i.question_answer_id == item.question_answer_id) {
                                        item.selected = true;
                                    }
                                });
                            } else {
                                item.selected = false;
                            }
                        });
                    }
                    setDataQuestionAnswer([...isDataQuestionAnswer]);
                    break;

                case '5':
                    if (quesValue.question_id == item1.question_id) {
                        item1.answer = ansValue;
                    }
                    setDataQuestionAnswer([...isDataQuestionAnswer]);
                    break;

                case '6':
                    if (quesValue.question_id == item1.question_id) {
                        item1.gird_sub_que_arr = ansValue;
                    }
                    setDataQuestionAnswer([...isDataQuestionAnswer]);
                    break;
            }
        });
        setDataQuestionAnswer([...isDataQuestionAnswer]);
    };

    const onUpdate = async () => {
        let count = 0;
        let countForcheck = 0;
        let allData = [];
        let sub_category_type_id = null;
        setLoader(true);
        await isDataQuestionAnswer.map(async (item1, index1) => {
            let mergeAnserIds = [];
            let isGriData = [];
            switch (item1.question_type) {
                case '1':
                    sub_category_type_id = item1.sub_category_type_id;
                    await item1.answer_arr.map((item, index) => {
                        if (item.selected) {
                            countForcheck = countForcheck + 1;
                            let value = {
                                question_type: item1.question_type,
                                question_id: item1.question_id,
                                question_answer_id: item.question_answer_id,
                                // answer: item.answer,
                                grid_subquestion_id: -1,
                            };
                            allData.push({ ...value });
                        }
                    });
                    break;
                case '2':
                    sub_category_type_id = item1.sub_category_type_id;
                    await item1.answer_arr.map((item, index) => {
                        if (item.selected) {
                            countForcheck = countForcheck + 1;
                            let value = {
                                question_type: item1.question_type,
                                question_id: item1.question_id,
                                // answer: item.answer,
                                question_answer_id: item.question_answer_id,
                                grid_subquestion_id: -1,
                            };
                            allData.push({ ...value });
                        }
                    });
                    break;

                case '3':
                    sub_category_type_id = item1.sub_category_type_id;
                    await item1.answer_arr.map((item, index) => {
                        if (item.selected) {
                            countForcheck = countForcheck + 1;
                            mergeAnserIds.push(item.question_answer_id);
                        }
                    });
                    if (mergeAnserIds && mergeAnserIds.length > 0) {
                        let value = {
                            question_type: item1.question_type,
                            question_id: item1.question_id,
                            question_answer_id: mergeAnserIds.toString(),
                            //  answer: item.answer,
                            grid_subquestion_id: -1,
                        };
                        allData.push({ ...value });
                    }
                    break;

                case '4':
                    sub_category_type_id = item1.sub_category_type_id;
                    await item1.answer_arr.map((item, index) => {
                        if (item.selected) {
                            countForcheck = countForcheck + 1;
                            mergeAnserIds.push(item.question_answer_id);
                            // let value = {
                            //     question_type: item1.question_type,
                            //     question_id: item1.question_id,
                            //     // answer: item.answer,
                            //     question_answer_id: item.question_answer_id,
                            //     grid_subquestion_id: -1,
                            // };
                            // allData.push({ ...value });
                        }
                    });
                    if (mergeAnserIds && mergeAnserIds.length > 0) {
                        let value = {
                            question_type: item1.question_type,
                            question_id: item1.question_id,
                            question_answer_id: mergeAnserIds.toString(),
                            //  answer: item.answer,
                            grid_subquestion_id: -1,
                        };
                        allData.push({ ...value });
                    }
                    break;

                case '5':
                    sub_category_type_id = item1.sub_category_type_id;
                    if (item1.answer && item1.answer.length > 0) {
                        countForcheck = countForcheck + 1;
                        let value = {
                            question_type: item1.question_type,
                            question_id: item1.question_id,
                            // answer: item1.answer,
                            grid_subquestion_id: -1,
                            question_answer_id: item1.answer,
                        };
                        allData.push({ ...value });
                    }
                    break;

                case '6':
                    sub_category_type_id = item1.sub_category_type_id;
                    await item1.gird_sub_que_arr.map((item, index) => {
                        if (item.ansId) {
                            countForcheck = countForcheck + 1;
                            let value = {
                                question_type: item1.question_type,
                                question_id: item1.question_id,
                                // answer: item.answer,
                                grid_subquestion_id: item.grid_subquestion_id,
                                question_answer_id: item.ansId,
                            };
                            allData.push({ ...value });
                        }
                    });
                    break;
                case '7':
                    sub_category_type_id = item1.sub_category_type_id;
                    await item1.answer_arr.map((item, index) => {
                        if (item.selectedObj.length > 0) {
                            item.selectedObj.map((i, j) => {
                                if (item.question_answer_id == i.ansId) {
                                    countForcheck = countForcheck + 1;
                                    let value = {
                                        question_type: item1.question_type,
                                        question_id: item1.question_id,
                                        // answer: item.answer,
                                        grid_subquestion_id: i.grid_subquestion_id,
                                        question_answer_id: item.question_answer_id,
                                    };
                                    isGriData.push({ ...value });
                                }
                            });
                        }
                    });
                    if (isGriData && isGriData.length > 0) {
                        item1.gird_sub_que_arr &&
                            item1.gird_sub_que_arr.length > 0 &&
                            item1.gird_sub_que_arr.map((item, index) => {
                                let isGriddataIds = [];
                                isGriData.map((i, j) => {
                                    if (item.grid_subquestion_id == i.grid_subquestion_id) {
                                        isGriddataIds.push(i.question_answer_id);
                                    }
                                });
                                let value = {
                                    question_type: item1.question_type,
                                    question_id: item1.question_id,
                                    // answer: item.answer,
                                    grid_subquestion_id: item.grid_subquestion_id,
                                    question_answer_id: isGriddataIds.toString(),
                                };
                                allData.push({ ...value });
                            });
                    }
                    break;
                case '8':
                    sub_category_type_id = item1.sub_category_type_id;
                    await item1.gird_sub_que_arr.map((item, index) => {
                        if (item.answer && item.answer.length > 0) {
                            countForcheck = countForcheck + 1;
                            let value = {
                                question_type: item1.question_type,
                                question_id: item.question_id,
                                // answer: item.answer,
                                grid_subquestion_id: item.grid_subquestion_id,
                                question_answer_id: item.answer,
                            };
                            allData.push({ ...value });
                        }
                    });
                    break;
            }
            count = count + 1;
        });
        if (countForcheck == isDataQuestionAnswer.length) {
            // if (count == isDataQuestionAnswer.length) {
            await onSaveAnswer(allData, sub_category_type_id);
            // }
        } else {
            setLoader(false);
            return Alert.alert('', I18n.t(globalText._pleaseSelectAtleastOneAnswer), [
                {
                    text: I18n.t(globalText._ok),
                    onPress: () => {
                        cancelable: true;
                    },
                },
            ]);
        }
    };

    const onSaveAnswer = async (allData, sub_category_type_id) => {
        setLoader(true);
        const payload = {
            isParent: true,
            items: [...allData],
        };
        const { data, message, success } = await AuthApi.postDataToServer(Api.demoSurveyDemoSaveSelectedAns, payload);
        if (!data) {
            setLoader(false);
            toastShow(message && message);
            return;
        }
        if (sub_category_type_id && Number(sub_category_type_id) == 7) {
            let logicForSpecficTab = data.data && data.data.key ? data.data.key : '';
            let isProfileMenuData = await JSON.parse(await getAsyncStorage('myProfileData'));
            if (logicForSpecficTab == 'selected') {
                isProfileMenuData[1].isSelected = true;
            } else {
                isProfileMenuData[1].isSelected = false;
            }
            await setAsyncStorage('myProfileData', JSON.stringify([...isProfileMenuData]));
        }
        await onPreviousScreen();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            swipeDirection="down"
            onRequestClose={onRequestClose}
        >
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.TRANSPARENT}
                opacity={0.1}
                statusBarTranslucent
            />
            <View style={styles.demoSurveyMainModalView}>
                {loader && <CustomLoader isVisible={loader} />}
                <View style={[styles.demoSurveyMainModalViewStyle, styles.padd15]}>
                    <View style={styles.height100}>
                        <TouchableOpacity style={styles.alignSelfFlexEnd} onPress={onPressCross}>
                            <AntDesign name={'close'} size={25} color={colors.ABBEY} />
                        </TouchableOpacity>
                        <ScrollView style={styles.height100} showsVerticalScrollIndicator={false}>
                            <View style={styles.padV20}>
                                {isDataQuestionAnswer &&
                                    isDataQuestionAnswer.length > 0 &&
                                    isDataQuestionAnswer.map((item1, index1) => (
                                        <View>
                                            <CustomDynamicForm
                                                key={index1}
                                                noNeedBorder
                                                question={item1.question}
                                                quesTextStyleExtra={styles.myFamilyQuetionTextStyle}
                                                inSideValue={
                                                    <View>
                                                        {item1 &&
                                                            item1.question_type == 1 &&
                                                            item1.answer_arr.map((item, index) => (
                                                                <View key={index} style={styles.pT10}>
                                                                    <CustomRadioAndAns
                                                                        checkValue={item.selected}
                                                                        answer={item.answer}
                                                                        onPressRadio={() => {
                                                                            onCallSelection(item1, item);
                                                                        }}
                                                                    />
                                                                </View>
                                                            ))}
                                                        {item1 && item1.question_type == 2 && (
                                                            <View style={styles.pT10}>
                                                                <View
                                                                    style={{
                                                                        height: isOpenIndex == index1 ? 200 : undefined,
                                                                    }}
                                                                >
                                                                    <CustomDropDownAnswer
                                                                        itemsData={item1.answer_arr}
                                                                        //zIndex={1}
                                                                        // defaultValue={I18n.t(globalText.bachDegree)}
                                                                        labelKey={'question_answer_id'}
                                                                        displayKey={'answer'}
                                                                        onItemChoose={item => {
                                                                            onCallSelection(item1, item);
                                                                            setOpenIndex(-1);
                                                                        }}
                                                                        onOpen={() => {
                                                                            setOpenIndex(index1);
                                                                        }}
                                                                        onClose={() => {
                                                                            setOpenIndex(-1);
                                                                        }}
                                                                        isOpenCheck={isOpenIndex == index1}
                                                                    />
                                                                </View>
                                                            </View>
                                                        )}
                                                        {item1 &&
                                                            item1.question_type == 3 &&
                                                            item1.answer_arr.map((item, index) => (
                                                                <View key={index} style={styles.pT10}>
                                                                    <CustomCheckBoxAns
                                                                        checkValue={item.selected}
                                                                        answer={item.answer}
                                                                        onPressCheckBox={() => {
                                                                            onCallSelection(item1, item);
                                                                        }}
                                                                    />
                                                                </View>
                                                            ))}
                                                        {item1 && item1.question_type == 4 && (
                                                            <View style={styles.pT10}>
                                                                <View
                                                                    style={{
                                                                        height: isOpenIndex == index1 ? 200 : undefined,
                                                                    }}
                                                                >
                                                                    <CustomDropDownAnswer
                                                                        itemsData={item1.answer_arr}
                                                                        //     zIndex={1}
                                                                        //defaultValue={I18n.t(globalText.bachDegree)}
                                                                        labelKey={'question_answer_id'}
                                                                        displayKey={'answer'}
                                                                        onItemChoose={item => {
                                                                            // setOpenIndex(-1);
                                                                            if (item.length > 0) {
                                                                                onCallSelection(item1, item);
                                                                            } else {
                                                                                onCallSelection(item1, []);
                                                                            }
                                                                        }}
                                                                        isArray={item1.answer_arr
                                                                            .filter(it => it.selected)
                                                                            .map(i => i.answer)}
                                                                        multiple
                                                                        isOpenCheck={isOpenIndex == index1}
                                                                        onOpen={() => setOpenIndex(index1)}
                                                                        onClose={() => setOpenIndex(-1)}
                                                                    />
                                                                </View>
                                                            </View>
                                                        )}
                                                        {item1 && item1.question_type == 5 && (
                                                            <View style={styles.pT10}>
                                                                <CustomTextInput
                                                                    placeholder={I18n.t(globalText._typeHereYourAnswer)}
                                                                    multiline
                                                                    term={item1 && item1.answer}
                                                                    onChangeText={text => {
                                                                        onCallSelection(item1, text);
                                                                    }}
                                                                />
                                                            </View>
                                                        )}
                                                        {item1 && item1.question_type == 6 && (
                                                            <View style={styles.pT10}>
                                                                <CustomGridRadioAns
                                                                    ansData={item1.answer_arr}
                                                                    subQData={item1.gird_sub_que_arr}
                                                                    onGridRadioSelected={subQuestionWithanswer => {
                                                                        onCallSelection(item1, subQuestionWithanswer);
                                                                    }}
                                                                />
                                                            </View>
                                                        )}
                                                        {item1 && item1.question_type == 7 && (
                                                            <View style={styles.pT10}>
                                                                <CustomRadioCheckBoxMultiSelect
                                                                    ansData={item1.answer_arr}
                                                                    subQData={item1.gird_sub_que_arr}
                                                                    onGridRadioSelected={answerWithSubID => {
                                                                        onCallSelection(item1, answerWithSubID);
                                                                    }}
                                                                />
                                                            </View>
                                                        )}
                                                        {item1 &&
                                                            item1.question_type == 8 &&
                                                            item1.gird_sub_que_arr.map((item, index) => (
                                                                <View key={index} style={styles.pT10}>
                                                                    <CustomTextInput
                                                                        headerName={item.name}
                                                                        placeholder={I18n.t(
                                                                            globalText._typeHereYourAnswer,
                                                                        )}
                                                                        multiline
                                                                        term={item && item.answer}
                                                                        onChangeText={text => {
                                                                            item.answer = text;
                                                                        }}
                                                                    />
                                                                </View>
                                                            ))}
                                                    </View>
                                                }
                                            />
                                        </View>
                                    ))}
                            </View>
                            <TouchableOpacity
                                style={styles.criteriaQuestionButton}
                                onPress={() => {
                                    onUpdate();
                                }}
                            >
                                <Text style={styles.demoSureyAuthButtonName}>{I18n.t(globalText.update)}</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default DemoSurvey;
