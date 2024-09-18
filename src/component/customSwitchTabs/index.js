import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import styles from '../../helper/globalStyles';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../../styles/colors';
import CustomLoader from '../../component/customLoader/index';

const { width } = Dimensions.get('window');
export default function ScrollableTabViewPager(props) {
    const { headers, itemName, needIcon, isIndex } = props;
    const [active, setActive] = useState(isIndex ? isIndex : 0);
    const [count, setCount] = useState(0);
    const [loader, setLoader] = useState(false);
    const headerScrollView = useRef(null);
    const itemScrollView = useRef(null);

    useFocusEffect(
        React.useCallback(() => {
            const isIndexValue = isIndex;
            setActive(isIndexValue && isIndexValue);
        }, [isIndex]),
    );

    useEffect(() => {
        onCall();
    }, [active]);

    const onCall = () => {
        if (count != 0) {
            headerScrollView.current.scrollToIndex({ index: active, viewPosition: 0.5, animated: true });
        }
        setCount(count + 1);
    };

    const onPressHeader = (item, index) => {
        itemName(item, index);
        itemScrollView.current.scrollToIndex({ index });
        setActive(index);
    };

    const onMomentumScrollEnd = e => {
        const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
        if (active != newIndex) {
            itemName(newIndex);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={headers}
                ref={headerScrollView}
                keyExtractor={item => item.name}
                horizontal
                initialScrollIndex={active}
                style={styles.sWTabheaderScroll}
                showsHorizontalScrollIndicator={false}
                onScrollToIndexFailed={info => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        headerScrollView.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                }}
                renderItem={({ item, index }) => (
                    <View>
                        <TouchableOpacity
                            onPress={() => onPressHeader(item, index)}
                            key={item}
                            style={styles.sWTabHeaderItem}
                        >
                            {needIcon && (
                                <View style={styles.paddR5}>
                                    {item.iconName == 'gift' && (
                                        <FontAwesome5
                                            name={'gift'}
                                            size={17}
                                            color={active === index ? colors.RED_VOILET : colors.TOPAZ}
                                        />
                                    )}
                                    {item.iconName == 'like1' && (
                                        <AntDesign
                                            name={'like1'}
                                            size={17}
                                            color={active === index ? colors.RED_VOILET : colors.TOPAZ}
                                        />
                                    )}
                                    {item.iconName == 'star' && (
                                        <Octicons
                                            name={'star'}
                                            size={17}
                                            color={active === index ? colors.RED_VOILET : colors.TOPAZ}
                                        />
                                    )}
                                    {item.iconName == 'list' && (
                                        <FontAwesome5
                                            name={'list-ul'}
                                            size={15}
                                            color={active === index ? colors.RED_VOILET : colors.TOPAZ}
                                        />
                                    )}
                                </View>
                            )}
                            <Text style={active === index ? styles.pinkStyle : { color: colors.TOPAZ }}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                        {active === index && <View style={styles.swTabHeaderBar} />}
                    </View>
                )}
            />
            <FlatList
                data={headers}
                ref={itemScrollView}
                //keyExtractor={item => item}
                horizontal
                pagingEnabled
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                //onMomentumScrollEnd={onMomentumScrollEnd}
                renderItem={({ item, index }) => null}
            />
        </View>
    );
}
