/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
//Education

import React, { useState, useEffect } from "react";
import { View } from "react-native";
import CustomLoader from "../../component/customLoader/index";
import CustomQuestionAnswerForm from "../../component/customQuestionAnswerForm/index";
import styles from "../../helper/globalStyles";
import Api from "../../utils/api";
import AuthApi from "../../utils/authApi";
import { toastShow, getAsyncStorage } from "../../utils/customFunctions";
import { Singular, sngLog } from "singular-react-native";

const Education = (props) => {
  const { onChangePage, checkValue, isCheck, onChnageTab, onSaveUserData } =
    props;
  const [loader, setLoader] = useState(false);
  // useEffect(() => {}, []);

  useEffect(()=>{
    Singular.event("education");
  },[]);

  const onSaveAnswer = async (allData, uniqueChars) => {
    // isCheck == checkValue && setLoader(true);
    const payload = {
      items: [...allData],
      sub_category_type_id: Number(checkValue),
      pre_selected_question_arr:
        uniqueChars && uniqueChars.length > 0 ? uniqueChars : [],
    };

    const { data, message, success } = await AuthApi.postDataToServer(
      Api.myFamilySaveSelectedAnswer,
      payload
    );
    if (!data) {
      setLoader(false);
      toastShow(message && message);
      return;
    }
    let logicForSpecficTab = "none";
    if (Number(checkValue) == 7) {
      logicForSpecficTab = data.data && data.data.key ? data.data.key : "";
    }
    await onChangePage(Number(checkValue) + 1, logicForSpecficTab);

    // loaderValue && isCheck == checkValue && setLoader(false);
  };

  return (
    <View style={styles.container}>
      {loader && <CustomLoader isVisible={loader} />}
      <CustomQuestionAnswerForm
        onSaveAnswer={(allData, uniqueChars) =>
          onSaveAnswer(allData, uniqueChars)
        }
        sub_category_type_id={Number(checkValue)}
        onChnageTab={onChnageTab}
        onSaveUserData={onSaveUserData}
      />
    </View>
  );
};

export default Education;
