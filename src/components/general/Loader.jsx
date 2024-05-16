import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Colors from '../../assets/colors/Colors';

const Loader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.25)',
      }}>
      <ActivityIndicator size="large" color={Colors.BG_THEME} />
    </View>
  );
};

export default Loader;
