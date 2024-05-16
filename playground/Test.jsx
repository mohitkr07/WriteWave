// import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCodeScanner,
} from 'react-native-vision-camera';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Svg, {Defs, Mask, Rect} from 'react-native-svg';

function CameraFrame() {
  return (
    <Svg height="100%" width="100%">
      <Defs>
        <Mask id="mask" x="0" y="0" height="100%" width="100%">
          <Rect height="100%" width="100%" fill="#fff" />
          <Rect
            x={responsiveWidth(15)}
            y="33.5%"
            width={responsiveScreenWidth(70)}
            height={responsiveWidth(70)}
            fill="black"
            rx="20"
            ry="20"
          />
        </Mask>
      </Defs>

      <Rect
        height="100%"
        width="100%"
        fill="rgba(0,0,0,0.5)"
        mask="url(#mask)"
      />
    </Svg>
  );
}

const Test = () => {
  const arrayOfTransforms = [
    {
      rotate: '0deg',
      propleft: 'left',
      proptop: 'top',
    },
    {
      rotate: '90deg',
      propleft: 'right',
      proptop: 'top',
    },
    {
      rotate: '180deg',
      propleft: 'right',
      proptop: 'bottom',
    },
    {
      rotate: '270deg',
      propleft: 'left',
      proptop: 'bottom',
    },
  ];
  const [isActive, setIsActive] = useState(true);
  // const navigation = useNavigation();
  const device = useCameraDevice('back');
  const format = useCameraFormat(device, [
    {videoResolution: {width: 1920, height: 1080}},
    {fps: 60},
  ]);
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log('Scanned codes:', codes[0].value);
      if (codes[0].value) {
        setIsActive(false);
        // navigation.navigate('Button');
      }
    },
  });

  if (!device) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        resizeMode="cover"
        format={format}
        codeScanner={codeScanner}
        isActive={isActive}
        style={styles.camera}
        device={device}
        enablePortraitEffectsMatteDelivery={true}
        enableDepthData={true}
      />
      {arrayOfTransforms.map((transform, index) => {
        return (
          <View
            key={index}
            style={[
              styles.scanIndicator,
              {
                // [transform.propleft]: 35,
                // [transform.proptop]: 195,
                [transform.propleft]: responsiveWidth(11),
                [transform.proptop]: responsiveHeight(31.5),
                transform: [{rotate: transform.rotate}],
              },
            ]}
          />
        );
      })}

      {/* <View style={styles.cameraBordee} /> */}
      {/* <View style={[styles.blackView, styles.commonTopBlackView]} />
      <View style={[styles.bottomBlackView, styles.commonTopBlackView]} />
      <View style={[styles.leftBlackView, styles.sidewayCommonBlackView]} />
      <View style={[styles.rightBlackView, styles.sidewayCommonBlackView]} /> */}

      <View
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <CameraFrame />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commonTopBlackView: {
    height: 200,
    width: '100%',
    backgroundColor: 'black',
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0.6,
  },
  blackView: {
    top: 0,
  },
  bottomBlackView: {
    bottom: 0,
  },
  sidewayCommonBlackView: {
    width: 40,
    opacity: 0.6,
    backgroundColor: 'black',
    position: 'absolute',
    top: 200,
    bottom: 200,
  },
  cameraBordee: {
    borderColor: 'black',
    borderWidth: 20,
    position: 'absolute',
    top: 190,
    bottom: 200,
    left: 35,
    right: 35,
    borderRadius: 50,
    opacity: 0.6,
    overflow: 'hidden',
    overlayColor: 'red',
  },
  leftBlackView: {
    left: 0,
  },
  rightBlackView: {
    right: 0,
  },
  camera: {
    flex: 1,
  },
  backButton: {
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
  },
  scanIndicator: {
    borderLeftWidth: 6,
    borderTopWidth: 6,
    borderColor: 'white',
    width: 80,
    height: 80,
    borderTopLeftRadius: 15,
    position: 'absolute',
    zIndex: 2,
  },
  scanTextContainer: {
    alignItems: 'center',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  scanText: {
    color: 'white',
    fontSize: 20,
    zIndex: 2,
    position: 'absolute',
    bottom: 150,
  },
});

export default Test;
