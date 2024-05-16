import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';

const Test = () => {
  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: 'orange',
        margin: 10,
        // height: Dimensions.get('window').height - 20,
        width: Dimensions.get('window').width - 20,
      }}>
      <Text>Test</Text>
    </View>
  );
};

const data = [
  {
    id: 1,
    Component: Test,
  },
  {
    id: 2,
    Component: Test,
  },
  {
    id: 3,
    Component: Test,
  },
  {
    id: 4,
    Component: Test,
  },
];

const Shalu = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'grey',
          flex: 1,
        }}>
        <FlatList
          horizontal
          pagingEnabled={true}
          style={{}}
          data={data}
          renderItem={({item}) => <item.Component />}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default Shalu;
