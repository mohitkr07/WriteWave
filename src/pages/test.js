import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import {Colors, Fonts, Icons} from '../constants';

import CalendarScreen from '../screens/teacherScreens/teacherBottomTabnavigatorScreens/CalendarScreen';
import ChatScreen from '../screens/teacherScreens/teacherBottomTabnavigatorScreens/ChatScreen';
import TeacherViewStackNavigator from './TeacherViewStackNavigator';
import FinanceScreen from '../screens/teacherScreens/teacherBottomTabnavigatorScreens/FinanceScreen';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Profile from '../screens/teacherScreens/ProfileDetails/Profile';

const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({focused, source}) => (
  <Image
    source={focused ? source.focused : source.normal}
    style={{width: responsiveWidth(6.5), height: responsiveWidth(6.5)}} // Adjust the width and height based on your design
    resizeMode="contain"
  />
);

const TeacherBottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: responsiveWidth(15),
          paddingBottom: responsiveWidth(1),
        },
        tabBarActiveTintColor: Colors.PRIMARY_COLOUR,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: responsiveFontSize(1.5),
          fontFamily: Fonts.montserratRegular,
        },
        tabBarIcon: ({focused}) => {
          let source;
          switch (route.name) {
            case 'Home':
              source = {
                normal: Icons.uncoloredHomeIcon,
                focused: Icons.coloredHomeIcon,
              };
              break;
            case 'Finance':
              source = {
                normal: Icons.uncoloredFinanceIcon,
                focused: Icons.coloredFinanceIcon,
              };
              break;
            case 'Calendar':
              source = {
                normal: Icons.uncoloredCalendarIcon,
                focused: Icons.coloredCalenderIcon,
              };
              break;
            case 'Chat':
              source = {
                normal: Icons.uncoloredChatIcon,
                focused: Icons.coloredChatIcon,
              };
              break;
            case 'Profile':
              source = {
                normal: Icons.uncoloredProfileIcon,
                focused: Icons.coloredProfileIcon,
              };
              break;
            default:
              source = {
                normal: Icons.uncoloredChatIcon,
                focused: Icons.uncoloredChatIcon,
              };
          }
          return <CustomTabBarIcon focused={focused} source={source} />;
        },
        tabBarLabelPosition: 'below-icon',
      })}>
      <Tab.Screen name="Home" component={TeacherViewStackNavigator} />
      <Tab.Screen name="Finance" component={FinanceScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TeacherBottomTabNavigation;
