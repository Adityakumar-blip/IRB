import React, { useState } from 'react';
import { Modal, StatusBar, View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import styles from '../../helper/globalStyles';
import CustomButton from '../../component/customButton/index';
import { globalText } from '../../helper/globalText';
import colors from '../../styles/colors';
import CustomTextInput from '../../component/customTextInput/index';
import I18n from '../../i18n/index';
import CustomLoader from '../../component/customLoader/index';
import Api from '../../utils/api';
import authApi from '../../utils/authApi';
import { constant } from '../../utils/constants';
import {
    getAsyncStorage,
    getFormatedDate,
    getJsonStringify,
    toastShow,
    removeAsyncStorage,
    clearAsyncStorage,
} from '../../utils/customFunctions';
import { useDispatch } from 'react-redux';
import { SET_ON_LOGOUT } from '../../store/action';

const UnSubscribeModal = props => {
    const {
        visible,
        onRequestClose,
        onChangeText,
        onCompleteUnsubScribe,
        onPressYes,
        onPressNo,
        autoFocus,
        onPressOutside,
    } = props;
    const [loader, setLoader] = useState(false);
    const [isMessage, setMessage] = useState(false);
    const dispatch = useDispatch();

    const onPressUnSubscribe = async () => {
        setLoader(true);
        const payload = {
            reason: isMessage ? isMessage : '',
        };
        const { data, message } = await authApi.putDataToServer(Api.unsubscibe, payload);
        if (!data) {
            setLoader(false);
            toastShow(message && message);
            return;
        }
        setTimeout(() => {
            toastShow(I18n.t(globalText.userUnsubSucc));
        }, 200);
        await clearAsyncStorage();
        await dispatch(SET_ON_LOGOUT());
        onCompleteUnsubScribe();
        setLoader(false);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            swipeDirection="down"
            onRequestClose={onRequestClose}
        >
            {loader && <CustomLoader isVisible={loader} />}
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.TRANSPARENT}
                opacity={0.1}
                statusBarTranslucent
            />
            <TouchableWithoutFeedback onPress={() => onPressOutside()}>
                <View style={styles.latTrllMainModalView}>
                    <ScrollView contentContainerStyle={styles.changePasswordContainer_1}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.latTrllMainModalViewStyle}>
                                <View style={styles.padd15}>
                                    <Text style={styles.unsubscribeModalTitle}>{I18n.t(globalText.unsubscribe)}</Text>
                                    <Text style={styles.unsubscribequestion}>
                                        {I18n.t(globalText.unsubscribequestion)}
                                    </Text>
                                    <View style={styles.unsubscribeOption}>
                                        <TouchableOpacity onPress={() => onPressYes()}>
                                            <Text style={styles.unsubscribeOptionText}>{I18n.t(globalText.yes)}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => onPressNo()}>
                                            <Text style={styles.unsubscribeOptionText}>{I18n.t(globalText.no)}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.unsubscribeDescription}>
                                        {I18n.t(globalText.unSubscribeDetail)}
                                    </Text>

                                    {autoFocus && (
                                        <CustomTextInput
                                            // headerName={I18n.t(globalText.enterPointConversion)}
                                            inputMainViewNew={[
                                                styles.unsubscribeTextInput,
                                                { borderWidth: 0, paddingLeft: 0 },
                                            ]}
                                            txtInptStyle={styles.height100}
                                            onChangeText={txt => setMessage(txt)}
                                            placeholder={I18n.t(globalText.typeYourFeedBackHere)}
                                            placeholderTextColor={colors.DOVE_GRAY}
                                            autoFocus={autoFocus}
                                        />
                                    )}
                                    {autoFocus && <View style={styles.unsubscribeDottedBorder} />}
                                    {autoFocus && (
                                        <View style={styles.unsubscribeButtonView}>
                                            <CustomButton
                                                buttonName={I18n.t(globalText.unsubscribe)}
                                                onPress={() => onPressUnSubscribe()}
                                                addButtonStyle={styles.unsubscribeButton}
                                            />
                                        </View>
                                    )}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default UnSubscribeModal;
