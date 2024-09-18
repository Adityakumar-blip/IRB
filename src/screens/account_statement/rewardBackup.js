import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomDropDown from '../../component/customDropdown';
import CustomLoader from '../../component/customLoader/index';
import CustomStateHistory from '../../component/customStateHistory/index';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import {
    generateUrl,
    getFormatedDate,
    getInThousand,
    getNumberCheckDot,
    subtractYears,
    toastShow,
} from '../../utils/customFunctions';

const Rewards = props => {
    const [loader, setLoader] = useState(false);
    const [isDataLoaded, setDataLoaded] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [catogoryRewardListing, setCatogoryRewardListing] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [accRewardHistory, setAccRewardHistory] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [fromShow, setFromShow] = useState(false);
    const [toDate, setToDate] = useState(null);
    const [toShow, setToShow] = useState(false);
    const [isOpen, setOpen] = useState(true);
    const [isSeeMore, setMore] = useState(true);
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
            return () => {
                cleanUp();
            };
        }, []),
    );

    const cleanUp = () => {
        setSelectedCategory(null);
        setCategoryValue(null);
        setAccRewardHistory([]);
        setFromDate(null);
        setToDate(null);
        setPaginationData({
            currentPage: 0,
            pageLimit: 10,
            skip: 0,
            totalCount: 0,
            totalPages: 0,
        });
    };

    const onPageInit = async () => {
        setLoader(true);
        await onRewardTagListing();
        await onRewardCategoryListing();
    };

    const onRewardTagListing = async () => {
        let endPoint = `${Api.rewardTabCateogry}`;
        const { data, message } = await AuthApi.getDataFromServer(endPoint);
        if (!data) {
            setLoader(false);
            return toastShow(message && message);
        }
        const isData = data && data.data && data.data.response;
        if (isData) {
            let count = 0;
            isData.map((item, index) => {
                if (item.options == I18n.t(globalText._all)) {
                    count = count + 1;
                }
            });
            if (count == 0) {
                isData.unshift({
                    listing_culture_id: null,
                    options: I18n.t(globalText._all),
                });
            }
            setCatogoryRewardListing(isData);
        }
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
        setPaginationData({ ...paginationData });
        await onRewardCategoryListing(0);
    };

    const onRewardCategoryListing = async (currentPage = 0) => {
        setLoader(true);
        let page = currentPage ? currentPage : paginationData.currentPage;
        let limit = 10;
        let taskContent = currentPage == 0 ? [] : accRewardHistory;
        let startDate =
            fromDate && fromDate.toString().length > 0
                ? getFormatedDate(new Date(fromDate).toString(), 'yyyy-mm-dd')
                : null;
        let endDate =
            toDate && toDate.toString().length > 0 ? getFormatedDate(new Date(toDate).toString(), 'yyyy-mm-dd') : null;
        let listing_culture_id_value =
            selectedCategory && Object.keys(selectedCategory).length > 0 ? selectedCategory.listing_culture_id : null;
        if ((startDate && startDate.length > 0) || (endDate && endDate.length > 0)) {
            startDate = startDate ? startDate : getFormatedDate(subtractYears(1, new Date(toDate)), 'yyyy-mm-dd');
            endDate = endDate ? endDate : getFormatedDate(new Date().toString(), 'yyyy-mm-dd');
        }
        const payload = {
            skip: paginationData.skip,
            limit: 10,
            startDate: startDate,
            endDate: endDate,
            listing_culture_id: listing_culture_id_value,
        };
        let endPoint = `${Api.rewardTabCateogry}`;
        const generateUrlForRewards = await generateUrl(endPoint, '', payload);
        const { data, message } = await AuthApi.getDataFromServer(generateUrlForRewards);
        setLoader(false);
        if (!data) {
            setAccRewardHistory([]);
            toastShow(message);
            return;
        }
        const accData = data && data.data && data.data.result ? data.data.result : [];
        setAccRewardHistory([...taskContent, ...accData]);
        setDataLoaded(true);
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

    const renderItem = ({ item, index }) => (
        <View key={index} style={styles.paddB10}>
            <CustomStateHistory
                key={item.panelist_reward_id}
                index={accRewardHistory.length - index}
                description={item.description}
                earned={getInThousand(getNumberCheckDot(item.earned ? item.earned : 0))}
                redemm={getInThousand(getNumberCheckDot(item.redemed ? item.redemed : 0))}
                balance={getInThousand(item.remaining_balance ? item.remaining_balance : 0)}
                date={getFormatedDate(item.date.split(' ')[0], 'dd/mm/yyyy')}
                // date={getFormatedDate(new Date(item.date), 'dd/mm/yyyy')}
                openNotification={item.isNotification}
                isOpen={isOpen}
                eranColor={
                    item.reward_stat == 'approved_reward'
                        ? 'green'
                        : item.reward_stat == 'rejected_reward'
                        ? 'red'
                        : null
                }
                onPress={() => {
                    item.isNotification = !item.isNotification;
                    setAccRewardHistory([...accRewardHistory]);
                }}
                onRequestClose={() => setOpen(false)}
                message={
                    item.reward_stat == 'approved_reward'
                        ? I18n.t(globalText._theRewardIsApprovedForRedemption)
                        : item.reward_stat == 'rejected_reward'
                        ? I18n.t(globalText._yourRewardHasBeenRejectedOnQuality)
                        : I18n.t(globalText._yourRewardIsBeingReviewed)
                }
            />
        </View>
    );

    const ListHeaderComponent = () => (
        <View style={[styles.row, styles.paddT10, styles.paddB10]}>
            <View style={styles.rewardPointTabFirstView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.description)}</Text>
            </View>
            <View style={styles.pointTabSecondView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.earned)}</Text>
            </View>
            <View style={styles.pointTabThirdView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.redeemed)}</Text>
                {/* <Text style={styles.fontSize12ColorTopazReWardTab}>Redeemed</Text> */}
            </View>
            <View style={styles.pointTabFourthView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.remainingBalance)}</Text>
            </View>
            <View style={styles.pointTabFifthView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.date)}</Text>
            </View>
        </View>
    );

    const fetch = () => {
        if (Number(paginationData.currentPage <= Number(paginationData.totalPages))) {
            onRewardCategoryListing(paginationData.currentPage);
        }
    };

    return (
        <SafeAreaView>
            <View styels={styles.container}>
                {loader && <CustomLoader />}
                <ScrollView horizontal={false} nestedScrollEnabled style={styles.height100}>
                    <View style={styles.paddB200}>
                        <View style={styles.accFilterMain}>
                            <View style={styles.accCalDropMainView}>
                                <View style={styles.accFirstDropDView}>
                                    <View style={[Platform.OS == 'ios' && styles.zIndex1]}>
                                        <CustomDropDown
                                            dropDownContainerStyleNew={styles.accDropDownContainerStyleNew}
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
                                            displayKey={'options'}
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
                                                    {getFormatedDate(fromDate, 'dd-mm-yyyy')}
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
                                                    {getFormatedDate(toDate, 'dd-mm-yyyy')}
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

                        <View style={[styles.container, styles.zIndexMinus1]}>
                            <View style={styles.accScreenBackFog}>
                                <FlatList
                                    //horizontal
                                    nestedScrollEnabled
                                    vertical={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={[1]}
                                    style={styles.container}
                                    renderItem={(i, j) => (
                                        <FlatList
                                            stickyHeaderIndices={[0]}
                                            showsHorizontalScrollIndicator={false}
                                            data={accRewardHistory && accRewardHistory}
                                            style={styles.container}
                                            ListHeaderComponent={ListHeaderComponent}
                                            ListFooterComponent={() => (
                                                <View>
                                                    {isDataLoaded &&
                                                        accRewardHistory &&
                                                        accRewardHistory.length == 0 && (
                                                            <Text style={styles.textCenter}>
                                                                {I18n.t(globalText.noRecordFound)}
                                                            </Text>
                                                        )}

                                                    {/* {isSeeMore &&
                                                        isDataLoaded &&
                                                        accRewardHistory &&
                                                        accRewardHistory.length > 0 && (
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
                                            renderItem={renderItem}
                                            keyExtractor={(item, index) => index}
                                        />
                                    )}
                                    keyExtractor={(i, j) => j}
                                />
                            </View>
                            {isSeeMore && isDataLoaded && accRewardHistory && accRewardHistory.length > 0 && (
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
                        //maximumDate={toDate ? new Date(toDate) : new Date()}
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

export default Rewards;
