import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import EditProfile from '../pages/EditProfile';

const Stack = createNativeStackNavigator();

const ViewStackNavigator = props => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        options={{title: 'Edit Profile'}}
        name="EditProfile"
        component={EditProfile}
      />
    </Stack.Navigator>
  );
};

export default ViewStackNavigator;
