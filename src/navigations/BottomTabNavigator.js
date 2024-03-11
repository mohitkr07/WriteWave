import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ViewStackNavigator from './ViewStackNavigator';
import Search from '../pages/Search';
import Notification from '../pages/Notification';
import Profile from '../pages/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {Text, View} from 'react-native';
import Create from '../pages/Create';
import {useDispatch} from 'react-redux';
import {getUserProfile} from '../redux/slices/userApiSlice';

const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({focused, source, label}) => {
  if (label === 'Post') {
    return (
      <Icon3
        name={focused ? source.name2 : source.name}
        color={focused ? '#190482' : 'black'}
        size={responsiveHeight(2.8)}
      />
    );
  }
  if (label === 'HomeTab') {
    return (
      <Icon2
        name={focused ? source.name : source.name2}
        color={focused ? '#190482' : 'black'}
        size={responsiveHeight(2.5)}
      />
    );
  }
  return (
    <Icon
      name={focused ? source.name : source.name2}
      color={focused ? '#190482' : 'black'}
      size={
        source.name === 'user' && focused
          ? responsiveHeight(2.9)
          : responsiveHeight(2.5)
      }
    />
  );
};

const BottomTabNavigator = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 5,
          height: responsiveHeight(7),
        },
        tabBarActiveTintColor: '#190482',
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused}) => {
          let source;
          switch (route.name) {
            case 'HomeTab':
              source = {
                name: 'home',
                name2: 'home-outline',
              };
              break;
            case 'Search':
              source = {
                name: 'search',
                name2: 'search',
              };
              break;
            case 'Post':
              source = {
                name: 'pluscircleo',
                name2: 'pluscircle',
              };
              break;
            case 'Notification':
              source = {
                name: 'bell',
                name2: 'bell-o',
              };
              break;
            case 'Profile':
              source = {
                name: 'user',
                name2: 'user-o',
              };
              break;
            default:
              source = {
                name: 'home',
                name2: 'home',
              };
          }
          return (
            <View style={{}}>
              <CustomTabBarIcon
                focused={focused}
                source={source}
                label={route.name}
              />
            </View>
          );
        },
      })}>
      <Tab.Screen
        options={{title: 'Home'}}
        name="HomeTab"
        component={ViewStackNavigator}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        options={{tabBarLabel: 'Create'}}
        name="Post"
        component={Create}
      />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
