import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import styles from '../../helper/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/colors';
import FastImage from '../../component/FastImage';
import GlobalImages from '../../helper/globalImages';
// import SvgUri from 'react-native-fast-svg';
import {SvgUri} from 'react-native-svg';
import {globalText} from '../../helper/globalText';
import I18n from '../../i18n/index';

const CountryModal = props => {
  const {visible, onRequestClose, data, onPressClose, onSetValue} = props;

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      key={index}
      onPress={() => onSetValue(item)}
      style={styles.countryRowview}>
      {item && item.flag ? (
        <View style={styles.countryIconStyle}>
          <SvgUri width={'30'} height={'30'} uri={item.flag} />
        </View>
      ) : (
        <FastImage
          style={styles.countryIconStyle}
          // source={
          //     { uri: item && item.flag }
          //         : GlobalImages.indiaFlagIcon
          // }
          source={GlobalImages.indiaFlagIcon}
          resizeMode={'cover'}
        />
      )}
      <Text numberOfLines={2} style={styles.width80}>
        {item.country_name} ({item.country_code})
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      swipeDirection="down"
      onRequestClose={onRequestClose}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={colors.TRANSPARENT}
        opacity={0.1}
        statusBarTranslucent
      />
      <View style={styles.actModMainView}>
        <View style={styles.countryView}>
          <TouchableOpacity onPress={onPressClose} style={styles.langModView}>
            <AntDesign name={'close'} size={20} color={colors.ABBEY} />
          </TouchableOpacity>
          <ScrollView>
            <View style={styles.paddB20}>
              {data && data.length > 0 ? (
                <FlatList
                  nestedScrollEnabled={true}
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index}
                  windowSize={20}
                  initialListSize={30}
                  initialNumToRender={30}
                  maxToRenderPerBatch={30}
                  removeClippedSubviews
                />
              ) : (
                <Text style={styles.textCenter}>
                  {I18n.t(globalText.noRecordFound)}
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
export default CountryModal;
