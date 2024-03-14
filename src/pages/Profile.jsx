import React, {useEffect, useState} from 'react';
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
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getUserPosts} from '../redux/slices/userPostsSlice';
import {useFocusEffect} from '@react-navigation/native';

const Profile = ({navigation}) => {
  // bug: somewhere data of profile is being set differently
  const dispatch = useDispatch();
  const user = useSelector(state => state?.userApi?.profile);
  const allPosts = useSelector(state => state?.userPosts?.posts);
  const [posts, setPosts] = useState(allPosts || []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
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
            Posts ({posts.length})
          </Text>
        </TouchableOpacity>
        <View style={styles.viewOptions}>
          <Icon2 name="sort" size={responsiveWidth(7)} color={'black'} />
        </View>
      </View>

      {posts.length > 0 &&
        posts.map((post, index) => {
          return (
            <SinglePost
              key={index}
              post={post}
              // id={post._id}
              // imgUri={post.quoteUrl}
              // author={post.author}
              // likes={post.likes}
              // liked={post.liked}
            />
          );
        })}

      {/* <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost /> */}
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
