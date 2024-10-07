/* eslint-disable no-unused-vars */
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import CustomBackGround from '../../component/customBackground/index';
import CustomHeader from '../../component/customHeader/index';
import ScrollableTabViewPager from '../../component/customSwitchTabsNew/index';
import styles from '../../helper/globalStyles';
import {
  toastShow,
  getAsyncStorage,
  setAsyncStorage,
} from '../../utils/customFunctions';
import Basic_ProfileNew from './basicProfile';
import Education from './education';
import CustomLoader from '../../component/customLoader/index';
import {globalText} from '../../helper/globalText';
import I18n from '../../i18n/index';
import Api from '../../utils/api';
import AuthApi from '../../utils/authApi';

const Basic_Profile = props => {
  const isFocused = useIsFocused();
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState({});
  const [isIndex, setIndex] = useState(0);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [scrollData, setScrollData] = useState([]);
  const [isAllData, setAllData] = useState([]);
  const [checkValue, setCheckValue] = useState(0);
  const [isEndId, setEndId] = useState(null);
  const [categotyData, setCategotyData] = useState([]);
  const [isSubCategory7Data, setSubCategory7Data] = useState({
    allData: null,
    uniqueChars: null,
  });

  useEffect(() => {
    if (isFocused) {
      setScrollData([]);
      setAllData([]);
      onPageInit();
    }
    return () => {
      cleanUp();
    };
  }, [isFocused, props.route.params]);

  const cleanUp = () => {
    setValue('');
    setIndex(-1);
    setDataLoaded(false);
    setSubCategory7Data({
      allData: null,
      uniqueChars: null,
    });
  };

  let count;
  useEffect(() => {
    count = count + 1;
  }, [value]);

  const onPageInit = async (isSelectedData, isSelectedId) => {
    let isCheckCategoryData = [];
    const {id, data} = (await props.route) && props.route.params;
    let isData = isSelectedData ? isSelectedData : data;
    const isSubCatId = isSelectedId
      ? isSelectedId
      : isSelectedId == '0'
      ? isSelectedId
      : id;
    setCheckValue(isSelectedId ? isSelectedId : id);
    setAllData(isData && isData);
    if (!isData.isSelected && isSubCatId == 7) {
      isCheckCategoryData.push(isData.items[0]);
      isData.items = isCheckCategoryData;
    }
    isData.items.map(async (item, index) => {
      item.name = item.sub_category_type;
      if (isSubCatId == item.sub_category_type_id) {
        setValue(item.sub_category_type_id);
        setIndex(index);
      }
    });
    setScrollData(isData && isData.items);
    let endId =
      (await isData) &&
      Number(isData.items[isData.items.length - 1].sub_category_type_id) + 1;
    setEndId(endId);
    const isProfileMenuData = await JSON.parse(
      await getAsyncStorage('myProfileData'),
    );

    // alert(JSON.stringify(isProfileMenuData));
    setCategotyData(isProfileMenuData);
    setDataLoaded(true);
  };

  const onPassValues = async (isSubCatId, logicForSpecficTab) => {
    let isProfileMenuData = null;
    let isProfileMenuDataNew = {};
    if (isSubCatId == 8) {
      isProfileMenuData = await JSON.parse(
        await getAsyncStorage('myProfileData'),
      );
      if (logicForSpecficTab == 'selected') {
        setScrollData(isProfileMenuData[1].items);
        isProfileMenuData[1].items.map(async (item, index) => {
          item.name = item.sub_category_type;
          if (isSubCatId == item.sub_category_type_id) {
            setValue(item.sub_category_type_id);
            setIndex(index);
          }
        });
        isProfileMenuData[1].isSelected = true;
        isProfileMenuDataNew = isProfileMenuData[1];
        setAllData(isProfileMenuData[1]);
        setCategotyData(isProfileMenuData);
        await setAsyncStorage(
          'myProfileData',
          JSON.stringify([...isProfileMenuData]),
        );
      } else if (logicForSpecficTab == 'none') {
        isProfileMenuData[1].isSelected = false;
        await setAsyncStorage(
          'myProfileData',
          JSON.stringify([...isProfileMenuData]),
        );
        let isChangedData = [];
        isProfileMenuData[1].items.map(async (item, index) => {
          if (index == 0) {
            isChangedData.push(item);
          }
        });
        let valueNew = isProfileMenuData[1];
        valueNew.items = isChangedData;
        isProfileMenuDataNew = valueNew;
        setScrollData(isChangedData);
        setAllData(isProfileMenuDataNew);
        setCategotyData(isProfileMenuData);
      }
    }
    let isCheckData =
      (await isProfileMenuDataNew) &&
      Object.keys(isProfileMenuDataNew).length > 0
        ? isProfileMenuDataNew
        : isAllData;
    let endId =
      isCheckData &&
      Number(
        isCheckData.items[isCheckData.items.length - 1].sub_category_type_id,
      ) + 1;
    setEndId(endId);
    // setLoader(true);
    setCheckValue(isSubCatId);
    if (isSubCatId != endId) {
      isCheckData.items.map(async (item, index) => {
        item.name = item.sub_category_type;
        if (isSubCatId == item.sub_category_type_id) {
          setTimeout(() => {
            toastShow(
              I18n.t(globalText._myProfileUpdatedSucessfully, {
                _value: isCheckData.items[index - 1].sub_category_type,
              }),
            );
          }, 100);
          setValue(item.sub_category_type_id);
          setIndex(index);
        }
      });
      setScrollData(isCheckData && isCheckData.items);
      setDataLoaded(true);
      //setLoader(false);
    } else {
      props.navigation.navigate('Dashboard');
      setTimeout(() => {
        toastShow(
          I18n.t(globalText._myProfileCategoryUpdatedSucessfully, {
            _value: isCheckData.category_name,
          }),
        );
      }, 100);
    }
    //setLoader(false);
  };

  const onCall = async (item, item1, index) => {
    let isProfileMenuData = await JSON.parse(
      await getAsyncStorage('myProfileData'),
    );
    let newData = isProfileMenuData[index];
    console.log('sidebar pressed=====================', item, item1, index);
    setDataLoaded(false);
    onPageInit(newData, item1.sub_category_type_id);
  };

  const onShowTabs = async isShow => {
    let isProfileMenuData = await JSON.parse(
      await getAsyncStorage('myProfileData'),
    );
    if (isShow == 'show') {
      isProfileMenuData[1].isSelected = true;
      setScrollData(isProfileMenuData[1].items);
      setAllData(isProfileMenuData[1]);
      setCategotyData(isProfileMenuData);
    } else if (isShow == 'unShow') {
      let isChangedData = [];
      isProfileMenuData[1].isSelected = false;
      isProfileMenuData[1].items.map(async (item, index) => {
        if (index == 0) {
          isChangedData.push(item);
        }
      });
      isProfileMenuData[1].items = isChangedData;
      setScrollData(isChangedData);
      setAllData(isProfileMenuData[1]);
      setCategotyData(isProfileMenuData);
    }
  };

  const onSaveAnswer = async () => {
    // isCheck == checkValue && setLoader(true);
    let isProfileMenuData = await JSON.parse(
      await getAsyncStorage('myProfileData'),
    );
    if (isSubCategory7Data.allData && isSubCategory7Data.allData.length > 0) {
      const payload = {
        items: [...isSubCategory7Data.allData],
        sub_category_type_id: Number(7),
        pre_selected_question_arr:
          isSubCategory7Data.uniqueChars &&
          isSubCategory7Data.uniqueChars.length > 0
            ? isSubCategory7Data.uniqueChars
            : [],
      };
      const {data, message, success} = await AuthApi.postDataToServer(
        Api.myFamilySaveSelectedAnswer,
        payload,
      );
      if (!data) {
        // toastShow(message && message);
        return;
      }
      let isKey = data.data && data.data.key ? data.data.key : '';
      if (isKey == 'selected') {
        isProfileMenuData[1].isSelected = true;
      } else if (isKey == 'none') {
        isProfileMenuData[1].isSelected = true;
      }
      await setAsyncStorage(
        'myProfileData',
        JSON.stringify([...isProfileMenuData]),
      );
    }
  };

  const onChangeAnswerCheck = async isValue => {
    let isChangedData = [];
    let isNewData = await JSON.parse(await getAsyncStorage('myProfileData'));
    if (isValue) {
      isNewData[1].isSelected = true;
    } else {
      isNewData[1].isSelected = false;
    }
    await setAsyncStorage('myProfileData', JSON.stringify([...isNewData]));
    if (!isValue) {
      isNewData[1].items.map(async (item, index) => {
        if (index == 0) {
          isChangedData.push(item);
        }
      });
      isNewData[1].items = isChangedData;
      setCategotyData(isNewData);
    } else {
      setCategotyData(isNewData);
    }
  };

  const onSelectAnswer = async isValue => {
    let isNewDataOnew = await JSON.parse(
      await getAsyncStorage('myProfileData'),
    );
    if (isValue == 'selected') {
      isNewDataOnew[1].isSelected = true;
      setCategotyData(isNewDataOnew);
    } else {
      isNewDataOnew[1].isSelected = false;
      // let isChangedData = [];
      // isProfileMenuData[1].items.map(async (item, index) => {
      //     if (index == 0) {
      //         isChangedData.push(item);
      //     }
      // });
      // isProfileMenuData[1].items = isChangedData;
      setCategotyData(isNewDataOnew);
    }
  };

  const onCheckTabData = async () => {
    let isProfileMenuData = await JSON.parse(
      await getAsyncStorage('myProfileData'),
    );
    if (isProfileMenuData && isProfileMenuData[1].isSelected) {
      setCategotyData(isProfileMenuData);
    } else {
      let isChangedData = [];
      isProfileMenuData[1].items.map(async (item, index) => {
        if (index == 0) {
          isChangedData.push(item);
        }
      });
      isProfileMenuData[1].items = isChangedData;
      setCategotyData(isProfileMenuData);
    }
  };

  return (
    <View style={styles.container}>
      <CustomBackGround
        screen={
          <SafeAreaView>
            <CustomHeader
              headerName={isAllData && isAllData.category_name}
              onPressLeftIcon={() => props.navigation.openDrawer()}
              threeDotNeed
              categotyData={categotyData && categotyData}
              onCall={async (item, item1, index) => {
                await onCall(item, item1, index);
              }}
            />

            {loader && <CustomLoader isVisible={loader} />}
            {isDataLoaded && (
              <View style={styles.height100BackWhite}>
                <View style={styles.simpleHeight50}>
                  {isDataLoaded && (
                    <ScrollableTabViewPager
                      isIndex={isIndex && isIndex}
                      headers={scrollData && scrollData}
                      itemName={async (item, index) => {
                        console.log('tabs pressed', item, index);
                        if (value == 7) {
                          onSaveAnswer();
                          setValue(item.sub_category_type_id);
                          setIndex(index);
                        } else {
                          setValue(item.sub_category_type_id);
                          setIndex(index);
                        }

                        // setTimeout(() => {
                        //     setLoader(false);
                        // }, 200);
                      }}
                    />
                  )}
                </View>
                <View style={styles.accBorder} />

                {value == 0 && (
                  <Basic_ProfileNew
                    onChangePage={id => {
                      onPassValues(id, null);
                    }}
                    onChangeAnswer={isValue => {
                      onChangeAnswerCheck(isValue);
                    }}
                    // onSelectAnswer={isValue => {
                    //     onSelectAnswer(isValue);
                    // }}
                  />
                )}

                {value > 0 && (
                  <Education
                    isCheck={Number(isEndId) - 1}
                    checkValue={value}
                    onChangePage={(id, logicForSpecficTab) => {
                      onPassValues(id, logicForSpecficTab);
                    }}
                    onChnageTab={isShow => onShowTabs(isShow)}
                    onSaveUserData={(allData, uniqueChars) => {
                      isSubCategory7Data.allData = allData;
                      isSubCategory7Data.uniqueChars = uniqueChars;
                      setSubCategory7Data({...isSubCategory7Data});
                    }}
                  />
                )}
              </View>
            )}
          </SafeAreaView>
        }
      />
    </View>
  );
};

export default Basic_Profile;
