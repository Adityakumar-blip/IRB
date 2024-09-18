import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import styles from '../../helper/globalStyles';
import colors from '../../styles/colors';

const CustomLoader = props => {
    const { isVisible, noModal } = props;

    return noModal ? (
        <View
            style={{
                backgroundColor: '#000',
                opacity: 0.4,
                flex: 1,
                zIndex: 1,
                justifyContent: 'center',
                position: 'absolute',
                height: '100%',
                width: '100%',
            }}
        >
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator size={'large'} color={'#ED674E'} />
            </View>
        </View>
    ) : (
        <Modal transparent isVisible={isVisible}>
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.TEA_ROSE} />
            </View>
        </Modal>
    );
};

export default CustomLoader;
