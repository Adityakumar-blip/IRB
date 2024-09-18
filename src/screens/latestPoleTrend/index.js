/* eslint-disable quotes */
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Animated,
  Linking,
  Alert,
  Platform,
} from "react-native";
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from "react-native-fast-image";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import CustomBackground from "../../component/customBackground/index";
import CustomButton from "../../component/customButton/index";
import CustomHeader from "../../component/customHeader/index";
import globalImages from "../../helper/globalImages";
import styles from "../../helper/globalStyles";
import { globalText } from "../../helper/globalText";
import colors from "../../styles/colors";
import Api from "../../utils/api";
import AuthApi from "../../utils/authApi";
import LatestPollShareModalNew from "../latestPollShareModalNew/index";
import LatestTrollShareModal from "../latestTrollShareModal/index";
import CustomLoader from "../../component/customLoader/index";
import {
  getJsonStringify,
  toastShow,
  getAsyncStorage,
  setAsyncStorage,
} from "../../utils/customFunctions";
import I18n from "../../i18n/index";
import { constant } from "../../utils/constants";
import CriteriaQuestion from "./criteriaQuestion";
import Share, { Social } from "react-native-share";
import { ShareDialog } from "react-native-fbsdk";
import { Singular } from "singular-react-native";

const { width, height } = Dimensions.get("window");

