import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {getFeedPosts} from '../redux/slices/feedSlice';
import {useSelector} from 'react-redux';
import GeneralSinglePost from '../components/reusable/GeneralSinglePost';
import Loader from '../components/general/Loader';
import Colors from '../assets/colors/Colors';
// import LoaderKit from 'react-native-loader-kit';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const feed = useSelector(state => state.feed.posts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getFeedPosts()).then(() => {
      // console.log('feed', response.payload.posts);
      setLoading(false);
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={{backgroundColor: Colors.BG2}}
        showsVerticalScrollIndicator={false}
        data={feed}
        renderItem={post => (
          <GeneralSinglePost post={post.item} navigation={navigation} />
        )}
      />
      {loading ? <Loader /> : null}
    </View>
  );
};

export default Home;
