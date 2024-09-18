import { firebase } from '@react-native-firebase/dynamic-links';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, ScrollView, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native';
import SimpleReactValidator from 'simple-react-validator';
import CustomButton from '../../component/customButton/index';
import CustomLoader from '../../component/customLoader/index';
import CustomTextInput from '../../component/customTextInput/index';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import colors from '../../styles/colors';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import { constant } from '../../utils/constants';
import { toastShow, getAsyncStorage } from '../../utils/customFunctions';
import CustomValidation from '../../utils/CustomValidation';
import { Singular } from 'singular-react-native';

const EmailReferral = props => {
    const { visible, onRequestClose, onPress, onPressOutside, userDetials } = props;

    const simpleValidator = useRef(new SimpleReactValidator());
    const [loader, setLoader] = useState(false);
    const [referalName, setReferalName] = useState('');
    const [referalEmail, setReferalEmail] = useState('');
    const [allValid, setAllValid] = useState(true);
    const [isLink, setLink] = useState('');
    const [isErrorMessage, setErrorMessage] = useState('');
    const [isBasicInfo, setBasicInfo] = useState({});

    useEffect(() => {

        Singular.event("EmailRefferal");
        onPageInit();
        getUserInfo();
    }, []);

    

    const getUserInfo = async () => {
        const getBasicInfo = await JSON.parse(await getAsyncStorage('Login_Data'));
        setBasicInfo(getBasicInfo);
    };

    const onPageInit = async () => {
        const link = await firebase.dynamicLinks().buildShortLink({
            link: `https://opinionbureau.page.link/?${userDetials.userid}&${'false'}&${'0'}`,
            android: {
                packageName: 'com.opinionbureau',
            },
            domainUriPrefix: 'https://opinionbureau.page.link',
        });
        setLink(link && link);
    };

    const onPressSend = async () => {
        const formValid = simpleValidator.current.allValid();
        if (!formValid) {
            setAllValid(false);
            simpleValidator.current.showMessages();
            return;
        }
        setLoader(true);
        const payloadToCheck = {
            email: referalEmail.toLowerCase() ? referalEmail.toLowerCase() : '',
            phone_number: '',
            country_id: isBasicInfo.country_id,
        };
        const { data, message, success } = await AuthApi.postDataToServer(
            Api.signupSinupEmailVerificationApi,
            payloadToCheck,
        );
        setLoader(false);
        if (!data) {
            message == '"email" must be a valid email'
                ? setErrorMessage(I18n.t(globalText.enterAValidAndActiveEmailAddress))
                : toastShow(message && message);
            return;
        }
        let resData = data && data.data;
        if (resData.email != 'success' && referalEmail.length != 0) {
            resData.email == '"email" must be a valid email'
                ? setErrorMessage(I18n.t(globalText.enterAValidAndActiveEmailAddress))
                : resData.email == 'Email is not valid'
                ? setErrorMessage(I18n.t(globalText.enterAValidAndActiveEmailAddress))
                : resData.email == 'Email is already exist'
                ? setErrorMessage(I18n.t(globalText.userIsAlreadyExist))
                : null;
            return;
        }
        setErrorMessage('');
        onEmailRefer();
    };

    const onEmailRefer = async () => {
        const payload = {
            referral_name: referalName,
            referral_email_id: referalEmail,
            link: isLink,
        };
        const { data, message, success } = await AuthApi.postDataToServer(Api.refer_and_earn, payload);
        setLoader(false);
        if (!data) {
            toastShow(message);
        }
        setTimeout(() => {
            toastShow(I18n.t(globalText.emailSentSuccessfully));
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
                opacity={0.1}
                statusBarTranslucent
            />
            <TouchableWithoutFeedback onPress={() => onPressOutside()}>
                <View style={styles.emailRefFirstView}>
                    {loader && <CustomLoader />}
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <ScrollView style={styles.height100} contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={styles.height100AlignIJusCenter}>
                                <View style={styles.emailRefUnderViewView}>
                                    {isErrorMessage != '' ? (
                                        <View style={[styles.marH15, styles.marT15]}>
                                            <Text style={styles.errorMsgBoxStyleNew}>{isErrorMessage}</Text>
                                        </View>
                                    ) : null}
                                    <Text style={styles.emailRefTitle}>{I18n.t(globalText.emailToYrRef)}</Text>
                                    <View style={styles.borderGrey} />
                                    <View style={styles.marH15}>
                                        <View style={styles.marT10}>
                                            <CustomTextInput
                                                inputMainViewNew={styles.height45}
                                                headerName={I18n.t(globalText.reffName)}
                                                onChangeText={i => setReferalName(i)}
                                                onBlur={() =>
                                                    CustomValidation.onBlurField(
                                                        simpleValidator,
                                                        allValid,
                                                        I18n.t(globalText.reffName),
                                                    )
                                                }
                                            />
                                        </View>
                                        {simpleValidator.current.message(
                                            I18n.t(globalText.reffName),
                                            referalName,
                                            'required|string|alpha_space',
                                        ) && (
                                            <Text style={styles.redColorText}>
                                                {I18n.t(globalText._theMessageMustBeRequired, {
                                                    _message: I18n.t(globalText.reffName).toLowerCase(),
                                                })}
                                            </Text>
                                        )}
                                        {/* {CustomValidation.fieldErrorMsg(
                                            simpleValidator,
                                            I18n.t(globalText.reffName),
                                            referalName,
                                            'required|',
                                        )} */}
                                        <View style={styles.marT10}>
                                            <CustomTextInput
                                                inputMainViewNew={styles.height45}
                                                headerName={I18n.t(globalText.referralEmailAdd)}
                                                keyboardType={'email-address'}
                                                onChangeText={i => setReferalEmail(i)}
                                                onBlur={() =>
                                                    CustomValidation.onBlurField(
                                                        simpleValidator,
                                                        allValid,
                                                        I18n.t(globalText.referralEmailAdd),
                                                    )
                                                }
                                            />
                                        </View>
                                        {simpleValidator.current.message(
                                            I18n.t(globalText.email),
                                            referalEmail,
                                            'required|email',
                                        ) && (
                                            <Text style={styles.redColorText}>
                                                {referalEmail && referalEmail.length > 0
                                                    ? I18n.t(globalText._theValueMustBeValid, {
                                                          _firstValue: I18n.t(
                                                              globalText.referralEmailAdd,
                                                          ).toLowerCase(),
                                                          _lastValue: I18n.t(globalText._emailAdree).toLowerCase(),
                                                      })
                                                    : I18n.t(globalText._theMessageMustBeRequired, {
                                                          _message: I18n.t(globalText.referralEmailAdd).toLowerCase(),
                                                      })}
                                            </Text>
                                        )}
                                        {/* {CustomValidation.fieldErrorMsg(
                                            simpleValidator,
                                            I18n.t(globalText.referralEmailAdd),
                                            referalEmail,
                                            'required|email',
                                        )} */}
                                    </View>
                                    <View style={styles.emailButtonView}>
                                        <CustomButton
                                            buttonName={I18n.t(globalText.submit)}
                                            addButtonStyle={styles.paddH27paddV10}
                                            onPress={() => onPressSend()}
                                        />
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default EmailReferral;
