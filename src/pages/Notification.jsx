import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../assets/colors/Colors';
import Icon from 'react-native-vector-icons/AntDesign';

const Notification = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{paddingRight: responsiveWidth(3)}}>
          <Icon name="arrowleft" size={25} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.topTxt}>Notifications</Text>
      </View>
      <FlatList
        horizontal={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 23, 23, 23, 232, 323, 23]}
        renderItem={() => (
          <View style={styles.notification}>
            <Text style={{color: Colors.TEXT}}>Hi Mohit</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    backgroundColor: Colors.BG_THEME,
    flex: 1,
  },
  top: {
    height: responsiveHeight(7.5),
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3),
    backgroundColor: Colors.BG_THEME,
  },
  topTxt: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.PRIMARY,
    fontWeight: '500',
  },
  notification: {
    height: responsiveHeight(7),
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    paddingHorizontal: responsiveWidth(3),
    marginTop: responsiveWidth(1),
    marginHorizontal: responsiveWidth(3),
    borderRadius: 3,
  },
});

export default Notification;
