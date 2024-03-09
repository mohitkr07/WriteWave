import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ViewShot from 'react-native-view-shot';

const Create = props => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textOnImage, setTextOnImage] = useState('');

  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setSelectedImage(image.path);
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const viewShotRef = useRef();

  const handleSaveImage = async () => {
    if (selectedImage) {
      try {
        const result = await viewShotRef.current.capture(); // Capture the view
        // You can save or upload the 'result' image here
        setSelectedImage(result);
        setTextOnImage('kjk');
        Alert.alert('Saved', `Text: ${textOnImage}`);
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    } else {
      Alert.alert('Error', 'Please choose an image first');
    }
  };

  useEffect(() => {
    return () => {
      setSelectedImage(null);
      setTextOnImage(null);
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePicker}>
        <Text>Choose Image</Text>
      </TouchableOpacity>

      {selectedImage && (
        <View>
          <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
            <View style={{position: 'relative'}}>
              <Image source={{uri: selectedImage}} style={styles.image} />
              <Text
                style={{position: 'absolute', top: 15, left: 15, color: 'red'}}>
                {textOnImage}
              </Text>
            </View>
          </ViewShot>
          <TextInput
            style={styles.textInput}
            placeholder="Type text here"
            onChangeText={text => setTextOnImage(text)}
          />
          <TouchableOpacity onPress={handleSaveImage}>
            <Text>Save Image with Text</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 400,
    marginTop: 20,
  },
  textInput: {
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    width: 300,
  },
});

export default Create;
