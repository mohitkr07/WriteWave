// import React, {useEffect, useRef, useState} from 'react';
// import {View, Text, StyleSheet, Image} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {
//   responsiveFontSize,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import Colors from '../../assets/colors/Colors';
// import Icon2 from 'react-native-vector-icons/FontAwesome';
// import Reply from './Reply';
// import {useDispatch} from 'react-redux';
// import {
//   fetchComments,
//   getReplies,
//   likeComment,
//   setReplyMode,
//   setReplyTo,
// } from '../../redux/slices/commentSlice';
// import {addReply} from '../../redux/slices/commentSlice';

// const Comment = ({item}) => {
//   const dispatch = useDispatch();
//   const [showReplies, setShowReplies] = useState(false);
//   const [populatedReplies, setPopulatedReplies] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [liked, setLiked] = useState(false);
//   const debounceRef = useRef(null);

//   useEffect(() => {
//     const likedd = item?.likes?.some(like => {
//       return like.user === item?.user?._id;
//     });
//     setLiked(likedd);
//   }, [item]);

//   const handleShowReplies = () => {
//     if (
//       populatedReplies.length > 0 &&
//       item?.replies.length === populatedReplies.length
//     ) {
//       return setShowReplies(!showReplies);
//     }

//     dispatch(getReplies(item?._id)).then(res => {
//       setPopulatedReplies(res?.payload?.comment?.replies);
//       setShowReplies(!showReplies);
//     });
//   };

//   const handleAddReply = () => {
//     dispatch(
//       addReply({
//         postId: item?.post,
//         commentId: item?._id,
//         reply: newComment,
//       }),
//     );
//   };

//   const handleReplyClick = () => {
//     dispatch(setReplyMode(true));
//     dispatch(
//       setReplyTo({
//         name: item?.user?.name,
//         _id: item?.user?._id,
//         commentId: item?._id,
//       }),
//     );
//   };

//   const handleLikeClick = () => {
//     setLiked(!liked); // Toggle liked state immediately

//     if (debounceRef.current) clearTimeout(debounceRef.current);

//     debounceRef.current = setTimeout(() => {
//       dispatch(likeComment(item?._id)).then(() => {
//         dispatch(fetchComments(item?.post));
//       });
//     }, 500); // Adjust debounce delay as needed
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.profilePic}>
//         <Image
//           style={{flex: 1, resizeMode: 'cover', borderRadius: 50}}
//           source={{uri: item?.user?.profilePicture}}
//         />
//       </View>
//       <View style={styles.info}>
//         <View style={styles.infoLeft}>
//           <View style={styles.left}>
//             <View style={styles.name}>
//               <Text style={styles.nameTxt}>{item?.user?.name}</Text>
//               <Text style={styles.time}> 31m</Text>
//             </View>
//             <View style={styles.comment}>
//               <Text style={styles.commentTxt}>{item?.content}</Text>
//             </View>
//             <TouchableOpacity onPress={handleReplyClick} style={styles.like}>
//               <Text style={styles.replyTxt}>Reply</Text>
//             </TouchableOpacity>

//             {!showReplies && item?.replies.length > 0 && (
//               <TouchableOpacity
//                 onPress={handleShowReplies}
//                 activeOpacity={0.7}
//                 style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   gap: 8,
//                   marginTop: 7,
//                 }}>
//                 <View
//                   style={{
//                     borderBottomWidth: 1,
//                     width: responsiveWidth(6),
//                     borderColor: Colors.BG2,
//                   }}
//                 />
//                 <Text style={{fontSize: responsiveFontSize(1.6)}}>
//                   {item?.replies.length} Replies
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>
//           <View style={styles.right}>
//             <TouchableOpacity
//               onPress={handleLikeClick}
//               style={{padding: 5, paddingBottom: 2}}>
//               <Icon2
//                 name={liked ? 'heart' : 'heart-o'}
//                 size={15}
//                 color={liked ? '#FF0000' : Colors.GRAY}
//               />
//             </TouchableOpacity>
//             <Text style={styles.likeTxt}>{item?.likes?.length}</Text>
//           </View>
//         </View>

//         {showReplies && (
//           <FlatList
//             style={{marginVertical: 5}}
//             data={populatedReplies}
//             renderItem={({item}) => <Reply item={item} />}
//           />
//         )}
//         {showReplies && (
//           <TouchableOpacity
//             onPress={handleShowReplies}
//             activeOpacity={0.7}
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               gap: 8,
//               marginVertical: 7,
//             }}>
//             <View
//               style={{
//                 borderBottomWidth: 1,
//                 width: responsiveWidth(6),
//                 borderColor: Colors.BG2,
//               }}
//             />
//             <Text style={{fontSize: responsiveFontSize(1.6)}}>
//               Hide Replies
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   profilePic: {
//     height: 45,
//     width: 45,
//     backgroundColor: 'blue',
//     borderRadius: 50,
//     alignSelf: 'flex-start',
//     marginVertical: 5,
//   },
//   info: {
//     flex: 1,
//   },
//   infoLeft: {
//     flexDirection: 'row',
//   },
//   left: {
//     flex: 1,
//   },
//   right: {
//     alignSelf: 'flex-start',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   likeTxt: {
//     fontSize: responsiveFontSize(1.81),
//     color: Colors.GRAY,
//     fontWeight: '500',
//   },
//   name: {
//     flexDirection: 'row',
//     gap: responsiveWidth(1.8),
//   },
//   nameTxt: {
//     fontSize: responsiveFontSize(1.81),
//     fontWeight: '600',
//     color: Colors.TEXT,
//   },
//   time: {
//     fontSize: responsiveFontSize(1.81),
//     color: Colors.GRAY,
//   },
//   comment: {
//     marginVertical: 3,
//   },
//   commentTxt: {
//     fontSize: responsiveFontSize(2.01),
//   },
//   replyTxt: {
//     fontSize: responsiveFontSize(1.81),
//     color: Colors.GRAY,
//     fontWeight: '500',
//   },
// });

// export default Comment;
