import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SinglePost from '../components/reusable/SinglePost';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const Home = props => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={[1, 2, 3]}
      renderItem={() => <SinglePost />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
