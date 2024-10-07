/* eslint-disable no-self-assign */
/* eslint-disable no-unreachable */
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
//CustomQuestionAnswerForm

import React, {useEffect, useState} from 'react';
import CustomRadioButton from '../customRadio/index';

import {
  ScrollView,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import CustomButton from '../customButton';
import CustomDynamicForm from '../customDynamicForm/index';
import CustomRadioAndAns from '../CustomRadioAndAns/index';
import CustomCheckBoxAns from '../CustomCheckBoxAns/index';
import CustomDropDownAnswer from '../CustomDropwDownAnswer/index';
import styles from '../../helper/globalStyles';
import {globalText} from '../../helper/globalText';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import CustomLoader from '../customLoader/index';
import {useFocusEffect} from '@react-navigation/native';
import CustomTextInput from '../customTextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomGridRadioAns from '../customGridRadioAns/index';
import CustomRadioCheckBoxMultiSelect from '../customRadioCheckBoxMultiSelect/index';
import I18n from '../../i18n/index';
import {
  toastShow,
  getAsyncStorage,
  setAsyncStorage,
} from '../../utils/customFunctions';
import CustomCheckBox from '../../component/customCheckBox/index';
import FastImage from '../FastImage';
import GlobalImages from '../../helper/globalImages';
const CustomQuestionAnswerForm = props => {
  const {onSaveAnswer, sub_category_type_id, onChnageTab, onSaveUserData} =
    props;
  const [loader, setLoader] = useState(false);
  const [isOpenIndex, setOpenIndex] = useState(-1);
  const [isOpenIndexName, setOpenIndexName] = useState('');
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [isSeeMore, setSeeMore] = useState(true);
  const [ischeckFirst, setcheckFirst] = useState(false);
  const [isOldDataId, setOldDataId] = useState([]);
  const [paginationData, setPaginationData] = useState({
    currentPage: 0,
    pageLimit: 10,
    skip: 0,
    totalCount: 0,
    totalPages: 0,
  });
  const [questionsData, setQuestionsData] = useState([]);

  const [isSelectedChildId, setSelectedChildId] = useState(null);
  const [withDrawConsent, setWithDraw] = useState(false);
  const [isQuestionConsent, setQuestionConsent] = useState(false);

  const [isYes, setYes] = useState(false);
  const [isNo, setNo] = useState(false);

  const [childQuestionConsent, setChildQuestionConsent] = useState('');

  const [data, setData] = useState();

  const [cbildIndex, setIndex] = useState(null);

  const [parentIndex, setParentIndex] = useState(null);

  const [catData, setCategoryData] = useState(null);

  const [isReset, setReset] = useState(false);
  const onRequestClose = () => {
    setQuestionConsent(false);
    setWithDraw(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      setLoader(true);
      setQuestionsData([]);
      // setDataLoaded(true);
      onPageInit();
      return () => {
        cleanUp();
      };
    }, [sub_category_type_id]),
  );

  const cleanUp = () => {
    setQuestionsData([]);
    setOldDataId([]);
    setLoader(false);
    setDataLoaded(false);
    setCategoryData(null);
  };

  const checkQuestionConsent = item => {
    if (item.hasOwnProperty('isCheckbox')) {
      if (item.categoryConsent) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  const onPageInit = async () => {
    setReset(true);
    // setLoader(true);
    // setQuestionsData([]);
    // setDataLoaded(false);
    paginationData.currentPage = 0;
    paginationData.pageLimit = 0;
    paginationData.skip = 0;
    paginationData.totalCount = 0;
    paginationData.totalPages = 0;
    setPaginationData({
      ...paginationData,
    });
    await onQuestionData(0);
  };

  const onQuestionData = async currentPage => {
    // let page = currentPage ? currentPage : paginationData.currentPage;
    // let limit = 10;
    const taskContent = [];
    // setLoader(true);

    if (isReset) {
      // setQuestionsData([]);
    }

    const enPoint = `${
      Api.myFamilyGetQuestionListing
    }?skip=${0}&limit=${1000}&sub_category_type_id=${sub_category_type_id}&none_of_the_above=${0}`;

    // const enPoint = `${
    //     Api.myFamilyGetQuestionListing
    // }?skip=${0}&limit=${1000}&sub_category_type_id=${2}&none_of_the_above=${0}`;
    const {data, message} = await AuthApi.getDataFromServer(enPoint);
    if (!data) {
      setLoader(false);
      setDataLoaded(true);
      setQuestionsData([]);
      toastShow(message);
      return;
    }
    const isData = data && data.data && data.data.data ? data.data.data : [];
    setQuestionsData([...isData, taskContent]);
    //setLoader(false);
    if (isData.length > 0) {
      await onCheckPreselectedData(isData, taskContent);
    } else {
      setLoader(false);
      setDataLoaded(true);
    }
    // setPaginationData({
    //     currentPage: page + 1,
    //     totalPages: Math.ceil(data.data.count / limit),
    //     pageLimit: 10,
    //     totalCount: data.data.count,
    //     skip: Math.ceil(paginationData.skip + 10),
    // });
    // if (paginationData.currentPage + 1 == Math.ceil(data.data.count / 10)) {
    //     setSeeMore(false);
    // }
  };

  const saveQuestionConsent = async questionData => {
    // alert(JSON.stringify(questionData));
    setLoader(true);
    const payload = {
      items: [
        {
          question_id: questionData?.question_id
            ? questionData?.question_id
            : questionData?.child_question_id,
          questionsConsent: questionData?.categoryConsent,
        },
      ],
    };

    await AuthApi.postDataToServer(Api.saveQuestionConsent, payload);
    setReset(false);

    // onPageInit();
    // setLoader(true);

    setTimeout(() => {
      onQuestionData(0);
    }, 300);
  };
  const onCheckPreselectedData = async (isData, taskContent) => {
    setLoader(true);
    let isPreSelectedId = [];
    let isPreSelectedChildId = [];
    let count = 0;
    (await isData) &&
      isData.length > 0 &&
      isData.map(async (item, index) => {
        isPreSelectedId.push(item.question_id);
        (await item.child_que_arr) &&
          item.child_que_arr.length > 0 &&
          item.child_que_arr.map((i, j) => {
            isPreSelectedChildId.push(i.child_question_id);
          });

        if (count == isData.length - 1) {
          let isIds = await isPreSelectedId.concat(isPreSelectedChildId);
          await onCallPreSelected(isData, isIds, taskContent);
          setLoader(false);
        }
        count = index + 1;
      });
  };

  const onCallPreSelected = async (isData, isIds, taskContent) => {
    setLoader(true);
    let count = 0;
    let getAllIds = isIds.join();
    let isValueData = await isData;
    const enPoint = `${
      Api.myFamilyGetSelectedAnswer
    }?&skip=${0}&limit=${10000}&question_id=${getAllIds}`;
    const {data, message} = await AuthApi.getDataFromServer(enPoint);
    if (!data) {
      setLoader(false);
      setQuestionsData([...taskContent, ...isValueData]);
      toastShow(message);
      return;
    }
    let preSelectedData = [];
    let isDataCheck = data && data.data && data.data.data ? data.data.data : [];
    if (isDataCheck.length > 0) {
      await isDataCheck.map(async (item1, index1) => {
        preSelectedData.push(item1.question_id);
        let selectedData = [];
        await isValueData.map(async (item, index) => {
          if (item.question_id == item1.question_id) {
            switch (item.question_type) {
              case '1':
                await item.answer_arr.map(i => {
                  if (i.question_answer_id == item1.answer) {
                    i.selected = true;
                    selectedData.push(i.question_answer_id);
                  } else {
                    i.selected = false;
                  }
                });
                item.selectedData = selectedData;
                // onRemoveSelected(item, selectedData);
                break;
              case '2':
                await item.answer_arr.map(i => {
                  if (i.question_answer_id == item1.answer) {
                    i.selected = true;
                    selectedData.push(i.question_answer_id);
                  } else {
                    i.selected = false;
                  }
                });
                item.selectedData = selectedData;
                break;
              case '3':
                await item.answer_arr.map(i => {
                  if (
                    item1.answer
                      .split(',')
                      .includes(i.question_answer_id.toString())
                  ) {
                    i.selected = true;
                    // selectedData.push(i.question_answer_id);
                  }
                });
                item.selectedData = item1.answer.split(',');
                break;
              case '4':
                await item.answer_arr.map(i => {
                  if (
                    item1.answer
                      .split(',')
                      .includes(i.question_answer_id.toString())
                  ) {
                    i.selected = true;
                    // selectedData.push(i.question_answer_id);
                  }
                });
                item.selectedData = item1.answer.split(',');
                break;
              case '5':
                item.answer = item1.answer;
                item.question_answer_id = item1.answer;
                break;
              case '6':
                item.gird_sub_que_arr.map(i => {
                  if (i.grid_subquestion_id == item1.grid_subquestion_id) {
                    i.ansId = item1.answer;
                    // i.answer = item1.answer;
                    i.question_answer_id = item1.answer;
                    selectedData.push(item1.answer);
                  }
                });
                if (selectedData && selectedData.length > 0) {
                  item.selectedData = selectedData;
                  item.selectedData = [...new Set(item.selectedData)];
                }
                break;
              case '7':
                return item.answer_arr.map(i => {
                  let value = {};
                  let sel = [];
                  if (
                    item1.answer
                      .split(',')
                      .includes(i.question_answer_id.toString())
                  ) {
                    selectedData = item1.answer.split(',');
                    i[item1.grid_subquestion_id] = item1.grid_subquestion_id;
                    value = {
                      ansId: i.question_answer_id,
                      grid_subquestion_id: item1.grid_subquestion_id,
                      question_id: item.question_id,
                    };
                    sel = i && i.selectedObj ? i.selectedObj : [];
                    if (sel && sel.length > 0) {
                      sel.push(value);
                      i.selectedObj = sel;
                    } else {
                      sel.push(value);
                      i.selectedObj = sel;
                    }
                  }
                  if (selectedData && selectedData.length > 0) {
                    if (item.selectedData && item.selectedData.length > 0) {
                      let arrNew = item.selectedData.concat(selectedData);
                      item.selectedData = arrNew;
                    } else {
                      item.selectedData = selectedData;
                    }

                    item.selectedData = [...new Set(item.selectedData)];
                  }
                });
              case '8':
                await item.gird_sub_que_arr.map(i => {
                  if (i.grid_subquestion_id == item1.grid_subquestion_id) {
                    i.answer = item1.answer;
                    item;
                    i.question_answer_id = item1.answer;
                  }
                });
                break;
            }
          }
          (await item.child_que_arr) &&
            item.child_que_arr.length > 0 &&
            item.child_que_arr.map(async (childItem, childIndex) => {
              if (childItem.child_question_id == item1.question_id) {
                switch (childItem.question_type) {
                  case '1':
                    await childItem.child_ans_arr.map(i => {
                      if (i.question_answer_id == item1.answer) {
                        i.selected = true;
                      } else {
                        i.selected = false;
                      }
                    });
                    break;
                  case '2':
                    await childItem.child_ans_arr.map(i => {
                      if (i.question_answer_id == item1.answer) {
                        i.selected = true;
                      } else {
                        i.selected = false;
                      }
                    });
                    break;
                  case '3':
                    await childItem.child_ans_arr.map(i => {
                      if (
                        item1.answer
                          .split(',')
                          .includes(i.question_answer_id.toString())
                      ) {
                        // if (i.question_answer_id == item1.answer) {
                        i.selected = true;
                      }
                    });
                    break;
                  case '4':
                    await childItem.child_ans_arr.map(i => {
                      if (
                        item1.answer
                          .split(',')
                          .includes(i.question_answer_id.toString())
                      ) {
                        // if (i.question_answer_id == item1.answer) {
                        i.selected = true;
                      }
                    });
                    break;
                  case '5':
                    childItem.answer = item1.answer;
                    childItem.question_answer_id = item1.answer;
                    break;
                  case '6':
                    childItem.child_grid_arr.map(i => {
                      if (i.grid_subquestion_id == item1.grid_subquestion_id) {
                        i.ansId = item1.answer;
                        // i.answer = item1.answer;
                        i.question_answer_id = item1.answer;
                      }
                    });
                    break;
                  case '7':
                    return childItem.child_ans_arr.map(i => {
                      let value = {};
                      let sel = [];
                      if (
                        item1.answer
                          .split(',')
                          .includes(i.question_answer_id.toString())
                      ) {
                        // if (i.question_answer_id == item1.answer) {
                        i[item1.grid_subquestion_id] =
                          item1.grid_subquestion_id;
                        value = {
                          ansId: i.question_answer_id,
                          grid_subquestion_id: item1.grid_subquestion_id,
                          question_id: childItem.child_question_id,
                        };
                        // let allValue = i && i.selectedObj && i.selectedObj;
                        sel = i && i.selectedObj ? i.selectedObj : [];
                        if (sel && sel.length > 0) {
                          sel.push(value);
                          i.selectedObj = sel;
                        } else {
                          sel.push(value);
                          i.selectedObj = sel;
                        }
                        // if (allValue) {
                        //     sel.push(value);
                        //     i.selectedObj = sel;
                        // } else {
                        //     sel.push(value);
                        //     i.selectedObj = sel;
                        // }
                      }
                    });
                  case '8':
                    await childItem.gird_sub_que_arr.map(i => {
                      if (i.grid_subquestion_id == item1.grid_subquestion_id) {
                        i.answer = item1.answer;
                        i.question_answer_id = item1.answer;
                      }
                    });
                    break;
                }
              }
            });
          count = index + 1;
          if (count == isValueData.length) {
            setOldDataId([...preSelectedData]);
            setQuestionsData([...taskContent, ...isValueData]);
            setLoader(false);
            setDataLoaded(true);
          }
        });
      });
      if (count == isValueData.length) {
        setQuestionsData([...taskContent, ...isValueData]);
        setLoader(false);
        setOldDataId([...preSelectedData]);
        setDataLoaded(true);
      }
    } else {
      setLoader(false);
      setDataLoaded(true);
      setOldDataId([]);
      setQuestionsData([...taskContent, ...isValueData]);
      // setQuestionsData([...isValueData]);
    }
    // setLoader(false);
    // setDataLoaded(true);
    // setOldDataId([...isOldDataId]);
  };

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
            sub_category_type_id == '7' &&
              onCheckUserTabData(selectedData, item1);
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
                  if (ansData.question_answer_id == item.question_answer_id) {
                    selectedData = [];
                    selectedData.push(item.question_answer_id);
                    item.selected = !item.selected;
                  } else {
                    item.selected = false;
                  }
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
    if (sub_category_type_id == '7') {
      onDummySaveData();
    }
  };

  const onDummySaveData = async () => {
    let data1 = await onCallUpdateParent();
    let data2 = await onCallUpdateChild();
    let isAllSelctedData = data1.concat(data2);
    let uniqueChars = [...new Set(isOldDataId)];
    await onSaveUserData(isAllSelctedData, uniqueChars);
    // setLoader(false);
  };

  const onCheckUserTabData = async (selectedId, isAllData) => {
    let isChildValue =
      isAllData &&
      isAllData.child_que_arr &&
      isAllData.child_que_arr.length > 0 &&
      isAllData.child_que_arr[0].parent_question_answer_id.split(',');
    if (isChildValue && isChildValue.length > 0) {
      let isValue = isChildValue.indexOf(selectedId.toString()) !== -1;
      if (isValue) {
        await onChnageTab('show');
      } else {
        await onChnageTab('unShow');
      }
    }
  };

  const onCallSelectionChild = (quesValue, childQuestion, selectedItem) => {
    questionsData.map((item1, index1) => {
      if (item1.question_id == quesValue.question_id) {
        item1.child_que_arr &&
          item1.child_que_arr.length > 0 &&
          item1.child_que_arr.map((item, index) => {
            if (childQuestion.child_question_id == item.child_question_id) {
              switch (item.question_type) {
                case '1':
                  item.child_ans_arr &&
                    item.child_ans_arr.length > 0 &&
                    item.child_ans_arr.map((i, j) => {
                      if (
                        i.question_answer_id == selectedItem.question_answer_id
                      ) {
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
                      if (
                        i.question_answer_id == selectedItem.question_answer_id
                      ) {
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
                        if (
                          i.question_answer_id ==
                          selectedItem.question_answer_id
                        ) {
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
                          if (
                            selectedItem[selectedItem.length - 1].key != 'N'
                          ) {
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
                  item1.child_ans_arr = selectedItem;
                  setQuestionsData([...questionsData]);
                  break;
              }
            }
          });
      }
    });
    setQuestionsData([...questionsData]);
    if (sub_category_type_id == '7') {
      onDummySaveData();
    }
  };

  const onCallUpdate = async () => {
    const data1 = await onCallUpdateParent();
    const data2 = await onCallUpdateChild();
    if (!data1) {
      setLoader(false);
      return;
    }
    setLoader(true);
    let isAllSelctedData = data1.concat(data2);
    let uniqueChars = [...new Set(isOldDataId)];
    await onSaveAnswer(isAllSelctedData, uniqueChars);
    // setLoader(false);
  };

  const onCallUpdateParent = async () => {
    let count = 0;
    let countForcheck = 0;
    let allData = [];
    await questionsData.map((item1, index1) => {
      let mergeAnserIds = [];
      switch (item1.question_type) {
        case '1':
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
                allData.push({...value});
              }
            });
          break;
        case '2':
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
                allData.push({...value});
              }
            });
          break;

        case '3':
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
            allData.push({...value});
          }
          break;

        case '4':
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
            allData.push({...value});
          }
          break;

        case '5':
          if (item1.answer && item1.answer.length > 0) {
            countForcheck = countForcheck + 1;
            let value = {
              question_type: item1.question_type,
              question_id: item1.question_id,
              // answer: item1.answer,
              grid_subquestion_id: -1,
              question_answer_id: item1.answer,
            };
            allData.push({...value});
          }
          break;

        case '6':
          item1.gird_sub_que_arr &&
            item1.gird_sub_que_arr.length > 0 &&
            item1.gird_sub_que_arr.map((item, index) => {
              if (item.ansId) {
                countForcheck = countForcheck + 1;
                let value = {
                  question_type: item1.question_type,
                  question_id: item1.question_id,
                  // answer: item.answer,
                  grid_subquestion_id: item.grid_subquestion_id,
                  question_answer_id: item.ansId,
                };
                allData.push({...value});
              }
            });
          break;
        case '7':
          let isGriData = [];
          item1.answer_arr &&
            item1.answer_arr.length > 0 &&
            item1.answer_arr.map((item, index) => {
              if (item.selectedObj && item.selectedObj.length > 0) {
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
                    isGriData.push({...value});
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
                allData.push({...value});
              });
          }
          break;
        case '8':
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
              allData.push({...value});
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

  const onCallUpdateChild = async () => {
    let count = 0;
    let countForcheck = 0;
    let allData = [];
    await questionsData.map(async (item1, index1) => {
      let mergeAnserIds = [];
      if (item1.child_que_arr && item1.child_que_arr.length > 0) {
        await item1.child_que_arr.map(async (childItem, childIndex) => {
          switch (childItem.question_type) {
            case '1':
              (await childItem.child_ans_arr) &&
                childItem.child_ans_arr.length > 0 &&
                childItem.child_ans_arr.map((item, index) => {
                  if (item.selected) {
                    countForcheck = countForcheck + 1;
                    let value = {
                      question_type: childItem.question_type,
                      question_id: childItem.child_question_id,
                      question_answer_id: item.question_answer_id,
                      // answer: item.answer,
                      grid_subquestion_id: -1,
                    };
                    allData.push({...value});
                  }
                });
              break;
            case '2':
              (await childItem.child_ans_arr) &&
                childItem.child_ans_arr.length > 0 &&
                childItem.child_ans_arr.map((item, index) => {
                  if (item.selected) {
                    countForcheck = countForcheck + 1;
                    let value = {
                      question_type: childItem.question_type,
                      question_id: childItem.child_question_id,
                      // answer: item.answer,
                      question_answer_id: item.question_answer_id,
                      grid_subquestion_id: -1,
                    };
                    allData.push({...value});
                  }
                });
              break;

            case '3':
              (await childItem.child_ans_arr) &&
                childItem.child_ans_arr.length > 0 &&
                childItem.child_ans_arr.map((item, index) => {
                  if (item.selected) {
                    countForcheck = countForcheck + 1;
                    mergeAnserIds.push(item.question_answer_id);
                  }
                });
              if (mergeAnserIds && mergeAnserIds.length > 0) {
                let value = {
                  question_type: childItem.question_type,
                  question_id: childItem.child_question_id,
                  question_answer_id: mergeAnserIds.toString(),
                  //  answer: item.answer,
                  grid_subquestion_id: -1,
                };
                allData.push({...value});
              }
              break;

            case '4':
              (await childItem.child_ans_arr) &&
                childItem.child_ans_arr.length > 0 &&
                childItem.child_ans_arr.map((item, index) => {
                  if (item.selected) {
                    countForcheck = countForcheck + 1;
                    mergeAnserIds.push(item.question_answer_id);
                    // let value = {
                    //     question_type: childItem.question_type,
                    //     question_id: childItem.child_question_id,
                    //     answer: item.answer,
                    //     question_answer_id: item.question_answer_id,
                    //     grid_subquestion_id: -1,
                    // };
                    // allData.push({ ...value });
                  }
                });
              if (mergeAnserIds && mergeAnserIds.length > 0) {
                let value = {
                  question_type: childItem.question_type,
                  question_id: childItem.child_question_id,
                  question_answer_id: mergeAnserIds.toString(),
                  //  answer: item.answer,
                  grid_subquestion_id: -1,
                };
                allData.push({...value});
              }
              break;

            case '5':
              if (childItem.answer && childItem.answer.length > 0) {
                countForcheck = countForcheck + 1;
                let value = {
                  question_type: childItem.question_type,
                  question_id: childItem.child_question_id,
                  // answer: childItem.answer,
                  grid_subquestion_id: -1,
                  question_answer_id: childItem.answer,
                };
                allData.push({...value});
              }
              break;

            case '6':
              (await childItem.child_grid_arr) &&
                childItem.child_grid_arr.length > 0 &&
                childItem.child_grid_arr.map((item, index) => {
                  if (item.ansId) {
                    countForcheck = countForcheck + 1;
                    let value = {
                      question_type: childItem.question_type,
                      question_id: childItem.child_question_id,
                      // answer: item.answer,
                      grid_subquestion_id: item.grid_subquestion_id,
                      question_answer_id: item.ansId,
                    };
                    allData.push({...value});
                  }
                });
              break;
            case '7':
              let isGriData = [];
              (await childItem.child_ans_arr) &&
                childItem.child_ans_arr.length > 0 &&
                childItem.child_ans_arr.map((item, index) => {
                  if (item.selectedObj.length > 0) {
                    item.selectedObj.map((i, j) => {
                      if (item.question_answer_id == i.ansId) {
                        countForcheck = countForcheck + 1;
                        let value = {
                          question_type: childItem.question_type,
                          question_id: childItem.child_question_id,
                          // answer: item.answer,
                          grid_subquestion_id: i.grid_subquestion_id,
                          question_answer_id: item.question_answer_id,
                        };
                        isGriData.push({...value});
                      }
                    });
                  }
                });
              if (isGriData && isGriData.length > 0) {
                childItem.child_grid_arr &&
                  childItem.child_grid_arr.length > 0 &&
                  childItem.child_grid_arr.map((item, index) => {
                    let isGriddataIds = [];
                    isGriData.map((i, j) => {
                      if (item.grid_subquestion_id == i.grid_subquestion_id) {
                        isGriddataIds.push(i.question_answer_id);
                      }
                    });
                    if (isGriddataIds && isGriddataIds.length > 0) {
                      let value = {
                        question_type: childItem.question_type,
                        question_id: childItem.child_question_id,
                        // answer: item.answer,
                        grid_subquestion_id: item.grid_subquestion_id,
                        question_answer_id: isGriddataIds.toString(),
                      };
                      allData.push({...value});
                    }
                  });
              }
              break;
            case '8':
              await childItem.child_grid_arr.map((item, index) => {
                if (item.answer && item.answer.length > 0) {
                  countForcheck = countForcheck + 1;
                  let value = {
                    question_type: childItem.question_type,
                    question_id: childItem.child_question_id,
                    // answer: item.answer,
                    grid_subquestion_id: item.grid_subquestion_id,
                    question_answer_id: item.answer,
                  };
                  allData.push({...value});
                }
              });
              break;

            default:
              break;
          }
        });
      }
    });
    return allData;
  };

  // const RenderChildDataTypeWise = ({ item1, item, index }) => {
  //     let cnt = 0;
  //     return (
  //         <>
  //             <View style={styles.paddT10}>
  //                 <CustomDynamicForm
  //                     key={index}
  //                     noNeedBorder
  //                     question={item.question}
  //                     extraStyle={styles.padBMinus50}
  //                     quesTextStyleExtra={styles.myFamilyQuetionTextStyle}
  //                     // additionalStyle={styles.padBMinus50}
  //                     inSideValue={
  //                         <View>
  //                             {item &&
  //                                 item.question_type == 1 &&
  //                                 item.child_ans_arr.map((i, j) => (
  //                                     <View key={j} style={styles.pT10}>
  //                                         <CustomRadioAndAns
  //                                             checkValue={i.selected}
  //                                             answer={i.answer}
  //                                             onPressRadio={() => {
  //                                                 onCallSelectionChild(item1, item, i);
  //                                             }}
  //                                         />
  //                                     </View>
  //                                 ))}
  //                             {item && item.question_type == 2 && (
  //                                 <View style={styles.pT10}>
  //                                     <View
  //                                         style={{
  //                                             height:
  //                                                 isOpenIndex == index && isOpenIndexName == 'child'
  //                                                     ? 200
  //                                                     : undefined,
  //                                         }}
  //                                     >
  //                                         <CustomDropDownAnswer
  //                                             itemsData={item.child_ans_arr}
  //                                             //zIndex={1}
  //                                             // defaultValue={I18n.t(globalText.bachDegree)}
  //                                             labelKey={'question_answer_id'}
  //                                             displayKey={'answer'}
  //                                             onItemChoose={i => {
  //                                                 setOpenIndexName('');
  //                                                 setOpenIndex(-1);
  //                                                 onCallSelectionChild(item1, item, i);
  //                                                 // onCallSelection(item1, item);
  //                                             }}
  //                                             onOpen={() => {
  //                                                 setOpenIndexName('child');
  //                                                 setOpenIndex(index);
  //                                             }}
  //                                             onClose={() => {
  //                                                 setOpenIndexName('');
  //                                                 setOpenIndex(-1);
  //                                             }}
  //                                             isOpenCheck={isOpenIndex == index && isOpenIndexName == 'child'}
  //                                         />
  //                                     </View>
  //                                 </View>
  //                             )}
  //                             {item &&
  //                                 item.question_type == 3 &&
  //                                 item.child_ans_arr.map((i, j) => (
  //                                     <View key={j} style={styles.pT10}>
  //                                         <CustomCheckBoxAns
  //                                             checkValue={i.selected}
  //                                             answer={i.answer}
  //                                             onPressCheckBox={() => {
  //                                                 setOpenIndex(-1);
  //                                                 onCallSelectionChild(item1, item, i);
  //                                                 // onCallSelection(item1, item);
  //                                             }}
  //                                         />
  //                                     </View>
  //                                 ))}
  //                             {item && item.question_type == 4 && (
  //                                 <View style={styles.pT10}>
  //                                     <View
  //                                         style={{
  //                                             height:
  //                                                 isOpenIndex == index && isOpenIndexName == 'child'
  //                                                     ? 200
  //                                                     : undefined,
  //                                         }}
  //                                     >
  //                                         <CustomDropDownAnswer
  //                                             itemsData={item.child_ans_arr}
  //                                             //     zIndex={1}
  //                                             //defaultValue={I18n.t(globalText.bachDegree)}
  //                                             labelKey={'question_answer_id'}
  //                                             displayKey={'answer'}
  //                                             onItemChoose={i => {
  //                                                 // setOpenIndexName('');
  //                                                 if (i.length > 0) {
  //                                                     onCallSelectionChild(item1, item, i);
  //                                                     onCallSelection(item, i);
  //                                                 } else {
  //                                                     onCallSelectionChild(item1, item, []);
  //                                                 }
  //                                             }}
  //                                             multiple
  //                                             isOpenCheck={isOpenIndex == index && isOpenIndexName == 'child'}
  //                                             onOpen={() => {
  //                                                 setOpenIndexName('child');
  //                                                 setOpenIndex(index);
  //                                             }}
  //                                             onClose={() => {
  //                                                 setOpenIndexName('');
  //                                                 setOpenIndex(-1);
  //                                             }}
  //                                         />
  //                                     </View>
  //                                 </View>
  //                             )}
  //                             {item && item.question_type == 5 && (
  //                                 <View style={styles.pT10}>
  //                                     <CustomTextInput
  //                                         placeholder={I18n.t(globalText._typeHereYourAnswer)}
  //                                         // multiline
  //                                         term={item && item.answer}
  //                                         onChangeText={text => {
  //                                             onCallSelectionChild(item1, item, text);
  //                                         }}
  //                                     />
  //                                 </View>
  //                             )}
  //                             {item && item.question_type == 6 && (
  //                                 <View style={styles.pT10}>
  //                                     <CustomGridRadioAns
  //                                         ansData={item.child_ans_arr}
  //                                         subQData={item.child_grid_arr}
  //                                         onGridRadioSelected={subQuestionWithanswer => {
  //                                             onCallSelectionChild(item1, item, subQuestionWithanswer);
  //                                         }}
  //                                     />
  //                                 </View>
  //                             )}
  //                             {item && item.question_type == 7 && (
  //                                 <View style={styles.pT10}>
  //                                     <CustomRadioCheckBoxMultiSelect
  //                                         ansData={item.child_ans_arr}
  //                                         subQData={item.child_grid_arr}
  //                                         onGridRadioSelected={answerWithSubID => {
  //                                             onCallSelectionChild(item1, item, answerWithSubID);
  //                                         }}
  //                                     />
  //                                 </View>
  //                             )}
  //                             {item &&
  //                                 item.question_type == 8 &&
  //                                 item.child_grid_arr.map((i, j) => (
  //                                     <View key={j} style={styles.pT10}>
  //                                         <CustomTextInput
  //                                             headerName={i.subquestion}
  //                                             placeholder={I18n.t(globalText._typeHereYourAnswer)}
  //                                             // multiline
  //                                             term={i && i.answer}
  //                                             onChangeText={text => {
  //                                                 i.answer = text;
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

  return (
    <>
      {loader && <CustomLoader isVisible={loader} />}
      <View style={[styles.whiteTextBack, styles.container]}>
        <KeyboardAwareScrollView
          extraScrollHeight={140}
          nestedScrollEnabled
          enableOnAndroid={false}
          enableAutomaticScroll={Platform.OS === 'ios'}
          contentContainerStyle={styles.flexGrowOne}>
          <ScrollView nestedScrollEnabled style={styles.padd15}>
            <View style={[styles.container, styles.paddB250]}>
              <View>
                {/* {questionsData && questionsData.length > 0 && (
                                <FormRenderer
                                    formSchema={questionsData}
                                    onParentPress={(item, index, type) => {
                                        let allVal = SampleData;
                                        allVal[index].selectedAnsId = item.question_answer_id;
                                        if (type && type == 'single') {
                                            allVal[index].answer_arr &&
                                                allVal[index].answer_arr.map((childItem, childInd) => {
                                                    if (item.question_answer_id == childItem.question_answer_id) {
                                                        allVal[index].answer_arr[childInd].selected = true;
                                                    } else {
                                                        allVal[index].answer_arr[childInd].selected = false;
                                                    }
                                                });
                                            setQuestionsData(allVal);
                                            setUpdate(!update);
                                        }
                                        if (type && type == 'multi') {
                                            allVal[index].answer_arr &&
                                                allVal[index].answer_arr.map((childItem, childInd) => {
                                                    if (item.question_answer_id == childItem.question_answer_id) {
                                                        allVal[index].answer_arr[childInd].selected =
                                                            !allVal[index].answer_arr[childInd].selected;
                                                    }
                                                });
                                            setQuestionsData(allVal);
                                            setUpdate(!update);
                                        }
                                        // allVal[index].selected = item.question_answer_id;
                                    }}
                                />
                            )} */}
                {isDataLoaded &&
                  questionsData &&
                  questionsData.length > 0 &&
                  questionsData.map((item1, index1) => {
                    let cnt = 0;
                    return (
                      <View>
                        <CustomDynamicForm
                          key={index1}
                          noNeedBorder
                          question={item1.question}
                          quesTextStyleExtra={styles.myFamilyQuetionTextStyle}
                          inSideValue={
                            <View
                              pointerEvents={
                                checkQuestionConsent(item1) ? 'auto' : 'none'
                              }
                              style={
                                checkQuestionConsent(item1)
                                  ? {opacity: 1}
                                  : {opacity: 0.6}
                              }>
                              {item1 &&
                                item1.question_type == 1 &&
                                item1.answer_arr.map((item, index) => (
                                  <>
                                    <View key={index} style={styles.pT10}>
                                      <CustomRadioAndAns
                                        checkValue={item.selected}
                                        answer={item.answer}
                                        onPressRadio={() => {
                                          onCallSelection(item1, item);
                                        }}
                                      />
                                    </View>
                                  </>
                                ))}

                              {item1 && item1.question_type == 2 && (
                                <View style={styles.pT10}>
                                  <View
                                    style={{
                                      height:
                                        isOpenIndex == index1 &&
                                        isOpenIndexName == 'parent'
                                          ? 200
                                          : undefined,
                                    }}>
                                    <CustomDropDownAnswer
                                      itemsData={item1.answer_arr}
                                      //zIndex={1}
                                      // defaultValue={I18n.t(globalText.bachDegree)}
                                      labelKey={'question_answer_id'}
                                      displayKey={'answer'}
                                      onItemChoose={item => {
                                        // setOpenIndexName('');
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
                                    }}>
                                    <CustomDropDownAnswer
                                      itemsData={item1.answer_arr}
                                      //     zIndex={1}
                                      // defaultValue={I18n.t(globalText.bachDegree)}
                                      labelKey={'question_answer_id'}
                                      displayKey={'answer'}
                                      onItemChoose={item => {
                                        // setOpenIndexName('');
                                        if (item.length > 0) {
                                          onCallSelection(item1, item);
                                        } else {
                                          onCallSelection(item1, []);
                                        }
                                      }}
                                      multiple
                                      isArray={item1.answer_arr
                                        .filter(it => it.selected)
                                        .map(i => i.answer)}
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

                              {(item1.question_type == 1 ||
                                item1.question_type == 2 ||
                                item1.question_type == 3 ||
                                item1.question_type == 4 ||
                                item1.question_type == 6 ||
                                item1.question_type == 7) &&
                                item1.selectedData &&
                                item1.selectedData.length > 0 &&
                                item1.child_que_arr &&
                                item1.child_que_arr.length > 0 &&
                                item1.child_que_arr.map((item, index) => {
                                  let checkData =
                                    item.parent_question_answer_id.split(',');
                                  item.selectedChild = false;
                                  item1.selectedData.map((i, j) => {
                                    if (
                                      checkData.indexOf(i.toString()) !== -1
                                    ) {
                                      item.selectedChild = true;
                                      cnt = cnt + 1;
                                    }
                                  });

                                  if (cnt >= 1 && item.selectedChild) {
                                    return (
                                      <View
                                        key={index}
                                        style={
                                          index == 0 ? {marginTop: 15} : {}
                                        }>
                                        <View style={styles.paddT10}>
                                          {item?.questionContent && (
                                            <View
                                              style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginLeft: -24,
                                                marginBottom: 5,
                                              }}>
                                              <Text
                                                style={{
                                                  fontSize: 11,
                                                  width: '80%',
                                                }}
                                                numberOfLines={1}>
                                                {item?.questionContent}
                                              </Text>
                                              <Text
                                                style={{
                                                  textDecorationLine:
                                                    'underline',
                                                  padding: 2,
                                                  fontSize: 11,
                                                }}
                                                onPress={() => {
                                                  setChildQuestionConsent(
                                                    item?.questionContent,
                                                  );

                                                  setQuestionConsent(true);
                                                  // setConsent(true);
                                                }}>
                                                {I18n.t(globalText.more)}
                                              </Text>
                                            </View>
                                          )}

                                          <CustomDynamicForm
                                            key={index}
                                            noNeedBorder
                                            question={item.question}
                                            extraStyle={styles.padBMinus50}
                                            isChildCheckBox={item?.isCheckbox}
                                            emailConsent={item?.categoryConsent}
                                            quesTextStyleExtra={
                                              styles.myFamilyQuetionTextStyle
                                            }
                                            setWithDrawConsent={() => {
                                              let data = {
                                                question_id: '',
                                                categoryConsent: '',
                                              };
                                              setWithDraw(true);
                                              setIndex(index);
                                              setParentIndex(index1);
                                              setData(item);
                                              data.categoryConsent = 0;
                                              data.question_id =
                                                item.child_question_id;

                                              setCategoryData(data);
                                            }}
                                            setEmailConsent={() => {
                                              let data = {
                                                question_id: '',
                                                categoryConsent: '',
                                              };
                                              if (
                                                item &&
                                                item['categoryConsent'] == 0
                                              ) {
                                                data.categoryConsent = 1;
                                                data.question_id =
                                                  item.child_question_id;
                                              } else {
                                                data.categoryConsent = 0;
                                                data.question_id =
                                                  item.child_question_id;
                                              }

                                              setReset(false);

                                              setQuestionsData([
                                                ...questionsData,
                                              ]);

                                              saveQuestionConsent(data);
                                            }}
                                            // additionalStyle={styles.padBMinus50}
                                            inSideValue={
                                              <View
                                                pointerEvents={
                                                  !item.hasOwnProperty(
                                                    'isCheckBox',
                                                  ) &&
                                                  !item.hasOwnProperty(
                                                    'categoryConsent',
                                                  )
                                                    ? 'auto'
                                                    : item.categoryConsent == 1
                                                    ? 'auto'
                                                    : 'none'
                                                }
                                                style={
                                                  !item.hasOwnProperty(
                                                    'isCheckBox',
                                                  ) &&
                                                  !item.hasOwnProperty(
                                                    'categoryConsent',
                                                  )
                                                    ? {opacity: 1}
                                                    : item?.categoryConsent == 1
                                                    ? {opacity: 1}
                                                    : {opacity: 0.6}
                                                }>
                                                {item &&
                                                  item.question_type == 1 &&
                                                  item.child_ans_arr.map(
                                                    (i, j) => (
                                                      <View
                                                        key={j}
                                                        style={styles.pT10}>
                                                        <CustomRadioAndAns
                                                          checkValue={
                                                            i.selected
                                                          }
                                                          answer={i.answer}
                                                          onPressRadio={() => {
                                                            onCallSelectionChild(
                                                              item1,
                                                              item,
                                                              i,
                                                            );
                                                          }}
                                                        />
                                                      </View>
                                                    ),
                                                  )}
                                                {item &&
                                                  item.question_type == 2 && (
                                                    <View style={styles.pT10}>
                                                      <View
                                                        style={{
                                                          height:
                                                            isOpenIndex ==
                                                              index &&
                                                            isOpenIndexName ==
                                                              'child' &&
                                                            isSelectedChildId ==
                                                              item.child_question_id
                                                              ? 200
                                                              : undefined,
                                                        }}>
                                                        <CustomDropDownAnswer
                                                          itemsData={
                                                            item.child_ans_arr
                                                          }
                                                          //zIndex={1}
                                                          // defaultValue={I18n.t(globalText.bachDegree)}
                                                          labelKey={
                                                            'question_answer_id'
                                                          }
                                                          displayKey={'answer'}
                                                          onItemChoose={i => {
                                                            // setOpenIndexName(
                                                            //     '',
                                                            // );
                                                            setOpenIndex(-1);
                                                            onCallSelectionChild(
                                                              item1,
                                                              item,
                                                              i,
                                                            );
                                                            // onCallSelection(item1, item);
                                                          }}
                                                          onOpen={() => {
                                                            setSelectedChildId(
                                                              item.child_question_id,
                                                            );
                                                            setOpenIndexName(
                                                              'child',
                                                            );
                                                            setOpenIndex(index);
                                                          }}
                                                          onClose={() => {
                                                            setSelectedChildId(
                                                              null,
                                                            );
                                                            setOpenIndexName(
                                                              '',
                                                            );
                                                            setOpenIndex(-1);
                                                          }}
                                                          isOpenCheck={
                                                            isOpenIndex ==
                                                              index &&
                                                            isOpenIndexName ==
                                                              'child' &&
                                                            isSelectedChildId ==
                                                              item.child_question_id
                                                          }
                                                        />
                                                      </View>
                                                    </View>
                                                  )}
                                                {item &&
                                                  item.question_type == 3 &&
                                                  item.child_ans_arr.map(
                                                    (i, j) => (
                                                      <View
                                                        key={j}
                                                        style={styles.pT10}>
                                                        <CustomCheckBoxAns
                                                          checkValue={
                                                            i.selected
                                                          }
                                                          answer={i.answer}
                                                          onPressCheckBox={() => {
                                                            setOpenIndex(-1);
                                                            onCallSelectionChild(
                                                              item1,
                                                              item,
                                                              i,
                                                            );
                                                            // onCallSelection(item1, item);
                                                          }}
                                                        />
                                                      </View>
                                                    ),
                                                  )}
                                                {item &&
                                                  item.question_type == 4 && (
                                                    <View style={styles.pT10}>
                                                      <View
                                                        style={{
                                                          height:
                                                            isOpenIndex ==
                                                              index &&
                                                            isOpenIndexName ==
                                                              'child' &&
                                                            isSelectedChildId ==
                                                              item.child_question_id
                                                              ? 200
                                                              : undefined,
                                                        }}>
                                                        <CustomDropDownAnswer
                                                          itemsData={
                                                            item.child_ans_arr
                                                          }
                                                          //     zIndex={1}
                                                          //defaultValue={I18n.t(globalText.bachDegree)}
                                                          labelKey={
                                                            'question_answer_id'
                                                          }
                                                          displayKey={'answer'}
                                                          isArray={item.child_ans_arr
                                                            .filter(
                                                              it => it.selected,
                                                            )
                                                            .map(i => i.answer)}
                                                          onItemChoose={i => {
                                                            // setOpenIndexName('');
                                                            if (i.length > 0) {
                                                              onCallSelectionChild(
                                                                item1,
                                                                item,
                                                                i,
                                                              );
                                                              onCallSelection(
                                                                item,
                                                                i,
                                                              );
                                                            } else {
                                                              onCallSelectionChild(
                                                                item1,
                                                                item,
                                                                [],
                                                              );
                                                            }
                                                          }}
                                                          multiple
                                                          isOpenCheck={
                                                            isOpenIndex ==
                                                              index &&
                                                            isOpenIndexName ==
                                                              'child' &&
                                                            isSelectedChildId ==
                                                              item.child_question_id
                                                          }
                                                          onOpen={() => {
                                                            setSelectedChildId(
                                                              item.child_question_id,
                                                            );
                                                            setOpenIndexName(
                                                              'child',
                                                            );
                                                            setOpenIndex(index);
                                                          }}
                                                          onClose={() => {
                                                            setSelectedChildId(
                                                              null,
                                                            );
                                                            setOpenIndexName(
                                                              '',
                                                            );
                                                            setOpenIndex(-1);
                                                          }}
                                                        />
                                                      </View>
                                                    </View>
                                                  )}
                                                {item &&
                                                  item.question_type == 5 && (
                                                    <View style={styles.pT10}>
                                                      <CustomTextInput
                                                        placeholder={I18n.t(
                                                          globalText._typeHereYourAnswer,
                                                        )}
                                                        // multiline
                                                        term={
                                                          item && item.answer
                                                        }
                                                        onChangeText={text => {
                                                          onCallSelectionChild(
                                                            item1,
                                                            item,
                                                            text,
                                                          );
                                                        }}
                                                      />
                                                    </View>
                                                  )}
                                                {item &&
                                                  item.question_type == 6 && (
                                                    <View style={styles.pT10}>
                                                      <CustomGridRadioAns
                                                        ansData={
                                                          item.child_ans_arr
                                                        }
                                                        subQData={
                                                          item.child_grid_arr
                                                        }
                                                        onGridRadioSelected={subQuestionWithanswer => {
                                                          onCallSelectionChild(
                                                            item1,
                                                            item,
                                                            subQuestionWithanswer,
                                                          );
                                                        }}
                                                      />
                                                    </View>
                                                  )}
                                                {item &&
                                                  item.question_type == 7 && (
                                                    <View style={styles.pT10}>
                                                      <CustomRadioCheckBoxMultiSelect
                                                        ansData={
                                                          item.child_ans_arr
                                                        }
                                                        subQData={
                                                          item.child_grid_arr
                                                        }
                                                        onGridRadioSelected={answerWithSubID => {
                                                          onCallSelectionChild(
                                                            item1,
                                                            item,
                                                            answerWithSubID,
                                                          );
                                                        }}
                                                      />
                                                    </View>
                                                  )}
                                                {item &&
                                                  item.question_type == 8 &&
                                                  item.child_grid_arr.map(
                                                    (i, j) => (
                                                      <View
                                                        key={j}
                                                        style={styles.pT10}>
                                                        <CustomTextInput
                                                          headerName={
                                                            i.subquestion
                                                          }
                                                          placeholder={I18n.t(
                                                            globalText._typeHereYourAnswer,
                                                          )}
                                                          // multiline
                                                          term={i && i.answer}
                                                          onChangeText={text => {
                                                            i.answer = text;
                                                          }}
                                                        />
                                                      </View>
                                                    ),
                                                  )}
                                              </View>
                                            }
                                          />
                                        </View>
                                      </View>
                                    );
                                  }
                                })}
                            </View>
                          }
                          isCheckBox={item1.isCheckbox}
                          emailConsent={item1?.categoryConsent}
                          setEmailConsent={() => {
                            if (item1['categoryConsent'] == 0) {
                              questionsData[index1]['categoryConsent'] = 1;
                            } else {
                              questionsData[index1]['categoryConsent'] = 0;
                            }

                            setQuestionsData([...questionsData]);

                            saveQuestionConsent(questionsData[index1]);
                          }}
                          questionContent={item1?.questionContent}
                        />
                      </View>
                    );
                  })}

                {isDataLoaded && questionsData && questionsData.length > 0 && (
                  <View style={styles.myFamilyUpdateButtonView}>
                    <CustomButton
                      onPress={() => onCallUpdate()}
                      buttonName={
                        ischeckFirst
                          ? I18n.t(globalText.next)
                          : I18n.t(globalText.update)
                      }
                      addButtonStyle={styles.myFamilyUpdateButton}
                    />
                  </View>
                )}
              </View>
            </View>
            {isDataLoaded && questionsData && questionsData.length == 0 && (
              <View style={styles.noRecordText}>
                <Text style={styles.textCenter}>
                  {I18n.t(globalText.noRecordFound)}
                </Text>
              </View>
            )}

            {(withDrawConsent || isQuestionConsent) && (
              <Modal
                visible={withDrawConsent || isQuestionConsent}
                animationType="slide"
                transparent={true}
                swipeDirection="down"
                onRequestClose={onRequestClose}
                // backgroundColor="red"
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#rgba(0,0,0,0.5)',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 'auto',
                      width: 350,
                      opacity: 1,
                      backgroundColor: '#FFF',
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setQuestionConsent(false);
                        setWithDraw(false);
                      }}
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 1,
                      }}>
                      <FastImage
                        style={{
                          height: 18,
                          width: 18,
                        }}
                        source={GlobalImages.crossIcon}
                      />
                    </TouchableOpacity>

                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 20,
                      }}>
                      {I18n.t(globalText.Note)}
                    </Text>
                    {isQuestionConsent && (
                      <Text
                        style={{
                          color: 'black',
                          marginBottom: 15,
                          padding: 10,
                        }}>
                        {childQuestionConsent}
                      </Text>
                    )}
                    {withDrawConsent && (
                      <>
                        <Text
                          style={{
                            color: 'black',
                            marginBottom: 0,
                            padding: 10,
                          }}>
                          {I18n.t(globalText.are_you_sure)}
                        </Text>

                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 15,
                            width: '35%',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <CustomRadioButton
                              checkValue={isYes}
                              onPressRadio={() => {
                                setYes(true);
                                setNo(false);
                              }}
                            />
                            <Text style={{marginLeft: 10}}>
                              {I18n.t(globalText.yes)}
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <CustomRadioButton
                              checkValue={isNo}
                              onPressRadio={() => {
                                setYes(false);
                                setNo(true);
                              }}
                            />
                            <Text style={{marginLeft: 10}}>
                              {I18n.t(globalText.no)}
                            </Text>
                          </View>
                        </View>
                      </>
                    )}
                    {withDrawConsent && (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <CustomButton
                          onPress={() => {
                            if (isYes) {
                              // props.setEmailConsent();

                              // if (data["categoryConsent"] == 0) {
                              //   // questionsData[cbildIndex][
                              //   //   "categoryConsent"
                              //   // ] = 1;

                              //   questionsData[parentIndex]["child_que_arr"][
                              //     cbildIndex
                              //   ]["categoryConsent"] = 1;
                              // } else {
                              //   // questionsData[cbildIndex][
                              //   //   "categoryConsent"
                              //   // ] = 0;

                              //   questionsData[parentIndex]["child_que_arr"][
                              //     cbildIndex
                              //   ]["categoryConsent"] = 0;
                              // }

                              setQuestionsData([...questionsData]);

                              saveQuestionConsent(catData);
                            }
                            // setConsent(false);

                            setWithDraw(false);
                          }}
                          addButtonStyle={styles.prAndSettSurveySaveStyle}
                          addButtonTextStyle={styles.fontSize14}
                          buttonName={I18n.t(globalText.update)}
                        />

                        <CustomButton
                          onPress={() => {
                            // onRequestClose()
                            // setConsent(false);
                            setWithDraw(false);
                          }}
                          addButtonStyle={styles.prAndSettSurveyCloseStyle}
                          addButtonTextStyle={styles.fontSize14}
                          buttonName={I18n.t(globalText.cancel)}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </Modal>
            )}
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default CustomQuestionAnswerForm;
