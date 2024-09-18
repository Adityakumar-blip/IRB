import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import CustomBackground from "../../component/customBackground";
import CustomCultureView from "../../component/customCultureView";
import CustomLoader from "../../component/customLoader/index";
import globalImages from "../../helper/globalImages";
import styles from "../../helper/globalStyles";
import { globalText } from "../../helper/globalText";
import I18n from "../../i18n/index";
import Api from "../../utils/api";
import AuthApi from "../../utils/authApi";
import { toastShow, getAsyncStorage } from "../../utils/customFunctions";
import CustomHeader from "../../component/customHeader/index";
import { Singular } from "singular-react-native";

const Culture = (props) => {
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [tagListingSummary, setTagListingSummary] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isId, setId] = useState(null);
  const [isValue, setValue] = useState({});
  const [paginationData, setPaginationData] = useState({
    currentPage: 0,
    pageLimit: 10,
    skip: 0,
    totalCount: 0,
    totalPages: 0,
  });
  const [categotyData, setCategotyData] = useState([]);

  useEffect(() => {
    Singular.event("Culture");
  }, []);
  useEffect(() => {
    onPageInit();
    return () => {
      cleanUp();
    };
  }, []);

  const cleanUp = () => {
    setTagListingSummary([]);
  };

  const onPageInit = async () => {
    setLoader(true);
    const id =
      (await props.route) && props.route.params && props.route.params.id;
    const data =
      (await props.route) && props.route.params && props.route.params.data;
    setValue(data && data);
    if (id && id) {
      setId(id);
      await onSummaryListing(id, 0);
    }
    const isProfileMenuData = await JSON.parse(
      await getAsyncStorage("myProfileData")
    );
    setCategotyData(isProfileMenuData);
    setLoader(false);
  };

  const onSummaryListing = async (id, currentPage = 0) => {
    setLoader(true);
    let page = currentPage ? currentPage : paginationData.currentPage;
    let limit = 10;
    const taskContent = currentPage == 0 ? [] : tagListingSummary;
    const endPoint = `${Api.pollSynopsisListSummaryByPolllTag}?skip=${
      paginationData.skip
    }&limit=${10}&poll_sub_category_id=${id}`;
    const { data, message } = await AuthApi.getDataFromServer(endPoint);
    setLoader(false);
    if (!data) {
      setDataLoaded(true);
      toastShow(message);
      return;
    }
    const isData = (await data) && data.data && data.data.data;
    if (isData) {
      setTagListingSummary([...taskContent, ...isData]);
      setPaginationData({
        currentPage: page + 1,
        totalPages: Math.ceil(data.data.totalCount / limit),
        pageLimit: 10,
        totalCount: data.data.totalCount,
        skip: Math.ceil(paginationData.skip + 10),
      });
    }
    setDataLoaded(true);
  };

  const renderItem = ({ item, index }) => (
    <View key={index}>
      <CustomCultureView
        key={index}
        asset={
          item.image.length > 0
            ? { uri: item.image_name }
            : globalImages.sampleIcon
        }
        question={item.summary_in_local}
      />
    </View>
  );

  const fetch = () => {
    if (
      Number(paginationData.currentPage < Number(paginationData.totalPages))
    ) {
      onSummaryListing(isId, paginationData.currentPage);
    }
  };

  const onCall = (item, item1, index) => {
    props.navigation.navigate("Basic_Profile", {
      data: item,
      id: item1.sub_category_type_id,
    });
  };

  return (
    <View style={styles.container}>
      <CustomBackground
        screen={
          <SafeAreaView style={styles.height100}>
            {loader && <CustomLoader />}
            {/* <View style={styles.headerMainViewStyle}>
                            <View style={styles.cultureHeaderView}>
                                <Text numberOfLines={1} style={styles.headerTextStyle}>
                                    {isValue && isValue.poll_sub_category_name}
                                </Text>

                            </View>
                        </View> */}
            <CustomHeader
              backIcon
              onPressLeftIcon={() => props.navigation.goBack()}
              headerName={isValue && isValue.poll_sub_category_name}
              threeDotNeed
              categotyData={categotyData && categotyData}
              onCall={(item, item1, index) => onCall(item, item1, index)}
            />
            <View style={[styles.height100BackWhite, styles.padd80]}>
              {isDataLoaded &&
                tagListingSummary &&
                tagListingSummary.length > 0 && (
                  <FlatList
                    nestedScrollEnabled={true}
                    data={tagListingSummary && tagListingSummary}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    onEndReached={() => fetch()}
                    onEndReachedThreshold={0.3}
                  />
                )}
              {isDataLoaded &&
                tagListingSummary &&
                tagListingSummary.length == 0 && (
                  <View style={styles.noRecordText}>
                    <Text style={styles.textCenter}>
                      {I18n.t(globalText.noRecordFound)}
                    </Text>
                  </View>
                )}
            </View>
          </SafeAreaView>
        }
      />
    </View>
  );
};

export default Culture;
