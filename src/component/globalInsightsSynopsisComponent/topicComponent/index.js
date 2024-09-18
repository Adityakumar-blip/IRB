import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TopicComponent = () => {
    const topicData = [
        { topic: 'Culture' },
        { topic: 'Office' },
        { topic: 'Cul' },
        { topic: 'Office' },
        { topic: 'Culture' },
        { topic: 'Off' },
        { topic: '' },
        { topic: 'Work from home Work from home Work from home Work from home Work from home Work from home' },
    ];

    return (
        <View style={styles.sysnopsisTopicView}>
            {/* <Text style={[styles.sysnopsisTopicTextStyle, { backgroundColor: undefined, marginRight: 0 }]}>Topic</Text> */}
            {topicData &&
                topicData.map((item, index) => {
                    if (item.topic.length != '') {
                        return (
                            <View style={styles.sysnopsisTopicTextView} key={index}>
                                <Text style={styles.sysnopsisTopicTextStyle}>{item.topic}</Text>
                            </View>
                        );
                    }
                })}
        </View>
    );
};

const styles = StyleSheet.create({
    sysnopsisTopicView: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sysnopsisTopicTextView: {
        paddingBottom: 5,
        borderRadius: 15,
        marginRight: 15,
        marginBottom: 10,
        paddingHorizontal: 15,
        paddingTop: 3,
        backgroundColor: '#EEEEEE',
    },
    sysnopsisTopicTextStyle: {
        fontSize: 16,
        color: '#262D64',
        lineHeight: 25,
        alignSelf: 'baseline',
    },
});

export default TopicComponent;
