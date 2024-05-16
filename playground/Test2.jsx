import React, {useCallback, useEffect} from 'react';
import {View, Linking} from 'react-native';
import Svg, {Defs, Mask, Rect} from 'react-native-svg';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

function CameraFrame() {
  return (
    <Svg height="100%" width="100%">
      <Defs>
        <Mask id="mask" x="0" y="0" height="100%" width="100%">
          <Rect height="100%" width="100%" fill="#fff" />
          <Rect x="18%" y="30%" width="250" height="250" fill="black" />
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
  const device = useCameraDevice('back');
  // const device = devices.back;

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') await Linking.openSettings();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Camera
        style={{flex: 1}}
        device={device}
        isActive={true}
        enableZoomGesture
      />

      <View
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
        <CameraFrame />
      </View>
    </View>
  );
};

export default Test;
