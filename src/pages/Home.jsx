import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = props => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <Text>Home</Text>
      <Icon name="cloud-download" />
    </View>
  );
};

export default Home;
