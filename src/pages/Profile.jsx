import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Button,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ProfilePic from '../assets/images/profile.jpg';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/EvilIcons';
import SinglePost from '../components/reusable/SinglePost';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getUserPosts} from '../redux/slices/userPostsSlice';
import {useFocusEffect} from '@react-navigation/native';
import {getUserProfile} from '../redux/slices/userApiSlice';
import {updateCoverPic} from '../redux/slices/userApiSlice';
import {updateProfilePic} from '../redux/slices/userApiSlice';
import Colors from '../assets/colors/Colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CommentBottomSheet from '../components/general/CommentBottomSheet';

const Profile = ({navigation}) => {
  // bug: somewhere data of profile is being set differently
  const dispatch = useDispatch();
  const user = useSelector(state => state?.userApi?.profile);
  const allPosts = useSelector(state => state?.userPosts?.posts);
  const [posts, setPosts] = useState(allPosts || []);
  // const [profilePic, setProfilePic] = useState(ProfilePic);

  // console.log(user);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
      getUserProfile();
    }, []),
  );

  const fetchPosts = async () => {
    try {
      const res = await dispatch(getUserPosts());
      const msg = res.payload.message;
      if (msg === 'Posts fetched') {
        setPosts(res.payload.posts);
      } else {
        console.log('error fetching posts');
      }
    } catch (error) {
      console.error('An error occurred while fetching posts:', error);
    }
  };

  const handleEditPress = () => {
    navigation.navigate('EditProfile');
  };

  const handleEdicProfilePic = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
      });
      uploadProfilePic(image.path);
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const handleEditCover = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 800,
        height: 240,
        cropping: true,
      });
      uploadCover(image.path);
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const uploadCover = async coverPic => {
    try {
      if (!coverPic) {
        console.error('No image selected');
        return;
      }

      const formData = new FormData();
      formData.append('image', {
        uri: coverPic,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      dispatch(updateCoverPic(formData)).then(response => {
        console.log('response', response.payload);
        dispatch(getUserProfile());
      });
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  const uploadProfilePic = async profilePic => {
    try {
      if (!profilePic) {
        console.error('No image selected');
        return;
      }

      const formData = new FormData();
      formData.append('image', {
        uri: profilePic,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      dispatch(updateProfilePic(formData)).then(response => {
        console.log('response', response.payload);
        dispatch(getUserProfile());
      });
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.top}>
          <View style={styles.profileImg}>
            <View style={styles.cover}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  flex: 1,
                  resizeMode: 'stretch',
                }}
                source={user?.coverPic ? {uri: user?.coverPic} : ProfilePic}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleEditCover}
                style={{
                  position: 'absolute',
                  right: responsiveWidth(4),
                  bottom: responsiveWidth(2),
                }}>
                <Icon3 size={30} color={Colors.WHITE} name="image" />
                <View
                  style={{
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    backgroundColor: Colors.WHITE,
                    borderRadius: 50,
                  }}>
                  <Icon3 name="add-circle" color={Colors.TEXT} size={15} />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.profileImageContainer}
              onPress={handleEdicProfilePic}>
              <View style={styles.proficPicContainer}>
                <Image
                  style={{flex: 1, aspectRatio: 1, resizeMode: 'contain'}}
                  source={
                    user?.profilePicture
                      ? {uri: user?.profilePicture}
                      : ProfilePic
                  }
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 7,
                  backgroundColor: Colors.WHITE,
                  borderRadius: 50,
                }}>
                <Icon3 name="add-circle" color={Colors.TEXT} size={19} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.profileDetail}>
            <View style={styles.nameContainer}>
              <Text style={styles.txtStyle.name}>{user?.name}</Text>
            </View>

            <View style={styles.bio}>
              <Text style={styles.txtStyle.bio}>
                {user?.bio ? user?.bio : 'Bio'}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('Follow')}
              style={styles.networkContainer}>
              <Text style={styles.txtStyle.network}>
                {user?.followers?.length} Followers | {user?.following?.length}{' '}
                Following
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleEditPress}
            style={styles.editProfile}>
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
            <Text
              style={{color: '#190482', fontSize: responsiveFontSize(2.08)}}>
              Posts ({posts.length})
            </Text>
          </TouchableOpacity>
          <View style={styles.viewOptions}>
            <Icon2 name="sort" size={responsiveWidth(7)} color={'black'} />
          </View>
        </View>

        {posts.length > 0 &&
          posts.map((post, index) => {
            return <SinglePost key={index} post={post} />;
          })}
      </ScrollView>
      {/* <CommentBottomSheet /> */}
    </GestureHandlerRootView>
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
    // overflow: 'hidden',
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: responsiveWidth(5),
  },
  proficPicContainer: {
    height: responsiveWidth(24),
    width: responsiveWidth(24),
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: Colors.WHITE,
    borderRadius: 50,
    overflow: 'hidden',
    position: 'relative',
    // bottom: 0,
    // left: responsiveWidth(5),
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
