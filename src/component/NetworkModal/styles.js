import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    modalShade: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    containerHeight: {
        height: '100%',
    },
    modalContainer: {
        padding: 20,
        width: '90%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        top: '40%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        // height:'39%'
    },
    modalTitle: {
        paddingBottom: 15,
        paddingTop: 5,
    },
    centerTitleByModal: {
        textAlign: 'center',
    },
    modalBtns: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    Btn: {
        padding: 10,
        backgroundColor: '#aaa',
        margin: 5,
        borderRadius: 3,
    },
    logOutBtn: {
        padding: 10,
        backgroundColor: '#aaa',
        margin: 5,
        borderRadius: 3,
    },
    BtnTxt: {
        textAlign: 'center',
        color: '#fff',
    },
    cancel: {
        padding: 10,
        backgroundColor: '#820263',
        margin: 5,
        borderRadius: 3,
    },
    logCancel: {
        padding: 10,
        backgroundColor: '#B38CB4',
        margin: 5,
        borderRadius: 3,
    },
    imgContainer: {
        marginTop: 20,
    },
    errMessage: {
        marginLeft: 20,
    },
    redTextstyle: {
        textAlign: 'center',
        fontSize: 18,
        color: 'red',
    },
    marT5Per: {
        marginTop: '5%',
    },
    textCenter: {
        textAlign: 'center',
    },
    // message: { color: Color.peachColor },
});
export default styles;
