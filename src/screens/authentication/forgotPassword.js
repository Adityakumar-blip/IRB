import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, TextInput, Platform, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../helper/globalStyles';
import CustomBackground from '../../component/customBackground';
import colors from '../../styles/colors';
import FastImage from 'react-native-fast-image';
import GlobalImages from '../../helper/globalImages';
import AuthButton from '../../component/authButton/index';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import SimpleReactValidator from 'simple-react-validator';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import CustomLoader from '../../component/customLoader/index';
import { toastShow, removeAsyncStorage } from '../../utils/customFunctions';

const ForgotPassword = props => {
    const simpleValidator = useRef(new SimpleReactValidator());
    const [allValid, setAllValid] = useState(true);
    const [isEmailPhone, setEmail] = useState('');
    const [loader, setLoader] = useState(false);
    const [isErrorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setEmail('');
    }, []);

    const onSend = async () => {
        setErrorMessage('');
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            setAllValid(false);
            simpleValidator.current.showMessages();
            return;
        }
        setLoader(true);
        let isCheck = isEmailPhone.toLowerCase();
        let endPoint = `${Api.verifyWhetherEmailOrMobile}?username=${isCheck}`;
        const { data, message, success } = await AuthApi.getDataFromServer(endPoint);
        setLoader(false);
        if (!data) {
            setErrorMessage(I18n.t(globalText.pleaseEnterEmailIdOrPhoneNumberWhichIsRegisteredWithOpinionBureau));
            return;
        }
        setErrorMessage('');
        let isNumber = (await data) && data.data && data.data.id;
        let dataPass = {
            userValue: isEmailPhone,
            value: isNumber,
        };
        if (isNumber == 2) {
            dataPass.isText = 'Email';
        } else if (isNumber == 1) {
            dataPass.isText = 'Mobile';
        }
        removeAsyncStorage('VERIFY_OTP');
        setEmail('');
        props.navigation.navigate('PasswordVerification', { data: dataPass });
    };

    return (
        <CustomBackground
            screen={
                <View>
                    {loader && <CustomLoader />}
                    <View style={styles.forgotPasswordFirstView}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.marL10}>
                            <Ionicons name={'arrow-back-outline'} size={20} color={colors.ABBEY} />
                        </TouchableOpacity>
                        <Text style={styles.headerTextStyleForgotPassword}>
                            {I18n.t(globalText._forgotPasswordText)}
                        </Text>
                    </View>
                    <View style={styles.mar10}>
                        {isErrorMessage != '' ? (
                            <Text style={isErrorMessage ? styles.errorMsgBoxStyle : {}}>{isErrorMessage}</Text>
                        ) : null}
                        <View style={styles.marT30}>
                            <Text style={styles.forgotPasswordTextStyle}>
                                {I18n.t(globalText._enterTheEmailAdressAssociated)}
                            </Text>
                            <Text style={styles.forgotPasswordTextStyle}>
                                {I18n.t(globalText._yourAccountToReceiveTheCode)}
                            </Text>
                        </View>

                        <View style={styles.forgotPasswordMainview}>
                            <View style={[styles.rowCenter, styles.width100, styles.height40Static]}>
                                <View style={styles.forgotPasswordMiddleFirstView}>
                                    <FastImage
                                        resizeMode="contain"
                                        style={styles.forgotPasswordWebIconStyle}
                                        source={GlobalImages.reestPasswordWebIcon}
                                    />
                                </View>
                                <View style={styles.forgotPasswordMiddleSeocondView}>
                                    <TextInput
                                        placeholder={I18n.t(globalText._emailAddressPhoneNo)}
                                        placeholderTextColor={'grey'}
                                        value={isEmailPhone}
                                        onBlur={() => !allValid && simpleValidator.current.showMessageFor('email')}
                                        onChangeText={text => setEmail(text)}
                                    />
                                </View>
                            </View>
                            <View style={styles.rowCenter}>
                                <View style={styles.width15} />
                                <View style={styles.forgotPasswordBorderStyle}>
                                    {simpleValidator.current.message('email', isEmailPhone, 'required') && (
                                        <Text style={styles.redColorText}>
                                            {I18n.t(globalText._theMessageMustBeRequired, {
                                                _message: I18n.t(globalText.phone_email),
                                            })}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>
                        <View style={styles.forgotPasswordbuttonStyle}>
                            <AuthButton
                                buttonName={I18n.t(globalText._send)}
                                authButtonStyle={styles.paddH60}
                                buttonStyle={styles.fontWeightNormal}
                                onPress={() => onSend()}
                            />
                        </View>
                    </View>
                </View>
            }
        />
    );
};

export default ForgotPassword;
