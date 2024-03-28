import React, {useCallback, useRef, useMemo, useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, BackHandler} from 'react-native';
import BottomSheet, {
  BottomSheetFlatList,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {useDispatch} from 'react-redux';
import {
  addReply,
  createComment,
  fetchComments,
  setRepliesVacant,
  setReplyMode,
  toggleComment,
} from '../../redux/slices/commentSlice';
import {useSelector} from 'react-redux';
import Comment from './Comment';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Colors from '../../assets/colors/Colors';

const CommentBottomSheet = () => {
  const inpRef = useRef(null);
  const dispatch = useDispatch();
  const sheetRef = useRef(null);
  const isModalVisible = useSelector(state => state?.comment?.showComment);
  const data = useSelector(state => state?.comment?.comments);
  const postId = useSelector(state => state?.comment?.postId);
  const replyMode = useSelector(state => state?.comment?.reply?.replyMode);
  const replyTo = useSelector(state => state?.comment?.reply?.replyTo);

  const [comment, setComment] = useState('');

  const handleToggleComment = res => {
    dispatch(toggleComment(res));
  };

  const snapPoints = useMemo(() => ['60%', '100%'], []);

  const handleSheetChange = useCallback(index => {
    index === -1 ? handleToggleComment(false) : null;
  }, []);

  // const handleSnapPress = useCallback(index => {
  //   handleToggleComment(true);
  //   sheetRef.current?.snapToIndex(index);
  // }, []);

  // const handleClosePress = useCallback(() => {
  //   sheetRef.current?.close();
  // }, []);

  const renderItem = useCallback(({item}) => <Comment item={item} />, []);

  const handleCreateComment = () => {
    if (replyMode) {
      dispatch(addReply({postId, comment, commentId: replyTo?.commentId})).then(
        () => {
          setComment('');
          dispatch(fetchComments(postId));
        },
      );
    } else {
      dispatch(createComment({postId, comment})).then(() => {
        setComment('');
        dispatch(fetchComments(postId));
      });
    }
  };

  const handleCloseReplyMode = () => {
    dispatch(setReplyMode(false));
  };

  useEffect(() => {
    if (replyMode) {
      inpRef.current.focus();
    }
  }, [replyMode]);

  const handleAfterClose = () => {
    dispatch(setRepliesVacant());
  };

  // Handles back button press when modal is open
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (isModalVisible) {
          handleToggleComment(false);
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [isModalVisible]);

  return isModalVisible ? (
    <View style={styles.bottomSheet}>
      <View
        style={{
          flex: 1,
        }}>
        <BottomSheet
          enablePanDownToClose={true}
          onClose={handleAfterClose}
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}>
          {data.length > 0 ? (
            <BottomSheetFlatList
              style={{paddingHorizontal: responsiveWidth(5)}}
              data={data}
              keyExtractor={item => item._id}
              renderItem={renderItem}
              contentContainerStyle={styles.contentContainer}
            />
          ) : (
            <Text style={{textAlign: 'center', marginTop: 10}}>
              Type Something!
            </Text>
          )}
        </BottomSheet>
      </View>
      {replyMode && (
        <View
          style={{
            height: responsiveHeight(7),
            backgroundColor: Colors.WHITE,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: responsiveWidth(3),
            gap: 10,
          }}>
          <TouchableOpacity onPress={handleCloseReplyMode}>
            <Icon2 name={'x'} size={30} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text>Reply to</Text>
            <Text style={{fontWeight: '500'}}> {replyTo?.name}</Text>
          </View>
        </View>
      )}
      <View
        style={{
          maxHeight: responsiveHeight(10),
          backgroundColor: Colors.WHITE,
          flexDirection: 'row',
          paddingHorizontal: responsiveWidth(3),
          alignItems: 'center',
          elevation: 15,
        }}>
        <TextInput
          ref={inpRef}
          style={{flex: 1}}
          multiline={true}
          placeholder="Type Something..."
          value={comment}
          onChangeText={text => setComment(text)}
        />
        <TouchableOpacity
          onPress={handleCreateComment}
          style={{
            height: '100%',
            justifyContent: 'center',
            paddingHorizontal: 5,
          }}>
          <Icon name={'send-o'} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 100,
    justifyContent: 'flex-end',
  },
});

export default CommentBottomSheet;
