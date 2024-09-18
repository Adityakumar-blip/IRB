import React, { useEffect, useRef, useState } from 'react';
import { Platform, SafeAreaView, Text, TextInput, View } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import DocumentPicker, { types } from 'react-native-document-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SimpleReactValidator from 'simple-react-validator';
import CustomBackGround from '../../component/customBackground/index';
import CustomButton from '../../component/customButton/index';
import CustomDropDown from '../../component/customDropdown';
import CustomHeader from '../../component/customHeader/index';
import CustomLoader from '../../component/customLoader/index';
import CustomTextInput from '../../component/customTextInput/index';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import colors from '../../styles/colors';
import CustomValidation from '../../utils/CustomValidation';
import Api from '../../utils/api';
import { getAsyncStorage } from '../../utils/customFunctions';
import { Singular } from 'singular-react-native';

const NeedHelp = props => {
    const simpleValidator = useRef(new SimpleReactValidator());
    const [allValid, setAllValid] = useState(true);
    const [subject, setSubject] = useState('');
    const [isMessage, setMessage] = useState('');
    const [attachmentResponse, setAttachmentResponse] = useState(null);
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [isErrorMessageShow, setErrorMessageShow] = useState(true);
    const [categotyData, setCategotyData] = useState([]);
    const [isListing, setListing] = useState([
        {
            name: I18n.t(globalText._myAccount),
        },
        {
            name: I18n.t(globalText._surveyInvitation),
        },
        {
            name: I18n.t(globalText._profiles),
        },
        {
            name: I18n.t(globalText._surveyExperience),
        },
        {
            name: I18n.t(globalText._polls),
        },
        {
            name: I18n.t(globalText._rewardCredits),
        },
        {
            name: I18n.t(globalText._rewardRedemption),
        },
        {
            name: I18n.t(globalText._contentAbuse),
        },
    ]);
    const [isSuecessMsg, setSuecessMsg] = useState('');
    const [seconds, setSeconds] = useState(0);

    const id = useRef(null);

    const clear = () => {
        BackgroundTimer.clearInterval(id.current);
    };

    useEffect(() => {
        Singular.event("NeedHelp");
        id.current = BackgroundTimer.setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                setSuecessMsg('');
                clear();
            }
        }, 1000);

        return () => {
            clear();
        };
    });
    const onPressReset = () => {
        setValue(null);
        setSubject('');
        setMessage('');
        setAttachmentResponse(null);
        setErrorMessageShow(false);
    };

    const onPressBrowsFile = async () => {
        const response = await DocumentPicker.pickSingle({
            type: [types.allFiles],
        });

        if (response && Object.keys(response).length > 0) {
            let temp = await response;
            setAttachmentResponse(temp);
        }
    };

    const onPressSubmit = async () => {
        const formValid = simpleValidator.current.allValid();
        let checkValue = subject.length > 0 && isMessage.length > 0 && value.length > 0;
        if (!checkValue) {
            setErrorMessageShow(true);
            setAllValid(false);
            simpleValidator.current.showMessages();
            return;
        }
        setLoader(true);
        const formData = new FormData();
        formData.append('inquiry_type', value && value);
        formData.append('subject', subject && subject);
        formData.append('message', isMessage && isMessage);
        if (attachmentResponse) {
            formData.append('attachment', {
                uri: attachmentResponse.uri,
                name: attachmentResponse.name,
                type: attachmentResponse.type,
            });
        }
        const token = await JSON.parse(await getAsyncStorage('Token'));

        fetch(Api.need_help, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-access-token': token,
            },
            body: formData,
        })
            .then(resp => {
                // 'resp', JSON.stringify(resp));
            })
            .catch(err => {
                // err', err);
            });
        // setLoader(false);
        setValue(null);
        setSubject('');
        setMessage('');
        setAttachmentResponse(null);
        setErrorMessageShow(false);
        setSuecessMsg(I18n.t(globalText.emailSentSuccessfully));
        // setTimeout(() => {
        //     toastShow(I18n.t(globalText.emailSentSuccessfully, 'LONG'));
        // }, 100);
        setSeconds(7);
        setLoader(false);
    };

    useEffect(() => {
        onPageInit();
    }, []);

    const onPageInit = async () => {
        setLoader(true);
        const isProfileMenuData = await JSON.parse(await getAsyncStorage('myProfileData'));
        setCategotyData(isProfileMenuData);
        setLoader(false);
    };

    const onCall = (item, item1, index) => {
        props.navigation.navigate('Basic_Profile', { data: item, id: item1.sub_category_type_id });
    };

    return (
        <View style={styles.container}>
            <CustomBackGround
                screen={
                    <SafeAreaView style={styles.height100}>
                        <CustomHeader
                            backIcon
                            headerName={I18n.t(globalText.needHelp)}
                            onPressLeftIcon={() => props.navigation.goBack()}
                            // onPressLeftIcon={() => props.navigation.openDrawer()}
                            threeDotNeed
                            categotyData={categotyData && categotyData}
                            onCall={(item, item1, index) => onCall(item, item1, index)}
                        />
                        {loader && <CustomLoader />}
                        <View style={styles.height100BackWhite}>
                            <KeyboardAwareScrollView
                                extraScrollHeight={50}
                                nestedScrollEnabled
                                enableOnAndroid={false}
                                enableAutomaticScroll={false}
                                contentContainerStyle={{ flexGrow: 1 }}
                            >
                                <View style={styles.padd80}>
                                    <View style={styles.padd15}>
                                        {isSuecessMsg != '' ? (
                                            <Text style={styles.sucessMsgBoxStyle}>{isSuecessMsg}</Text>
                                        ) : null}
                                        <Text style={styles.needHelpShareText}>
                                            {I18n.t(globalText.needHelpShareText)}
                                        </Text>
                                        <View style={[styles.marT25, Platform.OS == 'ios' && styles.zIndex1]}>
                                            <Text style={styles.needHelpQueryType}>
                                                {I18n.t(globalText.queryType)}
                                                <Text style={styles.redTxt}> *</Text>
                                            </Text>
                                            <CustomDropDown
                                                zIndex={2}
                                                defaultValue={I18n.t(globalText.choose)}
                                                dropDStyleNew={styles.redemptionRequestDropDown}
                                                open={open}
                                                setOpen={setOpen}
                                                value={value}
                                                setValue={setValue}
                                                items={isListing}
                                                setItems={setListing}
                                                displayKey={'name'}
                                                onItemChoose={async item => {}}
                                            />
                                        </View>
                                        <View style={styles.marT10}>
                                            {isErrorMessageShow && (
                                                <View style={styles.marL10}>
                                                    {CustomValidation.fieldErrorMsg(
                                                        simpleValidator,
                                                        I18n.t(globalText.queryType),
                                                        value,
                                                        'required',
                                                    )}
                                                </View>
                                            )}
                                        </View>
                                        <View style={styles.marT16}>
                                            <CustomTextInput
                                                headerName={I18n.t(globalText.subject)}
                                                imp
                                                placeholder={I18n.t(globalText.pleaseEnterSubject)}
                                                placeholderTextColor={colors.STEEL_GREY}
                                                inputMainViewNew={styles.height45}
                                                txtInptStyle={styles.height100}
                                                term={subject}
                                                onChangeText={txt => setSubject(txt)}
                                                keyboardType={
                                                    Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'
                                                }
                                                onBlur={() =>
                                                    CustomValidation.onBlurField(
                                                        simpleValidator,
                                                        allValid,
                                                        I18n.t(globalText.subject),
                                                    )
                                                }
                                            />
                                        </View>
                                        {isErrorMessageShow && (
                                            <View style={styles.marL10}>
                                                {CustomValidation.fieldErrorMsg(
                                                    simpleValidator,
                                                    I18n.t(globalText.subject),
                                                    subject,
                                                    'required',
                                                )}
                                            </View>
                                        )}

                                        <View style={styles.marT16}>
                                            <Text style={styles.txtStyle}>
                                                {I18n.t(globalText.message)}
                                                <Text style={styles.redTxt}> *</Text>
                                            </Text>
                                            <View style={styles.needHelpMessageInput}>
                                                <TextInput
                                                    placeholderTextColor={colors.STEEL_GREY}
                                                    style={styles.padV10}
                                                    placeholder={I18n.t(globalText.pleaseEnterMessage)}
                                                    multiline
                                                    value={isMessage}
                                                    onChangeText={txt => setMessage(txt)}
                                                    keyboardType={
                                                        Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'
                                                    }
                                                    onBlur={() =>
                                                        CustomValidation.onBlurField(
                                                            simpleValidator,
                                                            allValid,
                                                            I18n.t(globalText.message),
                                                        )
                                                    }
                                                />
                                            </View>
                                        </View>
                                        {isErrorMessageShow && (
                                            <View style={styles.marL10}>
                                                {CustomValidation.fieldErrorMsg(
                                                    simpleValidator,
                                                    I18n.t(globalText.message),
                                                    isMessage,
                                                    'required',
                                                )}
                                            </View>
                                        )}

                                        <Text style={styles.needHelpAttachmentView}>
                                            {I18n.t(globalText.attachment)}
                                        </Text>
                                        <CustomButton
                                            addButtonStyle={styles.needHelpBrowseButton}
                                            addButtonTextStyle={styles.fontSize14}
                                            buttonName={I18n.t(globalText.browseFile)}
                                            onPress={() => onPressBrowsFile()}
                                        />
                                        {attachmentResponse && (
                                            <Text style={styles.needHelpDocumentTextStyle}>
                                                {attachmentResponse.name}
                                            </Text>
                                        )}
                                        <View style={styles.needHelpBottomButtonView}>
                                            <View style={styles.m10}>
                                                <CustomButton
                                                    addButtonStyle={styles.needHelpSubmitButton}
                                                    addButtonTextStyle={styles.fontSize14}
                                                    buttonName={I18n.t(globalText.submit)}
                                                    onPress={() => {
                                                        onPressSubmit();
                                                    }}
                                                />
                                            </View>
                                            <View style={styles.m10}>
                                                <CustomButton
                                                    addButtonStyle={styles.needHelpResetButton}
                                                    addButtonTextStyle={styles.needHelpResetButtonText}
                                                    buttonName={I18n.t(globalText.reset)}
                                                    disabled={false}
                                                    activeOpacity={0}
                                                    onPress={() => {
                                                        onPressReset();
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </KeyboardAwareScrollView>
                        </View>
                    </SafeAreaView>
                }
            />
        </View>
    );
};
export default NeedHelp;
