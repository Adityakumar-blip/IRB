/* eslint-disable react/react-in-jsx-scope */
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { Keyboard, Text, View, TouchableOpacity } from 'react-native';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import AuthButton from '../../component/authButton/index';
import CustomBackground from '../../component/customBackground/index';
import styles from '../../helper/globalStyles';
import { getAsyncStorage, setAsyncStorage, toastShow, removeAsyncStorage } from '../../utils/customFunctions';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import CustomLoader from '../../component/customLoader/index';
import I18n from '../../i18n/index';
import { globalText } from '../../helper/globalText';
import { constant } from '../../utils/constants';
import BackgroundTimer from 'react-native-background-timer';

const PasswordVerification = props => {
    const [value, setValue] = useState('');
    const { initialMinute = 0, initialSeconds = 0 } = props;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    const { initialBackgroundMinute = 0, initialBackgroundSeconds = 0 } = props;
    const [minutesBackground, setMinutesBackground] = useState(initialBackgroundMinute);
    const [secondsBackground, setSecondsBackground] = useState(initialBackgroundSeconds);
    const [loader, setLoader] = useState(false);
    const [checkTimer, setCheckTimer] = useState(true);
    const [isDetails, setDetails] = useState({});
    const [isUserData, setUserData] = useState({});
    const [isValueForSend, setValueForSend] = useState('');
    const [isErrorMessage, setErrorMessage] = useState('');
    const CELL_COUNT = 6;

    const id = useRef(null);
    const timer = useRef(null);

    const clear = () => {
        BackgroundTimer.clearInterval(id.current);
    };

    const clear_timer = () => {
        BackgroundTimer.clearInterval(timer.current);
    };

    useEffect(() => {
        if (value.toString().length == 6) {
            Keyboard.dismiss();
        }
    }, [value]);

    useFocusEffect(
        React.useCallback(() => {
            onPageInit();
        }, []),
    );

    const onPageInit = async () => {
        const userData = (await props.route) && props.route.params && props.route.params.data;
        if (userData && userData) {
            setUserData(userData && userData);
            setValueForSend(userData.isText);
            const data = await JSON.parse(await getAsyncStorage('langauge_data'));
            if (data) {
                setDetails(data && data);
                userData.isText == 'Email'
                    ? onEmailOTP(data, userData)
                    : userData.isText == 'Mobile'
                    ? onMobileOTP(data, userData)
                    : null;
            }
        }
    };

    useEffect(() => {
        let myInterval = setInterval(() => {}, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });

    useEffect(() => {
        id.current = BackgroundTimer.setInterval(() => {
            if (seconds > 0) {
                setCheckTimer(true);
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setCheckTimer(false);
                    // removeAsyncStorage('VERIFY_OTP');
                    clear();
                } else {
                    setCheckTimer(true);
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
                    removeAsyncStorage('VERIFY_OTP');
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

    const onMobileOTP = async (isData, isDataNew) => {
        if (timer.current) {
            await clear_timer();
        }
        setErrorMessage('');
        setValue('');
        let isDataValue = isData ? isData : isDetails;
        let isUserDetails = isDataNew ? isDataNew : isUserData;
        setSeconds(0);
        setMinutes(1);
        setMinutesBackground(2);
        const otp = Math.floor(100000 + Math.random() * 900000);
        await setAsyncStorage('VERIFY_OTP', otp.toString());
        const randomOtp = await getAsyncStorage('VERIFY_OTP');
        const payload = {
            username: isUserDetails.userValue.trim(),
            verificationcode: otp.toString(),
        };
        setLoader(true);
        const { data, message } = await AuthApi.postDataToServer(Api.forgotPassword, payload);
        setLoader(false);
        if (!data) {
            toastShow(I18n.t(globalText.somethingWentWrong));
            return;
        }
        // let isMessage = (await data.data) ? data.data : '';
        setTimeout(() => {
            toastShow(I18n.t(globalText.otpSendSuccessfully));
        }, 100);
    };

    const onEmailOTP = async (isData, isDataNew) => {
        if (timer.current) {
            await clear_timer();
        }
        setErrorMessage('');
        setValue('');
        let isDataValue = isData ? isData : isDetails;
        let isUserDetails = isDataNew ? isDataNew : isUserData;
        setSeconds(0);
        setMinutes(1);
        setMinutesBackground(2);
        const otp = Math.floor(100000 + Math.random() * 900000);
        await setAsyncStorage('VERIFY_OTP', otp.toString());
        const randomOtp = await getAsyncStorage('VERIFY_OTP');
        setLoader(true);
        const payload = {
            username: isUserDetails.userValue.toLowerCase().trim(),
            verificationcode: otp.toString(),
        };
        const { data, message } = await AuthApi.postDataToServer(Api.forgotPassword, payload);
        setLoader(false);
        if (!data) {
            toastShow(I18n.t(globalText.somethingWentWrong));
            return;
        }
        // let isMessage = data.data ? data.data : '';
        setTimeout(() => {
            toastShow(I18n.t(globalText.otpSendSuccessfully));
        }, 100);
    };

    const onResetPassword = async () => {
        if (checkTimer) {
            if (value.toString().length == 0) {
                setErrorMessage(I18n.t(globalText._pleaseEnterOtp));
                return;
            }
            const randomOtp = await getAsyncStorage('VERIFY_OTP');
            if (value != randomOtp) {
                setErrorMessage(I18n.t(globalText._otpIsIncorrect));
                return;
            }
            if (value == randomOtp) {
                setErrorMessage('');
                props.navigation.replace('ResetPassword', { userValue: isUserData });
            }
        } else {
            setErrorMessage(I18n.t(globalText._otpIsIncorrect));
        }
    };

    return (
        <View style={styles.container}>
            <CustomBackground
                screen={
                    <View style={styles.sLoginMainView}>
                        <Text style={styles.passwordVerificationText}>{I18n.t(globalText._verification)}</Text>
                        {isErrorMessage != '' ? (
                            <Text style={[styles.errorMsgBoxStyle, styles.width80, styles.alignSelfCenter]}>
                                {isErrorMessage}
                            </Text>
                        ) : null}
                        <Text style={styles.passwordVerificationSimpleText}>
                            {I18n.t(globalText._entertheCodeToChangePassword)}
                        </Text>

                        {loader && <CustomLoader />}
                        <View style={styles.passwordVerificationOtpMainView}>
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
                                        style={[
                                            styles.passwordVerificationCell,
                                            isFocused && styles.passwordVerificationFocusCell,
                                        ]}
                                    >
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                        </View>

                        {checkTimer ? (
                            <Text style={styles.passwordVerificationTimerText}>
                                0{minutes} : {seconds < 10 ? `0${seconds}` : seconds}
                            </Text>
                        ) : (
                            <TouchableOpacity
                                onPress={() => {
                                    isValueForSend == 'Email'
                                        ? onEmailOTP()
                                        : isValueForSend == 'Mobile'
                                        ? onMobileOTP()
                                        : null;
                                }}
                            >
                                <Text style={styles.passwordVerificationResendText}>
                                    {I18n.t(globalText._resendCode)}
                                </Text>
                            </TouchableOpacity>
                        )}

                        <View style={styles.passwordVerificationButtonView}>
                            <AuthButton
                                buttonName={I18n.t(globalText._verify)}
                                authButtonStyle={styles.paddH60}
                                buttonStyle={styles.fontWeightNormal}
                                onPress={() => onResetPassword()}
                            />
                        </View>
                    </View>
                }
            />
        </View>
    );
};

export default PasswordVerification;
