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
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import SinglePost from '../components/reusable/SinglePost';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {getPeople} from '../redux/slices/general';
import {getPeoplePosts} from '../redux/slices/general';
import Colors from '../assets/colors/Colors';
import {followAction} from '../redux/slices/general';
import {getUserProfile} from '../redux/slices/userApiSlice';

const People = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [people, setPeople] = useState(null);
  const [posts, setPosts] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowsYou, setisFollowsYou] = useState(false);
  const userId = route?.params?.data?.id;
  const selfId = useSelector(state => state.userApi.profile._id);

  console.log('actual id', userId);

  useEffect(() => {
    fetchPeopleProfile();
  }, [userId]);

  const fetchPeopleProfile = () => {
    dispatch(getPeople(userId)).then(response => {
      console.log('test', response.payload.user);
      setPeople(response.payload.user);
    });
  };

  useEffect(() => {
    dispatch(getPeoplePosts(userId)).then(response => {
      // console.log('People_peoplePosts', response.payload.posts);
      setPosts(response.payload.posts);
    });
  }, []);

  useEffect(() => {
    const exists = people?.followers?.some(obj => obj._id === selfId);
    const isfollow = people?.following?.some(obj => obj._id === selfId);
    setisFollowsYou(isfollow);
    setIsFollowing(exists);
  }, [people]);

  const handleFollowNavigation = () => {
    const data = {
      followers: people?.followers,
      following: people?.following,
    };
    navigation.navigate('FollowPeople', {
      data,
    });
  };

  const handleFollowClick = () => {
    dispatch(followAction(userId)).then(res => {
      fetchPeopleProfile();
      dispatch(getUserProfile());
      console.log('followAction', res.payload);
    });
    // setIsFollowing(!isFollowing);
  };

  return (
    people && (
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
                source={people?.coverPic ? {uri: people?.coverPic} : ProfilePic}
              />
            </View>
            <View style={styles.proficPicContainer}>
              <Image
                style={{flex: 1, aspectRatio: 1, resizeMode: 'contain'}}
                source={
                  people?.profilePicture
                    ? {uri: people?.profilePicture}
                    : ProfilePic
                }
              />
            </View>
            <TouchableOpacity
              onPress={handleFollowClick}
              style={{
                ...styles.followAction,
                backgroundColor: isFollowing ? Colors.WHITE : Colors.BG2,
                borderWidth: isFollowing ? 1 : 0,
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.81),
                  fontWeight: '500',
                  color: Colors.TEXT,
                }}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileDetail}>
            <View style={styles.nameContainer}>
              <Text style={styles.txtStyle.name}>{people?.name}</Text>
              {isFollowsYou && (
                <View
                  style={{
                    backgroundColor: '#e8e8e8',
                    alignSelf: 'flex-start',
                    paddingHorizontal: 5,
                    borderRadius: 3,
                    paddingVertical: 2,
                    marginVertical: 2,
                  }}>
                  <Text style={{fontSize: 12}}>Follows you</Text>
                </View>
              )}
            </View>

            <View style={styles.bio}>
              <Text style={styles.txtStyle.bio}>
                {people?.bio ? people?.bio : 'Bio'}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleFollowNavigation}
              style={styles.networkContainer}>
              <Text style={styles.txtStyle.network}>
                {people?.followers?.length} Followers |{' '}
                {people?.following?.length} Following
              </Text>
            </TouchableOpacity>
          </View>

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
              Posts ({posts?.length})
            </Text>
          </TouchableOpacity>
          <View style={styles.viewOptions}>
            <Icon2 name="sort" size={responsiveWidth(7)} color={'black'} />
          </View>
        </View>

        {posts && posts.length > 0
          ? posts.map((post, index) => {
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
            })
          : null}
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'column',
  },
  followAction: {
    position: 'absolute',
    bottom: 0,
    right: responsiveWidth(10),
    width: responsiveWidth(25),
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 5,
  },
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
    backgroundColor: Colors.WHITE,
    position: 'absolute',
  },
  proficPicContainer: {
    height: responsiveWidth(24),
    width: responsiveWidth(24),
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: Colors.WHITE,
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

export default People;
