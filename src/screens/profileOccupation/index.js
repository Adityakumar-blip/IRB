//ProfileOccupation

import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import CustomBackGround from "../../component/customBackground/index";
import CustomHeader from "../../component/customHeader/index";
import ScrollableTabViewPager from "../../component/customSwitchTabsNew/index";
import styles from "../../helper/globalStyles";
import { toastShow } from "../../utils/customFunctions";
import BusinessTravel from "./businessTravel";
import HardwareAndSoftware from "./hardwareAndSoftware";
import Organization from "./organization";
import Profession from "./profession";
import RolesAndResponsbilties from "./rolesAndResponsbilties";
import { globalText } from "../../helper/globalText";
import I18n from "../../i18n/index";
import CustomLoader from "../../component/customLoader/index";
import { Singular } from "singular-react-native";

const ProfileOccupation = (props) => {
  const isFocused = useIsFocused();
  const [value, setValue] = useState({});
  const [isIndex, setIndex] = useState(0);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [scrollData, setScrollData] = useState([]);
  const [isCategory, setCategory] = useState({});
  const [loader, setLoader] = useState(false);
  const [isEndId, setEndId] = useState(null);

  useEffect(() => {
    Singular.event("ProfileOccupation");
    onPageInit();
    return () => {
      cleanUp();
    };
  }, [isFocused]);

  const cleanUp = () => {
    setValue("");
    setIndex(-1);
    setDataLoaded(false);
  };

  const onPageInit = async () => {
    const isData =
      (await props.route) && props.route.params && props.route.params.data;
    const isSubCatId =
      (await props.route) && props.route.params && props.route.params.id;
    setCategory(isData && isData);
    isData.items.map(async (item, index) => {
      item.name = item.sub_category_type;
      if (isSubCatId == item.sub_category_type_id) {
        setValue(item.sub_category_type_id);
        setIndex(index);
      }
    });
    let endId =
      (await isData) &&
      Number(isData.items[isData.items.length - 1].sub_category_type_id) + 1;
    setEndId(endId);
    setScrollData(isData && isData.items);
    setDataLoaded(true);
  };

  const onPassValues = async (isSubCatId) => {
    //setLoader(true);
    let endId =
      (await isCategory) &&
      Number(
        isCategory.items[isCategory.items.length - 1].sub_category_type_id
      ) + 1;
    setEndId(endId);
    if (isSubCatId != endId) {
      isCategory.items.map(async (item, index) => {
        item.name = item.sub_category_type;
        if (isSubCatId == item.sub_category_type_id) {
          toastShow(
            I18n.t(globalText._myProfileUpdatedSucessfully, {
              _value: isCategory.items[index - 1].sub_category_type,
            })
          );
          setValue(item.sub_category_type_id);
          setIndex(index);
        }
      });
      setScrollData(isCategory && isCategory.items);
      setDataLoaded(true);
      //setLoader(false);
    } else {
      setTimeout(() => {
        toastShow(
          I18n.t(globalText._myProfileCategoryUpdatedSucessfully, {
            _value: isCategory.category_name,
          })
        );
      }, 100);

      props.navigation.navigate("Dashboard");
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomBackGround
        screen={
          <SafeAreaView>
            {loader && <CustomLoader isVisible={loader} />}
            <CustomHeader
              headerName={isCategory.category_name}
              onPressLeftIcon={() => props.navigation.openDrawer()}
            />
            {isDataLoaded && (
              <View style={styles.height100BackWhite}>
                <View style={styles.simpleHeight50}>
                  {isDataLoaded && (
                    <ScrollableTabViewPager
                      isIndex={isIndex}
                      headers={scrollData && scrollData}
                      itemName={(item, index) => {
                        setValue(item.sub_category_type_id);
                        setIndex(index);
                      }}
                      //itemName={item => setValue(item)}
                    />
                  )}
                </View>
                <View style={styles.accBorder} />
                <Profession
                  isCheck={Number(isEndId) - 1}
                  checkValue={value}
                  onChangePage={(id) => {
                    onPassValues(id);
                  }}
                />
                {/* {value == 8 && (
                                    <Organization
                                        onChangePage={id => {
                                            onPassValues(id);
                                        }}
                                    />
                                )}
                                {value == 9 && (
                                    <RolesAndResponsbilties
                                        onChangePage={id => {
                                            onPassValues(id);
                                        }}
                                    />
                                )}
                                {value == 10 && (
                                    <HardwareAndSoftware
                                        onChangePage={id => {
                                            onPassValues(id);
                                        }}
                                    />
                                )}
                                {value == 11 && (
                                    <BusinessTravel
                                        onChangePage={id => {
                                            onPassValues(id);
                                        }}
                                    />
                                )} */}
              </View>
            )}
          </SafeAreaView>
        }
      />
    </View>
  );
};

export default ProfileOccupation;
