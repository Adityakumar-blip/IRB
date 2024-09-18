import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../../helper/globalStyles';

const CustomGlobalInsight = props => {
    const { source, text, onPress, value } = props;
    return (
        <TouchableOpacity style={{}} onPress={onPress}>
            <ImageBackground resizeMode="contain" style={styles.cGlobFirstView} source={source} imageStyle={{}}>
                <View style={styles.cGlobInView}>
                    <View style={styles.cGlobInViewFirst}>
                        <Text numberOfLines={3} style={styles.cGlobFirstText}>
                            {text}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default CustomGlobalInsight;