const LatestPoleTrend = (props) => {
  const [isModalFirst, setModalFirst] = useState(false);
  const [isModalSecond, setModalSecond] = useState(false);
  const [loader, setLoader] = useState(false);
  const [polls, setPolls] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [shareType, setShareType] = useState({
    singleShare: false,
    entireShare: false,
  });
  const [currentItem, setCurrentItem] = useState(
    polls && polls.length > 0 && polls[0]
  );
  const [isIndex, setIndex] = useState(0);
  const [isCriteriaQuestion, setCriteriaQuestion] = useState(false);
  const [isCriteriData, setCriteriData] = useState([]);
  const [isForceUpdate, setForceUpdate] = useState(false);
  const [categotyData, setCategotyData] = useState([]);

  const [isSelectedPoll, setSelectedPoll] = useState({});
  const [paginationData, setPaginationData] = useState({
    currentPage: 0,
    pageLimit: 10,
    skip: 0,
    totalCount: 0,
    totalPages: 0,
  });

  const scrollX = useRef(new Animated.Value(0)).current;
  const _scrollRef = useRef(null);

  // useFocusEffect(
  //     useCallback(() => {
  //         onPageInit();
  //         return () => cleanUp();
  //     }, []),
  // );

  useEffect(() => {
    Singular.event("latestPoleTrend");
    onPageInit();
    return () => cleanUp();
  }, []);

  const cleanUp = () => {
    setPolls([]);
  };

  const onPageInit = async () => {

 
    const isProfileMenuData = await JSON.parse(
      await getAsyncStorage("myProfileData")
    );
    setCategotyData(isProfileMenuData);
    await getPollsQuestionAnswer();
    setDataUpdated(true);
  };

  const getPollsQuestionAnswer = async (currentPage = 0, isVoted) => {
    setLoader(true);
    let page = currentPage ? currentPage : paginationData.currentPage;
    let limit = 10;
    const taskContent = currentPage == 0 ? [] : isVoted ? [] : polls;
    const endPoint = `${Api.pollsQuestionAnswer}?skip=${
      isVoted ? 0 : paginationData.skip
    }&limit=${isVoted ? paginationData.skip : 10}`;
    const { data, message } = await AuthApi.getDataFromServer(endPoint);
    setLoader(false);
    if (!data) {
      // toastShow(message);
      return;
    }
    let temp = data && data.data && data.data.data;
    if (temp.length > 0) {
      // isIndex != 0 && _scrollRef.current.scrollToIndex({ isIndex });
      setPolls([...taskContent, ...temp]);
      if (!isVoted) {
        setPaginationData({
          currentPage: page + 1,
          totalPages: Math.ceil(data.data.totalCount / limit),
          pageLimit: 10,
          totalCount: data.data.totalCount,
          skip: Math.ceil(paginationData.skip + 10),
        });
      }
    } else {
      setPolls([]);
    }
  };

  const onPressVote = async (value, item, index) => {
    setSelectedPoll({ item: item, index: index });
    if (value) {
      if (
        item.poll_type == 1 &&
        item.criteria_que_arr &&
        item.criteria_que_arr.length > 0
      ) {
        setCriteriData(item.criteria_que_arr);
        setCriteriaQuestion(true);
        return;
      }
      setLoader(true);
      let valueCheck = {};
      item.options.map((i, j) => {
        if (i.selected) {
          valueCheck = i;
        }
      });
      const payload = {
        poll_id: item.poll_id,
        poll_question_id: item.poll_question_id,
        poll_answer_id: valueCheck.poll_answer_id,
        reward_type: item.poll_type == 0 ? 75 : 279,
      };
      const { data, message } = await AuthApi.postDataToServer(
        Api.pollsSavePollAnswer,
        payload
      );
      // setLoader(false);
      if (!data) {
        setLoader(false);
        toastShow(message && message);
        return;
      }
      setDataUpdated(false);
      setTimeout(() => {
        toastShow(I18n.t(globalText._voteSucessfully));
      }, 100);
      setPolls([]);
      if (index == polls.length - 1) {
        setIndex(index - 1);
      } else {
        setIndex(index);
      }
      await getPollsQuestionAnswer(0, true);
      setDataUpdated(true);
      await getNotificationCount();

      // setLoader(false);
    } else {
      Alert.alert("", I18n.t(globalText.pleaseSelectAnswer), [
        {
          //text: 'ok',
          text: I18n.t(globalText._ok),
          onPress: () => {
            cancelable: true;
          },
        },
      ]);
    }

    return;
  };

  const renderScreen = ({ item, index }) => {
    return (
      <View style={[{ width: width }]} key={index}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.paddB100}>
            <View>
              <View style={styles.borderPont5}>
                <View style={styles.latestPoleImageView}>
                  <FastImage
                    resizeMode="cover"
                    source={
                      item && item.image && item.image.length > 0
                        ? { uri: item.image_name }
                        : globalImages.sampleIcon
                    }
                    style={styles.latestPoleImage}
                  />
                </View>
              </View>
            </View>
            <View style={styles.padd15}>
              <Text style={styles.latestPoleQuestion}>
                {item.question_in_local}
              </Text>

              {item.options &&
                item.options.map((i, j) => (
                  <TouchableOpacity
                    key={j}
                    style={[
                      styles.latestPoleAnswerView,
                      {
                        borderColor:
                          i.selected == true
                            ? colors.RED_VOILET
                            : colors.MYSTIC,
                      },
                    ]}
                    onPress={() => {
                      onSelect(index, j);
                    }}
                  >
                    <Text
                      style={[
                        styles.latestPoleAnswer,
                        {
                          color: i.selected ? colors.RED_VOILET : colors.TOPAZ,
                        },
                      ]}
                    >
                      {i.poll_option_in_local_language}
                    </Text>
                  </TouchableOpacity>
                ))}
              <View style={styles.latestPoleVoteView}>
                <CustomButton
                  buttonName={I18n.t(globalText.vote)}
                  onPress={() => onPressVote(item.answeSelected, item, index)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  const onSelect = (isFirstIndex, isSecondIndex) => {
    polls.map((item, index) => {
      if (isFirstIndex == index) {
        item.options.map((i, j) => {
          if (j == isSecondIndex) {
            item.answeSelected = !i.selected;
            return (i.selected = !i.selected);
          } else {
            return (i.selected = false);
          }
        });
      }
    });
    setPolls([...polls]);
  };

  const onPressShareVia = async (type, shareVia) => {
    let value = currentItem
      ? currentItem
      : polls && polls.length > 0 && polls[0];
    let shareParameter = [];
    const shareValue =
      shareVia.singleShare && value.perma_link
        ? constant["livePollShare"] + value.perma_link
        : shareVia.entireShare
        ? constant["livePollShare"]
        : constant["livePollShare"];
    //  shareVia.singleShare && value.perma_link
    //      ? constant['livePollShare'] + value.perma_link
    //      : shareVia.entireShare && isPollDetail.perma_link
    //      ? constant['livePollShare'] + isPollDetail.perma_link
    //      : constant['livePollShare'];
    let newLink = shareValue;
    if (shareValue) {
      type == "facebook"
        ? shareParameter.push("u=" + encodeURI(shareValue))
        : type == "twitter"
        ? shareParameter.push("url=" + encodeURI(shareValue))
        : type == "linkedIn"
        ? shareParameter.push("url=" + encodeURI(shareValue))
        : null;
    }

    if (type == "linkedIn" && Platform.OS != "ios") {
      Share.shareSingle({
        url: newLink,
        social: Share.Social.LINKEDIN,
      });
    } else if (type == "facebook") {
      const shareLinkContent = {
        contentType: "link",
        contentUrl: newLink,
        contentDescription: "",
      };
      await shareLinkWithShareDialog(shareLinkContent);
    } else {
      const url =
        type == "facebook"
          ? `${constant["facebookShareLink"]}?u=${newLink}`
          : type == "twitter"
          ? constant["twetterShareLink"] + shareParameter.join("&")
          : type == "linkedIn"
          ? `${constant["linkedinShareLinkNew"]}&url=${newLink}`
          : null;

      Linking.openURL(url)
        .then((data) => {
          // Alert.alert(`${type} Opened`);
        })
        .catch(() => {
          Alert.alert(I18n.t(globalText.somethingWentWrong));
        });
    }
  };

  const shareLinkWithShareDialog = (shareLinkContent) => {
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
        }
      );
  };

  const fetch = async () => {
    if (
      Number(paginationData.currentPage < Number(paginationData.totalPages))
    ) {
      setLoader(true);
      await getPollsQuestionAnswer(paginationData.currentPage);
      setLoader(false);
    }
  };

  const onCallSaveCriteriaQuestion = async () => {
    setLoader(true);
    setCriteriaQuestion(false);
    let item = isSelectedPoll.item;
    item.criteria_que_arr = [];
    let checkPollIsVallid = await getPollEligibleOrNot(item.poll_id);
    if (checkPollIsVallid) {
      onPressVote(true, item, isSelectedPoll.index);
    } else {
      (paginationData.currentPage = 0),
        (paginationData.pageLimit = 10),
        (paginationData.skip = 0),
        (paginationData.totalCount = 0),
        (paginationData.totalPages = 0),
        setPaginationData({ ...paginationData });
      setCriteriData([]);
      setCriteriaQuestion(false);
      await getPollsQuestionAnswer(0);
    }

    // setLoader(false);
    setForceUpdate(false);
  };

  const getPollEligibleOrNot = async (id) => {
    let status = false;
    const endPoint = `${Api.pollsUserQualification}?poll_id=${id}`;
    const { data, message } = await AuthApi.getDataFromServer(endPoint);
    if (!data) {
      setLoader(false);
      // toastShow(message);
      return;
    }
    let isData = data && data.data;
    if ("User quailfied for poll" == isData) {
      status = true;
      return status;
    }

    return status;
  };

  const getNotificationCount = async () => {
    const endPoint = `${Api.notificationCount}`;
    const { data, message } = await AuthApi.getDataFromServer(endPoint);
    if (!data) {
      toastShow(message);
      return;
    }
    const notificationCountDetail = data && data.data && data.data.count;
    await setAsyncStorage(
      "notification_count",
      notificationCountDetail.toString()
    );
  };

  const onCall = (item, item1, index) => {
    props.navigation.navigate("Basic_Profile", {
      data: item,
      id: item1.sub_category_type_id,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <CustomBackground
          screen={
            <SafeAreaView style={styles.height100}>
              <CustomHeader
                drawer
                headerName={I18n.t(globalText.latestPoleAndTrend)}
                onPressLeftIcon={() => props.navigation.openDrawer()}
                threeDotNeed
                categotyData={categotyData && categotyData}
                onCall={(item, item1, index) => onCall(item, item1, index)}
              />

              {loader && <CustomLoader />}
              {isForceUpdate && <CustomLoader />}

              <View style={styles.height100BackWhite}>
                {dataUpdated && polls && polls.length == 0 && (
                  <View style={styles.height100AlignIJusCenter}>
                    <Text>{I18n.t(globalText.noRecordFound)}</Text>
                  </View>
                )}
                {polls && polls.length > 0 ? (
                  <FlatList
                    ref={_scrollRef}
                    horizontal
                    data={polls && polls}
                    extraData={polls}
                    // style={{ width: width }}
                    renderItem={renderScreen}
                    pagingEnabled
                    removeClippedSubviews={false}
                    initialScrollIndex={isIndex}
                    bounces={false}
                    onScroll={Animated.event(
                      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                      {
                        useNativeDriver: false,
                      }
                    )}
                    // getItemLayout={(data, index) => {
                    //     const width = Dimensions.get('window').width;
                    //     return { length: 0, offset: width * index, index };
                    // }}
                    // automaticallyAdjustContentInsets={false}
                    // directionalLockEnabled
                    // scrollEventThrottle={32}
                    keyExtractor={(item, index) => index}
                    onEndReached={() => fetch()}
                    onEndReachedThreshold={0.3}
                    onScrollToIndexFailed={(info) => {
                      const wait = new Promise((resolve) =>
                        setTimeout(resolve, 100)
                      );
                      wait.then(() => {
                        _scrollRef.current?.scrollToIndex({
                          index: isIndex,
                          animated: true / false,
                        });
                      });
                    }}
                    onMomentumScrollEnd={(event) => {
                      let currentIndex = Math.floor(
                        Math.floor(event.nativeEvent.contentOffset.x) /
                          Math.floor(event.nativeEvent.layoutMeasurement.width)
                      );
                      setCurrentItem(polls[currentIndex]);
                      // work with: index
                    }}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* {!loader && <Text>No Latest Polls Available</Text>} */}
                    <Text>{I18n.t(globalText.noRecordFound)}</Text>
                  </View>
                )}
              </View>

              {polls && polls.length > 0 && (
                <TouchableOpacity
                  activeOpacity={0.3}
                  style={styles.latestPoleShareView}
                  onPress={() => {
                    setModalFirst(true);
                  }}
                >
                  <FastImage
                    source={globalImages.sharePinkIcon}
                    resizeMode={"contain"}
                    style={styles.latestPoleShareIcon}
                  />
                </TouchableOpacity>
              )}
            </SafeAreaView>
          }
        />
      </View>

      {isModalFirst && (
        <LatestPollShareModalNew
          onPressSharePoll={async () => {
            setModalFirst(false);
            await setShareType({ singleShare: true });
            setModalSecond(true);
          }}
          onRequestClose={() => setModalFirst(false)}
          onPressCancel={() => setModalFirst(false)}
          onPressEntirePoll={async () => {
            setModalFirst(false);
            await setShareType({ entireShare: true });
            setModalSecond(true);
          }}
        />
      )}

      {isModalSecond && (
        <LatestTrollShareModal
          onPressFacebook={() => {
            setModalSecond(false);
            onPressShareVia("facebook", shareType);
          }}
          onPressTwitter={() => {
            setModalSecond(false);
            onPressShareVia("twitter", shareType);
          }}
          onPressLinkedin={() => {
            setModalSecond(false);
            onPressShareVia("linkedIn", shareType);
          }}
          onRequestClose={() => setModalSecond(false)}
          onPressOutside={() => setModalSecond(false)}
        />
      )}

      {isCriteriaQuestion && (
        <CriteriaQuestion
          data={isCriteriData && isCriteriData}
          onPressCross={() => {
            setCriteriData([]);
            setCriteriaQuestion(false);
          }}
          onRequestClose={() => {
            setCriteriData([]);
            setCriteriaQuestion(false);
          }}
          onPreviousScreen={() => {
            onCallSaveCriteriaQuestion();
          }}
        />
      )}
    </>
  );
};

export default LatestPoleTrend;
