import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    Text,
    useWindowDimensions,
    View,
    TouchableOpacity,
    Linking,
    Alert,
    Platform,
    TouchableNativeFeedback,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import CustomBackGround from '../../component/customBackground/index';
import CustomCircularText from '../../component/customCircularText/index';
import CustomHeader from '../../component/customHeader/index';
import CustomLoader from '../../component/customLoader/index';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import { toastShow } from '../../utils/customFunctions';
import I18n from '../../i18n/index';
import FastImage from 'react-native-fast-image';
import globalImages from '../../helper/globalImages';
import LatestTrollShareModal from '../latestTrollShareModal/index';
import { constant } from '../../utils/constants';
import Share, { Social } from 'react-native-share';
import { getAsyncStorage } from '../../utils/customFunctions';
import { ShareDialog } from 'react-native-fbsdk';
import { Singular } from 'singular-react-native';

const GlobalInsightDetail = props => {
    const { width } = useWindowDimensions();
    const [globalDetail, setGlobalDetail] = useState([]);
    const [loader, setLoader] = useState(false);
    const [isQuestionData, setQuestionData] = useState({});
    const [isTag, setTag] = useState([]);
    const [isDataLoaded, setDataLoaded] = useState(false);
    const [isModal, setModal] = useState(false);
    const [categotyData, setCategotyData] = useState([]);

    useEffect(() => {

        Singular.event("GlobalInsightsDetail");
        onPageInit();
        return () => {
            cleanUp();
        };
    }, []);

    const cleanUp = () => {
        setGlobalDetail([]);
        setTag([]);
    };

    const onPageInit = async () => {
        setLoader(true);
        const isData = (await props.route) && props.route.params && props.route.params.item;
        setQuestionData(isData && isData);
        const isProfileMenuData = await JSON.parse(await getAsyncStorage('myProfileData'));
        setCategotyData(isProfileMenuData);
        await onGlobalDetail(isData.poll_id);
        await onGlobalInsightTags(isData.poll_sub_category_type_id);
        setDataLoaded(true);
        setLoader(false);
    };

    const onGlobalDetail = async id => {
        const endPoint = `${Api.pollSynopsisSummaryDetail}?poll_id=${id}`;
        const { data, message } = await AuthApi.getDataFromServer(endPoint);
        if (!data) {
            toastShow(message);
            return;
        }
        const isData = data && data.data && data.data.data;
        if (isData) {
            setGlobalDetail(isData && isData);
        }
    };

    const onGlobalInsightTags = async id => {
        const endPoint = `${Api.pollSynopsisTags}?limit=${10000}&poll_sub_category_type_id=${id}`;
        const { data, message } = await AuthApi.getDataFromServer(endPoint);
        if (!data) {
            toastShow(message);
            return;
        }
        const isData = data && data.data && data.data.data;
        if (isData) {
            setTag(isData && isData);
        }
    };

    const onCallTag = item => {
        props.navigation.navigate('Culture', { id: item.poll_sub_category_id, data: item });
    };

    const onPressShareVia = async (type, shareVia) => {
        setModal(false);
        let shareParameter = [];
        const shareValue = isQuestionData.perma_link
            ? constant['livePollShare'] + isQuestionData.perma_link
            : constant['livePollShare'];

        let newLink = shareValue;
        if (shareValue) {
            type == 'facebook'
                ? shareParameter.push('u=' + encodeURI(shareValue))
                : type == 'twitter'
                ? shareParameter.push('url=' + encodeURI(shareValue))
                : type == 'linkedIn'
                ? shareParameter.push('url=' + encodeURI(shareValue))
                : null;
        }
        if (type == 'linkedIn' && Platform.OS != 'ios') {
            Share.shareSingle({
                url: newLink,
                social: Share.Social.LINKEDIN,
            });
        } else if (type == 'facebook') {
            const shareLinkContent = {
                contentType: 'link',
                contentUrl: newLink,
                contentDescription: '',
            };
            await shareLinkWithShareDialog(shareLinkContent);
        } else {
            const url =
                type == 'facebook'
                    ? `${constant['facebookShareLink']}?u=${newLink}`
                    : type == 'twitter'
                    ? constant['twetterShareLink'] + shareParameter.join('&')
                    : type == 'linkedIn'
                    ? `${constant['linkedinShareLinkNew']}&url=${newLink}`
                    : null;
            Linking.openURL(url)
                .then(data => {
                    // Alert.alert(`${type} Opened`);
                })
                .catch(() => {
                    Alert.alert(I18n.t(globalText.somethingWentWrong));
                });
        }
    };

    const shareLinkWithShareDialog = shareLinkContent => {
        ShareDialog.canShow(shareLinkContent)
            .then(function (canShow) {
                if (canShow) {
                    return ShareDialog.show(shareLinkContent);
                }
            })
            .then(
                function (result) {
                    if (result.isCancelled) {
                        // toastShow('Share cancelled');
                    } else {
                        // toastShow('Share success with postId: ' + result.postId);
                    }
                },
                function (error) {
                    // toastShow('Share fail with error: ' + error);
                },
            );
    };

    const onCall = (item, item1, index) => {
        props.navigation.navigate('Basic_Profile', { data: item, id: item1.sub_category_type_id });
    };

    return (
        <View style={styles.container}>
            <CustomBackGround
                screen={
                    <View style={styles.height100}>
                        <CustomHeader
                            backIcon
                            onPressLeftIcon={() => props.navigation.goBack()}
                            threeDotNeed
                            categotyData={categotyData && categotyData}
                            onCall={(item, item1, index) => onCall(item, item1, index)}
                        />
                        {loader && <CustomLoader />}
                        <View style={styles.height100BackWhite}>
                            <View style={styles.padB50}>
                                <ScrollView>
                                    <View style={styles.padd15}>
                                        <Text style={styles.globInFirstText}>
                                            {isQuestionData && isQuestionData.question_in_local}
                                        </Text>
                                        <TouchableOpacity onPress={() => setModal(true)}>
                                            <FastImage style={styles.globInShareIcon} source={GlobalImages.shareIcon} />
                                        </TouchableOpacity>
                                        <FastImage
                                            style={styles.globInImageStyel}
                                            source={
                                                isQuestionData &&
                                                isQuestionData.image &&
                                                isQuestionData.image.length > 0 &&
                                                isQuestionData.image_name
                                                    ? { uri: isQuestionData.image_name }
                                                    : globalImages.sampleIcon
                                            }
                                        />
                                        {isDataLoaded && globalDetail && globalDetail.length > 0 && (
                                            <RenderHtml
                                                enableExperimentalMarginCollapsing={true}
                                                contentWidth={width}
                                                source={{ html: globalDetail[0].summary_in_local }}
                                                tagsStyles={{
                                                    a: styles.renderHtmlStyleA,
                                                    p: styles.renderHtmlStyleP,
                                                }}
                                            />
                                        )}
                                        {isDataLoaded && globalDetail && globalDetail.length == 0 && (
                                            <Text style={[styles.marT25, styles.textCenter]}>
                                                {I18n.t(globalText.noRecordFound)}
                                            </Text>
                                        )}
                                        {isDataLoaded && (
                                            <ScrollView horizontal>
                                                <View style={styles.marV10}>
                                                    <CustomCircularText
                                                        data={isTag && isTag}
                                                        onPress={item => onCallTag(item)}
                                                    />
                                                </View>
                                            </ScrollView>
                                        )}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                }
            />
            {isModal && (
                <LatestTrollShareModal
                    onPressFacebook={() => {
                        setModal(false);
                        onPressShareVia('facebook');
                    }}
                    onPressTwitter={() => {
                        setModal(false);
                        onPressShareVia('twitter');
                    }}
                    onPressLinkedin={() => {
                        setModal(false);
                        onPressShareVia('linkedIn');
                    }}
                    onRequestClose={() => setModal(false)}
                    onPressOutside={() => setModal(false)}
                />
            )}
        </View>
    );
};

export default GlobalInsightDetail;
