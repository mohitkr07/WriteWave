import React, {useRef} from 'react';
import {Animated, View} from 'react-native';

const CURSOR_SIDE_SIZE = 20;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;

const Animation = () => {
  const touch = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  // const dimensions = useWindowDimensions();

  return (
    <View
      onStartShouldSetResponder={() => true}
      onResponderMove={event => {
        let X = event.nativeEvent.locationX;
        // let Y = event.nativeEvent.locationY;

        if (X > 100) {
          touch.setValue({
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
          });
        }
      }}
      style={{flex: 1, backgroundColor: 'white'}}>
      <Animated.View
        style={{
          position: 'absolute',
          left: Animated.subtract(touch.x, CURSOR_HALF_SIDE_SIZE),
          top: Animated.subtract(touch.y, CURSOR_HALF_SIDE_SIZE),
          height: CURSOR_SIDE_SIZE,
          width: CURSOR_SIDE_SIZE,
          borderRadius: CURSOR_HALF_SIDE_SIZE,
          backgroundColor: 'orange',
        }}
      />
    </View>
  );

  // const translation = useRef(new Animated.Value(0)).current;
  // const firstOpacity = useRef(new Animated.Value(0)).current;
  // const secondOpacity = useRef(new Animated.Value(0)).current;
  // const thirdOpacity = useRef(new Animated.Value(0)).current;

  // const startAnimation = () => {
  //   Animated.stagger(200, [
  //     Animated.timing(firstOpacity, {
  //       toValue: 1,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(secondOpacity, {
  //       toValue: 1,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(thirdOpacity, {
  //       toValue: 1,
  //       useNativeDriver: true,
  //     }),
  //     // Animated.timing(firstOpacity, {
  //     //   toValue: 0,
  //     //   useNativeDriver: true,
  //     // }),
  //     // Animated.timing(secondOpacity, {
  //     //   toValue: 0,
  //     //   useNativeDriver: true,
  //     // }),
  //     // Animated.timing(thirdOpacity, {
  //     //   toValue: 0,
  //     //   useNativeDriver: true,
  //     // }),
  //   ]).start(() => {
  //     // startAnimation();
  //   });
  // };

  // const startAnimation = () => {
  //   Animated.timing(translation, {
  //     toValue: 100,
  //     duration: 1000,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     translation.setValue(0);
  //     startAnimation();
  //   });
  // };

  // useEffect(() => {
  //   // startAnimation(); // Start animation on component mount
  // }, []);

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       // alignItems: 'center',
  //       justifyContent: 'center',
  //       gap: 10,
  //     }}>
  //     <Animated.View
  //       style={{
  //         width: 100,
  //         height: 100,
  //         // backgroundColor: 'red',
  //         // opacity: ,
  //         transform: [
  //           {
  //             translateX: translation,
  //           },
  //           {
  //             rotate: translation.interpolate({
  //               inputRange: [0, 25, 50, 75, 100],
  //               outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg'],
  //             }),
  //           },
  //         ],
  //         opacity: translation.interpolate({
  //           inputRange: [0, 50, 100],
  //           outputRange: [0, 1, 0],
  //           extrapolateLeft: 'clamp',
  //           extrapolateRight: 'clamp',
  //         }),
  //         backgroundColor: translation.interpolate({
  //           inputRange: [0, 50, 100],
  //           outputRange: ['red', 'blue', 'green'],
  //           // extrapolateLeft: 'clamp',
  //           // extrapolateRight: 'clamp',
  //           extrapolate: 'clamp',
  //         }),
  //       }}></Animated.View>

  //     {/* <Animated.View
  //       style={{
  //         width: 100,
  //         height: 100,
  //         backgroundColor: 'red',
  //         opacity: secondOpacity,
  //       }}></Animated.View>

  //     <Animated.View
  //       style={{
  //         width: 100,
  //         height: 100,
  //         backgroundColor: 'red',
  //         opacity: thirdOpacity,
  //       }}></Animated.View> */}
  //   </View>
  // );
};

export default Animation;
