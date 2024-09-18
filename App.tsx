import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Init from './src';
import NetworkModal from './src/component/NetworkModal/NetworkModal';
import SharedService from './src/services/sharedService';
import ReduxStore from './src/store';
import {Singular, SingularConfig} from 'singular-react-native';

const App = () => {
  const store = createStore(ReduxStore);
  const [networkModal, setNetworkModal] = useState(false);

  const config = new SingularConfig(
    'internet_research_bureau_private_limited_033eac58',
    '1014d92d84aa27371a8362fa51111253',
  );
  // Optional settings:
  // Set user ID if known at time of initialization
  //   config.withCustomUserId("274e9db5c836093499df921be5");
  //   // To enable META Install Referrer
  //   config.withFacebookAppId("Insert your Facebook App ID here");
  //   // Enables deep linking
  //   config.withSingularLink(callBackFunction);
  //   // iOS - Enable SKAdNetwork
  //   config.withSkAdNetworkEnabled(true);
  //   // iOS - Wait 5m for tracking authorization before sending any events
  //   config.withWaitForTrackingAuthorizationWithTimeoutInterval(300);

  Singular.init(config);

  useEffect(() => {
    SharedService.networkChanged.subscribe((changed: any) => {
      if (changed.isInternetReachable == null) {
        return;
      }
      if (!changed.isInternetReachable) {
        setNetworkModal(true);
      } else {
        setNetworkModal(false);
      }
    });
  }, [networkModal]);

  return (
    <>
      <Provider store={store}>
        <NetworkModal stateStatus={networkModal} />
        <Init />
      </Provider>
    </>
  );
};

export default App;
