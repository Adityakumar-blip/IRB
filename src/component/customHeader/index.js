import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  StatusBar,
  FlatList,
  Modal,
} from 'react-native';
import styles from '../../helper/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {globalText} from '../../helper/globalText';
import colors from '../../styles/colors';
import I18n from '../../i18n/index';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import globalImages from '../../helper/globalImages';
import FastImage from '../FastImage';
import CustomCheckBox from '../customCheckBox';
import AuthApi from '../../utils/authApi';
import Api from '../../utils/api';
import CustomLoader from '../customLoader/index';
import GlobalImages from '../../helper/globalImages';

import CustomButton from '../customButton/index';
import CustomRadioButton from '../customRadio/index';
import {setAsyncStorage, toastShow} from '../../utils/customFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomHeader = props => {
  const {
    headerName,
    threeDotNeed,
    backIcon,
    onPressLeftIcon,
    needMsg,
    count,
    onPressTheeDot,
    needText,
    categotyData,
    onCall,
  } = props;

  const [categoryData, setcategotyData] = useState();

  const [currentTime, setCurrentTime] = useState(new Date());

  const [loader, setLoader] = useState(false);

  const [isCategoryEnable, setCategoryEnable] = useState(false);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);

  const [isWithDraw, setWithDraw] = useState(false);

  const [isYes, setYes] = useState(false);

  const [isNo, setNo] = useState(false);

  const setCategoryConsent = async index => {
    // alert(JSON.stringify(categotyData[index]));

    // alert(JSON.stringify(categoryData[index]  ))
    const payload = {
      category_id: categoryData[index]['category_id'],
      categoryConsent: categoryData[index]['categoryConsent'],
    };

    setLoader(true);
    await AuthApi.postDataToServer(Api.saveCategoryConsent, payload);
    getcategorysubcategory();
    setLoader(false);
  };

  useEffect(() => {
    loadPersistedData();
  }, []);

  useEffect(() => {
    if (categotyData && categotyData.length > 0) {
      setcategotyData(categotyData);
      persistData(categotyData);
      setLoader(false);
    }
  }, [categotyData]);

  const loadPersistedData = async () => {
    try {
      const persistedData = await AsyncStorage.getItem('categoryData');
      if (persistedData) {
        setcategotyData(JSON.parse(persistedData));
        setLoader(false);
      }
    } catch (error) {
      console.error('Error loading persisted data:', error);
    }
  };

  const persistData = async data => {
    try {
      await AsyncStorage.setItem('categoryData', JSON.stringify(data));
    } catch (error) {
      console.error('Error persisting data:', error);
    }
  };

  const onSaveConsent = () => {
    setYes(false);
    setNo(false);

    if (
      (categoryData[activeCategoryIndex] &&
        categoryData[activeCategoryIndex]['categoryConsent'] == 0) ||
      categoryData[activeCategoryIndex]?.categoryConsent == 1
    ) {
      categoryData[activeCategoryIndex]['categoryConsent'] =
        categoryData[activeCategoryIndex]?.categoryConsent == 1 ? 0 : 1;
    }

    setCategoryConsent(activeCategoryIndex);
    setcategotyData(categoryData);
    setCurrentTime(new Date());
    onRequestClose();
  };

  const getcategorysubcategory = async () => {
    const {data, message} = await AuthApi.getDataFromServer(
      Api.myProfileGetCategorySubcategory,
    );
    if (!data) {
      if (message) {
        toastShow(message);
        return;
      }
    }
    const isData = data && data.data && data.data.data;
    if (isData) {
      let count = 0;
      isData.map((item, index) => {
        if (item.category_id == '1') {
          item.items.map((i, j) => {
            if (i.name == I18n.t(globalText._basicProfileNew)) {
              count = count + 1;
            }
          });
        }
      });
      if (count == 0) {
        isData.map((item, index) => {
          if (index == 0) {
            item.items.unshift({
              name: I18n.t(globalText._basicProfileNew),
              sub_category_type: I18n.t(globalText._basicProfileNew),
              sub_category_type_id: 0,
            });
          }
        });
      }
      console.log('sub category', isData);
      setcategotyData(isData);
      await setAsyncStorage('myProfileData', JSON.stringify([...isData]));
    }
  };

  const onRequestClose = () => {
    setCategoryEnable(false);
    setWithDraw(false);
  };

  const renderItem = ({item, index}) => (
    <View key={index} style={styles.marT10}>
      <View style={styles.menuStatusView}>
        <View style={styles.width20AligItCenter}>
          <FastImage
            resizeMode={'contain'}
            style={styles.dashboadrMenuIcon}
            source={
              item.category_type_mobile_image
                ? {
                    uri: item.category_type_mobile_image,
                  }
                : globalImages.familyIcon
            }
          />
        </View>

        <View
          style={[
            styles.width80,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          {categoryData[index]['isCheckbox'] == 'true' && (
            <>
              <CustomCheckBox
                checkValue={item.categoryConsent == 1 ? true : false}
                onPressCheckBox={() => {
                  setActiveCategoryIndex(index);
                  setWithDraw(false);
                  setTimeout(() => {
                    if (categoryData[index].categoryConsent == 1) {
                      setWithDraw(true);
                    } else {
                      if (
                        categoryData[index] &&
                        categoryData[index].categoryConsent == 1
                      ) {
                        onSaveConsent();
                      } else {
                        setCategoryEnable(!isCategoryEnable);
                      }
                    }
                  }, 100);
                }}
                style={{margin: 1}}
              />
            </>
          )}
          <Text style={[styles.pinkColorStyle, {marginLeft: 3}]}>
            {item.category_name}
          </Text>
        </View>
      </View>
      <View style={[styles.menuStatusView, styles.marT5]}>
        <View style={styles.width20} />
        <View style={styles.width80WithBorder}></View>
      </View>

      {item.category_id == 2 &&
        item.items &&
        item.items.length > 0 &&
        item.items.map((item1, index1) =>
          !categoryData[index]['categoryConsent'] ? (
            <View key={index1} style={styles.menuStatusView}>
              <View style={styles.width20} />
              <View
                style={[
                  categoryData.length - 1 == index &&
                  item.items.length - 1 == index1
                    ? styles.width80
                    : styles.width80WithBorder,
                ]}>
                {item1.sub_category_type && (
                  <MenuOption
                    style={{}}
                    onSelect={() => {
                      onCall(item, item1, index);
                    }}>
                    <Text style={styles.menuBlueColor}>
                      {item1.sub_category_type && item1.sub_category_type}
                    </Text>
                  </MenuOption>
                )}
              </View>
            </View>
          ) : (
            index1 == 0 && (
              <View key={index1} style={styles.menuStatusView}>
                <View style={styles.width20} />
                <View
                  style={[
                    categoryData.length - 1 == index &&
                    item.items.length - 1 == index1
                      ? styles.width80
                      : styles.width80WithBorder,
                  ]}>
                  {item1.sub_category_type && (
                    <MenuOption
                      style={{}}
                      onSelect={() => {
                        onCall(item, item1, index);
                      }}>
                      <Text style={styles.menuBlueColor}>
                        {item1.sub_category_type && item1.sub_category_type}
                      </Text>
                    </MenuOption>
                  )}
                </View>
              </View>
            )
          ),
        )}
      {item.category_id != 2 &&
        item.items &&
        item.items.length > 0 &&
        item.items.map((item1, index1) => (
          <View
            key={index1}
            style={[
              styles.menuStatusView,
              item.hasOwnProperty('isCheckbox') && item?.categoryConsent == 0
                ? {opacity: 0.5}
                : {opacity: 1},
            ]}
            pointerEvents={
              item.hasOwnProperty('isCheckbox') && item?.categoryConsent == 0
                ? 'none'
                : 'auto'
            }>
            <View style={styles.width20} />
            <View
              style={[
                categoryData.length - 1 == index &&
                item.items.length - 1 == index1
                  ? styles.width80
                  : styles.width80WithBorder,
              ]}>
              {item1.sub_category_type && (
                <MenuOption
                  style={{}}
                  onSelect={() => {
                    console.log('sidebaar index', index);
                    onCall(item, item1, index);
                  }}>
                  <Text style={styles.menuBlueColor}>
                    {item1.sub_category_type && item1.sub_category_type}
                  </Text>
                </MenuOption>
              )}
            </View>
          </View>
        ))}
    </View>
  );

  // console.log('category data', categoryData);

  return (
    <SafeAreaView style={styles.headerMainViewStyle}>
      <View style={styles.headerMainView}>
        {loader && <CustomLoader isVisible={loader} />}

        {(isCategoryEnable || isWithDraw) && (
          <Modal
            visible={isCategoryEnable || isWithDraw}
            animationType="slide"
            transparent={true}
            swipeDirection="down"
            onRequestClose={onRequestClose}
            backgroundColor="red">
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 'auto',
                  width: 350,
                  opacity: 1,
                  backgroundColor: '#FFF',
                  borderRadius: 10,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  position: 'relative',
                  paddingBottom: 20,
                  paddingHorizontal: 15,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setCategoryEnable(false);
                    setWithDraw(false);
                    setYes(false);
                    setNo(false);
                  }}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1,
                  }}>
                  <FastImage
                    style={{
                      height: 16,
                      width: 16,
                    }}
                    source={GlobalImages.crossIcon}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 35,
                    marginBottom: 10,
                  }}>
                  {I18n.t(globalText.Note)}
                </Text>
                <Text style={{color: 'black', marginBottom: 10, padding: 4}}>
                  {isWithDraw
                    ? I18n.t(globalText.are_you_sure)
                    : categoryData[activeCategoryIndex]?.categoryContent}
                </Text>

                {isWithDraw && (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 15,
                      width: '35%',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <CustomRadioButton
                        checkValue={isYes}
                        onPressRadio={() => {
                          setYes(true);
                          setNo(false);
                        }}
                      />
                      <Text style={{marginLeft: 10}}>
                        {I18n.t(globalText.yes)}
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <CustomRadioButton
                        checkValue={isNo}
                        onPressRadio={() => {
                          setYes(false);
                          setNo(true);
                        }}
                      />
                      <Text style={{marginLeft: 10}}>
                        {I18n.t(globalText.no)}
                      </Text>
                    </View>
                  </View>
                )}

                {isWithDraw && (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                    }}>
                    <CustomButton
                      onPress={() => {
                        if (isYes) {
                          onSaveConsent();
                        }
                        setYes(false);
                        setNo(false);
                        setWithDraw(false);
                      }}
                      addButtonStyle={[
                        styles.prAndSettSurveySaveStyle,
                        {marginRight: 10},
                      ]}
                      addButtonTextStyle={styles.fontSize14}
                      buttonName={I18n.t(globalText.update)}
                    />

                    <CustomButton
                      onPress={() => {
                        setWithDraw(false);
                        setYes(false);
                        setNo(false);
                      }}
                      addButtonStyle={styles.prAndSettSurveyCloseStyle}
                      addButtonTextStyle={styles.fontSize14}
                      buttonName={I18n.t(globalText.cancel)}
                    />
                  </View>
                )}

                {!isWithDraw && (
                  // <View style={{ marginTop: 5 }}>
                  <CustomButton
                    onPress={() => onSaveConsent()}
                    addButtonStyle={styles.prAndSettSurveySaveStyle}
                    addButtonTextStyle={styles.fontSize14}
                    buttonName={I18n.t(globalText._ok)}
                  />
                  // </View>
                )}
              </View>
            </View>
          </Modal>
        )}

        <TouchableOpacity
          style={styles.width10AlignLeft}
          onPress={onPressLeftIcon}>
          {backIcon ? (
            <MaterialIcons
              name={'keyboard-backspace'}
              size={20}
              color={colors.ABBEY}
            />
          ) : (
            <MaterialIcons name={'menu'} size={25} color={colors.ABBEY} />
          )}
        </TouchableOpacity>
        <View
          style={
            threeDotNeed
              ? needText
                ? styles.width70
                : styles.width80
              : styles.width90
          }>
          <View style={[styles.rowCenter, styles.width100]}>
            <Text numberOfLines={1} style={styles.headerTextStyle}>
              {headerName}
            </Text>
            {needMsg && (
              <View style={styles.headerCountView}>
                <Text style={styles.headerCountStyle}>
                  {/* {count} {I18n.t(globalText.new)} */}
                </Text>
              </View>
            )}
          </View>
        </View>
        {threeDotNeed && needText ? (
          <TouchableOpacity
            style={styles.width20AlignRight}
            onPress={onPressTheeDot}>
            <Text style={styles.colorsOXFORD_BLUE}>
              {I18n.t(globalText._clearAll)}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.width10per}>
            <Menu style={styles.dashMenustyle}>
              <MenuTrigger>
                <Entypo
                  style={{marginRight: -5}}
                  name={'dots-three-vertical'}
                  size={20}
                  color={colors.ABBEY}
                />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={[
                  styles.dashMenuContainerStyle,
                  {
                    marginTop:
                      Platform.OS == 'ios' ? 40 : StatusBar.currentHeight + 10,
                  },
                ]}>
                {/* <ScrollView> */}
                <View style={styles.paddB20}>
                  <View style={[styles.menuStatusView, styles.marT10]}>
                    <View style={styles.width20} />
                    <View style={styles.width80}>
                      <Text style={styles.dashProfColor}>
                        {I18n.t(globalText.myProfile)}
                      </Text>
                    </View>
                  </View>

                  <FlatList
                    data={categoryData} // Array of data to render
                    renderItem={renderItem} // Function to render each item
                    keyExtractor={(item, index) => item.id} // Function to extract unique keys from items
                    extraData={currentTime}
                  />
                </View>
                {/* </ScrollView> */}
                {/* <ScrollView>
                  <View style={styles.paddB20}>
                    <View style={[styles.menuStatusView, styles.marT10]}>
                      <View style={styles.width20} />
                      <View style={styles.width80}>
                        <Text style={styles.dashProfColor}>
                          {I18n.t(globalText.myProfile)}
                        </Text>
                      </View>
                    </View>

                    {categoryData?.map((item, index) => (
                      <View key={item.id || index} style={styles.marT10}>
                        <View style={styles.menuStatusView}>
                          <View style={styles.width20AligItCenter}>
                            <FastImage
                              resizeMode={'contain'}
                              style={styles.dashboadrMenuIcon}
                              source={
                                item.category_type_mobile_image
                                  ? {
                                      uri: item.category_type_mobile_image,
                                    }
                                  : globalImages.familyIcon
                              }
                            />
                          </View>

                          <View
                            style={[
                              styles.width80,
                              {flexDirection: 'row', alignItems: 'center'},
                            ]}>
                            {categoryData[index]['isCheckbox'] == 'true' && (
                              <>
                                <CustomCheckBox
                                  checkValue={
                                    item.categoryConsent == 1 ? true : false
                                  }
                                  onPressCheckBox={() => {
                                    setActiveCategoryIndex(index);
                                    setWithDraw(false);
                                    setTimeout(() => {
                                      if (
                                        categoryData[index].categoryConsent == 1
                                      ) {
                                        setWithDraw(true);
                                      } else {
                                        if (
                                          categoryData[index] &&
                                          categoryData[index].categoryConsent ==
                                            1
                                        ) {
                                          onSaveConsent();
                                        } else {
                                          setCategoryEnable(!isCategoryEnable);
                                        }
                                      }
                                    }, 100);
                                  }}
                                  style={{margin: 1}}
                                />
                              </>
                            )}
                            <Text
                              style={[styles.pinkColorStyle, {marginLeft: 3}]}>
                              {item.category_name}
                            </Text>
                          </View>
                        </View>
                        <View style={[styles.menuStatusView, styles.marT5]}>
                          <View style={styles.width20} />
                          <View style={styles.width80WithBorder}></View>
                        </View>

                        {item.category_id == 2 &&
                          item.items &&
                          item.items.length > 0 &&
                          item.items.map((item1, index1) =>
                            !categoryData[index]['categoryConsent'] ? (
                              <View key={index1} style={styles.menuStatusView}>
                                <View style={styles.width20} />
                                <View
                                  style={[
                                    categoryData.length - 1 == index &&
                                    item.items.length - 1 == index1
                                      ? styles.width80
                                      : styles.width80WithBorder,
                                  ]}>
                                  {item1.sub_category_type && (
                                    <MenuOption
                                      style={{}}
                                      onSelect={() => {
                                        onCall(item, item1, index);
                                      }}>
                                      <Text style={styles.menuBlueColor}>
                                        {item1.sub_category_type &&
                                          item1.sub_category_type}
                                      </Text>
                                    </MenuOption>
                                  )}
                                </View>
                              </View>
                            ) : (
                              index1 == 0 && (
                                <View
                                  key={index1}
                                  style={styles.menuStatusView}>
                                  <View style={styles.width20} />
                                  <View
                                    style={[
                                      categoryData.length - 1 == index &&
                                      item.items.length - 1 == index1
                                        ? styles.width80
                                        : styles.width80WithBorder,
                                    ]}>
                                    {item1.sub_category_type && (
                                      <MenuOption
                                        style={{}}
                                        onSelect={() => {
                                          onCall(item, item1, index);
                                        }}>
                                        <Text style={styles.menuBlueColor}>
                                          {item1.sub_category_type &&
                                            item1.sub_category_type}
                                        </Text>
                                      </MenuOption>
                                    )}
                                  </View>
                                </View>
                              )
                            ),
                          )}
                        {item.category_id != 2 &&
                          item.items &&
                          item.items.length > 0 &&
                          item.items.map((item1, index1) => (
                            <View
                              key={index1}
                              style={[
                                styles.menuStatusView,
                                item.hasOwnProperty('isCheckbox') &&
                                item?.categoryConsent == 0
                                  ? {opacity: 0.5}
                                  : {opacity: 1},
                              ]}
                              pointerEvents={
                                item.hasOwnProperty('isCheckbox') &&
                                item?.categoryConsent == 0
                                  ? 'none'
                                  : 'auto'
                              }>
                              <View style={styles.width20} />
                              <View
                                style={[
                                  categoryData.length - 1 == index &&
                                  item.items.length - 1 == index1
                                    ? styles.width80
                                    : styles.width80WithBorder,
                                ]}>
                                {item1.sub_category_type && (
                                  <MenuOption
                                    style={{}}
                                    onSelect={() => {
                                      console.log('sidebaar index', index);
                                      onCall(item, item1, index);
                                    }}>
                                    <Text style={styles.menuBlueColor}>
                                      {item1.sub_category_type &&
                                        item1.sub_category_type}
                                    </Text>
                                  </MenuOption>
                                )}
                              </View>
                            </View>
                          ))}
                      </View>
                    ))}
                  </View>
                </ScrollView> */}
              </MenuOptions>
            </Menu>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default CustomHeader;

// import React, {useEffect, useState} from 'react';
// import {
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   Platform,
//   StatusBar,
//   Modal,
//   ActivityIndicator,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FastImage from '../FastImage';
// import {Menu, MenuOptions, MenuTrigger} from 'react-native-popup-menu';

// import CustomCheckBox from '../customCheckBox';
// import CustomButton from '../customButton';
// import CustomRadioButton from '../customRadio';

// import styles from '../../helper/globalStyles';
// import colors from '../../styles/colors';
// import I18n from '../../i18n';
// import {globalText} from '../../helper/globalText';
// import globalImages from '../../helper/globalImages';
// import AuthApi from '../../utils/authApi';
// import Api from '../../utils/api';
// import {setAsyncStorage, toastShow} from '../../utils/customFunctions';

// const CustomHeader = props => {
//   const {
//     headerName,
//     threeDotNeed,
//     backIcon,
//     onPressLeftIcon,
//     needMsg,
//     count,
//     onPressTheeDot,
//     needText,
//     categotyData,
//     onCall,
//   } = props;

//   const [categoryData, setCategoryData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [isCategoryEnable, setCategoryEnable] = useState(false);
//   const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
//   const [isWithDraw, setWithDraw] = useState(false);
//   const [isYes, setYes] = useState(false);
//   const [isNo, setNo] = useState(false);

//   useEffect(() => {
//     loadPersistedData();
//   }, []);

//   useEffect(() => {
//     if (categotyData && categotyData.length > 0) {
//       setCategoryData(categotyData);
//       persistData(categotyData);
//       setIsLoading(false);
//     }
//   }, [categotyData]);

//   const loadPersistedData = async () => {
//     try {
//       const persistedData = await AsyncStorage.getItem('categoryData');
//       if (persistedData) {
//         setCategoryData(JSON.parse(persistedData));
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error('Error loading persisted data:', error);
//     }
//   };

//   const persistData = async data => {
//     try {
//       await AsyncStorage.setItem('categoryData', JSON.stringify(data));
//     } catch (error) {
//       console.error('Error persisting data:', error);
//     }
//   };

//   const setCategoryConsent = async index => {
//     const payload = {
//       category_id: categoryData[index]['category_id'],
//       categoryConsent: categoryData[index]['categoryConsent'],
//     };

//     setIsLoading(true);
//     await AuthApi.postDataToServer(Api.saveCategoryConsent, payload);
//     await getcategorysubcategory();
//     setIsLoading(false);
//   };

//   const getcategorysubcategory = async () => {
//     const {data, message} = await AuthApi.getDataFromServer(
//       Api.myProfileGetCategorySubcategory,
//     );
//     if (!data) {
//       if (message) {
//         toastShow(message);
//         return;
//       }
//     }
//     const isData = data && data.data && data.data.data;
//     if (isData) {
//       let count = 0;
//       isData.map((item, index) => {
//         if (item.category_id == '1') {
//           item.items.map((i, j) => {
//             if (i.name == I18n.t(globalText._basicProfileNew)) {
//               count = count + 1;
//             }
//           });
//         }
//       });
//       if (count == 0) {
//         isData.map((item, index) => {
//           if (index == 0) {
//             item.items.unshift({
//               name: I18n.t(globalText._basicProfileNew),
//               sub_category_type: I18n.t(globalText._basicProfileNew),
//               sub_category_type_id: 0,
//             });
//           }
//         });
//       }

//       setCategoryData(isData);
//       await setAsyncStorage('myProfileData', JSON.stringify([...isData]));
//     }
//   };

//   const onRequestClose = () => {
//     setCategoryEnable(false);
//     setWithDraw(false);
//   };

//   const onSaveConsent = () => {
//     setYes(false);
//     setNo(false);

//     if (
//       (categoryData[activeCategoryIndex] &&
//         categoryData[activeCategoryIndex]['categoryConsent'] == 0) ||
//       categoryData[activeCategoryIndex]?.categoryConsent == 1
//     ) {
//       categoryData[activeCategoryIndex]['categoryConsent'] =
//         categoryData[activeCategoryIndex]?.categoryConsent == 1 ? 0 : 1;
//     }

//     setCategoryConsent(activeCategoryIndex);
//     setCategoryData([...categoryData]);
//     setCurrentTime(new Date());
//     onRequestClose();
//   };

//   const renderCategoryItem = (item, index) => (
//     <View key={item.id || index} style={styles.marT10}>
//       <View style={styles.menuStatusView}>
//         <View style={styles.width20AligItCenter}>
//           <FastImage
//             resizeMode={'contain'}
//             style={styles.dashboadrMenuIcon}
//             source={
//               item.category_type_mobile_image
//                 ? {
//                     uri: item.category_type_mobile_image,
//                   }
//                 : globalImages.familyIcon
//             }
//           />
//         </View>

//         <View
//           style={[
//             styles.width80,
//             {flexDirection: 'row', alignItems: 'center'},
//           ]}>
//           {categoryData[index]['isCheckbox'] == 'true' && (
//             <CustomCheckBox
//               checkValue={item.categoryConsent == 1}
//               onPressCheckBox={() => {
//                 setActiveCategoryIndex(index);
//                 setWithDraw(false);
//                 setTimeout(() => {
//                   if (categoryData[index].categoryConsent == 1) {
//                     setWithDraw(true);
//                   } else {
//                     if (
//                       categoryData[index] &&
//                       categoryData[index].categoryConsent == 1
//                     ) {
//                       onSaveConsent();
//                     } else {
//                       setCategoryEnable(!isCategoryEnable);
//                     }
//                   }
//                 }, 100);
//               }}
//               style={{margin: 1}}
//             />
//           )}
//           <Text style={[styles.pinkColorStyle, {marginLeft: 3}]}>
//             {item.category_name}
//           </Text>
//         </View>
//       </View>
//       <View style={[styles.menuStatusView, styles.marT5]}>
//         <View style={styles.width20} />
//         <View style={styles.width80WithBorder}></View>
//       </View>

//       {item.items &&
//         item.items.map((subItem, subIndex) => (
//           <View
//             key={subItem.id || subIndex}
//             style={[
//               styles.menuStatusView,
//               item.hasOwnProperty('isCheckbox') && item?.categoryConsent == 0
//                 ? {opacity: 0.5}
//                 : {opacity: 1},
//             ]}
//             pointerEvents={
//               item.hasOwnProperty('isCheckbox') && item?.categoryConsent == 0
//                 ? 'none'
//                 : 'auto'
//             }>
//             <View style={styles.width20} />
//             <View
//               style={[
//                 categoryData.length - 1 == index &&
//                 item.items.length - 1 == subIndex
//                   ? styles.width80
//                   : styles.width80WithBorder,
//               ]}>
//               {subItem.sub_category_type && (
//                 <TouchableOpacity onPress={() => onCall(item, subItem, index)}>
//                   <Text style={styles.menuBlueColor}>
//                     {subItem.sub_category_type}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>
//         ))}
//     </View>
//   );

//   console.log('category Data', categoryData);

//   return (
//     <SafeAreaView style={styles.headerMainViewStyle}>
//       <View style={styles.headerMainView}>
//         {isLoading && <ActivityIndicator size="large" color={colors.PRIMARY} />}

//         {(isCategoryEnable || isWithDraw) && (
//           <Modal
//             visible={isCategoryEnable || isWithDraw}
//             animationType="slide"
//             transparent={true}
//             onRequestClose={onRequestClose}>
//             <View style={styles.modalContainer}>
//               <View style={styles.modalContent}>
//                 <TouchableOpacity
//                   onPress={onRequestClose}
//                   style={styles.closeButton}>
//                   <FastImage
//                     style={styles.closeIcon}
//                     source={globalImages.crossIcon}
//                   />
//                 </TouchableOpacity>

//                 <Text style={styles.modalTitle}>{I18n.t(globalText.Note)}</Text>
//                 <Text style={styles.modalText}>
//                   {isWithDraw
//                     ? I18n.t(globalText.are_you_sure)
//                     : categoryData[activeCategoryIndex]?.categoryContent}
//                 </Text>

//                 {isWithDraw && (
//                   <View style={styles.radioButtonContainer}>
//                     <View style={styles.radioButtonWrapper}>
//                       <CustomRadioButton
//                         checkValue={isYes}
//                         onPressRadio={() => {
//                           setYes(true);
//                           setNo(false);
//                         }}
//                       />
//                       <Text style={styles.radioButtonText}>
//                         {I18n.t(globalText.yes)}
//                       </Text>
//                     </View>

//                     <View style={styles.radioButtonWrapper}>
//                       <CustomRadioButton
//                         checkValue={isNo}
//                         onPressRadio={() => {
//                           setYes(false);
//                           setNo(true);
//                         }}
//                       />
//                       <Text style={styles.radioButtonText}>
//                         {I18n.t(globalText.no)}
//                       </Text>
//                     </View>
//                   </View>
//                 )}

//                 {isWithDraw ? (
//                   <View style={styles.buttonContainer}>
//                     <CustomButton
//                       onPress={() => {
//                         if (isYes) {
//                           onSaveConsent();
//                         }
//                         setYes(false);
//                         setNo(false);
//                         setWithDraw(false);
//                       }}
//                       addButtonStyle={[
//                         styles.prAndSettSurveySaveStyle,
//                         styles.marginRight10,
//                       ]}
//                       addButtonTextStyle={styles.fontSize14}
//                       buttonName={I18n.t(globalText.update)}
//                     />

//                     <CustomButton
//                       onPress={() => {
//                         setWithDraw(false);
//                         setYes(false);
//                         setNo(false);
//                       }}
//                       addButtonStyle={styles.prAndSettSurveyCloseStyle}
//                       addButtonTextStyle={styles.fontSize14}
//                       buttonName={I18n.t(globalText.cancel)}
//                     />
//                   </View>
//                 ) : (
//                   <CustomButton
//                     onPress={onSaveConsent}
//                     addButtonStyle={styles.prAndSettSurveySaveStyle}
//                     addButtonTextStyle={styles.fontSize14}
//                     buttonName={I18n.t(globalText._ok)}
//                   />
//                 )}
//               </View>
//             </View>
//           </Modal>
//         )}

//         <TouchableOpacity
//           style={styles.width10AlignLeft}
//           onPress={onPressLeftIcon}>
//           {backIcon ? (
//             <MaterialIcons
//               name={'keyboard-backspace'}
//               size={20}
//               color={colors.ABBEY}
//             />
//           ) : (
//             <MaterialIcons name={'menu'} size={25} color={colors.ABBEY} />
//           )}
//         </TouchableOpacity>
//         <View
//           style={
//             threeDotNeed
//               ? needText
//                 ? styles.width70
//                 : styles.width80
//               : styles.width90
//           }>
//           <View style={[styles.rowCenter, styles.width100]}>
//             <Text numberOfLines={1} style={styles.headerTextStyle}>
//               {headerName}
//             </Text>
//             {needMsg && (
//               <View style={styles.headerCountView}>
//                 <Text style={styles.headerCountStyle}></Text>
//               </View>
//             )}
//           </View>
//         </View>
//         {threeDotNeed && needText ? (
//           <TouchableOpacity
//             style={styles.width20AlignRight}
//             onPress={onPressTheeDot}>
//             <Text style={styles.colorsOXFORD_BLUE}>
//               {I18n.t(globalText._clearAll)}
//             </Text>
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.width10per}>
//             <Menu style={styles.dashMenustyle}>
//               <MenuTrigger>
//                 <Entypo
//                   style={{marginRight: -5}}
//                   name={'dots-three-vertical'}
//                   size={20}
//                   color={colors.ABBEY}
//                 />
//               </MenuTrigger>
//               <MenuOptions
//                 optionsContainerStyle={[
//                   styles.dashMenuContainerStyle,
//                   {
//                     marginTop:
//                       Platform.OS == 'ios' ? 40 : StatusBar.currentHeight + 10,
//                   },
//                 ]}>
//                 <ScrollView>
//                   <View style={styles.paddB20}>
//                     <View style={[styles.menuStatusView, styles.marT10]}>
//                       <View style={styles.width20} />
//                       <View style={styles.width80}>
//                         <Text style={styles.dashProfColor}>
//                           {I18n.t(globalText.myProfile)}
//                         </Text>
//                       </View>
//                     </View>

//                     {categoryData.map(renderCategoryItem)}
//                   </View>
//                 </ScrollView>
//               </MenuOptions>
//             </Menu>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default React.memo(CustomHeader);
