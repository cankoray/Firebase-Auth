import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { Platform } from 'react-native';

import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AuthSuccessScreen from '../screens/AuthSuccessScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    marginHorizontal: 20,
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    Login: LoginScreen,
    Register: RegisterScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const SuccessNavigator = createStackNavigator(
  {
    Success: AuthSuccessScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Success: SuccessNavigator,
});

export default createAppContainer(MainNavigator);
