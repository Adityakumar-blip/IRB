import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, FlatList, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomDropDown from '../../component/customDropdown';
import CustomLoader from '../../component/customLoader/index';
import CustomStateHistory from '../../component/customStateHistory/index';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import SampleData from '../../helper/sampleData';
import I18n from '../../i18n/index';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';
import {
    subtractYears,
    getFormatedDate,
    toastShow,
    getNumberCheckDot,
    getInThousand,
    generateUrl,
} from '../../utils/customFunctions';
import CustomPointHistory from '../../component/customPointHistory';

const Points = props => {
    const [loader, setLoader] = useState(false);
    const [isDataLoaded, setDataLoaded] = useState(false);
    const [catogoryPointListing, setCatogoryPointListing] = useState([
        {
            name: I18n.t(globalText._all),
        },
        {
            name: I18n.t(globalText.activationBonus),
            id: 309,
        },
        {
            name: I18n.t(globalText.pointConverted),
            id: 2,
        },
        {
            name: I18n.t(globalText.poll),
            id: 1,
        },
    ]);
    const [isUserPollList, setUserPollList] = useState([]);
    const [isPointConvertedList, setPointConvertedList] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [fromShow, setFromShow] = useState(false);
    const [toDate, setToDate] = useState(null);
    const [toShow, setToShow] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [dataValue, setDatValue] = useState([1]);
    const [isSeeMore, setMore] = useState(true);
    const [isSeleValue, setSelValue] = useState(false);
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
        await onUserPollList(0);
    };

    const onPageInit = async () => {
        setLoader(true);
        await onPointConverted();
        await onUserPollList(0);
        setDataLoaded(true);
        setLoader(false);
    };

    const onUserPollList = async (currentPage = 0) => {
        setLoader(true);
        let page = currentPage ? currentPage : paginationData.currentPage;
        let limit = 10;
        let taskContent = currentPage == 0 ? [] : isUserPollList;
        let startDate =
            fromDate && fromDate.toString().length > 0
                ? getFormatedDate(new Date(fromDate).toString(), 'yyyy-mm-dd')
                : null;
        let endDate =
            toDate && toDate.toString().length > 0 ? getFormatedDate(new Date(toDate).toString(), 'yyyy-mm-dd') : null;
        let listing_culture_id_value =
            selectedCategory && Object.keys(selectedCategory).length > 0 ? selectedCategory.id : '';
        if ((startDate && startDate.length > 0) || (endDate && endDate.length > 0)) {
            startDate = startDate ? startDate : getFormatedDate(subtractYears(1, new Date(toDate)), 'yyyy-mm-dd');
            endDate = endDate ? endDate : getFormatedDate(new Date().toString(), 'yyyy-mm-dd');
        }
        const payload = {
            skip: paginationData.skip,
            limit: 10,
            startDate: startDate,
            endDate: endDate,
            id: listing_culture_id_value ? listing_culture_id_value : null,
        };
        let endPoint = `${Api.pointConvertedMerge}`;
        const generateUrlForPoints = await generateUrl(endPoint, '', payload);
        const { data, message } = await AuthApi.getDataFromServer(generateUrlForPoints);
        setLoader(false);
        if (!data) {
            setUserPollList([]);
            toastShow(message);
            return;
        }
        const isData = data && data.data && data.data.final_data ? data.data.final_data : [];
        setUserPollList([...taskContent, ...isData]);
        if (paginationData.currentPage + 1 == Math.ceil(data.data.totalcount / 10)) {
            setMore(false);
        } else {
            setMore(true);
        }
        setPaginationData({
            currentPage: page + 1,
            totalPages: Math.ceil(data.data.totalcount / limit),
            pageLimit: 10,
            totalCount: data.data.totalcount,
            skip: Math.ceil(paginationData.skip + 10),
        });
    };

    const onPointConverted = async () => {
        const endPoint = `${Api.pointConverted}`;
        const { data, message } = await AuthApi.getDataFromServer(endPoint);
        if (!data) {
            setLoader(false);
            toastShow(message);
            return;
        }
        const isData = data && data.data && data.data.data;
        setPointConvertedList(isData && isData);
    };

    const renderItem = ({ item, index }) => (
        <View key={index} style={styles.paddB10}>
            <CustomPointHistory
                key={index}
                description={item.poll_name}
                earned={item.point_earned ? getInThousand(item.point_earned) : null}
                real_earn_amount={item.point_earned}
                real_convert_amount={item.points_requested}
                converted={item.points_requested && item.points_requested ? getInThousand(item.points_requested) : null}
                balance={item.remaining_balance ? getInThousand(item.remaining_balance) : null}
                //balance={abbreviateNumber(105)}
                date={getFormatedDate(item.created_on.split(' ')[0], 'dd/mm/yyyy')}
                // date={item.created_on}
                real_remain_amount={item.remaining_balance}
                isOpenPopupEarn={isSeleValue == 'Earn' + index + 1}
                isOpenPopupConv={isSeleValue == 'Conv' + index + 1}
                isOpenPopupRemainB={isSeleValue == 'RemB' + index + 1}
                onEarnPopup={() => {
                    isSeleValue == 'Earn' + index + 1 ? setSelValue('') : setSelValue('Earn' + index + 1);
                }}
                onConvertPopun={() => {
                    isSeleValue == 'Conv' + index + 1 ? setSelValue('') : setSelValue('Conv' + index + 1);
                }}
                onRBalPoppup={() => {
                    isSeleValue == 'RemB' + index + 1 ? setSelValue('') : setSelValue('RemB' + index + 1);
                }}
            />
        </View>
    );

    const fetch = () => {
        if (Number(paginationData.currentPage <= Number(paginationData.totalPages))) {
            onUserPollList(paginationData.currentPage);
        }
    };

    const ListHeaderComponent = () => (
        <View style={[styles.row, styles.paddB20, styles.paddT10]}>
            <View style={styles.pointTabFirstView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.description)}</Text>
            </View>
            <View style={styles.pointTabSecondView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.earned)}</Text>
            </View>
            <View style={styles.pointTabThirdView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText._Converted)}</Text>
            </View>
            <View style={styles.pointTabFourthView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.remainingBalance)}</Text>
            </View>
            <View style={styles.pointTabFifthView}>
                <Text style={styles.fontSize12ColorTopazReWardTab}>{I18n.t(globalText.date)}</Text>
            </View>
        </View>
    );

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
                                            //placeholder={selectedCategory ? selectedCategory : I18n.t(globalText.cateogries)}
                                            placeholder={selectedCategory ? selectedCategory : I18n.t(globalText._Tags)}
                                            open={openCategory}
                                            value={categoryValue}
                                            items={catogoryPointListing}
                                            setOpen={setOpenCategory}
                                            setValue={setCategoryValue}
                                            setItems={setCatogoryPointListing}
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
                        <View style={[styles.container, { zIndex: -1 }]}>
                            <View style={styles.accScreenBackFog}>
                                <FlatList
                                    nestedScrollEnabled
                                    // horizontal
                                    vertical={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={[1]}
                                    style={styles.container}
                                    renderItem={(i, j) => (
                                        <FlatList
                                            nestedScrollEnabled
                                            scrollEnabled={false}
                                            stickyHeaderIndices={[0]}
                                            showsHorizontalScrollIndicator={false}
                                            data={isUserPollList}
                                            style={styles.container}
                                            ListHeaderComponent={ListHeaderComponent}
                                            renderItem={renderItem}
                                            keyExtractor={(item, index) => index}
                                            ListFooterComponent={() => (
                                                <View>
                                                    {isDataLoaded && isUserPollList && isUserPollList.length == 0 && (
                                                        <Text style={styles.textCenter}>
                                                            {I18n.t(globalText.noRecordFound)}
                                                        </Text>
                                                    )}
                                                    {/* {isSeeMore && isDataLoaded && isUserPollList.length > 0 && (
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
                            {isSeeMore && isDataLoaded && isUserPollList && isUserPollList.length > 0 && (
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

export default Points;
