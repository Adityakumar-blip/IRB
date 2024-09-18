import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Popover from 'react-native-popover-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomDropDown from '../../component/customDropdown';
import CustomLoader from '../../component/customLoader/index';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import Colors from '../../styles/colors';
import Api from '../../utils/api';
import authApi from '../../utils/authApi';
import {
    generateUrl,
    getAsyncStorage,
    getFormatedDate,
    getInThousand,
    subtractYears,
    toastShow,
} from '../../utils/customFunctions';
import CustomSurveyHistory from '../../component/customSurveyHistory/index';

const Survey = props => {
    const [rewardEarnPopover, setRewardEarnPopover] = useState(false);
    const [loader, setLoader] = useState(false);
    const [fromDate, setFromDate] = useState(null);
    const [fromShow, setFromShow] = useState(false);
    const [toDate, setToDate] = useState(null);
    const [toShow, setToShow] = useState(false);
    const [catogoryRewardListing, setCatogoryRewardListing] = useState([
        {
            id: 1,
            value: null,
            name: I18n.t(globalText._all),
        },
        {
            id: 2,
            value: '4',
            name: I18n.t(globalText._terminated),
        },
        {
            id: 3,
            value: '2',
            name: I18n.t(globalText._qualifiedApprove),
        },
        {
            id: 4,
            value: '1',
            name: I18n.t(globalText._qualifiedPending),
        },
        {
            id: 5,
            value: '3',
            name: I18n.t(globalText._qualifiedRejected),
        },
        {
            id: 6,
            value: '6',
            name: I18n.t(globalText._incomplete),
        },
        {
            id: 7,
            value: '5',
            name: I18n.t(globalText._quotafull),
        },
    ]);
    const [openCategory, setOpenCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [surveyHistoryList, setSurveyHistoryList] = useState([]);
    const [isLoaderFirst, setLoaderFirst] = useState(false);
    const [isDataLoaded, setDataLoaded] = useState(false);
    const [isSeeMore, setMore] = useState(true);
    const [currencyValue, setCurrencyValue] = useState('');
    const [openNotification, setOpenNotification] = useState(false);
    const [paginationData, setPaginationData] = useState({
        currentPage: 0,
        pageLimit: 10,
        skip: 0,
        totalCount: 0,
        totalPages: 0,
    });

    useFocusEffect(
        React.useCallback(() => {
            onPageInit();
        }, []),
    );

    const onPageInit = async () => {
        const getCurrenctySymbol = await getAsyncStorage('currencySymbol');
        setCurrencyValue(getCurrenctySymbol && getCurrenctySymbol);
        setLoader(true);
        await getSurveyHistory();
        setLoader(false);
        setDataLoaded(true);
    };

    useEffect(() => {
        if (fromDate || toDate || selectedCategory) {
            onUpdateCall();
        }
    }, [fromDate, toDate, selectedCategory]);

    const onUpdateCall = async () => {
        paginationData.currentPage = 0;
        paginationData.pageLimit = 10;
        paginationData.skip = 0;
        paginationData.totalCount = 0;
        paginationData.totalPages = 0;
        await setPaginationData({ ...paginationData });
        await getSurveyHistory(0);
    };

    const getSurveyHistory = async (currentPage = 0) => {
        setLoader(true);
        let page = currentPage ? currentPage : paginationData.currentPage;
        let limit = 10;
        let taskContent = currentPage == 0 ? [] : surveyHistoryList;
        let startDate =
            fromDate && fromDate.toString().length > 0
                ? getFormatedDate(new Date(fromDate).toString(), 'yyyy-mm-dd')
                : null;
        let endDate =
            toDate && toDate.toString().length > 0 ? getFormatedDate(new Date(toDate).toString(), 'yyyy-mm-dd') : null;
        if ((startDate && startDate.length > 0) || (endDate && endDate.length > 0)) {
            startDate = startDate ? startDate : getFormatedDate(subtractYears(1, new Date(toDate)), 'yyyy-mm-dd');
            endDate = endDate ? endDate : getFormatedDate(new Date().toString(), 'yyyy-mm-dd');
        }
        let selectedValaue =
            selectedCategory && Object.keys(selectedCategory).length > 0
                ? selectedCategory.value
                    ? selectedCategory.value
                    : null
                : null;

        const payload = {
            skip: paginationData.skip,
            limit: 10,
            startDate: startDate,
            endDate: endDate,
            status: selectedValaue,
        };
        let endPoint = `${Api.surveyHistoryTabGetListOfStatus}`;
        const generateUrlForSurvey = await generateUrl(endPoint, '', payload);
        const { data, message } = await authApi.getDataFromServer(generateUrlForSurvey);
        setLoader(false);
        setDataLoaded(true);
        if (!data) {
            setSurveyHistoryList([]);
            setDataLoaded(true);
            toastShow(message);
            return;
        }
        const isData = data && data.data && data.data.result;
        if (isData) {
            setSurveyHistoryList([...taskContent, ...isData]);
        } else {
            setSurveyHistoryList([]);
        }
        setPaginationData({
            currentPage: page + 1,
            totalPages: Math.ceil(data.data.totalCount / limit),
            pageLimit: 10,
            totalCount: data.data.totalCount,
            skip: Math.ceil(paginationData.skip + 10),
        });
        if (paginationData.currentPage + 1 == Math.ceil(data.data.totalCount / 10)) {
            setMore(false);
        } else {
            setMore(true);
        }
    };

    const fetch = () => {
        if (Number(paginationData.currentPage <= Number(paginationData.totalPages))) {
            getSurveyHistory(paginationData.currentPage);
        }
    };

    const renderItem = ({ item, index }) => (
        <View key={index} style={styles.paddB10}>
            <CustomSurveyHistory
                item={item}
                status={item.status}
                surveyId={item.survey_id}
                surveyAbout={item.survey_about}
                amount={item.amount}
                date={item.participated_on}
                isPopOver={rewardEarnPopover == index + 1}
                onPopOver={() => {
                    rewardEarnPopover == index + 1 ? setRewardEarnPopover('') : setRewardEarnPopover(index + 1);
                }}
            />
        </View>
    );

    const ListHeaderComponent = () => (
        <View style={styles.surveyTabDataMainView}>
            <View style={styles.surveyTapFirstView}>
                <Text style={[styles.fontSize12ColorTopazReWardTab, { maxWidth: '80%' }]}>
                    {I18n.t(globalText._surveyId)}
                </Text>
                <Popover
                    debug
                    popoverStyle={styles.colorBlack}
                    // mode={PopoverMode.TOOLTIP}
                    arrowShift={0}
                    // displayArea={{ x: 0, y: 5, height: 0, width: 0 }}
                    placement={'top'}
                    backgroundStyle={{ opacity: 0 }}
                    verticalOffset={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
                    isVisible={rewardEarnPopover == 'pop'}
                    // popoverStyle={styles.colorBlack}
                    // mode={PopoverMode.TOOLTIP}
                    onRequestClose={() => {
                        rewardEarnPopover == 'pop' ? setRewardEarnPopover('') : setRewardEarnPopover('pop');
                    }}
                    // displayArea={{ x: 0, y: 0, height: 100, width: 300 }}
                    // placement={'top'}
                    from={
                        <TouchableOpacity
                            onPress={() => {
                                rewardEarnPopover == 'pop' ? setRewardEarnPopover('') : setRewardEarnPopover('pop');
                            }}
                        >
                            <Ionicons name={'information-circle'} color={'grey'} size={10} style={styles.ml_3} />
                        </TouchableOpacity>
                    }
                >
                    <View style={[styles.colorBlack, styles.padd10, { marginBottom: Platform.OS == 'android' && 10 }]}>
                        <View style={styles.surveyPopView}>
                            <View style={styles.width25Static}>
                                <Entypo name="cross" size={15} color={'red'} style={styles.width20Simple} />
                            </View>
                            <Text style={styles.surveyPopViewText}>{I18n.t(globalText._terminated)}</Text>
                        </View>
                        <View style={styles.surveyPopView}>
                            <View style={styles.width25Static}>
                                <FontAwesome5 name="check" size={15} color={'green'} style={styles.width20Simple} />
                            </View>
                            <Text style={styles.surveyPopViewText}>{I18n.t(globalText._qualifiedApprove)}</Text>
                        </View>
                        <View style={styles.surveyPopView}>
                            <View style={styles.width25Static}>
                                <MaterialIcons name="refresh" size={15} color={'yellow'} style={styles.width20Simple} />
                            </View>
                            <Text style={styles.surveyPopViewText}>{I18n.t(globalText._qualifiedPending)}</Text>
                        </View>
                        <View style={styles.surveyPopView}>
                            <View style={styles.width25Static}>
                                <MaterialIcons
                                    name="highlight-remove"
                                    size={15}
                                    color={'red'}
                                    style={styles.width20Simple}
                                />
                            </View>
                            <Text style={styles.surveyPopViewText}>{I18n.t(globalText._qualifiedRejected)}</Text>
                        </View>
                        <View style={styles.surveyPopView}>
                            <View style={styles.width25Static}>
                                <MaterialCommunityIcons
                                    name="timer-sand-complete"
                                    size={15}
                                    color={'white'}
                                    style={styles.width20Simple}
                                />
                            </View>
                            <Text style={styles.surveyPopViewText}>{I18n.t(globalText._incomplete)}</Text>
                        </View>
                        <View style={styles.surveyPopView}>
                            <View style={styles.width25Static}>
                                <MaterialCommunityIcons
                                    name="lock"
                                    size={15}
                                    color={'#6666FF'}
                                    style={styles.width20Simple}
                                />
                            </View>
                            <Text style={styles.surveyPopViewText}>{I18n.t(globalText._quotafull)}</Text>
                        </View>
                    </View>
                </Popover>
            </View>

            <View style={styles.surveyTapSecondView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText._surveyAbout)}</Text>
            </View>
            <View style={styles.surveyTapThirsView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText._rewardEarned)}</Text>
            </View>
            <View style={styles.surveyTapFourthView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.date)}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView>
            <View styels={styles.container}>
                {loader && <CustomLoader />}
                <ScrollView
                    horizontal={false}
                    nestedScrollEnabled
                    style={styles.height100}
                    // contentContainerStyle={styles.accScrollContentStyle}
                >
                    <View style={styles.accFilterMain}>
                        <View style={styles.accCalDropMainView}>
                            <View style={styles.accFirstDropDView}>
                                <View style={[Platform.OS == 'ios' && styles.zIndex1]}>
                                    <CustomDropDown
                                        dropDownContainerStyleNew={styles.accDropDownContainerStyleNew}
                                        dropDStyleNew={styles.accDropDStyleNew}
                                        textStyleNew={styles.accDropDTextStyle}
                                        zIndex={1}
                                        //placeholder={selectedCategory ? selectedCategory : I18n.t(globalText.cateogries)}
                                        placeholder={selectedCategory ? selectedCategory : I18n.t(globalText._Tags)}
                                        open={openCategory}
                                        value={categoryValue}
                                        items={catogoryRewardListing}
                                        setOpen={setOpenCategory}
                                        setValue={setCategoryValue}
                                        setItems={setCatogoryRewardListing}
                                        displayKey={'name'}
                                        onItemChoose={item => {
                                            setSelectedCategory(item);
                                        }}
                                        labelProps={{ numberOfLines: 1 }}
                                    />
                                </View>
                            </View>
                            <View style={styles.accSecondDropDView}>
                                <TouchableOpacity onPress={() => setFromShow(!fromShow)}>
                                    {fromDate ? (
                                        <View style={styles.accCalSecondView}>
                                            <Text style={[styles.width60, styles.colorGrey]}>
                                                {getFormatedDate(new Date(fromDate), 'dd-mm-yyyy')}
                                            </Text>
                                            <AntDesign name={'calendar'} size={20} color={'grey'} />
                                        </View>
                                    ) : (
                                        <View style={styles.accCalSecondView}>
                                            <Text style={[styles.width60, styles.colorGrey]}>
                                                {I18n.t(globalText.from)}
                                            </Text>
                                            <AntDesign name={'calendar'} size={20} color={'grey'} />
                                        </View>
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setToShow(!toShow)}>
                                    {toDate ? (
                                        <View style={styles.accCalFirstView}>
                                            <Text style={[styles.width60, styles.colorGrey]}>
                                                {getFormatedDate(new Date(toDate), 'dd-mm-yyyy')}
                                            </Text>
                                            <AntDesign name={'calendar'} size={20} color={'grey'} />
                                        </View>
                                    ) : (
                                        <View style={styles.accCalFirstView}>
                                            <Text style={[styles.width60, styles.colorGrey]}>
                                                {I18n.t(globalText.to)}
                                            </Text>

                                            <AntDesign name={'calendar'} size={20} color={'grey'} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.paddB200, styles.zIndexMinus1]}>
                        <View style={styles.container}>
                            <View style={styles.accScreenBackFog}>
                                <FlatList
                                    // horizontal
                                    vertical={false}
                                    data={[1]}
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.container}
                                    renderItem={(i, j) => (
                                        <FlatList
                                            scrollEnabled={false}
                                            showsHorizontalScrollIndicator={false}
                                            stickyHeaderIndices={[0]}
                                            data={surveyHistoryList && surveyHistoryList}
                                            style={styles.container}
                                            ListHeaderComponent={ListHeaderComponent}
                                            renderItem={renderItem}
                                            keyExtractor={(item, index) => index}
                                            ListFooterComponent={() => (
                                                <View>
                                                    {isDataLoaded &&
                                                        surveyHistoryList &&
                                                        surveyHistoryList.length == 0 && (
                                                            <Text style={styles.textCenter}>
                                                                {I18n.t(globalText.noRecordFound)}
                                                            </Text>
                                                        )}
                                                    {/* {isSeeMore &&
                                                        isDataLoaded &&
                                                        surveyHistoryList &&
                                                        surveyHistoryList.length > 0 && (
                                                            <View style={styles.alignSelfCenter}>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        fetch();
                                                                    }}
                                                                >
                                                                    <Text>{I18n.t(globalText._seeMore)}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        )} */}
                                                </View>
                                            )}
                                        />
                                    )}
                                    keyExtractor={(i, j) => j}
                                />
                            </View>
                            {isSeeMore && isDataLoaded && surveyHistoryList && surveyHistoryList.length > 0 && (
                                <View style={styles.alignSelfCenter}>
                                    <TouchableOpacity
                                        style={styles.accounTabLoaderMorebittonView}
                                        onPress={() => {
                                            fetch();
                                        }}
                                    >
                                        <Text style={styles.whiteTextColor}>{I18n.t(globalText.loadMore)}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
                {fromShow && (
                    <DateTimePickerModal
                        isVisible={fromShow}
                        mode="date"
                        date={fromDate ? new Date(fromDate) : toDate ? new Date(toDate) : new Date()}
                        onConfirm={date => {
                            setFromDate(date);
                            setFromShow(false);
                        }}
                        maximumDate={toDate ? new Date(toDate) : new Date()}
                        onCancel={() => setFromShow(false)}
                    />
                )}
                {toShow && (
                    <DateTimePickerModal
                        isVisible={toShow}
                        mode="date"
                        date={toDate ? new Date(toDate) : new Date()}
                        maximumDate={new Date()}
                        minimumDate={fromDate && fromDate.toString().length > 0 && new Date(fromDate)}
                        onConfirm={date => {
                            setToDate(date);
                            setToShow(false);
                        }}
                        onCancel={() => setToShow(false)}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Survey;
