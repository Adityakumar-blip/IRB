import React, { useState } from 'react';
import { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import CustomBackGround from '../../component/customBackground/index';
import CustomHeader from '../../component/customHeader/index';
import ScrollableTabViewPager from '../../component/customSwitchTabs/index';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import SampleData from '../../helper/sampleData';
import I18n from '../../i18n/index';
import Points from './points';
import Redemption from './redemption';
import Rewards from './rewards';
import Survey from './survey';
import { getAsyncStorage } from '../../utils/customFunctions';
import { Singular, sngLog } from "singular-react-native";

const Account_statement = props => {
    const [value, setValue] = useState(I18n.t(globalText.rewards));
    const [isIndex, setIndex] = useState(0);
    const [categotyData, setCategotyData] = useState([]);

    const headers = [
        { name: I18n.t(globalText.rewards), iconName: 'gift' },
        { name: I18n.t(globalText.points), iconName: 'star' },
        {
            name: I18n.t(globalText.surveyHistory),
            iconName: 'list',
        },
        { name: I18n.t(globalText.Redemption), iconName: 'like1' },
    ];

    useEffect(() => {
        onPageInit();
    }, []);

    const onPageInit = async () => {
        Singular.event("account_statement");
        const isProfileMenuData = await JSON.parse(await getAsyncStorage('myProfileData'));
        if (isProfileMenuData) {
            setCategotyData(isProfileMenuData);
        }
    };

    const onCall = (item, item1, index) => {
        props.navigation.navigate('Basic_Profile', { data: item, id: item1.sub_category_type_id });
    };

    return (
        <View style={styles.container}>
            <CustomBackGround
                screen={
                    <SafeAreaView style={styles.height100}>
                        <CustomHeader
                            headerName={I18n.t(globalText.accStatement)}
                            onPressLeftIcon={() => props.navigation.openDrawer()}
                            threeDotNeed
                            categotyData={categotyData && categotyData}
                            onCall={(item, item1, index) => onCall(item, item1, index)}
                        />
                        <View style={styles.height100BackWhite}>
                            <View style={styles.simpleHeight50}>
                                <ScrollableTabViewPager
                                    needIcon
                                    headers={headers && headers}
                                    isIndex={isIndex && isIndex}
                                    itemName={(item, index) => {
                                        setIndex(index);
                                        setValue(item.name);
                                    }}
                                />
                            </View>
                            <View style={styles.accBorder} />
                            {value == I18n.t(globalText.rewards) && <Rewards />}
                            {value == I18n.t(globalText.points) && <Points />}
                            {value == I18n.t(globalText.surveyHistory) && <Survey />}
                            {value == I18n.t(globalText.Redemption) && <Redemption />}
                        </View>
                    </SafeAreaView>
                }
            />
        </View>
    );
};

export default Account_statement;
