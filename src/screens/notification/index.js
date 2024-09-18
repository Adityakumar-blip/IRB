import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import CustomBackGround from "../../component/customBackground/index";
import CustomHeader from "../../component/customHeader/index";
import CustomLoader from "../../component/customLoader/index";
import CustomNotifiaction from "../../component/customNotifiaction/index";
import styles from "../../helper/globalStyles";
import { globalText } from "../../helper/globalText";
import I18n from "../../i18n/index";
import Api from "../../utils/api";
import AuthApi from "../../utils/authApi";
import {
  getConvertDateToString,
  setAsyncStorage,
  toastShow,
  timeSince,
} from "../../utils/customFunctions";
import { Singular } from "singular-react-native";

const Notifications = (props) => {
  const [notificationListNew, setNotificationListNew] = useState([]);
  const [notificationListOld, setNotificationListOld] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setDataLoaded(false);
      onPageInit();
      return () => {
        cleanUp();
      };
    }, [])
  );

  useEffect(() => {
    Singular.event("notifications_visit");
  }, []);
  const cleanUp = () => {
    setAllCheck(false);
    setNotificationListNew([]);
    setNotificationListOld([]);
    setNotificationCount(0);
  };

  const onPageInit = async () => {
    // setLoader(true);
    await getNotification();
    // setLoader(false);
    setDataLoaded(true);
  };

  const getNotification = async () => {
    setLoader(true);
    const endPoint = `${Api.notificationMasterNotification}`;
    const { data, message } = await AuthApi.getDataFromServer(endPoint);
    if (!data) {
      setLoader(false);
      setAllCheck(true);
      setDataLoaded(true);
      toastShow(message);
      return;
    }
    if (data && data.data && data.data.data && data.data.data.length > 0) {
      const isData = data.data.data;
      setAllCheck(false);
      setNotificationCount(isData.length);
      let oldData = [];
      let newdata = [];
      if (isData && isData.length > 0) {
        let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        isData.map(async (item, index) => {
          if (
            // new Date(item.created_on.replace(' ', 'T')).getTime() > yesterday.getTime() ||
            item?.CurrDateTime?.type == "hr" ||
            item?.CurrDateTime?.type == "min" ||
            item?.CurrDateTime?.type == "sec"
          ) {
            await newdata.unshift(item);
          } else {
            await oldData.unshift(item);
          }
        });
      }
      setNotificationListOld(oldData && oldData);
      setNotificationListNew(newdata && newdata);
      await getNotificationCount();
      setLoader(false);
      setDataLoaded(true);
    } else {
      setLoader(false);
      setNotificationCount(0);
      setNotificationListOld([]);
      setNotificationListNew([]);
      setAllCheck(true);
      let count = 0;
      await setAsyncStorage("notification_count", count.toString());
      return;
    }
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

  const clearNotiFication = async () => {
    setLoader(true);
    const endPoint = `${Api.notificationClearAll}`;
    const { data, message } = await AuthApi.putDataToServer(endPoint);
    setLoader(false);
    if (!data) {
      toastShow(message);
      return;
    }
    toastShow(I18n.t(globalText.clearNotification));
    let count = 0;
    await setAsyncStorage("notification_count", count.toString());
    await getNotification();
  };

  const onReadNotification = async (item) => {
    const endPoint = `${Api.notificationUpdateAsRead}?panelist_notification_id=${item.panelist_notification_id}`;
    const { data, message } = await AuthApi.putDataToServer(endPoint);
    if (!data) {
      toastShow(message);
      return;
    }
    toastShow(I18n.t(globalText.notificationsUpdatedAsReadSuccessfully));
    await getNotification();
  };

  const modifyTime = (obj = {}) => {
    if (obj.time && obj.type) {
      switch (obj.type) {
        case "year":
          return `${obj.time} ${I18n.t(globalText._year)} ${I18n.t(
            globalText._ago
          )}`;
        case "month":
          return `${obj.time} ${I18n.t(globalText._month)} ${I18n.t(
            globalText._ago
          )}`;
        case "day":
          return `${obj.time} ${I18n.t(globalText._days)} ${I18n.t(
            globalText._ago
          )}`;
        case "hr":
          return `${obj.time} ${I18n.t(globalText._hr)} ${I18n.t(
            globalText._ago
          )}`;
        case "min":
          return `${obj.time} ${I18n.t(globalText._min)} ${I18n.t(
            globalText._ago
          )}`;
        case "sec":
          return `${obj.time} ${I18n.t(globalText._sec)} ${I18n.t(
            globalText._ago
          )}`;
        default:
          return `0 ${I18n.t(globalText._sec)} ${I18n.t(globalText._ago)}`;
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomBackGround
        screen={
          <SafeAreaView style={styles.height100}>
            <CustomHeader
              headerName={I18n.t(globalText.notifications)}
              needMsg={notificationCount > 0}
              threeDotNeed={notificationCount > 0}
              needText={notificationCount > 0}
              count={2}
              onPressLeftIcon={() => {
                props.navigation.openDrawer();
              }}
              onPressTheeDot={() => {
                notificationCount > 0 && clearNotiFication();
              }}
            />
            <View style={styles.height100BackWhite}>
              {loader && <CustomLoader />}

              {!allCheck && isDataLoaded && (
                <ScrollView>
                  <View style={[styles.padd80, styles.marT25]}>
                    {isDataLoaded &&
                      notificationListNew &&
                      notificationListNew.length > 0 &&
                      notificationListNew.map((item, index) => (
                        <CustomNotifiaction
                          read={item.notification_read_status}
                          key={index}
                          descrp={
                            typeof item.part_content == "object"
                              ? item.part_content.content
                              : item.part_content
                          }
                          msg={item && item.linkcontent && item.linkcontent}
                          link={item && item.link && item.link}
                          // time={timeSince(new Date(item.created_on))}
                          time={modifyTime(item.CurrDateTime)}
                          checkName={item.part_key}
                          isolderTrue={item.isolderTrue}
                          activeOpacity={
                            item.notification_read_status == 0 ? 1 : 0
                          }
                          onPressNotification={() => {
                            if (item.notification_read_status == 1) {
                              onReadNotification(item);
                            }
                          }}
                          onPressCheckOut={() => {
                            item.part_key == "new_poll_available"
                              ? props.navigation.navigate("LatestPoleTrend")
                              : item.part_key == "new_survey_available"
                              ? props.navigation.navigate("LiveSurvey")
                              : item.part_key == "refer_more_user"
                              ? props.navigation.navigate("RefferEarn")
                              : null;
                          }}
                        />
                      ))}
                    {!allCheck &&
                      isDataLoaded &&
                      notificationListNew &&
                      notificationListNew.length == 0 && (
                        <View style={styles.notificationMiddleViewStyle}>
                          <Text style={styles.textCenter}>
                            {I18n.t(globalText.noRecordFound)}
                          </Text>
                        </View>
                      )}

                    {!allCheck && isDataLoaded && (
                      <View style={styles.cNMainHeadeView}>
                        <Text style={styles.cNMainHeadeStryle}>
                          {I18n.t(globalText.olderNotifications)}
                        </Text>
                      </View>
                    )}

                    {isDataLoaded &&
                      notificationListOld &&
                      notificationListOld.length > 0 &&
                      notificationListOld.map((item, index) => (
                        <CustomNotifiaction
                          read={item.notification_read_status}
                          key={index}
                          // descrp={item.part_content}
                          descrp={
                            typeof item.part_content == "object"
                              ? item.part_content.content
                              : item.part_content
                          }
                          msg={item && item.linkcontent && item.linkcontent}
                          link={item && item.link && item.link}
                          // time={timeSince(new Date(item.created_on))}
                          time={modifyTime(item.CurrDateTime)}
                          checkName={item.part_key}
                          isolderTrue={item.isolderTrue}
                          activeOpacity={
                            item.notification_read_status == 0 ? 1 : 0
                          }
                          onPressNotification={() => {
                            if (item.notification_read_status == 1) {
                              onReadNotification(item);
                            }
                          }}
                          onPressCheckOut={() => {
                            item.part_key == "new_poll_available"
                              ? props.navigation.navigate("LatestPoleTrend")
                              : item.part_key == "new_survey_available"
                              ? props.navigation.navigate("LiveSurvey")
                              : item.part_key == "refer_more_user"
                              ? props.navigation.navigate("RefferEarn")
                              : null;
                          }}
                        />
                      ))}
                    {!allCheck &&
                      isDataLoaded &&
                      notificationListOld &&
                      notificationListOld.length == 0 && (
                        <View style={styles.notificationErrorMsg}>
                          <Text style={styles.textCenter}>
                            {I18n.t(globalText.noRecordFound)}
                          </Text>
                        </View>
                      )}
                  </View>
                </ScrollView>
              )}
              {allCheck &&
                isDataLoaded &&
                notificationListNew.length == 0 &&
                notificationListOld.length == 0 && (
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
export default Notifications;
