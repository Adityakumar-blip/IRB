import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import CustomBackGround from "../../component/customBackground/index";
import CustomHeader from "../../component/customHeader/index";
import ScrollableTabViewPager from "../../component/customSwitchTabs/index";
import styles from "../../helper/globalStyles";
import { globalText } from "../../helper/globalText";
import sampleData from "../../helper/sampleData";
import I18n from "../../i18n/index";
import Rewards from "../../screens/faqs/reward";
import Membership from "../../screens/faqs/membership";
import Redemption from "../../screens/faqs/redemption";
import Survey from "../../screens/faqs/survey";
import Mscellaneous from "../../screens/faqs/miscellaneous";
import { getAsyncStorage } from "../../utils/customFunctions";
import CustomLoader from "../../component/customLoader/index";
import { Singular } from "singular-react-native";

const Faq = (props) => {
  const [value, setValue] = useState({
    id: 1,
    name: I18n.t(globalText.rewards),
  });
  const [isIndex, setIndex] = useState(0);
  const [categotyData, setCategotyData] = useState([]);
  //const headers = sampleData.faqHeaders;
  const [loader, setLoader] = useState(false);

  const headers = [
    { id: 1, name: I18n.t(globalText.rewards) },
    { id: 2, name: I18n.t(globalText.membership) },
    { id: 3, name: I18n.t(globalText.survey) },
    { id: 4, name: I18n.t(globalText.Redemption) },
    { id: 5, name: I18n.t(globalText.miscellaneous) },
  ];

  useEffect(() => {
    Singular.event("faqs");
    onPageInit();
  }, []);

  const onPageInit = async () => {
    setLoader(true);
    const isProfileMenuData = await JSON.parse(
      await getAsyncStorage("myProfileData")
    );
    setCategotyData(isProfileMenuData);
    setLoader(false);
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
          <SafeAreaView style={styles.height100}>
            <CustomHeader
              headerName={I18n.t(globalText.faqs)}
              onPressLeftIcon={() => {
                props.navigation.openDrawer();
              }}
              threeDotNeed
              categotyData={categotyData && categotyData}
              onCall={(item, item1, index) => onCall(item, item1, index)}
            />
            {loader && <CustomLoader />}
            <View style={styles.height100BackWhite}>
              <View style={styles.simpleHeight50}>
                <ScrollableTabViewPager
                  headers={headers && headers}
                  isIndex={isIndex}
                  itemName={(item, index) => {
                    setIndex(index);
                    setValue(item);
                  }}
                />
              </View>

              <View style={styles.accBorder} />
              {value.name == I18n.t(globalText.rewards) && (
                <Rewards
                  onPress={() => props.navigation.navigate("NeedHelp")}
                />
              )}
              {value.name == I18n.t(globalText.membership) && (
                <Membership
                  onPress={() => props.navigation.navigate("NeedHelp")}
                />
              )}
              {value.name == I18n.t(globalText.survey) && (
                <Survey onPress={() => props.navigation.navigate("NeedHelp")} />
              )}
              {value.name == I18n.t(globalText.Redemption) && (
                <Redemption
                  onPress={() => props.navigation.navigate("NeedHelp")}
                />
              )}
              {value.name == I18n.t(globalText.miscellaneous) && (
                <Mscellaneous
                  onPress={() => props.navigation.navigate("NeedHelp")}
                />
              )}
            </View>
          </SafeAreaView>
        }
      />
    </View>
  );
};
export default Faq;
