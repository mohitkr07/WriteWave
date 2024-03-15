import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SinglePost from '../components/reusable/SinglePost';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {getUserPosts} from '../redux/slices/userPostsSlice';
import {useDispatch} from 'react-redux';
import {getFeedPosts} from '../redux/slices/feedSlice';
import {useSelector} from 'react-redux';
import GeneralSinglePost from '../components/reusable/GeneralSinglePost';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed.posts);
  useEffect(() => {
    dispatch(getFeedPosts()).then(response => {
      // console.log('feed', response.payload.posts);
    });
  }, []);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={feed}
      renderItem={post => (
        <GeneralSinglePost post={post.item} navigation={navigation} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
