import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  Pressable,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../assets/colors/Colors';
import Icon2 from 'react-native-vector-icons/FontAwesome';

const Reply = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profilePic}>
        <Image
          style={{flex: 1, resizeMode: 'cover', borderRadius: 50}}
          source={{uri: item?.user?.profilePicture}}
        />
      </View>
      <View style={styles.info}>
        <View style={styles.left}>
          <View style={styles.name}>
            <Text style={styles.nameTxt}>{item?.user?.name}</Text>
            <Text style={styles.time}> 31m</Text>
          </View>
          <View style={styles.comment}>
            <Text style={styles.commentTxt}>{item?.content}</Text>
          </View>
          <TouchableOpacity style={styles.like}>
            <Text style={styles.replyTxt}>Reply</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <Pressable>
            <Icon2
              name={false ? 'heart' : 'heart-o'}
              size={15}
              color={false ? '#FF0000' : Colors.GRAY}
            />
          </Pressable>
          <Text style={styles.likeTxt}>4</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profilePic: {
    height: 35,
    width: 35,
    backgroundColor: 'blue',
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
  },
  right: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    marginTop: 10,
  },
  likeTxt: {
    fontSize: responsiveFontSize(1.81),
    color: Colors.GRAY,
    fontWeight: '500',
  },
  name: {
    flexDirection: 'row',
    gap: responsiveWidth(1.8),
  },
  nameTxt: {
    fontSize: responsiveFontSize(1.81),
    fontWeight: '600',
    color: Colors.TEXT,
  },
  time: {
    fontSize: responsiveFontSize(1.81),
    color: Colors.GRAY,
  },
  comment: {
    marginVertical: 3,
  },
  commentTxt: {
    fontSize: responsiveFontSize(2.01),
  },
  replyTxt: {
    fontSize: responsiveFontSize(1.81),
    color: Colors.GRAY,
    fontWeight: '500',
  },
});

export default Reply;
