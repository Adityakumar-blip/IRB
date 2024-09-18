//ProfileOccupation

import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import CustomBackGround from '../../component/customBackground/index';
import CustomHeader from '../../component/customHeader/index';
import ScrollableTabViewPager from '../../component/customSwitchTabsNew/index';
import styles from '../../helper/globalStyles';
import HealthInsurance from './healthInsurance';
import AlignmentsAndTreatements from './alignmentsAndTreatements';
import Fitness from './fitness';
import { useIsFocused } from '@react-navigation/native';
import { toastShow } from '../../utils/customFunctions';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import { Singular } from 'singular-react-native';

const ProfileHealthAndFitnes = props => {
    const isFocused = useIsFocused();
    const [value, setValue] = useState({});
    const [isIndex, setIndex] = useState(0);
    const [isDataLoaded, setDataLoaded] = useState(false);
    const [scrollData, setScrollData] = useState([]);
    const [isCategory, setCategory] = useState({});
    const [isEndId, setEndId] = useState(null);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         onPageInit();
    //         return () => {
    //             cleanUp();
    //         };
    //     }, []),
    // );

    useEffect(() => {
        Singular.event("ProfileHealthAndFitness");
        onPageInit();
        return () => {
            cleanUp();
        };
    }, [isFocused]);

    const cleanUp = () => {
        setValue('');
        setIndex(-1);
        setDataLoaded(false);
    };

    const onPageInit = async () => {
        const isData = (await props.route) && props.route.params && props.route.params.data;
        const isSubCatId = (await props.route) && props.route.params && props.route.params.id;
        setCategory(isData && isData);
        isData.items.map(async (item, index) => {
            item.name = item.sub_category_type;
            if (isSubCatId == item.sub_category_type_id) {
                setValue(item.sub_category_type_id);
                setIndex(index);
            }
        });
        setScrollData(isData && isData.items);
        let endId = (await isData) && Number(isData.items[isData.items.length - 1].sub_category_type_id) + 1;
        setEndId(endId);
        setDataLoaded(true);
    };

    const onPassValues = async isSubCatId => {
        let endId =
            (await isCategory) && Number(isCategory.items[isCategory.items.length - 1].sub_category_type_id) + 1;
        setEndId(endId);
        if (isSubCatId != endId) {
            isCategory.items.map(async (item, index) => {
                item.name = item.sub_category_type;
                if (isSubCatId == item.sub_category_type_id) {
                    toastShow(
                        I18n.t(globalText._myProfileUpdatedSucessfully, {
                            _value: isCategory.items[index - 1].sub_category_type,
                        }),
                    );
                    //toastShow(isCategory.items[index - 1].sub_category_type + ' ' + 'updated sucessfully');
                    setValue(item.sub_category_type_id);
                    setIndex(index);
                }
            });
            setScrollData(isCategory && isCategory.items);
            setDataLoaded(true);
        } else {
            setTimeout(() => {
                toastShow(
                    I18n.t(globalText._myProfileCategoryUpdatedSucessfully, { _value: isCategory.category_name }),
                );
            }, 100);
            //toastShow('The ' + isCategory.category_name + ' ' + 'Category' + ' ' + 'updated sucessfully');
            props.navigation.navigate('Dashboard');
        }
    };

    return (
        <View style={styles.container}>
            <CustomBackGround
                screen={
                    <SafeAreaView>
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
                                        />
                                    )}
                                </View>
                                <View style={styles.accBorder} />

                                <HealthInsurance
                                    isCheck={Number(isEndId) - 1}
                                    checkValue={value}
                                    onChangePage={id => {
                                        onPassValues(id);
                                    }}
                                />

                                {/* {value == 13 && (
                                    <AlignmentsAndTreatements
                                        onChangePage={id => {
                                            onPassValues(id);
                                        }}
                                    />
                                )}
                                {value == 14 && (
                                    <Fitness
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

export default ProfileHealthAndFitnes;
