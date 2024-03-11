import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../assets/colors/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {TextInput, GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon2 from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/slices/general';

const EditProfile = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userApi.profile);
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    link: user?.link,
    bio: user?.bio,
  });

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  useEffect(() => {
    dispatch(setUser(formData));
  }, [formData]);

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View style={styles.container}></View>

        <View style={{paddingHorizontal: responsiveWidth(5)}}>
          <View style={styles.singleInputContainer}>
            <Icon name="edit" color={Colors.PRIMARY} size={20} style={{}} />
            <TextInput
              value={formData.name}
              style={styles.input}
              onChangeText={txt => handleChange('name', txt)}
              placeholder="Name"
            />
          </View>

          <View style={styles.singleInputContainer}>
            <Icon2 name="user" color={Colors.PRIMARY} size={20} style={{}} />
            <TextInput
              value={formData.email}
              style={styles.input}
              onChangeText={txt => handleChange('email', txt)}
              placeholder="Email"
            />
          </View>

          <View style={styles.singleInputContainer}>
            <Icon2 name="link" color={Colors.PRIMARY} size={20} style={{}} />
            <TextInput
              value={formData.link}
              style={styles.input}
              onChangeText={txt => handleChange('link', txt)}
              placeholder="Link"
            />
          </View>

          <View style={styles.singleInputContainer}>
            <Icon
              name="filetext1"
              color={Colors.PRIMARY}
              size={20}
              style={{}}
            />
            <TextInput
              value={formData.bio}
              style={styles.input}
              onChangeText={txt => handleChange('bio', txt)}
              placeholder="Bio"
              numberOfLines={4}
              multiline={true}
            />
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(20),
    backgroundColor: Colors.PRIMARY,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.PRIMARY,
    padding: 0,
    marginHorizontal: 4,
    paddingVertical: 8,
    // textAlignVertical: 'top',
    marginLeft: responsiveWidth(5),
  },
  singleInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default EditProfile;
