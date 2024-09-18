import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {createStore} from 'redux';
import Privacy from '../screens/authentication/privacy';
import SignUp from '../screens/authentication/signUp';
import SocailLogin from '../screens/authentication/socailLogin';
import SocialThroughEmail from '../screens/authentication/socialThroughEmail';
import ThankYou from '../screens/authentication/thankYou';
import Splash from '../screens/splash';
import CompleteProfile from '../screens/authentication/completeProfile';
import CompleteProfilePersonal from '../screens/authentication/completeProfilePersonal';
import ForgotPassword from '../screens/authentication/forgotPassword';
import Auth from '../screens/authentication/index';
import Login from '../screens/authentication/login';
import OTP from '../screens/authentication/otp';
import OtpVerification from '../screens/authentication/otpVerification';
import PasswordVerification from '../screens/authentication/passwordVerification';
import ResetPassword from '../screens/authentication/resetPassword';
import DrawerNavigation from './drawerNavigation';
import RefferCollegue from '../screens/refferCollegue/index';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Splash'}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{gestureEnabled: false}}
        />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
        <Stack.Screen
          name="CompleteProfilePersonal"
          component={CompleteProfilePersonal}
        />
        <Stack.Screen name="SocailLogin" component={SocailLogin} />
        <Stack.Screen
          name="SocialThroughEmail"
          component={SocialThroughEmail}
        />
        <Stack.Screen name="ThankYou" component={ThankYou} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen
          name="PasswordVerification"
          component={PasswordVerification}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
