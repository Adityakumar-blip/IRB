/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
//Profession

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import CustomLoader from '../../component/customLoader/index';
import CustomQuestionAnswerForm from '../../component/customQuestionAnswerForm/index';
import styles from '../../helper/globalStyles';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import { toastShow } from '../../utils/customFunctions';

const Profession = props => {
    const { onChangePage, checkValue, isCheck } = props;
    const [loader, setLoader] = useState(false);

    const onSaveAnswer = async (allData, uniqueChars) => {
        isCheck == checkValue && setLoader(true);
        const payload = {
            items: [...allData],
            sub_category_type_id: Number(checkValue),
            pre_selected_question_arr: uniqueChars && uniqueChars.length > 0 ? uniqueChars : [],
        };
        const { data, message, success } = await AuthApi.postDataToServer(Api.myFamilySaveSelectedAnswer, payload);
        if (!data) {
            setLoader(false);
            toastShow(message && message);
            return;
        }
        await onChangePage(Number(checkValue) + 1);
        isCheck == checkValue && setLoader(false);
    };

    return (
        <View style={styles.container}>
            {loader && <CustomLoader isVisible={loader} />}
            <CustomQuestionAnswerForm
                onSaveAnswer={(allData, uniqueChars) => onSaveAnswer(allData, uniqueChars)}
                sub_category_type_id={Number(checkValue)}
            />
        </View>
    );
};

export default Profession;
