import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import { Component } from 'react';
import SharedService from '../sharedService/index';
import I18n from '../../i18n/index';
export default class NetworkService extends Component {
    static netChanged = true;

    static checkNetworkConnection() {
        NetInfo.addEventListener(NetworkService.handleConnectionChange);
        NetInfo.fetch().then(isConnected => {
            NetworkService.netChanged = isConnected;
        });
    }

    static handleConnectionChange(isConnected) {
        NetworkService.netChanged = isConnected;
        SharedService.networkChanged.next(isConnected);
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectionChange);
    }
}
