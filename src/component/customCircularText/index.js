import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { globalText } from '../../helper/globalText';
import styles from '../../helper/globalStyles';
import I18n from '../../i18n/index';

const CustomCircularText = props => {
    const { data, onPress } = props;

    return (
        <View style={styles.sysnopsisTopicView}>
            <Text style={[styles.sysnopsisTopicTextStyle, styles.marginT8, styles.marR15]}>
                {I18n.t(globalText.topics)}:
            </Text>
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <TouchableOpacity style={styles.sysnopsisTopicTextView} key={index} onPress={() => onPress(item)}>
                        <Text style={styles.sysnopsisTopicTextStyle}>{item.poll_sub_category_name}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <Text style={styles.marT25}>{I18n.t(globalText.noRecordFound)}</Text>
            )}
        </View>
    );
};

export default CustomCircularText;
