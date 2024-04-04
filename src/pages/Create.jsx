import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Colors from '../assets/colors/Colors';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import NavBar from '../components/navBar/NavBar';
import {useDispatch, useSelector} from 'react-redux';
import {setContent} from '../redux/slices/createSlice';

const Create = ({navigation}) => {
  const dispatch = useDispatch();
  const quote = useSelector(state => state.createQuote.content);

  const handleChange = text => {
    dispatch(setContent(text));
  };

  return (
    <>
      <NavBar
        title="Create"
        navigation={navigation}
        checkAction={true}
        checkActionNavigateTo="QuoteScreen"
      />
      <View style={{flex: 1}}>
        <TextInput
          multiline={true}
          style={{
            flex: 1,
            fontSize: responsiveFontSize(2.21),
            padding: 10,
            color: Colors.THEME_TEXT,
            textAlignVertical: 'top',
          }}
          value={quote}
          name="quote"
          onChangeText={handleChange}
          placeholder="Type your quote here"
        />
      </View>
    </>
  );
};

export default Create;
