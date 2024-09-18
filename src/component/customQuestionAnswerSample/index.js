/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-self-assign */
/* eslint-disable no-unreachable */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
//CustomQuestionAnswerForm

import React, { useEffect, useState, memo } from 'react';
import { ScrollView, Text, View, Platform, TouchableOpacity, Alert } from 'react-native';
import CustomButton from '../customButton';
import CustomDynamicForm from '../customDynamicForm/index';
import CustomRadioAndAns from '../CustomRadioAndAns/index';
import CustomCheckBoxAns from '../CustomCheckBoxAns/index';
import CustomDropDownAnswer from '../CustomDropwDownAnswer/index';
import CustomDropDownAnswerNew from '../CustomDropwDownAnswerNew/index';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import CustomLoader from '../customLoader/index';
import CustomTextInput from '../customTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomGridRadioAns from '../customGridRadioAns/index';
import CustomRadioCheckBoxMultiSelect from '../customRadioCheckBoxMultiSelect/index';
import I18n from '../../i18n/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';

//CustomQuestionAnswerForm
const CustomQuestionAnswerSample = props => {
    const { onSaveAnswer, data } = props;
    const [loader, setLoader] = useState(false);
    const [isOpenIndex, setOpenIndex] = useState(-1);
    const [isOpenIndexName, setOpenIndexName] = useState('');
    const [questionsData, setQuestionsData] = useState([...data]);

    const onRemoveSelected = (isData, selectedData) => {
        let cnt = 0;
        questionsData.map((item1, index1) => {
            if (item1.question_id == isData.question_id) {
                selectedData.length > 0 &&
                    item1.child_que_arr &&
                    item1.child_que_arr.length > 0 &&
                    item1.child_que_arr.map((item, index) => {
                        let checkData = item.parent_question_answer_id.split(',');
                        selectedData.map((i, j) => {
                            if (checkData.indexOf(i.toString()) !== -1) {
                                cnt = cnt + 1;
                            }
                        });
                    });

                if (cnt == 0) {
                    item1.child_que_arr &&
                        item1.child_que_arr.length > 0 &&
                        item1.child_que_arr.map((item, index) => {
                            switch (item.question_type) {
                                case '1':
                                    item.child_ans_arr &&
                                        item.child_ans_arr.length > 0 &&
                                        item.child_ans_arr.map((i, j) => {
                                            i.selected = false;
                                        });
                                    break;
                                case '2':
                                    item.child_ans_arr &&
                                        item.child_ans_arr.length > 0 &&
                                        item.child_ans_arr.map((i, j) => {
                                            i.selected = false;
                                        });
                                    break;
                                case '3':
                                    item.child_ans_arr &&
                                        item.child_ans_arr.length > 0 &&
                                        item.child_ans_arr.map((i, j) => {
                                            i.selected = false;
                                        });
                                    break;
                                case '4':
                                    item.child_ans_arr &&
                                        item.child_ans_arr.length > 0 &&
                                        item.child_ans_arr.map((i, j) => {
                                            i.selected = false;
                                        });
                                    break;

                                case '5':
                                    item.answer = '';
                                    break;
                                case '6':
                                    item.child_grid_arr &&
                                        item.child_grid_arr.length > 0 &&
                                        item.child_grid_arr.map((i, j) => {
                                            delete i.ansId;
                                            delete i.answer;
                                            delete i.question_answer_id;
                                        });
                                    break;
                                case '7':
                                    item.child_grid_arr &&
                                        item.child_grid_arr.length > 0 &&
                                        item.child_grid_arr.map((iG, jG) => {
                                            item.child_ans_arr &&
                                                item.child_ans_arr.length > 0 &&
                                                item.child_ans_arr.map((i, j) => {
                                                    i[iG.grid_subquestion_id.toString()] = null;
                                                    i.selectedObj = [];
                                                });
                                        });
                                    break;
                                case '8':
                                    item.child_grid_arr &&
                                        item.child_grid_arr.length > 0 &&
                                        item.child_grid_arr.map((iG, jG) => {
                                            if (iG.answer && iG.answer.length > 0) {
                                                delete iG.answer;
                                            }
                                        });
                                    break;
                            }
                        });
                }
            }
        });
        setQuestionsData([...questionsData]);
    };

    const onCallSelection = (quesValue, ansData, subItem) => {
        questionsData.map((item1, index1) => {
            switch (quesValue.question_type) {
                case '1':
                    if (quesValue.question_id == item1.question_id) {
                        let selectedData = [];
                        item1.answer_arr.map((item, index) => {
                            if (ansData.question_answer_id == item.question_answer_id) {
                                item.selected = true;
                                selectedData.push(item.question_answer_id);
                            } else {
                                item.selected = false;
                            }
                        });
                        onRemoveSelected(item1, selectedData);
                        item1.selectedData = selectedData;
                    }
                    setQuestionsData([...questionsData]);
                    break;
                case '2':
                    if (quesValue.question_id == item1.question_id) {
                        let selectedData = [];
                        item1.answer_arr.map((item, index) => {
                            if (ansData.question_answer_id == item.question_answer_id) {
                                item.selected = true;
                                selectedData.push(item.question_answer_id);
                            } else {
                                item.selected = false;
                            }
                        });
                        onRemoveSelected(item1, selectedData);
                        item1.selectedData = selectedData;
                    }
                    setQuestionsData([...questionsData]);
                    break;

                case '3':
                    if (quesValue.question_id == item1.question_id) {
                        let selectedData = [];
                        item1.answer_arr.map((item, index) => {
                            if (ansData.key != 'N') {
                                if (item.key == 'N') {
                                    // selectedData.push(item.question_answer_id);
                                    item.selected = false;
                                }
                                if (ansData.question_answer_id == item.question_answer_id) {
                                    if (!item.selected) {
                                        selectedData.push(item.question_answer_id);
                                    }
                                    item.selected = !item.selected;
                                } else {
                                    if (item.selected) {
                                        selectedData.push(item.question_answer_id);
                                    }
                                }
                            } else {
                                if (ansData.key == 'N' && item.key == 'N') {
                                    selectedData.push(item.question_answer_id);
                                    item.selected = !item.selected;
                                } else {
                                    item.selected = false;
                                }
                            }
                        });
                        onRemoveSelected(item1, selectedData);
                        item1.selectedData = selectedData;
                    }
                    setQuestionsData([...questionsData]);
                    break;

                case '4':
                    if (quesValue.question_id == item1.question_id) {
                        let selectedData = [];
                        let val = [];
                        ansData &&
                            ansData.length > 0 &&
                            ansData.map((iAnsData, jAnsData) => {
                                val.push(iAnsData.question_answer_id);
                            });

                        // ansData.map((i, j) => {
                        item1.answer_arr.map((item, index) => {
                            if (ansData.length > 0) {
                                if (val.indexOf(item.question_answer_id) !== -1) {
                                    // if (i.question_answer_id == item.question_answer_id) {
                                    if (ansData[ansData.length - 1].key != 'N') {
                                        if (item.key == 'N') {
                                            item.selected = false;
                                        } else {
                                            item.selected = true;
                                            selectedData.push(item.question_answer_id);
                                        }
                                        setQuestionsData([...questionsData]);
                                    } else {
                                        if (item.key == 'N') {
                                            selectedData.push(item.question_answer_id);
                                            item.selected = true;
                                        } else {
                                            item.selected = false;
                                        }
                                        setQuestionsData([...questionsData]);
                                    }
                                } else {
                                    item.selected = false;
                                }
                            } else {
                                item.selected = false;
                                setQuestionsData([...questionsData]);
                            }
                        });
                        onRemoveSelected(item1, selectedData);
                        item1.selectedData = selectedData;
                    }
                    setQuestionsData([...questionsData]);
                    break;

                case '5':
                    if (quesValue.question_id == item1.question_id) {
                        item1.answer = ansData;
                    }
                    setQuestionsData([...questionsData]);
                    break;

                case '6':
                    if (quesValue.question_id == item1.question_id) {
                        let selectedData = [];
                        item1.gird_sub_que_arr = ansData;
                        ansData &&
                            ansData.length > 0 &&
                            ansData.map((item, index) => {
                                if (item.ansId) {
                                    selectedData.push(item.ansId);
                                }
                            });
                        let uniqueChars = [...new Set(selectedData)];
                        onRemoveSelected(item1, uniqueChars);
                        item1.selectedData = uniqueChars;
                    }
                    setQuestionsData([...questionsData]);
                    break;
                case '7':
                    if (quesValue.question_id == item1.question_id) {
                        let selectedData = [];
                        item1.answer_arr = ansData;
                        ansData &&
                            ansData.length > 0 &&
                            ansData.map((item, index) => {
                                if (item.selectedObj && item.selectedObj.length > 0) {
                                    item.selectedObj.map((i, j) => {
                                        selectedData.push(i.ansId);
                                    });
                                }
                            });
                        let uniqueChars = [...new Set(selectedData)];
                        onRemoveSelected(item1, uniqueChars);
                        item1.selectedData = uniqueChars;
                    }
                    setQuestionsData([...questionsData]);
                    break;
            }
        });
        setQuestionsData([...questionsData]);
    };

    const onCallSelectionChild = (childQuestion, selectedItem) => {
        questionsData.map((item, index) => {
            if (childQuestion.child_question_id == item.child_question_id) {
                switch (item.question_type) {
                    case '1':
                        item.child_ans_arr &&
                            item.child_ans_arr.length > 0 &&
                            item.child_ans_arr.map((i, j) => {
                                if (i.question_answer_id == selectedItem.question_answer_id) {
                                    i.selected = true;
                                } else {
                                    i.selected = false;
                                }
                            });
                        setQuestionsData([...questionsData]);
                        break;
                    case '2':
                        item.child_ans_arr &&
                            item.child_ans_arr.length > 0 &&
                            item.child_ans_arr.map((i, j) => {
                                if (i.question_answer_id == selectedItem.question_answer_id) {
                                    i.selected = true;
                                } else {
                                    i.selected = false;
                                }
                            });
                        setQuestionsData([...questionsData]);
                        break;
                    case '3':
                        item.child_ans_arr &&
                            item.child_ans_arr.length > 0 &&
                            item.child_ans_arr.map((i, j) => {
                                if (selectedItem.key != 'N') {
                                    if (i.key == 'N') {
                                        item.selected = false;
                                    }
                                    if (i.question_answer_id == selectedItem.question_answer_id) {
                                        i.selected = !i.selected;
                                    }
                                } else {
                                    if (selectedItem.key == 'N' && i.key == 'N') {
                                        item.selected = true;
                                    } else {
                                        item.selected = false;
                                    }
                                }
                            });
                        setQuestionsData([...questionsData]);
                        break;
                    case '4':
                        let val = [];
                        selectedItem &&
                            selectedItem.length > 0 &&
                            selectedItem.map((iAnsData, jAnsData) => {
                                val.push(iAnsData.question_answer_id);
                            });
                        item.child_ans_arr &&
                            item.child_ans_arr.length > 0 &&
                            item.child_ans_arr.map((i, j) => {
                                if (selectedItem.length > 0) {
                                    if (val.indexOf(i.question_answer_id) !== -1) {
                                        if (selectedItem[selectedItem.length - 1].key != 'N') {
                                            if (i.key == 'N') {
                                                i.selected = false;
                                            } else {
                                                i.selected = true;
                                            }
                                            setQuestionsData([...questionsData]);
                                        } else {
                                            if (i.key == 'N') {
                                                i.selected = !i.selected;
                                            } else {
                                                i.selected = false;
                                            }
                                            setQuestionsData([...questionsData]);
                                        }
                                    } else {
                                        i.selected = false;
                                    }
                                    setQuestionsData([...questionsData]);
                                } else {
                                    i.selected = false;
                                }
                            });
                        setQuestionsData([...questionsData]);
                        break;
                    case '5':
                        item.answer = selectedItem;
                        setQuestionsData([...questionsData]);
                        break;
                    case '6':
                        item.child_grid_arr = selectedItem;
                        setQuestionsData([...questionsData]);
                        break;
                    case '7':
                        item.child_ans_arr = selectedItem;
                        setQuestionsData([...questionsData]);
                        break;
                }
            }
        });
        setQuestionsData([...questionsData]);
    };

    const onCallUpdate = async () => {
        let isParent = false;
        let data1 = [];
        let sub_category_type_id = null;
        if (questionsData[0].child_question_id) {
            data1 = await onCallUpdateChild();
        } else if (!questionsData[0].child_question_id) {
            isParent = true;
            let value = await onCallUpdateParent();
            data1 = value.allData;
            sub_category_type_id = value.sub_category_type_id;
        }
        if (!data1) {
            setLoader(false);
            return;
        }
        let selData = questionsData[0].selectedData ? questionsData[0].selectedData : [];
        let cnt = 0;
        let isChildQuestion = [];
        selData &&
            selData.length > 0 &&
            questionsData[0].child_que_arr &&
            questionsData[0].child_que_arr.length > 0 &&
            questionsData[0].child_que_arr.map((item, index) => {
                let checkData = item.parent_question_answer_id.split(',');
                item.selectedChild = false;
                selData.map((i, j) => {
                    if (checkData.indexOf(i.toString()) !== -1) {
                        item.selectedChild = true;
                        cnt = cnt + 1;
                    }
                });

                if (cnt >= 1 && item.selectedChild) {
                    isChildQuestion.push(item);
                }
            });

        setLoader(true);
        let isAllSelctedData = data1;
        await onSaveAnswer(isAllSelctedData, isChildQuestion, isParent, sub_category_type_id);
        // setLoader(false);
    };

    const onCallUpdateParent = async () => {
        let count = 0;
        let countForcheck = 0;
        let allData = [];
        let sub_category_type_id = null;
        questionsData &&
            questionsData.length > 0 &&
            questionsData.map((item1, index1) => {
                let mergeAnserIds = [];
                switch (item1.question_type) {
                    case '1':
                        sub_category_type_id = item1.sub_category_type_id;
                        item1.answer_arr &&
                            item1.answer_arr.length > 0 &&
                            item1.answer_arr.map((item, index) => {
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
                        item1.answer_arr &&
                            item1.answer_arr.length > 0 &&
                            item1.answer_arr.map((item, index) => {
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
                        item1.answer_arr &&
                            item1.answer_arr.length > 0 &&
                            item1.answer_arr.map((item, index) => {
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
                        item1.answer_arr &&
                            item1.answer_arr.length > 0 &&
                            item1.answer_arr.map((item, index) => {
                                if (item.selected) {
                                    countForcheck = countForcheck + 1;
                                    mergeAnserIds.push(item.question_answer_id);
                                    // let value = {
                                    //     question_type: item1.question_type,
                                    //     question_id: item1.question_id,
                                    //     answer: item.answer,
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
                        countForcheck = countForcheck + 1;
                        let value = {
                            question_type: item1.question_type,
                            question_id: item1.question_id,
                            // answer: item1.answer && item1.answer.length > 0 ? item1.answer : '',
                            grid_subquestion_id: -1,
                            question_answer_id: item1.answer && item1.answer.length > 0 ? item1.answer : '',
                        };
                        allData.push({ ...value });

                        break;

                    case '6':
                        sub_category_type_id = item1.sub_category_type_id;
                        let cntAllQuestion6 = 0;
                        item1.gird_sub_que_arr &&
                            item1.gird_sub_que_arr.length > 0 &&
                            item1.gird_sub_que_arr.map((item, index) => {
                                if (item.ansId) {
                                    // countForcheck = countForcheck + 1;
                                    cntAllQuestion6 = cntAllQuestion6 + 1;
                                    let value = {
                                        question_type: item1.question_type,
                                        question_id: item1.question_id,
                                        // answer: item.answer,
                                        grid_subquestion_id: item.grid_subquestion_id,
                                        question_answer_id: item.ansId,
                                    };
                                    allData.push({ ...value });
                                }
                                if (cntAllQuestion6 == item1.gird_sub_que_arr.length) {
                                    countForcheck = countForcheck + 1;
                                }
                            });
                        break;
                    case '7':
                        let isGriData = [];
                        sub_category_type_id = item1.sub_category_type_id;
                        let cntAllQuestion7 = 0;
                        let selectedSubQuestionArr = [];
                        item1.answer_arr &&
                            item1.answer_arr.length > 0 &&
                            item1.answer_arr.map((item, index) => {
                                if (item.selectedObj && item.selectedObj.length > 0) {
                                    item.selectedObj.map((i, j) => {
                                        if (item.question_answer_id == i.ansId) {
                                            // countForcheck = countForcheck + 1;
                                            let value = {
                                                question_type: item1.question_type,
                                                question_id: item1.question_id,
                                                // answer: item.answer,
                                                grid_subquestion_id: i.grid_subquestion_id,
                                                question_answer_id: item.question_answer_id,
                                            };
                                            isGriData.push({ ...value });
                                            // allData.push({ ...value });
                                            item1.gird_sub_que_arr.map((item, index) => {
                                                if (
                                                    value.grid_subquestion_id == item.grid_subquestion_id &&
                                                    !selectedSubQuestionArr.includes(item.grid_subquestion_id)
                                                ) {
                                                    selectedSubQuestionArr.push(item.grid_subquestion_id);
                                                    cntAllQuestion7 = cntAllQuestion7 + 1;
                                                }
                                            });
                                            if (cntAllQuestion7 == item1.gird_sub_que_arr.length) {
                                                countForcheck = countForcheck + 1;
                                            }
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
                        item1.gird_sub_que_arr.map((item, index) => {
                            if (item.answer && item.answer.length > 0) {
                                countForcheck = countForcheck + 1;
                                let value = {
                                    question_type: item1.question_type,
                                    question_id: item1.question_id,
                                    // answer: item.answer,
                                    grid_subquestion_id: item.grid_subquestion_id,
                                    question_answer_id: item.answer,
                                };
                                allData.push({ ...value });
                            }
                        });
                        break;
                }
                countForcheck = countForcheck;
                count = count + 1;
            });
        if (countForcheck > 0) {
            if (questionsData && count == questionsData.length) {
                return { allData: allData, sub_category_type_id: sub_category_type_id };
            }
        } else {
            Alert.alert('', I18n.t(globalText._pleaseSelectAtleastOneAnswer), [
                {
                    //text: 'ok',
                    text: I18n.t(globalText._ok),
                    onPress: () => {
                        true;
                    },
                },
            ]);
            return null;
        }
    };

    const onCallUpdateChild = async () => {
        let count = 0;
        let countForcheck = 0;
        let allData = [];
        questionsData &&
            questionsData.length > 0 &&
            questionsData.map((item1, index1) => {
                let mergeAnserIds = [];
                switch (item1.question_type) {
                    case '1':
                        item1.child_ans_arr &&
                            item1.child_ans_arr.length > 0 &&
                            item1.child_ans_arr.map((item, index) => {
                                if (item.selected) {
                                    countForcheck = countForcheck + 1;
                                    let value = {
                                        question_type: item1.question_type,
                                        question_id: item1.child_question_id,
                                        question_answer_id: item.question_answer_id,
                                        // answer: item.answer,
                                        grid_subquestion_id: -1,
                                    };
                                    allData.push({ ...value });
                                }
                            });
                        break;
                    case '2':
                        item1.child_ans_arr &&
                            item1.child_ans_arr.length > 0 &&
                            item1.child_ans_arr.map((item, index) => {
                                if (item.selected) {
                                    countForcheck = countForcheck + 1;
                                    let value = {
                                        question_type: item1.question_type,
                                        question_id: item1.child_question_id,
                                        // answer: item.answer,
                                        question_answer_id: item.question_answer_id,
                                        grid_subquestion_id: -1,
                                    };
                                    allData.push({ ...value });
                                }
                            });
                        break;

                    case '3':
                        item1.child_ans_arr &&
                            item1.child_ans_arr.length > 0 &&
                            item1.child_ans_arr.map((item, index) => {
                                if (item.selected) {
                                    countForcheck = countForcheck + 1;
                                    mergeAnserIds.push(item.question_answer_id);
                                    // let value = {
                                    //     question_type: item1.question_type,
                                    //     question_id: item1.child_question_id,
                                    //     question_answer_id: item.question_answer_id,
                                    //     answer: item.answer,
                                    //     grid_subquestion_id: -1,
                                    // };
                                    // allData.push({ ...value });
                                }
                            });
                        if (mergeAnserIds && mergeAnserIds.length > 0) {
                            let value = {
                                question_type: item1.question_type,
                                question_id: item1.child_question_id,
                                question_answer_id: mergeAnserIds.toString(),
                                //  answer: item.answer,
                                grid_subquestion_id: -1,
                            };
                            allData.push({ ...value });
                        }
                        break;

                    case '4':
                        item1.child_ans_arr &&
                            item1.child_ans_arr.length > 0 &&
                            item1.child_ans_arr.map((item, index) => {
                                if (item.selected) {
                                    countForcheck = countForcheck + 1;
                                    mergeAnserIds.push(item.question_answer_id);
                                    // let value = {
                                    //     question_type: item1.question_type,
                                    //     question_id: item1.child_question_id,
                                    //     answer: item.answer,
                                    //     question_answer_id: item.question_answer_id,
                                    //     grid_subquestion_id: -1,
                                    // };
                                    // allData.push({ ...value });
                                }
                            });
                        if (mergeAnserIds && mergeAnserIds.length > 0) {
                            let value = {
                                question_type: item1.question_type,
                                question_id: item1.child_question_id,
                                question_answer_id: mergeAnserIds.toString(),
                                //  answer: item.answer,
                                grid_subquestion_id: -1,
                            };
                            allData.push({ ...value });
                        }
                        break;

                    case '5':
                        countForcheck = countForcheck + 1;
                        let value = {
                            question_type: item1.question_type,
                            question_id: item1.child_question_id,
                            // answer: item1.answer && item1.answer.length > 0 ? item1.answer : '',
                            grid_subquestion_id: -1,
                            question_answer_id: item1.answer && item1.answer.length > 0 ? item1.answer : '',
                        };
                        allData.push({ ...value });

                        break;

                    case '6':
                        let cntAllQuestion6 = 0;
                        item1.child_grid_arr &&
                            item1.child_grid_arr.length > 0 &&
                            item1.child_grid_arr.map((item, index) => {
                                if (item.ansId) {
                                    // countForcheck = countForcheck + 1;
                                    cntAllQuestion6 = cntAllQuestion6 + 1;
                                    let value = {
                                        question_type: item1.question_type,
                                        question_id: item1.child_question_id,
                                        // answer: item.answer,
                                        grid_subquestion_id: item.grid_subquestion_id,
                                        question_answer_id: item.ansId,
                                    };
                                    allData.push({ ...value });
                                }
                                if (cntAllQuestion6 == item1.child_grid_arr.length) {
                                    countForcheck = countForcheck + 1;
                                }
                            });
                        break;
                    case '7':
                        let isGriData = [];
                        let cntAllQuestion7 = 0;
                        let selectedSubQuestionArr = [];
                        item1.child_ans_arr &&
                            item1.child_ans_arr.length > 0 &&
                            item1.child_ans_arr.map((item, index) => {
                                if (item.selectedObj && item.selectedObj.length > 0) {
                                    item.selectedObj.map((i, j) => {
                                        if (item.question_answer_id == i.ansId) {
                                            // countForcheck = countForcheck + 1;
                                            let value = {
                                                question_type: item1.question_type,
                                                question_id: item1.child_question_id,
                                                // answer: item.answer,
                                                grid_subquestion_id: i.grid_subquestion_id,
                                                question_answer_id: item.question_answer_id,
                                            };
                                            isGriData.push({ ...value });
                                            item1.child_grid_arr.map((item, index) => {
                                                if (
                                                    value.grid_subquestion_id == item.grid_subquestion_id &&
                                                    !selectedSubQuestionArr.includes(item.grid_subquestion_id)
                                                ) {
                                                    selectedSubQuestionArr.push(item.grid_subquestion_id);
                                                    cntAllQuestion7 = cntAllQuestion7 + 1;
                                                }
                                            });
                                            if (cntAllQuestion7 == item1.child_grid_arr.length) {
                                                countForcheck = countForcheck + 1;
                                            }
                                        }
                                    });
                                }
                            });
                        if (isGriData && isGriData.length > 0) {
                            item1.child_grid_arr &&
                                item1.child_grid_arr.length > 0 &&
                                item1.child_grid_arr.map((item, index) => {
                                    let isGriddataIds = [];
                                    isGriData.map((i, j) => {
                                        if (item.grid_subquestion_id == i.grid_subquestion_id) {
                                            isGriddataIds.push(i.question_answer_id);
                                        }
                                    });
                                    let value = {
                                        question_type: item1.question_type,
                                        question_id: item1.child_question_id,
                                        // answer: item.answer,
                                        grid_subquestion_id: item.grid_subquestion_id,
                                        question_answer_id: isGriddataIds.toString(),
                                    };
                                    allData.push({ ...value });
                                });
                        }
                        break;
                    case '8':
                        item1.child_grid_arr.map((item, index) => {
                            if (item.answer && item.answer.length > 0) {
                                countForcheck = countForcheck + 1;
                                let value = {
                                    question_type: item1.question_type,
                                    question_id: item1.child_question_id,
                                    // answer: item.answer,
                                    grid_subquestion_id: item.grid_subquestion_id,
                                    question_answer_id: item.answer,
                                };
                                allData.push({ ...value });
                            }
                        });
                        break;
                }
                countForcheck = countForcheck;
                count = count + 1;
            });
        if (countForcheck > 0) {
            if (questionsData && count == questionsData.length) {
                return allData;
            }
        } else {
            Alert.alert('', I18n.t(globalText._pleaseSelectAtleastOneAnswer), [
                {
                    //text: 'ok',
                    text: I18n.t(globalText._ok),
                    onPress: () => {
                        true;
                    },
                },
            ]);
            return null;
        }
    };

    // const RenderChildDataTypeWise = ({ isItem, item1, index1 }) => {
    //     return (
    //         <>
    //             <View style={[styles.paddT10, styles.pT10]}>
    //                 <CustomDynamicForm
    //                     key={index1}
    //                     noNeedBorder
    //                     question={item1.question}
    //                     extraStyle={styles.padBMinus50}
    //                     quesTextStyleExtra={styles.myFamilyQuetionTextStyle}
    //                     inSideValue={
    //                         <View>
    //                             {item1 &&
    //                                 item1.question_type == 1 &&
    //                                 item1.child_ans_arr.map((item, index) => (
    //                                     <View key={index} style={styles.pT10}>
    //                                         <CustomRadioAndAns
    //                                             checkValue={item.selected}
    //                                             answer={item.answer}
    //                                             onPressRadio={() => {
    //                                                 onCallSelectionChild(item1, item);
    //                                             }}
    //                                         />
    //                                     </View>
    //                                 ))}
    //                             {item1 && item1.question_type == 2 && (
    //                                 <View style={styles.pT10}>
    //                                     <View
    //                                         style={{
    //                                             height:
    //                                                 isOpenIndex == index1 && isOpenIndexName == 'child'
    //                                                     ? 200
    //                                                     : undefined,
    //                                         }}
    //                                     >
    //                                         <CustomDropDownAnswerNew
    //                                             itemsData={item1.child_ans_arr}
    //                                             //zIndex={1}
    //                                             // defaultValue={I18n.t(globalText.bachDegree)}
    //                                             labelKey={'question_answer_id'}
    //                                             displayKey={'answer'}
    //                                             onItemChoose={item => {
    //                                                 // setOpenIndexName('');
    //                                                 setOpenIndex(-1);
    //                                                 onCallSelectionChild(item1, item);
    //                                                 // onCallSelection(item1, item);
    //                                             }}
    //                                             onOpen={() => {
    //                                                 setOpenIndexName('child');
    //                                                 setOpenIndex(index1);
    //                                             }}
    //                                             onClose={() => {
    //                                                 setOpenIndexName('');
    //                                                 setOpenIndex(-1);
    //                                             }}
    //                                             isOpenCheck={isOpenIndex == index1 && isOpenIndexName == 'child'}
    //                                             dropDownContainerStyleNew={
    //                                                 styles.cDropDownContainerStyleNewFordropdowmNew
    //                                             }
    //                                         />
    //                                     </View>
    //                                 </View>
    //                             )}
    //                             {item1 &&
    //                                 item1.question_type == 3 &&
    //                                 item1.child_ans_arr.map((item, index) => (
    //                                     <View key={index} style={styles.pT10}>
    //                                         <CustomCheckBoxAns
    //                                             checkValue={item.selected}
    //                                             answer={item.answer}
    //                                             onPressCheckBox={() => {
    //                                                 setOpenIndex(-1);
    //                                                 onCallSelectionChild(item1, item);
    //                                                 // onCallSelection(item1, item);
    //                                             }}
    //                                         />
    //                                     </View>
    //                                 ))}
    //                             {item1 && item1.question_type == 4 && (
    //                                 <View style={styles.pT10}>
    //                                     <View
    //                                         style={{
    //                                             height:
    //                                                 isOpenIndex == index1 && isOpenIndexName == 'child'
    //                                                     ? 200
    //                                                     : undefined,
    //                                         }}
    //                                     >
    //                                         <CustomDropDownAnswerNew
    //                                             itemsData={item1.child_ans_arr}
    //                                             //     zIndex={1}
    //                                             //defaultValue={I18n.t(globalText.bachDegree)}
    //                                             labelKey={'question_answer_id'}
    //                                             displayKey={'answer'}
    //                                             onItemChoose={item => {
    //                                                 // setOpenIndexName('');
    //                                                 if (item.length > 0) {
    //                                                     onCallSelectionChild(item1, item);
    //                                                     // onCallSelection(item1, item);
    //                                                 } else {
    //                                                     onCallSelectionChild(item1, []);
    //                                                 }
    //                                             }}
    //                                             multiple
    //                                             isOpenCheck={isOpenIndex == index1 && isOpenIndexName == 'child'}
    //                                             onOpen={() => {
    //                                                 setOpenIndexName('child');
    //                                                 setOpenIndex(index1);
    //                                             }}
    //                                             onClose={() => {
    //                                                 setOpenIndexName('');
    //                                                 setOpenIndex(-1);
    //                                             }}
    //                                             dropDownContainerStyleNew={
    //                                                 styles.cDropDownContainerStyleNewFordropdowmNew
    //                                             }
    //                                         />
    //                                     </View>
    //                                 </View>
    //                             )}
    //                             {item1 && item1.question_type == 5 && (
    //                                 <View style={styles.pT10}>
    //                                     <CustomTextInput
    //                                         placeholder={I18n.t(globalText._typeHereYourAnswer)}
    //                                         // multiline
    //                                         term={item1 && item1.answer}
    //                                         onChangeText={text => {
    //                                             onCallSelectionChild(item1, text);
    //                                         }}
    //                                     />
    //                                 </View>
    //                             )}
    //                             {item1 && item1.question_type == 6 && (
    //                                 <View style={styles.pT10}>
    //                                     <CustomGridRadioAns
    //                                         ansData={item1.child_ans_arr}
    //                                         subQData={item1.child_grid_arr}
    //                                         onGridRadioSelected={subQuestionWithanswer => {
    //                                             onCallSelectionChild(item1, subQuestionWithanswer);
    //                                         }}
    //                                     />
    //                                 </View>
    //                             )}
    //                             {item1 && item1.question_type == 7 && (
    //                                 <View style={styles.pT10}>
    //                                     <CustomRadioCheckBoxMultiSelect
    //                                         ansData={item1.child_ans_arr}
    //                                         subQData={item1.child_grid_arr}
    //                                         onGridRadioSelected={answerWithSubID => {
    //                                             onCallSelectionChild(item1, answerWithSubID);
    //                                         }}
    //                                     />
    //                                 </View>
    //                             )}
    //                             {item1 &&
    //                                 item1.question_type == 8 &&
    //                                 item1.child_grid_arr.map((item, index) => (
    //                                     <View key={index} style={styles.pT10}>
    //                                         <CustomTextInput
    //                                             headerName={item.subquestion}
    //                                             placeholder={I18n.t(globalText._typeHereYourAnswer)}
    //                                             // multiline
    //                                             term={item && item.answer}
    //                                             onChangeText={text => {
    //                                                 item.answer = text;
    //                                             }}
    //                                         />
    //                                     </View>
    //                                 ))}
    //                         </View>
    //                     }
    //                 />
    //             </View>
    //         </>
    //     );
    // };

    // const RenderParentDataTypeWise = ({ item1, index1 }) => {
    //     return (
    //         <View>
    //             <CustomDynamicForm
    //                 key={index1}
    //                 noNeedBorder
    //                 question={item1.question}
    //                 quesTextStyleExtra={styles.myFamilyQuetionTextStyle}
    //                 inSideValue={
    //                     <View>
    //                         {item1 &&
    //                             item1.question_type == 1 &&
    //                             item1.answer_arr.map((item, index) => (
    //                                 <>
    //                                     <View key={index} style={styles.pT10}>
    //                                         <CustomRadioAndAns
    //                                             checkValue={item.selected}
    //                                             answer={item.answer}
    //                                             onPressRadio={() => {
    //                                                 onCallSelection(item1, item);
    //                                             }}
    //                                         />
    //                                     </View>
    //                                 </>
    //                             ))}
    //                         {item1 && item1.question_type == 2 && (
    //                             <View style={styles.pT10}>
    //                                 <View
    //                                     style={{
    //                                         minHeight:
    //                                             isOpenIndex == index1 && isOpenIndexName == 'parent' ? 200 : undefined,
    //                                     }}
    //                                 >
    //                                     <CustomDropDownAnswerNew
    //                                         itemsData={item1.answer_arr}
    //                                         //zIndex={1}
    //                                         // defaultValue={I18n.t(globalText.bachDegree)}
    //                                         labelKey={'question_answer_id'}
    //                                         displayKey={'answer'}
    //                                         onItemChoose={item => {
    //                                             setOpenIndexName('');
    //                                             setOpenIndex(-1);
    //                                             onCallSelection(item1, item);
    //                                         }}
    //                                         onOpen={() => {
    //                                             setOpenIndexName('parent');
    //                                             setOpenIndex(index1);
    //                                         }}
    //                                         onClose={() => {
    //                                             setOpenIndexName('');
    //                                             setOpenIndex(-1);
    //                                         }}
    //                                         isOpenCheck={isOpenIndex == index1 && isOpenIndexName == 'parent'}
    //                                         dropDownContainerStyleNew={styles.cDropDownContainerStyleNewFordropdowmNew}
    //                                     />
    //                                 </View>
    //                             </View>
    //                         )}
    //                         {item1 &&
    //                             item1.question_type == 3 &&
    //                             item1.answer_arr.map((item, index) => (
    //                                 <View key={index} style={styles.pT10}>
    //                                     <CustomCheckBoxAns
    //                                         checkValue={item.selected}
    //                                         answer={item.answer}
    //                                         onPressCheckBox={() => {
    //                                             setOpenIndex(-1);
    //                                             onCallSelection(item1, item);
    //                                         }}
    //                                     />
    //                                 </View>
    //                             ))}
    //                         {item1 && item1.question_type == 4 && (
    //                             <View style={styles.pT10}>
    //                                 <View
    //                                     style={{
    //                                         height:
    //                                             isOpenIndex == index1 && isOpenIndexName == 'parent' ? 200 : undefined,
    //                                     }}
    //                                 >
    //                                     <CustomDropDownAnswerNew
    //                                         itemsData={item1.answer_arr}
    //                                         //     zIndex={1}
    //                                         //defaultValue={I18n.t(globalText.bachDegree)}
    //                                         labelKey={'question_answer_id'}
    //                                         displayKey={'answer'}
    //                                         onItemChoose={item => {
    //                                             // setOpenIndexName('');
    //                                             if (item.length > 0) {
    //                                                 onCallSelection(item1, item);
    //                                             } else {
    //                                                 onCallSelection(item1, []);
    //                                             }
    //                                         }}
    //                                         multiple
    //                                         isOpenCheck={isOpenIndex == index1 && isOpenIndexName == 'parent'}
    //                                         onOpen={() => {
    //                                             setOpenIndexName('parent');
    //                                             setOpenIndex(index1);
    //                                         }}
    //                                         onClose={() => {
    //                                             setOpenIndexName('');
    //                                             setOpenIndex(-1);
    //                                         }}
    //                                         dropDownContainerStyleNew={styles.cDropDownContainerStyleNewFordropdowmNew}
    //                                     />
    //                                 </View>
    //                             </View>
    //                         )}
    //                         {item1 && item1.question_type == 5 && (
    //                             <View style={styles.pT10}>
    //                                 <CustomTextInput
    //                                     placeholder={I18n.t(globalText._typeHereYourAnswer)}
    //                                     // multiline
    //                                     term={item1 && item1.answer}
    //                                     onChangeText={text => {
    //                                         onCallSelection(item1, text);
    //                                     }}
    //                                 />
    //                             </View>
    //                         )}
    //                         {item1 && item1.question_type == 6 && (
    //                             <View style={styles.pT10}>
    //                                 <CustomGridRadioAns
    //                                     ansData={item1.answer_arr}
    //                                     subQData={item1.gird_sub_que_arr}
    //                                     onGridRadioSelected={subQuestionWithanswer => {
    //                                         onCallSelection(item1, subQuestionWithanswer);
    //                                     }}
    //                                 />
    //                             </View>
    //                         )}
    //                         {item1 && item1.question_type == 7 && (
    //                             <View style={styles.pT10}>
    //                                 <CustomRadioCheckBoxMultiSelect
    //                                     ansData={item1.answer_arr}
    //                                     subQData={item1.gird_sub_que_arr}
    //                                     onGridRadioSelected={answerWithSubID => {
    //                                         onCallSelection(item1, answerWithSubID);
    //                                     }}
    //                                 />
    //                             </View>
    //                         )}
    //                         {item1 &&
    //                             item1.question_type == 8 &&
    //                             item1.gird_sub_que_arr.map((item, index) => (
    //                                 <View key={index} style={styles.pT10}>
    //                                     <CustomTextInput
    //                                         headerName={item.subquestion}
    //                                         placeholder={I18n.t(globalText._typeHereYourAnswer)}
    //                                         // multiline
    //                                         term={item && item.answer}
    //                                         onChangeText={text => {
    //                                             item.answer = text;
    //                                         }}
    //                                     />
    //                                 </View>
    //                             ))}
    //                     </View>
    //                 }
    //             />
    //         </View>
    //     );
    // };

    return (
        <>
            <View style={[styles.whiteTextBack, styles.container]}>
                <KeyboardAwareScrollView
                    extraScrollHeight={140}
                    nestedScrollEnabled
                    enableOnAndroid={false}
                    enableAutomaticScroll={Platform.OS === 'ios'}
                    style={{}}
                    contentContainerStyle={[styles.flexGrowOne, styles.height100]}
                >
                    <ScrollView contentContainerStyle={[styles.flexGrowOne]} nestedScrollEnabled style={styles.padd15}>
                        <View style={styles.container}>
                            <View>
                                {questionsData &&
                                    questionsData.length > 0 &&
                                    questionsData.map((item1, index1) => {
                                        // let cnt = 0;
                                        if (index1 == 0 && !item1.child_question_id) {
                                            return (
                                                <>
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
                                                                            <>
                                                                                <View key={index} style={styles.pT10}>
                                                                                    <CustomRadioAndAns
                                                                                        checkValue={item.selected}
                                                                                        answer={item.answer}
                                                                                        onPressRadio={() => {
                                                                                            onCallSelection(
                                                                                                item1,
                                                                                                item,
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </View>
                                                                            </>
                                                                        ))}
                                                                    {item1 && item1.question_type == 2 && (
                                                                        <View style={styles.pT10}>
                                                                            <View
                                                                                style={{
                                                                                    minHeight:
                                                                                        isOpenIndex == index1 &&
                                                                                        isOpenIndexName == 'parent'
                                                                                            ? 200
                                                                                            : undefined,
                                                                                }}
                                                                            >
                                                                                <CustomDropDownAnswerNew
                                                                                    itemsData={item1.answer_arr}
                                                                                    //zIndex={1}
                                                                                    // defaultValue={I18n.t(globalText.bachDegree)}
                                                                                    labelKey={'question_answer_id'}
                                                                                    displayKey={'answer'}
                                                                                    onItemChoose={item => {
                                                                                        setOpenIndexName('');
                                                                                        setOpenIndex(-1);
                                                                                        onCallSelection(item1, item);
                                                                                    }}
                                                                                    onOpen={() => {
                                                                                        setOpenIndexName('parent');
                                                                                        setOpenIndex(index1);
                                                                                    }}
                                                                                    onClose={() => {
                                                                                        setOpenIndexName('');
                                                                                        setOpenIndex(-1);
                                                                                    }}
                                                                                    isOpenCheck={
                                                                                        isOpenIndex == index1 &&
                                                                                        isOpenIndexName == 'parent'
                                                                                    }
                                                                                    dropDownContainerStyleNew={
                                                                                        styles.cDropDownContainerStyleNewFordropdowmNew
                                                                                    }
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
                                                                                        setOpenIndex(-1);
                                                                                        onCallSelection(item1, item);
                                                                                    }}
                                                                                />
                                                                            </View>
                                                                        ))}
                                                                    {item1 && item1.question_type == 4 && (
                                                                        <View style={styles.pT10}>
                                                                            <View
                                                                                style={{
                                                                                    height:
                                                                                        isOpenIndex == index1 &&
                                                                                        isOpenIndexName == 'parent'
                                                                                            ? 200
                                                                                            : undefined,
                                                                                }}
                                                                            >
                                                                                <CustomDropDownAnswerNew
                                                                                    itemsData={item1.answer_arr}
                                                                                    //     zIndex={1}
                                                                                    //defaultValue={I18n.t(globalText.bachDegree)}
                                                                                    labelKey={'question_answer_id'}
                                                                                    displayKey={'answer'}
                                                                                    onItemChoose={item => {
                                                                                        // setOpenIndexName('');
                                                                                        if (item.length > 0) {
                                                                                            onCallSelection(
                                                                                                item1,
                                                                                                item,
                                                                                            );
                                                                                        } else {
                                                                                            onCallSelection(item1, []);
                                                                                        }
                                                                                    }}
                                                                                    isArray={item1.answer_arr
                                                                                        .filter(it => it.selected)
                                                                                        .map(i => i.answer)}
                                                                                    multiple
                                                                                    isOpenCheck={
                                                                                        isOpenIndex == index1 &&
                                                                                        isOpenIndexName == 'parent'
                                                                                    }
                                                                                    onOpen={() => {
                                                                                        setOpenIndexName('parent');
                                                                                        setOpenIndex(index1);
                                                                                    }}
                                                                                    onClose={() => {
                                                                                        setOpenIndexName('');
                                                                                        setOpenIndex(-1);
                                                                                    }}
                                                                                    dropDownContainerStyleNew={
                                                                                        styles.cDropDownContainerStyleNewFordropdowmNew
                                                                                    }
                                                                                />
                                                                            </View>
                                                                        </View>
                                                                    )}
                                                                    {item1 && item1.question_type == 5 && (
                                                                        <View style={styles.pT10}>
                                                                            <CustomTextInput
                                                                                placeholder={I18n.t(
                                                                                    globalText._typeHereYourAnswer,
                                                                                )}
                                                                                // multiline
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
                                                                                    onCallSelection(
                                                                                        item1,
                                                                                        subQuestionWithanswer,
                                                                                    );
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
                                                                                    onCallSelection(
                                                                                        item1,
                                                                                        answerWithSubID,
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </View>
                                                                    )}
                                                                    {item1 &&
                                                                        item1.question_type == 8 &&
                                                                        item1.gird_sub_que_arr.map((item, index) => (
                                                                            <View key={index} style={styles.pT10}>
                                                                                <CustomTextInput
                                                                                    headerName={item.subquestion}
                                                                                    placeholder={I18n.t(
                                                                                        globalText._typeHereYourAnswer,
                                                                                    )}
                                                                                    // multiline
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
                                                </>
                                            );
                                        } else if (index1 == 0 && item1.child_question_id) {
                                            return (
                                                <>
                                                    <View style={[styles.paddT10, styles.pT10]}>
                                                        <CustomDynamicForm
                                                            key={index1}
                                                            noNeedBorder
                                                            question={item1.question}
                                                            extraStyle={styles.padBMinus50}
                                                            quesTextStyleExtra={styles.myFamilyQuetionTextStyle}
                                                            inSideValue={
                                                                <View>
                                                                    {item1 &&
                                                                        item1.question_type == 1 &&
                                                                        item1.child_ans_arr.map((item, index) => (
                                                                            <View key={index} style={styles.pT10}>
                                                                                <CustomRadioAndAns
                                                                                    checkValue={item.selected}
                                                                                    answer={item.answer}
                                                                                    onPressRadio={() => {
                                                                                        onCallSelectionChild(
                                                                                            item1,
                                                                                            item,
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </View>
                                                                        ))}
                                                                    {item1 && item1.question_type == 2 && (
                                                                        <View style={styles.pT10}>
                                                                            <View
                                                                                style={{
                                                                                    height:
                                                                                        isOpenIndex == index1 &&
                                                                                        isOpenIndexName == 'child'
                                                                                            ? 200
                                                                                            : undefined,
                                                                                }}
                                                                            >
                                                                                <CustomDropDownAnswerNew
                                                                                    itemsData={item1.child_ans_arr}
                                                                                    //zIndex={1}
                                                                                    // defaultValue={I18n.t(globalText.bachDegree)}
                                                                                    labelKey={'question_answer_id'}
                                                                                    displayKey={'answer'}
                                                                                    onItemChoose={item => {
                                                                                        // setOpenIndexName('');
                                                                                        setOpenIndex(-1);
                                                                                        onCallSelectionChild(
                                                                                            item1,
                                                                                            item,
                                                                                        );
                                                                                        // onCallSelection(item1, item);
                                                                                    }}
                                                                                    onOpen={() => {
                                                                                        setOpenIndexName('child');
                                                                                        setOpenIndex(index1);
                                                                                    }}
                                                                                    onClose={() => {
                                                                                        setOpenIndexName('');
                                                                                        setOpenIndex(-1);
                                                                                    }}
                                                                                    isOpenCheck={
                                                                                        isOpenIndex == index1 &&
                                                                                        isOpenIndexName == 'child'
                                                                                    }
                                                                                    dropDownContainerStyleNew={
                                                                                        styles.cDropDownContainerStyleNewFordropdowmNew
                                                                                    }
                                                                                />
                                                                            </View>
                                                                        </View>
                                                                    )}
                                                                    {item1 &&
                                                                        item1.question_type == 3 &&
                                                                        item1.child_ans_arr.map((item, index) => (
                                                                            <View key={index} style={styles.pT10}>
                                                                                <CustomCheckBoxAns
                                                                                    checkValue={item.selected}
                                                                                    answer={item.answer}
                                                                                    onPressCheckBox={() => {
                                                                                        setOpenIndex(-1);
                                                                                        onCallSelectionChild(
                                                                                            item1,
                                                                                            item,
                                                                                        );
                                                                                        // onCallSelection(item1, item);
                                                                                    }}
                                                                                />
                                                                            </View>
                                                                        ))}
                                                                    {item1 && item1.question_type == 4 && (
                                                                        <View style={styles.pT10}>
                                                                            <View
                                                                                style={{
                                                                                    height:
                                                                                        isOpenIndex == index1 &&
                                                                                        isOpenIndexName == 'child'
                                                                                            ? 200
                                                                                            : undefined,
                                                                                }}
                                                                            >
                                                                                <CustomDropDownAnswerNew
                                                                                    itemsData={item1.child_ans_arr}
                                                                                    //     zIndex={1}
                                                                                    //defaultValue={I18n.t(globalText.bachDegree)}
                                                                                    labelKey={'question_answer_id'}
                                                                                    displayKey={'answer'}
                                                                                    isArray={item1.child_ans_arr
                                                                                        .filter(it => it.selected)
                                                                                        .map(i => i.answer)}
                                                                                    onItemChoose={item => {
                                                                                        // setOpenIndexName('');
                                                                                        if (item.length > 0) {
                                                                                            onCallSelectionChild(
                                                                                                item1,
                                                                                                item,
                                                                                            );
                                                                                            // onCallSelection(item1, item);
                                                                                        } else {
                                                                                            onCallSelectionChild(
                                                                                                item1,
                                                                                                [],
                                                                                            );
                                                                                        }
                                                                                    }}
                                                                                    multiple
                                                                                    isOpenCheck={
                                                                                        isOpenIndex == index1 &&
                                                                                        isOpenIndexName == 'child'
                                                                                    }
                                                                                    onOpen={() => {
                                                                                        setOpenIndexName('child');
                                                                                        setOpenIndex(index1);
                                                                                    }}
                                                                                    onClose={() => {
                                                                                        setOpenIndexName('');
                                                                                        setOpenIndex(-1);
                                                                                    }}
                                                                                    dropDownContainerStyleNew={
                                                                                        styles.cDropDownContainerStyleNewFordropdowmNew
                                                                                    }
                                                                                />
                                                                            </View>
                                                                        </View>
                                                                    )}
                                                                    {item1 && item1.question_type == 5 && (
                                                                        <View style={styles.pT10}>
                                                                            <CustomTextInput
                                                                                placeholder={I18n.t(
                                                                                    globalText._typeHereYourAnswer,
                                                                                )}
                                                                                // multiline
                                                                                term={item1 && item1.answer}
                                                                                onChangeText={text => {
                                                                                    onCallSelectionChild(item1, text);
                                                                                }}
                                                                            />
                                                                        </View>
                                                                    )}
                                                                    {item1 && item1.question_type == 6 && (
                                                                        <View style={styles.pT10}>
                                                                            <CustomGridRadioAns
                                                                                ansData={item1.child_ans_arr}
                                                                                subQData={item1.child_grid_arr}
                                                                                onGridRadioSelected={subQuestionWithanswer => {
                                                                                    onCallSelectionChild(
                                                                                        item1,
                                                                                        subQuestionWithanswer,
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </View>
                                                                    )}
                                                                    {item1 && item1.question_type == 7 && (
                                                                        <View style={styles.pT10}>
                                                                            <CustomRadioCheckBoxMultiSelect
                                                                                ansData={item1.child_ans_arr}
                                                                                subQData={item1.child_grid_arr}
                                                                                onGridRadioSelected={answerWithSubID => {
                                                                                    onCallSelectionChild(
                                                                                        item1,
                                                                                        answerWithSubID,
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </View>
                                                                    )}
                                                                    {item1 &&
                                                                        item1.question_type == 8 &&
                                                                        item1.child_grid_arr.map((item, index) => (
                                                                            <View key={index} style={styles.pT10}>
                                                                                <CustomTextInput
                                                                                    headerName={item.subquestion}
                                                                                    placeholder={I18n.t(
                                                                                        globalText._typeHereYourAnswer,
                                                                                    )}
                                                                                    // multiline
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
                                                </>
                                            );
                                        }
                                    })}
                            </View>
                        </View>
                    </ScrollView>
                    <View style={[styles.marT20, styles.marB13, styles.alignSelfCenter]}>
                        <TouchableOpacity
                            style={styles.demoSureyAuthButton}
                            onPress={() => {
                                onCallUpdate();
                            }}
                        >
                            <Text style={styles.demoSureyAuthButtonName}>{I18n.t(globalText.next)}</Text>
                            <FontAwesome name={'chevron-right'} size={13} color={colors.WHITE} style={styles.marL5} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </>
    );
};

export default CustomQuestionAnswerSample;
