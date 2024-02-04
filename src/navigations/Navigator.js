import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../auth/Login';
import Signup from '../auth/Signup';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Signup">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const routeName = 'auth';

const Navigator = props => {
  return (
    <NavigationContainer>
      {routeName === 'auth' ? <AuthStackNavigator /> : <BottomTabNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
