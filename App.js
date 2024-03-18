import React from 'react';
import Navigator from './src/navigations/Navigator';
import {Provider} from 'react-redux';
import store from './src/redux/app/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;

// import React, {useCallback, useRef, useMemo} from 'react';
// import {StyleSheet, View, Text, Button} from 'react-native';
// import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';

// const App = () => {
//   // hooks
//   const sheetRef = useRef(null);

//   // variables
//   const data = useMemo(
//     () =>
//       Array(50)
//         .fill(0)
//         .map((_, index) => `index-${index}`),
//     [],
//   );
//   const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

//   // callbacks
//   const handleSheetChange = useCallback(index => {
//     console.log('handleSheetChange', index);
//   }, []);
//   const handleSnapPress = useCallback(index => {
//     sheetRef.current?.snapToIndex(index);
//   }, []);
//   const handleClosePress = useCallback(() => {
//     sheetRef.current?.close();
//   }, []);

//   // render
//   const renderItem = useCallback(
//     ({item}) => (
//       <View style={styles.itemContainer}>
//         <Text>{item}</Text>
//       </View>
//     ),
//     [],
//   );
//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <View style={styles.container}>
//         <Button title="Snap To 90%" onPress={() => handleSnapPress(2)} />
//         <Button title="Snap To 50%" onPress={() => handleSnapPress(1)} />
//         <Button title="Snap To 25%" onPress={() => handleSnapPress(0)} />
//         <Button title="Close" onPress={() => handleClosePress()} />
//         <BottomSheet
//           enablePanDownToClose={true}
//           ref={sheetRef}
//           snapPoints={snapPoints}
//           onChange={handleSheetChange}>
//           <BottomSheetFlatList
//             data={data}
//             keyExtractor={i => i}
//             renderItem={renderItem}
//             contentContainerStyle={styles.contentContainer}
//           />
//         </BottomSheet>
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 200,
//   },
//   contentContainer: {
//     backgroundColor: 'white',
//   },
//   itemContainer: {
//     padding: 6,
//     margin: 6,
//     backgroundColor: '#eee',
//   },
// });

// export default App;
