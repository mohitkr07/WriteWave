import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Create from '../pages/Create';
import QuoteScreen from '../pages/QuoteScreen';

const Stack = createNativeStackNavigator();

const CreateStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Create">
      <Stack.Screen
        options={{headerShown: false}}
        name="Create"
        component={Create}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="QuoteScreen"
        component={QuoteScreen}
      />
    </Stack.Navigator>
  );
};

export default CreateStackNavigator;
