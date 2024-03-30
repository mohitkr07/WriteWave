import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {getFeedPosts} from '../redux/slices/feedSlice';
import {useSelector} from 'react-redux';
import GeneralSinglePost from '../components/reusable/GeneralSinglePost';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed.posts);
  useEffect(() => {
    dispatch(getFeedPosts()).then(() => {
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

export default Home;
