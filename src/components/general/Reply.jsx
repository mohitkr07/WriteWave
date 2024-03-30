import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../assets/colors/Colors';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {
  setReplyMode,
  setReplyTo,
  likeComment,
  likeReplyLocally,
} from '../../redux/slices/commentSlice';
import DefaultProfile from '../../assets/images/DefaultProfile.png';
import {useSelector} from 'react-redux';

const Reply = ({item, commentId}) => {
  const dispatch = useDispatch();
  const profile_id = useSelector(state => state?.userApi?.profile?._id);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const liked = item?.likes?.some(like => {
      return like.user === profile_id;
    });
    setIsLiked(liked);
  }, [item]);

  const handleReplyClick = () => {
    dispatch(setReplyMode(true));
    dispatch(
      setReplyTo({
        name: item?.user?.name,
        _id: item?.user?._id,
        commentId: commentId,
      }),
    );
  };

  const handleLikeClick = () => {
    dispatch(likeComment(item?._id)).then(res => {
      try {
        console.log('success', res);
      } catch (error) {
        console.log('failed', res);
      }
    });
    dispatch(
      likeReplyLocally({
        commentId: commentId,
        replyId: item?._id,
        userId: profile_id,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilePic}>
        <Image
          style={{
            height: '100%',
            width: '100%',
            flex: 1,
            resizeMode: 'cover',
            borderRadius: 50,
          }}
          source={
            item?.user?.profilePicture
              ? {uri: item?.user?.profilePicture}
              : DefaultProfile
          }
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
          <TouchableOpacity onPress={handleReplyClick} style={styles.like}>
            <Text style={styles.replyTxt}>Reply</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <Pressable
            onPress={handleLikeClick}
            style={{padding: 10, paddingBottom: 2}}>
            <Icon2
              name={isLiked ? 'heart' : 'heart-o'}
              size={15}
              color={isLiked ? '#FF0000' : Colors.GRAY}
            />
          </Pressable>
          <Text style={styles.likeTxt}>{item?.likes?.length}</Text>
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
