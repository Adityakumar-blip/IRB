import React from 'react';
import { ImageBackground, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import { MenuProvider } from 'react-native-popup-menu';

const { height, width } = Dimensions.get('window');

const CustomBackground = ({ screen }) => {
    return (
        <MenuProvider>
            <ImageBackground source={GlobalImages.backgroundImage} style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
                <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>{screen}</SafeAreaView>
            </ImageBackground>
        </MenuProvider>
    );
};

export default CustomBackground;
