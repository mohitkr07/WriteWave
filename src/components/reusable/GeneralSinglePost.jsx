import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import TestCreation from '../../assets/images/test.jpg';
import Test2Creation from '../../assets/images/test2.jpg';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ProfilePic from '../../assets/images/profile.jpg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/Fontisto';
import {hitLike} from '../../redux/slices/general';
import {useDispatch} from 'react-redux';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Colors from '../../assets/colors/Colors';
import {useSelector} from 'react-redux';

const GeneralSinglePost = ({post, navigation}) => {
  const dispatch = useDispatch();
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const userId = useSelector(state => state?.userApi?.profile?._id);
  const [postDetail, setPostDetail] = useState(post);
  const [postLiked, setLiked] = useState(postDetail?.liked);

  const handleCommentPress = () => {
    setCommentModalVisible(true);
  };

  const handleLike = () => {
    dispatch(hitLike(postDetail?._id)).then(res => {
      setPostDetail(res.payload.post);
      setLiked(!postLiked);
    });
  };

  const handleNavigate = () => {
    const id = postDetail?.author?._id;
    const data = {id};
    if (id === userId) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('People', {data});
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        {/* top */}
        <View style={styles.top}>
          <View style={styles.creator}>
            <TouchableOpacity
              onPress={handleNavigate}
              activeOpacity={0.7}
              style={styles.creatorPic}>
              <Image style={styles.profilePic} source={ProfilePic} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={handleNavigate}>
              <Text style={styles.creatorName}>{postDetail?.author?.name}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.postMenu}>
            <Icon name="ellipsis-v" size={20} color={'black'} />
          </View>
        </View>

        {/* creation */}
        <View style={styles.creation}>
          <Image
            source={
              postDetail?.quoteUrl
                ? {uri: `${postDetail?.quoteUrl}`}
                : Test2Creation
            }
            style={styles.creationPic}
          />
        </View>

        {/* Engagement */}
        <View style={styles.engagement}>
          <View style={styles.postActions}>
            <View style={styles.likeComment}>
              <Pressable onPress={handleLike}>
                <Icon2
                  name={postLiked ? 'heart' : 'heart-o'}
                  size={25}
                  color={postLiked ? '#FF0000' : 'black'}
                  style={{marginRight: 15}}
                />
              </Pressable>
              <Pressable onPress={handleCommentPress}>
                <Icon4 name="comment" size={23} color={'black'} />
              </Pressable>
            </View>
            <View style={styles.share}>
              <Icon2
                style={{marginRight: 15}}
                name="bookmark-o"
                size={23}
                color={'black'}
              />
              <Icon3 name="share-2" size={23} color={'black'} />
            </View>
          </View>
          <View style={styles.stats}>
            <Text>{postDetail?.likes?.length} Likes</Text>
          </View>
        </View>
        <View style={styles.tags}>
          <Text style={{color: '#7E30E1'}}>
            #alone #meaningful #relatable #alone_soul #life{' '}
          </Text>
        </View>

        {/* Render the CommentModal component */}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  tags: {
    paddingHorizontal: responsiveWidth(3),
    paddingBottom: 5,
  },
  top: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3.5),
    justifyContent: 'space-between',
  },
  creator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorPic: {
    height: 45,
    width: 45,
    borderRadius: 50,
    backgroundColor: Colors.WHITE,
    marginRight: responsiveWidth(2.5),
    overflow: 'hidden',
  },
  creatorName: {
    fontSize: responsiveFontSize(2.08),
    fontWeight: '600',
    color: 'black',
  },
  profilePic: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  creation: {
    height: responsiveWidth(100),
  },
  creationPic: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: 'contain',
  },

  //   engagement
  engagement: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1),
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: responsiveHeight(0.5),
  },
  likeComment: {
    flexDirection: 'row',
  },
  share: {
    flexDirection: 'row',
  },
});

export default GeneralSinglePost;
