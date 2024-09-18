/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
//Shopping

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomLoader from '../../component/customLoader/index';
import CustomQuestionAnswerForm from '../../component/customQuestionAnswerForm/index';
import styles from '../../helper/globalStyles';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import { toastShow } from '../../utils/customFunctions';
import { Singular } from 'singular-react-native';

const Shopping = props => {
    const { onChangePage } = props;
    const [loader, setLoader] = useState(false);

    useEffect(()=>{
        Singular.event("FoodAndBeverages");
    },[]);

    const onSaveAnswer = async (allData, uniqueChars) => {
        setLoader(true);
        const payload = {
            items: [...allData],
            sub_category_type_id: 5,
            pre_selected_question_arr: uniqueChars && uniqueChars.length > 0 ? uniqueChars : [],
        };
        const { data, message, success } = await AuthApi.postDataToServer(Api.myFamilySaveSelectedAnswer, payload);
        if (!data) {
            setLoader(false);
            toastShow(message && message);
            return;
        }
        await onChangePage(6);
        setLoader(false);
    };

    return (
        <View style={styles.container}>
            {loader && <CustomLoader isVisible={loader} />}
            <CustomQuestionAnswerForm
                onSaveAnswer={(allData, uniqueChars) => onSaveAnswer(allData, uniqueChars)}
                sub_category_type_id={5}
            />
        </View>
    );
};

export default Shopping;
