import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import Colors from '../../assets/colors/Colors';

const NavBar = ({
  title,
  navigation,
  navigateTo,
  checkAction,
  checkActionNavigateTo,
  reaction,
}) => {
  const handleNavigation = () => {
    navigateTo ? navigation.navigate(navigateTo) : navigation.goBack();
  };

  const handleCheckAction = () => {
    if (checkActionNavigateTo) {
      navigation.navigate(checkActionNavigateTo);
    } else reaction();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigation}>
        <Icon name="arrowleft" size={30} color="white" />
      </TouchableOpacity>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
      {checkAction && (
        <TouchableOpacity onPress={handleCheckAction}>
          <Icon2 name="check" size={30} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsiveWidth(15),
    backgroundColor: Colors.NAVBAR,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  text: {
    color: 'white',
    fontSize: responsiveFontSize(2.2),
  },
});

export default NavBar;
