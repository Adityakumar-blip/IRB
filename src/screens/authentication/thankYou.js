import React from 'react';
import { Image, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../styles/colors';
import CustomBackground from '../../component/customBackground/index';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import { globalText } from '../../helper/globalText';
import I18n from '../../i18n/index';
import FastImage from 'react-native-fast-image';

const ThankYou = props => {
    return (
        <View style={styles.container}>
            <CustomBackground
                screen={
                    <SafeAreaView>
                        <FastImage
                            style={styles.authLogoStyleCommom}
                            source={GlobalImages.logoIcon}
                            resizeMode={'contain'}
                        />
                        <View style={styles.sLoginMainView}>
                            <View style={styles.thankYouCheckView}>
                                <AntDesign color={colors.LIMA} size={60} name={'check'} />
                            </View>
                            <Text style={styles.thankYouTextStyle}>{I18n.t(globalText.thankYou)}</Text>
                            <Text style={styles.thankYouOpTextstyle}>
                                {I18n.t(globalText.yourOpinionIsImportantToUs)}
                            </Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Auth')}>
                                <Text style={styles.loginHereText}>{I18n.t(globalText.loginHere)}</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                }
            />
        </View>
    );
};

export default ThankYou;
