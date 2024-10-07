import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import styles from '../../helper/globalStyles';
import {useFocusEffect} from '@react-navigation/native';
import colors from '../../styles/colors';

const {width} = Dimensions.get('window');

export default function ScrollableTabViewPager(props) {
  const {headers, itemName, needIcon, isIndex} = props;
  const [active, setActive] = useState(isIndex || 0);
  const headerScrollView = useRef(null);
  const itemScrollView = useRef(null);
  const [tabWidths, setTabWidths] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      if (isIndex !== undefined) {
        setActive(isIndex);
        scrollToTab(isIndex);
      }
    }, [isIndex]),
  );

  useEffect(() => {
    if (tabWidths.length > 0) {
      scrollToTab(active);
    }
  }, [active, tabWidths]);

  const scrollToTab = index => {
    if (headerScrollView.current && tabWidths.length > index) {
      const offset = tabWidths
        .slice(0, index)
        .reduce((sum, width) => sum + width, 0);
      headerScrollView.current.scrollToOffset({
        offset: offset,
        animated: true,
      });
    }
    itemScrollView.current?.scrollToIndex({index, animated: true});
  };

  const onPressHeader = (item, index) => {
    if (active === index) return;
    setActive(index);
    itemName(item, index);
  };

  const renderIcon = (iconName, isActive) => {
    const color = isActive ? colors.RED_VOILET : colors.TOPAZ;
    switch (iconName) {
      case 'gift':
        return <FontAwesome5 name="gift" size={17} color={color} />;
      case 'like1':
        return <AntDesign name="like1" size={17} color={color} />;
      case 'star':
        return <Octicons name="star" size={17} color={color} />;
      case 'list':
        return <FontAwesome5 name="list-ul" size={15} color={color} />;
      default:
        return null;
    }
  };

  const onLayout = (event, index) => {
    const {width} = event.nativeEvent.layout;
    setTabWidths(prev => {
      const newWidths = [...prev];
      newWidths[index] = width;
      return newWidths;
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={headers}
        extraData={active}
        ref={headerScrollView}
        keyExtractor={(item, index) => `header-${index}`}
        horizontal
        style={styles.sWTabheaderScroll}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => onPressHeader(item, index)}
            activeOpacity={0.6}
            style={styles.sWTabHeaderItem}
            onLayout={event => onLayout(event, index)}>
            {needIcon && (
              <View style={styles.paddR5}>
                {renderIcon(item.iconName, active === index)}
              </View>
            )}
            <Text
              style={
                active === index ? styles.pinkStyle : {color: colors.TOPAZ}
              }>
              {item.name || item.sub_category_type}
            </Text>
            {active === index && <View style={styles.swTabHeaderBar} />}
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={headers}
        ref={itemScrollView}
        keyExtractor={(item, index) => `item-${index}`}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({item, index}) => null}
      />
    </View>
  );
}
