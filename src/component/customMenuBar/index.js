import { View, Text, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import styles from '../../helper/globalStyles';
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu';
import globalImages from '../../helper/globalImages';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import colors from '../../styles/colors';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomMenuBar = props => {
    const { categotyData } = props;

    const onCall = (item, item1, index) => {
        props.navigation.navigate('Basic_Profile', { data: item, id: item1.sub_category_type_id });
    };

    return (
        <View style={styles.headerMainViewStyle}>
            <View style={styles.headerMainView}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.openDrawer();
                    }}
                    style={styles.width10AlignLeft}
                >
                    <MaterialIcons name={'menu'} size={25} color={colors.ABBEY} />
                </TouchableOpacity>
                <View style={styles.width80}>
                    <View style={styles.rowCenter}>
                        <Text numberOfLines={1} style={styles.headerTextStyle}>
                            {I18n.t(globalText.dashboard)}
                        </Text>
                    </View>
                </View>
                <View style={styles.width10AlignRight}>
                    <Menu style={styles.dashMenustyle}>
                        <MenuTrigger>
                            <Entypo name={'dots-three-vertical'} size={20} color={colors.ABBEY} />
                        </MenuTrigger>
                        <MenuOptions
                            optionsContainerStyle={[
                                styles.dashMenuContainerStyle,
                                {
                                    marginTop: Platform.OS == 'ios' ? 40 : StatusBar.currentHeight + 10,
                                },
                            ]}
                        >
                            <ScrollView>
                                <View style={styles.paddB20}>
                                    <View style={[styles.menuStatusView, styles.marT10]}>
                                        <View style={styles.width20} />
                                        <View style={styles.width80}>
                                            <Text style={styles.dashProfColor}>{I18n.t(globalText.myProfile)}</Text>
                                        </View>
                                    </View>
                                    {categotyData &&
                                        categotyData.length > 0 &&
                                        categotyData.map((item, index) => (
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
                                                    <View style={styles.width80}>
                                                        <Text style={styles.pinkColorStyle}>{item.category_name}</Text>
                                                    </View>
                                                </View>
                                                <View style={[styles.menuStatusView, styles.marT5]}>
                                                    <View style={styles.width20} />
                                                    <View style={styles.width80WithBorder}></View>
                                                </View>

                                                {item.items &&
                                                    item.items.length > 0 &&
                                                    item.items.map((item1, index1) => (
                                                        <View key={index1} style={styles.menuStatusView}>
                                                            <View style={styles.width20} />
                                                            <View
                                                                style={[
                                                                    categotyData.length - 1 == index &&
                                                                    item.items.length - 1 == index1
                                                                        ? styles.width80
                                                                        : styles.width80WithBorder,
                                                                ]}
                                                            >
                                                                {item1.sub_category_type && (
                                                                    <MenuOption
                                                                        style={{}}
                                                                        onSelect={() => {
                                                                            onCall(item, item1, index);
                                                                        }}
                                                                    >
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
                            </ScrollView>
                        </MenuOptions>
                    </Menu>
                </View>
            </View>
        </View>
    );
};

export default CustomMenuBar;
