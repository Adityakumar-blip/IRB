import React, { useEffect } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import { globalText } from '../../helper/globalText';
import GlobalImages from '../../helper/globalImages';
import styles from '../../helper/globalStyles';
import colors from '../../styles/colors';
import I18n from '../../i18n/index';
import FastImage from 'react-native-fast-image';
import { Singular } from 'singular-react-native';

const ChangePhoto = props => {
    const { visible, onRequestClose, onPressTrash, onPressComponent, onPressCamera, onPressOutside } = props;

    const hp = Dimensions.get('window').height;
    const wp = Dimensions.get('window').width;

    useEffect(() => {
        Singular.event("ChangePhoto");
    },[])

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            swipeDirection="down"
            onRequestClose={onRequestClose}
        >
            <StatusBar
                barStyle={'light-content'}
                translucent
                backgroundColor={colors.TRANSPARENT}
                opacity={0.1}
                statusBarTranslucent
            />
            <TouchableWithoutFeedback onPress={() => onPressOutside()}>
                <View style={styles.changePgotoBackColor}>
                    <View style={styles.changePhotoFirstView}></View>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.changePhotoSecondView}>
                            <View>
                                <Text style={styles.profilePhotoText}>{I18n.t(globalText.profilePhoto)}</Text>
                            </View>
                            <View style={styles.changePhotoButtonView}>
                                <TouchableOpacity style={styles.changePhotoButtonView_1} onPress={onPressTrash}>
                                    <FastImage
                                        source={GlobalImages.trashIcon}
                                        resizeMode={'contain'}
                                        style={styles.changePhotoButtonImage}
                                    />
                                    <Text style={styles.changePhotoText}>{I18n.t(globalText.removePhoto)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onPressComponent} style={styles.changePhotoButtonView_1}>
                                    <FastImage
                                        source={GlobalImages.componentIcon}
                                        resizeMode={'contain'}
                                        style={styles.changePhotoButtonImage}
                                    />
                                    <Text style={styles.changePhotoText}>{I18n.t(globalText.gallery)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onPressCamera} style={styles.changePhotoButtonView_1}>
                                    <FastImage
                                        source={GlobalImages.cameraIcon}
                                        resizeMode={'contain'}
                                        style={styles.changePhotoButtonImage}
                                    />
                                    <Text style={styles.changePhotoText}>{I18n.t(globalText.camera)}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};
export default ChangePhoto;
