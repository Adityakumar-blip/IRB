/* eslint-disable quotes */
import React, { useState, useRef, useEffect } from 'react';
import { Modal, ScrollView, StatusBar, Text, View, TouchableWithoutFeedback } from 'react-native';
import CustomButton from '../../component/customButton/index';
import CustomTextInput from '../../component/customTextInputNew/index';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import CustomLoader from '../../component/customLoader/index';
import { toastShow } from '../../utils/customFunctions';
import SimpleReactValidator from 'simple-react-validator';
import CustomValidation from '../../utils/CustomValidation';
import colors from '../../styles/colors';
import I18n from '../../i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { checkPasswordVallidation } from '../../utils/customFunctions';
import { Singular } from 'singular-react-native';

const ChangePassword = props => {
    const { visible, onRequestClose, onPress, onPressOutside } = props;

    const simpleValidator = useRef(new SimpleReactValidator());

    const [allValid, setAllValid] = useState(true);
    const [loader, setLoader] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isMessage, setMessage] = useState(null);

    useEffect(() => {
        Singular.event("ChangePassword");
    },[])

    const onPressSubmit = async () => {
        if (oldPassword.length == 0) {
            setMessage(I18n.t(globalText._pleaseEnterOldPassword));
            return;
        }
        if (newPassword.length == 0) {
            setMessage(I18n.t(globalText._pleaseEnterNewPassword));
            return;
        }
        if (newPassword.length > 0 && confirmPassword.length == 0) {
            setMessage(I18n.t(globalText._pleaseEnterConfirmPassword));
            return;
        }
        if (oldPassword == newPassword) {
            setMessage(I18n.t(globalText._yourNewPassNotSameasWeb));
            return;
        }
        if (newPassword.length > 0 && confirmPassword.length > 0) {
            let value = await checkPasswordVallidation(newPassword);
            if (!value) {
                // setMessage(I18n.t(globalText._passwordValidationMessage));
                setMessage(I18n.t(globalText._passwordValidationMessageNew));
                return;
            }
            if (newPassword !== confirmPassword) {
                setMessage(I18n.t(globalText._pleaseConfirmPassword));
                return;
            }
        }
        setMessage(null);
        setLoader(true);
        const payload = {
            oldpassword: oldPassword,
            newpassword: newPassword,
            confirm_newpassword: confirmPassword,
        };
        const { data, message, success } = await AuthApi.postDataToServer(Api.changePassword, payload);
        setLoader(false);
        if (!success) {
            message == "Old password doesn't match"
                ? setMessage(I18n.t(globalText.oldPassNotMatch))
                : toastShow((message && message) || I18n.t(globalText.somethingWentWrong));
            return;
        }
        setTimeout(() => {
            toastShow(I18n.t(globalText.changePasswordSuccessMsg));
        }, 100);
        await onPress();
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
                statusBarTranslucent
            />
            <TouchableWithoutFeedback onPress={() => onPressOutside()}>
                <View style={styles.changePasswordContainer}>
                    {loader && <CustomLoader />}
                    <KeyboardAwareScrollView
                        contentContainerStyle={styles.changePasswordContentContainerStyle}
                        extraScrollHeight={50}
                        nestedScrollEnabled
                        keyboardShouldPersistTaps={'handled'}
                        alwaysBounceVertical={false}
                    >
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.changePasswordView}>
                                <Text style={styles.ChangePasswordTitle}>{I18n.t(globalText.changePassword)}</Text>
                                {isMessage && isMessage.length > 0 && (
                                    <View style={styles.changePasswordYellowMessage}>
                                        <Text style={styles.pointConversionWarningMsg}>{isMessage}</Text>
                                    </View>
                                )}
                                <View style={styles.marT15}>
                                    <CustomTextInput
                                        headerName={I18n.t(globalText.oldPassword)}
                                        secureTextEntry
                                        onChangeText={i => setOldPassword(i)}
                                    />
                                </View>
                                <View style={styles.marT15}>
                                    <CustomTextInput
                                        headerName={I18n.t(globalText.newPassword)}
                                        secureTextEntry
                                        onChangeText={i => setNewPassword(i)}
                                        onBlur={() =>
                                            CustomValidation.onBlurField(
                                                simpleValidator,
                                                allValid,
                                                I18n.t(globalText.newPassword),
                                            )
                                        }
                                    />
                                </View>

                                <View style={styles.marT15}>
                                    <CustomTextInput
                                        headerName={I18n.t(globalText.confirmNewPassword)}
                                        secureTextEntry
                                        onChangeText={i => setConfirmPassword(i)}
                                    />
                                </View>
                                <View style={styles.changePasswordButtonView}>
                                    <CustomButton
                                        buttonName={I18n.t(globalText.submit)}
                                        addButtonStyle={styles.changePasswordSubmitButton}
                                        onPress={() => onPressSubmit()}
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAwareScrollView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ChangePassword;
