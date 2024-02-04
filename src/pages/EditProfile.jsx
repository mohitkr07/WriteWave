import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../assets/colors/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {TextInput, GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon2 from 'react-native-vector-icons/Feather';

const EditProfile = props => {
  const handleChange = text => {
    console.log(text);
  };

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View style={styles.container}></View>

        <View style={{paddingHorizontal: responsiveWidth(5)}}>
          <View style={styles.singleInputContainer}>
            <Icon name="edit" color={Colors.PRIMARY} size={20} style={{}} />
            <TextInput
              style={styles.input}
              onChangeText={handleChange}
              placeholder="Name"
            />
          </View>

          <View style={styles.singleInputContainer}>
            <Icon2 name="user" color={Colors.PRIMARY} size={20} style={{}} />
            <TextInput
              style={styles.input}
              onChangeText={handleChange}
              placeholder="Username"
            />
          </View>

          <View style={styles.singleInputContainer}>
            <Icon2 name="link" color={Colors.PRIMARY} size={20} style={{}} />
            <TextInput
              style={styles.input}
              onChangeText={handleChange}
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
              style={styles.input}
              onChangeText={handleChange}
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
