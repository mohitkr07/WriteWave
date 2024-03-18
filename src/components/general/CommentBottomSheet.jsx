import React, {useCallback, useRef, useMemo, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Pressable,
  TextInput,
} from 'react-native';
import BottomSheet, {
  BottomSheetFlatList,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {
  addReply,
  createComment,
  fetchComments,
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

  const handleSnapPress = useCallback(index => {
    handleToggleComment(true);
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const renderItem = useCallback(({item}) => <Comment item={item} />, []);

  const handleCreateComment = () => {
    if (replyMode) {
      dispatch(addReply({postId, comment, commentId: replyTo?.commentId})).then(
        res => {
          setComment('');
          dispatch(fetchComments(postId));
        },
      );
    } else {
      dispatch(createComment({postId, comment})).then(res => {
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

  return isModalVisible ? (
    <View style={styles.bottomSheet}>
      <View
        style={{
          flex: 1,
        }}>
        <BottomSheet
          enablePanDownToClose={true}
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}>
          <BottomSheetFlatList
            style={{paddingHorizontal: responsiveWidth(5)}}
            data={data}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
          />
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
