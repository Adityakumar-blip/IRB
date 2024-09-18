import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../helper/globalStyles';
import CustomButton from '../../component/customButton/index';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import CustomTextImput from '../../component/customTextInput/index';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/colors';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import CustomLoader from '../../component/customLoader/index';
import {
    toastShow,
    removeAsyncStorage,
    setAsyncStorage,
    generateOtp,
    getAsyncStorage,
} from '../../utils/customFunctions';
import BackgroundTimer from 'react-native-background-timer';
import SimpleReactValidator from 'simple-react-validator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const UpdateEmailMobile = props => {
    const simpleValidator = useRef(new SimpleReactValidator());
    const { visible, onRequestClose, isName, onPressCross, isFirstName, onSetUpdatedEmailOrMobile, isOldValue } = props;
    const [value, setValue] = useState('');
    const { initialMinute = 0, initialSeconds = 0 } = props;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    const { initialBackgroundMinute = 0, initialBackgroundSeconds = 0 } = props;
    const [minutesBackground, setMinutesBackground] = useState(initialBackgroundMinute);
    const [secondsBackground, setSecondsBackground] = useState(initialBackgroundSeconds);
    const [sendOtp, setSendOtp] = useState(false);
    const [isErrorMessage, setErrorMessage] = useState('');
    const [loader, setLoader] = useState(false);
    const [isEmailPhone, setEmailPhone] = useState(isOldValue ? isOldValue : '');
    const [allValid, setAllValid] = useState(true);
    const [isPreviousValue, setPreviousValue] = useState('');
    const [isBasicInfo, setBasicInfo] = useState({});
    const CELL_COUNT = 4;

    const id = useRef(null);
    const timer = useRef(null);

    const clear = () => {
        BackgroundTimer.clearInterval(id.current);
    };

    const clear_timer = () => {
        BackgroundTimer.clearInterval(timer.current);
    };

    useEffect(() => {
        onPageInit();
    }, []);

    const onPageInit = async () => {
        const getBasicInfo = await JSON.parse(await getAsyncStorage('Login_Data'));
        setBasicInfo(getBasicInfo);
    };

    useEffect(() => {
        id.current = BackgroundTimer.setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    // removeAsyncStorage('update_detail_otp');
                    // clearInterval(myInterval);
                    clear();
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => {
            // clearInterval(myInterval);
            clear();
        };
    });

    useEffect(() => {
        timer.current = BackgroundTimer.setInterval(() => {
            if (secondsBackground > 0) {
                setSecondsBackground(secondsBackground - 1);
            }
            if (secondsBackground === 0) {
                if (minutesBackground === 0) {
                    removeAsyncStorage('update_detail_otp');
                    // removeData()
                    clear_timer();
                } else {
                    setMinutesBackground(minutesBackground - 1);
                    setSecondsBackground(59);
                }
            }
        }, 1000);

        return () => {
            clear_timer();
        };
    });

    const onVerifyEmail = async () => {
        // await clear();
        if (timer.current) {
            await clear_timer();
        }
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            setAllValid(false);
            simpleValidator.current.showMessages();
            return;
        }
        setErrorMessage('');
        setLoader(true);
        const payload = {
            email: isEmailPhone.toLowerCase() ? isEmailPhone.toLowerCase() : '',
            country_id: isBasicInfo.country_id,
        };
        const { data, message, success } = await AuthApi.postDataToServer(Api.signupSinupEmailVerificationApi, payload);
        setLoader(false);
        if (!data) {
            message == '"email" must be a valid email'
                ? setErrorMessage(I18n.t(globalText.enterAValidAndActiveEmailAddress))
                : toastShow(message && message);
            return;
        }
        let resData = data && data.data;
        if (resData.email != 'success' && isEmailPhone.length != 0) {
            resData.email == '"email" must be a valid email'
                ? setErrorMessage(I18n.t(globalText.enterAValidAndActiveEmailAddress))
                : resData.email == 'Email is not valid'
                ? setErrorMessage(I18n.t(globalText.enterAValidAndActiveEmailAddress))
                : resData.email == 'Email is already exist'
                ? setErrorMessage(I18n.t(globalText.emailIsAlreadyExist))
                : null;
            return;
        }
        setErrorMessage('');
        onPressSendOtp(isEmailPhone);
    };

    const onVerifyNumber = async () => {
        if (timer.current) {
            await clear_timer();
        }
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            setAllValid(false);
            simpleValidator.current.showMessages();
            return;
        }
        setErrorMessage('');
        setLoader(true);
        const payload = {
            // email: isEmailPhone.toLowerCase() ? isEmailPhone.toLowerCase() : '',
            phone_number: isEmailPhone ? isEmailPhone : '',
            country_id: isBasicInfo.country_id,
        };
        const { data, message, success } = await AuthApi.postDataToServer(Api.signupSinupEmailVerificationApi, payload);
        setLoader(false);
        if (!data) {
            message == '"phone_number" length must be at least 10 characters long'
                ? setErrorMessage(I18n.t(globalText.enterAvalidAndActivePhoneNumber))
                : message == 'Enter valid phone number'
                ? setErrorMessage(I18n.t(globalText.enterAvalidAndActivePhoneNumber))
                : toastShow(message && message);
            return;
        }
        let resData = data && data.data;
        if (resData.phone_number != 'success' && isEmailPhone.length != 0) {
            resData.phone_number == 'Phone number is already exist'
                ? setErrorMessage(I18n.t(globalText.phoneNumberIsAlreadyExist))
                : resData.phone_number == '"phone_number" length must be at least 10 characters long'
                ? setErrorMessage(I18n.t(globalText.enterAvalidAndActivePhoneNumber))
                : null;
            return;
        }
        setErrorMessage('');
        onPressSendOtp(isEmailPhone);
    };

    const onPressSendOtp = async isVerifyValue => {
        setValue('');
        setErrorMessage('');
        await removeAsyncStorage('update_detail_otp');
        const otp = await generateOtp();
        await setAsyncStorage('update_detail_otp', otp.toString());
        const randomOtp = await getAsyncStorage('update_detail_otp');
        setSendOtp(true);
        setMinutes(1);
        setMinutesBackground(2);
        const payloadForMobile = {
            phone_no: isVerifyValue,
            verificationCode: randomOtp,
            country_code: isBasicInfo.country_code,
            first_name: isFirstName,
            culture_id: isBasicInfo.culture_id,
        };
        const payloadForEmail = {
            email: isVerifyValue.toLowerCase(),
            verificationCode: randomOtp,
            country_code: isBasicInfo.country_code,
            first_name: isFirstName,
            culture_id: isBasicInfo.culture_id,
        };
        setLoader(true);
        const payload = isName == 'email' ? payloadForEmail : payloadForMobile;
        const { data, message } = await AuthApi.postDataToServer(Api.sendSmsOrEmailOtp, payload);
        setLoader(false);
        setPreviousValue(isEmailPhone);
        if (!data) {
            toastShow(I18n.t(globalText.somethingWentWrong));
            return;
        }
        setLoader(false);
        toastShow(I18n.t(globalText.otpSendSuccessfully));
    };

    const onPresSubmit = async () => {
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            setAllValid(false);
            simpleValidator.current.showMessages();
            return;
        }
        const randomOtp = await getAsyncStorage('update_detail_otp');
        if (isPreviousValue != isEmailPhone) {
            setSendOtp(false);
            setMinutes(0);
            setSeconds(0);
            setMinutesBackground(0);
            setSecondsBackground(0);
            setValue('');
            setErrorMessage(I18n.t(globalText.pleaseSendTheOtpForUser));
            return;
        }
        if (value.toString().length == 0) {
            setErrorMessage(I18n.t(globalText._pleaseEnterOtp));
            return;
        }
        if (Number(randomOtp) == Number(value)) {
            onUpdateEmailOrPhone(isEmailPhone);
        }
        if (randomOtp != Number(value)) {
            setErrorMessage(I18n.t(globalText.incorrectOtp));
            return;
        }
    };

    const onUpdateEmailOrPhone = async isValue => {
        const payloadForMobile = {
            // email: '',
            phone_no: isValue.toLowerCase(),
        };
        const payloadForEmail = {
            email: isValue.toLowerCase(),
        };
        setLoader(true);
        const payload = isName == 'email' ? payloadForEmail : payloadForMobile;
        const { data, message } = await AuthApi.putDataToServer(Api.basicInfoUpdateEmailOrPhone, payload);
        setLoader(false);
        if (!data) {
            toastShow(I18n.t(globalText.somethingWentWrong));
            return;
        }
        let msg =
            isName == 'email'
                ? I18n.t(globalText._email_Address).toLowerCase()
                : I18n.t(globalText._phone_Number).toLowerCase();

        await onSetUpdatedEmailOrMobile(isName, isValue.toLowerCase());
        setTimeout(() => {
            toastShow(I18n.t(globalText._The) + ' ' + msg + ' ' + I18n.t(globalText._updatedSucessfully));
        }, 200);
        let userData = await JSON.parse(await getAsyncStorage('Login_Data'));
        let updatedUserDetail = {};
        if (isName == 'email') {
            updatedUserDetail = {
                ...userData,
                username: isValue,
            };
        } else {
            updatedUserDetail = {
                ...userData,
                phone_no: isValue,
            };
        }
        await setAsyncStorage('Login_Data', JSON.stringify(updatedUserDetail));
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            swipeDirection="down"
            onRequestClose={onRequestClose}
        >
            <View style={styles.demoSurveyMainModalView}>
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.changePasswordContentContainerStyle}
                    extraScrollHeight={50}
                    nestedScrollEnabled
                    keyboardShouldPersistTaps={'handled'}
                    alwaysBounceVertical={false}
                >
                    {loader && <CustomLoader />}
                    <View style={styles.editDetailMaimViewStyle}>
                        <TouchableOpacity style={[styles.alignSelfFlexEnd]} onPress={onPressCross}>
                            <AntDesign name={'close'} size={25} color={colors.ABBEY} />
                        </TouchableOpacity>
                        {isErrorMessage != '' ? (
                            <Text style={[styles.errorMsgBoxStyle, styles.marT10]}>{isErrorMessage}</Text>
                        ) : null}

                        {isName == 'email' ? (
                            <Text style={[styles.dashboardStatisticText, styles.marB13]}>
                                {I18n.t(globalText._email_Address)}
                            </Text>
                        ) : (
                            <Text style={[styles.dashboardStatisticText, styles.marB13]}>
                                {I18n.t(globalText._phone_Number)}
                            </Text>
                        )}

                        <CustomTextImput
                            // headerName={isName == 'email' ? I18n.t(globalText.email) : I18n.t(globalText.mobileNo)}
                            placeholder={
                                isName == 'email' ? I18n.t(globalText.enterEmail) : I18n.t(globalText.enterMobileNo)
                            }
                            keyboardType={isName == 'email' ? 'email-address' : 'numeric'}
                            term={isEmailPhone}
                            onChangeText={text => setEmailPhone(text)}
                            // txtInptStyle={styles.textTransformStyle}
                            onBlur={() => !allValid && simpleValidator.current.showMessageFor('phoneOrEmail')}
                        />

                        {simpleValidator.current.message('phoneOrEmail', isEmailPhone, 'required') && (
                            <View style={styles.marL10}>
                                <Text style={styles.redColorText}>
                                    {I18n.t(globalText._theMessageMustBeRequired, {
                                        _message:
                                            isName == 'email'
                                                ? I18n.t(globalText._email_Address).toLowerCase()
                                                : I18n.t(globalText._phone_Number).toLowerCase(),
                                        //: I18n.t(globalText.mobileNo).toLowerCase(),
                                    })}
                                </Text>
                            </View>
                        )}

                        {sendOtp && minutes === 0 && seconds === 0 && (
                            <TouchableOpacity
                                onPress={() => {
                                    isName == 'email' ? onVerifyEmail() : onVerifyNumber();
                                }}
                                style={styles.alignSelfEnd}
                                disabled={seconds != 0}
                            >
                                <Text style={styles.editDetailTextStyle}>{I18n.t(globalText.resendOtp)}?</Text>
                            </TouchableOpacity>
                        )}

                        {sendOtp && (
                            <View style={[styles.passwordVerificationOtpMainView, styles.marT15]}>
                                <CodeField
                                    value={value}
                                    caretHidden={false}
                                    onChangeText={setValue}
                                    cellCount={CELL_COUNT}
                                    rootStyle={styles.codeFieldRoot}
                                    keyboardType="number-pad"
                                    textContentType="oneTimeCode"
                                    renderCell={({ index, symbol, isFocused }) => (
                                        <Text
                                            key={index}
                                            style={[styles.editDetailCell, isFocused && styles.editDetailFocusCell]}
                                        >
                                            {symbol || (isFocused ? <Cursor /> : null)}
                                        </Text>
                                    )}
                                />
                            </View>
                        )}

                        {minutes === 0 && seconds === 0 ? null : (
                            <View style={styles.otpTimerView}>
                                <Text style={styles.otpTimer}>
                                    {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                                </Text>
                            </View>
                        )}

                        <View style={styles.editEmailPhoneScreen}>
                            <CustomButton
                                buttonName={sendOtp ? I18n.t(globalText.submit) : I18n.t(globalText.sendOtp)}
                                addButtonStyle={styles.addSocialProfileSubmitButton}
                                onPress={() => {
                                    if (sendOtp) {
                                        onPresSubmit();
                                    } else {
                                        isName == 'email' ? onVerifyEmail() : onVerifyNumber();
                                    }
                                }}
                            />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </Modal>
    );
};

export default UpdateEmailMobile;
