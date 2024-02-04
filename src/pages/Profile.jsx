import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ProfilePic from '../assets/images/profile.jpg';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import SinglePost from '../components/reusable/SinglePost';

const Profile = ({navigation}) => {
  const handleEditPress = () => {
    console.log('test');
    navigation.navigate('EditProfile');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.profileImg}>
          <View style={styles.cover}></View>
          <View style={styles.proficPicContainer}>
            <Image
              style={{flex: 1, aspectRatio: 1, resizeMode: 'contain'}}
              source={ProfilePic}
            />
          </View>
        </View>

        <View style={styles.profileDetail}>
          <View style={styles.nameContainer}>
            <Text style={styles.txtStyle.name}>Mohit Kumar</Text>
          </View>

          <View style={styles.bio}>
            <Text style={styles.txtStyle.bio}>
              Zaruri nahi sirf usi se nafrat ho, jisse mohabbat ho...
            </Text>
          </View>

          <View style={styles.networkContainer}>
            <Text style={styles.txtStyle.network}>
              25 Followers | 32 Following
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleEditPress} style={styles.editProfile}>
          <Icon name="edit" size={16} color={'#7752FE'} />
          <Text style={styles.editTxt}>EDIT PROFILE</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 10,
            borderBottomWidth: 0.5,
            borderBottomColor: '#C2D9FF',
          }}
        />
      </View>

      <View style={styles.postOptions}>
        <TouchableOpacity style={styles.posts}>
          <Text style={{color: '#190482', fontSize: responsiveFontSize(2.08)}}>
            Posts (8)
          </Text>
        </TouchableOpacity>
        <View style={styles.viewOptions}>
          <Icon2 name="sort" size={responsiveWidth(7)} color={'black'} />
        </View>
      </View>

      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postOptions: {
    height: responsiveWidth(10),
    borderBottomWidth: 0.5,
    borderBottomColor: '#C2D9FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  posts: {
    height: '100%',
    width: responsiveWidth(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },

  container: {},
  profileImg: {
    position: 'relative',
    height: responsiveWidth(42),
  },
  cover: {
    height: responsiveWidth(30),
    width: '100%',
    backgroundColor: '#190482',
    position: 'absolute',
  },
  proficPicContainer: {
    height: responsiveWidth(24),
    width: responsiveWidth(24),
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: 'blue',
    position: 'absolute',
    bottom: 0,
    left: responsiveWidth(5),
  },
  profileDetail: {
    padding: responsiveWidth(3.5),
  },
  bio: {
    marginVertical: 1,
  },
  networkContainer: {
    marginVertical: 4,
  },
  txtStyle: {
    name: {
      color: 'black',
      fontSize: responsiveFontSize(2.21),
      fontWeight: '600',
    },
    bio: {
      color: 'black',
      fontSize: responsiveFontSize(1.82),
      fontWeight: '400',
    },
    network: {
      color: 'black',
      fontSize: responsiveFontSize(1.82),
      fontWeight: '500',
    },
  },
  editProfile: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#190482',
    marginHorizontal: responsiveWidth(3),
    borderRadius: 2,
    padding: 3.5,
  },
  editTxt: {
    color: '#7752FE',
    fontSize: responsiveFontSize(2.08),
    marginLeft: 5,
  },
});

export default Profile;
