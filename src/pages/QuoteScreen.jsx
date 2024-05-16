import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ViewShot from 'react-native-view-shot';
import {useDispatch} from 'react-redux';
import {createPost} from '../redux/slices/postSlice';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../assets/colors/Colors';
import NavBar from '../components/navBar/NavBar';
import {useSelector} from 'react-redux';
import ProfilePicture from '../assets/images/profile.jpg';
import Loader from '../components/general/Loader';

const QuoteScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(
    'https://res.cloudinary.com/dbx7oqxpd/image/upload/v1715875266/quj5j0feffbj3ut9tcaj.jpg',
  );
  const quote = useSelector(state => state.createQuote.content);
  const [loading, setLoading] = useState(false);
  const touch = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 500,
        height: 500,
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
        const result = await viewShotRef.current.capture();
        const formData = new FormData();
        formData.append('image', {
          uri: result,
          type: 'image/jpeg',
          name: 'image.jpg',
        });

        dispatch(createPost(formData)).then(response => {
          console.log('response', response.payload);
          setLoading(false);
          navigation.navigate('Profile');
        });
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    } else {
      Alert.alert('Error', 'Please choose an image first');
    }
  };

  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  const onTextLayout = event => {
    const {width} = event.nativeEvent.layout;
    const {height} = event.nativeEvent.layout;
    setTextWidth(width);
    setTextHeight(height);
  };

  const handleReaction = () => {
    setLoading(true);
    handleSaveImage();
    // uploadImage();
  };

  return (
    <>
      <NavBar
        title="Theme"
        navigation={navigation}
        checkAction={true}
        checkActionNavigateTo={false}
        reaction={handleReaction}
      />
      <View
        onStartShouldSetResponder={() => true}
        // onMoveShouldSetResponder={() => true}
        onResponderMove={event => {
          let Y = event.nativeEvent.locationY;

          if (Y < responsiveWidth(85) && Y > responsiveWidth(0)) {
            touch.setValue({
              x: event.nativeEvent.locationX,
              y: event.nativeEvent.locationY,
            });
          }
        }}
        style={[styles.container]}>
        <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
          <View style={{position: 'relative'}}>
            <Image
              source={selectedImage ? {uri: selectedImage} : ProfilePicture}
              style={styles.image}
            />
            <Animated.View
              style={{
                position: 'absolute',
                // left: Animated.subtract(touch.x, textWidth / 2),
                left: touch.x,
                top: Animated.subtract(touch.y, textHeight) < 0 ? 0 : touch.y,
              }}>
              <Text
                onLayout={onTextLayout}
                style={{
                  fontSize: responsiveFontSize(2.5),
                  maxWidth: responsiveWidth(70),
                }}>
                {quote}
              </Text>
            </Animated.View>
          </View>
        </ViewShot>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleImagePicker}>
          <Text style={{color: Colors.PRIMARY}}>
            {selectedImage ? 'Change Theme' : 'Choose Theme'}
          </Text>
        </TouchableOpacity>

        {loading && <Loader />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: responsiveWidth(100),
    height: responsiveWidth(100),
  },
  textInput: {
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    width: 300,
  },
  button: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    elevation: 5,
  },
});

export default QuoteScreen;
