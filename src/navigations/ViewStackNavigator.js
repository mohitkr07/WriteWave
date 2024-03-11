import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import EditProfile from '../pages/EditProfile';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../assets/colors/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserProfile, setProfile} from '../redux/slices/userApiSlice';
import People from '../pages/People';
import FollowDetails from '../components/reusable/FollowDetails';
import PeopleFollowDetails from '../components/reusable/PeopleFollowDetails';

const Stack = createNativeStackNavigator();

const ViewStackNavigator = ({navigation}) => {
  const dispatch = useDispatch();
  const formData = useSelector(state => state.general.formData);

  const handleUpdate = () => {
    dispatch(updateUserProfile(formData)).then(response => {
      dispatch(setProfile(response.payload.user));
      // navigation.navigate('Profile');
      console.log('response', response);
    });
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="People" component={People} />
      <Stack.Screen name="Follow" component={FollowDetails} />
      <Stack.Screen name="FollowPeople" component={PeopleFollowDetails} />
      <Stack.Screen
        options={{
          title: 'Edit Profile',
          headerRight: () => (
            <TouchableOpacity onPress={() => handleUpdate()}>
              <Icon name="done" size={33} color={Colors.TEXT} />
            </TouchableOpacity>
          ),
        }}
        name="EditProfile"
        component={EditProfile}
      />
    </Stack.Navigator>
  );
};

export default ViewStackNavigator;
