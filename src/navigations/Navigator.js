import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/slices/userSlice';
import {useDispatch} from 'react-redux';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
        dispatch(setToken(token));
      } catch (error) {
        console.error('Error checking authentication:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={isAuthenticated ? 'BottomTabs' : 'Auth'}>
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
        <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
