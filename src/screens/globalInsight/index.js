import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import CustomBackGround from "../../component/customBackground/index";
import CustomGlobalInsight from "../../component/customGlobalInsight/index";
import CustomHeader from "../../component/customHeader/index";
import styles from "../../helper/globalStyles";
import { globalText } from "../../helper/globalText";
import Api from "../../utils/api";
import AuthApi from "../../utils/authApi";
import globalImages from "../../helper/globalImages";
import CustomLoader from "../../component/customLoader/index";
import { toastShow, getAsyncStorage } from "../../utils/customFunctions";
import I18n from "../../i18n/index";
import { Singular } from "singular-react-native";

const GlobalInsight = (props) => {
  const [listing, setListing] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [paginationData, setPaginationData] = useState({
    currentPage: 0,
    pageLimit: 10,
    skip: 0,
    totalCount: 0,
    totalPages: 0,
  });
  const [categotyData, setCategotyData] = useState([]);

  useEffect(() => {
    Singular.event("GlobalInsights");
    onPageInit();
    return () => {
      cleanUp();
    };
  }, []);

  const cleanUp = () => {
    setListing([]);
  };

  const onPageInit = async () => {
    await getList(0);
    const isProfileMenuData = await JSON.parse(
      await getAsyncStorage("myProfileData")
    );
    setCategotyData(isProfileMenuData);
  };

  const getList = async (currentPage = 0) => {
    setLoader(true);
    let page = currentPage ? currentPage : paginationData.currentPage;
    let limit = 10;
    const taskContent = currentPage == 0 ? [] : listing;
    const getCloseId = `${Api.pollSynopsisGetClosePollId}?skip=${
      paginationData.skip
    }&limit=${10}`;
    const { data, message } = await AuthApi.getDataFromServer(getCloseId);
    setLoader(false);
    setDataLoaded(true);
    if (!data) {
      toastShow(message);
      return;
    }
    const isData = data && data.data && data.data.data;
    if (isData) {
      setListing([...taskContent, ...isData]);
      setPaginationData({
        currentPage: page + 1,
        totalPages: Math.ceil(data.data.totalCount / limit),
        pageLimit: 10,
        totalCount: data.data.totalCount,
        skip: Math.ceil(paginationData.skip + 10),
      });
    }
  };

  const renderItemHeader = () => (
    <View>
      <Text style={styles.gInsTextStyle}>
        {I18n.t(globalText.tapOnAnyImageToLearnMore)}
      </Text>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.gInsRenderView}>
      <CustomGlobalInsight
        key={index}
        source={
          item.image.length > 0 && item.image_name
            ? { uri: item.image_name }
            : globalImages.sampleIcon
        }
        text={item.question_in_local}
        onPress={() => onQuestionCall(item)}
      />
    </View>
  );

  const onQuestionCall = (item) => {
    props.navigation.navigate("GlobalInsightDetail", {
      item: item,
      poll_id: item.poll_id,
      question: item.question_in_local,
      pollSubId: item.poll_sub_category_type_id,
    });
  };

  const fetch = () => {
    if (
      Number(paginationData.currentPage <= Number(paginationData.totalPages))
    ) {
      getList(paginationData.currentPage);
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
      <CustomBackGround
        screen={
          <View style={styles.height100}>
            <CustomHeader
              headerName={I18n.t(globalText.globalInsights)}
              onPressLeftIcon={() => {
                props.navigation.openDrawer();
              }}
              threeDotNeed
              categotyData={categotyData && categotyData}
              onCall={(item, item1, index) => onCall(item, item1, index)}
            />
            {loader && <CustomLoader />}
            <View style={styles.height100BackWhite}>
              <View style={styles.container}>
                {isDataLoaded && listing && listing.length > 0 && (
                  <View style={styles.paddB60}>
                    <FlatList
                      ListHeaderComponent={renderItemHeader}
                      nestedScrollEnabled={true}
                      contentContainerStyle={[styles.paddB100, styles.paddB20]}
                      data={listing && listing}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index}
                      numColumns={2}
                      onEndReached={() => fetch()}
                      onEndReachedThreshold={0.3}
                    />
                  </View>
                )}
                {isDataLoaded && listing && listing.length == 0 && (
                  <View style={styles.noRecordText}>
                    <Text style={styles.textCenter}>
                      {I18n.t(globalText.noRecordFound)}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default GlobalInsight;
