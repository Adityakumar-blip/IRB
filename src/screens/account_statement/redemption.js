import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDropDown from '../../component/customDropdown';
import CustomLoader from '../../component/customLoader/index';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import Api from '../../utils/api';
import authApi from '../../utils/authApi';
import {
    getAsyncStorage,
    getFormatedDate,
    getInThousand,
    subtractYears,
    toastShow,
    generateUrl,
} from '../../utils/customFunctions';
import CustomRedemption from '../../component/customRedmption/index';

const Redemption = props => {
    const [loader, setLoader] = useState(false);

    const [fromDate, setFromDate] = useState(null);
    const [fromShow, setFromShow] = useState(false);
    const [toDate, setToDate] = useState(null);
    const [toShow, setToShow] = useState(false);
    const [remainBalancePopover, setRemainBalancePopover] = useState(false);
    const [catogoryRewardListing, setCatogoryRewardListing] = useState([
        {
            id: 1,
            value: null,
            name: I18n.t(globalText._all),
        },
        {
            id: 2,
            value: '1',
            name: I18n.t(globalText._paid),
        },
        {
            id: 3,
            value: '2',
            name: I18n.t(globalText._processing),
        },
        {
            id: 4,
            value: '3',
            name: I18n.t(globalText._rejected),
        },
    ]);
    const [openCategory, setOpenCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [opinionRewardData, setOpinionRewardData] = useState([]);
    const [isDataLoaded, setDataLoaded] = useState(false);
    const [isSeeMore, setMore] = useState(true);
    const [currencyValue, setCurrencyValue] = useState('');
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

    useEffect(() => {
        onUpdateCall();
    }, [fromDate, toDate, selectedCategory]);

    const onUpdateCall = async () => {
        paginationData.currentPage = 0;
        paginationData.pageLimit = 10;
        paginationData.skip = 0;
        paginationData.totalCount = 0;
        paginationData.totalPages = 0;
        await setPaginationData({ ...paginationData });
        await opinionRewardList(0);
    };

    const onPageInit = async () => {
        const getCurrenctySymbol = await getAsyncStorage('currencySymbol');
        setCurrencyValue(getCurrenctySymbol && getCurrenctySymbol);
        setLoader(true);
        await opinionRewardList(0);
        setLoader(false);
    };

    const opinionRewardList = async (currentPage = 0) => {
        setLoader(true);
        let page = currentPage ? currentPage : paginationData.currentPage;
        let limit = 10;
        let taskContent = currentPage == 0 ? [] : opinionRewardData;
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
            reward_status: selectedValaue,
        };
        let endPoint = `${Api.opinionbRewardList}`;
        const generateUrlForRedemption = await generateUrl(endPoint, '', payload);
        const { data, message } = await authApi.getDataFromServer(generateUrlForRedemption);
        setLoader(false);
        if (!data) {
            setOpinionRewardData([]);
            setDataLoaded(true);
            toastShow(message);
            return;
        }
        const isData = data && data.data && data.data.data;
        setOpinionRewardData([...taskContent, ...isData]);
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
        setDataLoaded(true);
    };

    const fetch = () => {
        if (Number(paginationData.currentPage <= Number(paginationData.totalPages))) {
            opinionRewardList(paginationData.currentPage);
        }
    };

    const ListHeaderComponent = () => (
        <View style={styles.redTapListMainView}>
            <View style={styles.redTapListFirstView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText._RequestId)}</Text>
            </View>

            <View style={styles.redTapListsecondView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.amount)}</Text>
            </View>
            <View style={styles.redTapListThirdView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.option)}</Text>
                <Popover
                    debug
                    popoverStyle={styles.colorBlack}
                    // mode={PopoverMode.TOOLTIP}
                    // displayArea={{ x: 0, y: 5, height: 0, width: 0 }}
                    isVisible={'headerNEW' == remainBalancePopover}
                    placement={'top'}
                    arrowShift={-0.1}
                    backgroundStyle={{ opacity: 0 }}
                    verticalOffset={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
                    onRequestClose={() => {
                        'headerNEW' == remainBalancePopover
                            ? setRemainBalancePopover('')
                            : setRemainBalancePopover('headerNEW');
                    }}
                    from={
                        <TouchableOpacity
                            onPress={() => {
                                'headerNEW' == remainBalancePopover
                                    ? setRemainBalancePopover('')
                                    : setRemainBalancePopover('headerNEW');
                            }}
                        >
                            <Ionicons name={'information-circle'} color={'grey'} size={10} style={styles.ml_3} />
                        </TouchableOpacity>
                    }
                >
                    <View style={styles.redTapPopView}>
                        <View style={styles.rowCenter}>
                            <Entypo name="cross" size={20} color={'red'} />
                            <Text style={styles.redTapPopTextStyle}>{I18n.t(globalText._rejected)}</Text>
                        </View>
                        <View style={styles.rowCenter}>
                            <FontAwesome5 name="check" size={20} color={'green'} />
                            <Text style={styles.redTapPopTextStyle}>{I18n.t(globalText._paid)}</Text>
                        </View>
                        <View style={styles.rowCenter}>
                            <MaterialCommunityIcons name="reload" size={20} color={'grey'} />
                            <Text style={styles.redTapPopTextStyle}>{I18n.t(globalText._processing)}</Text>
                        </View>
                    </View>
                </Popover>
            </View>
            <View style={styles.redTapListFourthView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.date)}</Text>
            </View>
        </View>
    );

    const renderItem = ({ item, index }) => (
        <View key={index} style={styles.paddB10}>
            <CustomRedemption
                item={item}
                requestID={item.RequestID}
                amount={item.Amount}
                options={item.Options}
                date={item.Date}
                reward_status={item.reward_status}
                isPopOver={item.RequestID == remainBalancePopover}
                onPressPopOver={() => {
                    item.RequestID == remainBalancePopover
                        ? setRemainBalancePopover('')
                        : setRemainBalancePopover(item.RequestID);
                }}
            />
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
                    contentContainerStyle={[styles.accScrollContentStyle, styles.zIndex1]}
                >
                    <View style={styles.accFilterMain}>
                        <View style={styles.accCalDropMainView}>
                            <View style={styles.accFirstDropDView}>
                                <View style={[Platform.OS == 'ios' && styles.zIndex1]}>
                                    <CustomDropDown
                                        dropDownContainerStyleNew={[
                                            styles.accDropDownContainerStyleNew,
                                            //styles.width80,
                                        ]}
                                        dropDStyleNew={styles.accDropDStyleNew}
                                        textStyleNew={styles.accDropDTextStyle}
                                        zIndex={1}
                                        placeholder={selectedCategory ? selectedCategory : I18n.t(globalText._Tags)}
                                        open={openCategory}
                                        value={categoryValue}
                                        items={catogoryRewardListing}
                                        setOpen={setOpenCategory}
                                        setValue={setCategoryValue}
                                        setItems={setCatogoryRewardListing}
                                        displayKey={'name'}
                                        onItemChoose={item => setSelectedCategory(item)}
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
                        <View style={styles.accScreenBackFog}>
                            <FlatList
                                //horizontal
                                vertical={false}
                                showsHorizontalScrollIndicator={false}
                                data={[1]}
                                style={styles.container}
                                renderItem={() => (
                                    <FlatList
                                        scrollEnabled={false}
                                        stickyHeaderIndices={[0]}
                                        showsHorizontalScrollIndicator={false}
                                        data={opinionRewardData}
                                        style={styles.container}
                                        ListHeaderComponent={ListHeaderComponent}
                                        renderItem={renderItem}
                                        keyExtractor={(item, index) => index}
                                        ListFooterComponent={() => (
                                            <View>
                                                {isDataLoaded && opinionRewardData && opinionRewardData.length == 0 && (
                                                    <Text style={styles.textCenter}>
                                                        {I18n.t(globalText.noRecordFound)}
                                                    </Text>
                                                )}
                                                {/* {isSeeMore &&
                                                    isDataLoaded &&
                                                    opinionRewardData &&
                                                    opinionRewardData.length > 0 && (
                                                        <View style={{ alignSelf: 'center' }}>
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
                        {isSeeMore && isDataLoaded && opinionRewardData && opinionRewardData.length > 0 && (
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
                        maximumDate={toDate && toDate.toString().length > 0 ? new Date(toDate) : new Date()}
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

export default Redemption;
