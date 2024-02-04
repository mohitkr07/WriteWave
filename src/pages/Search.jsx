import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../assets/colors/Colors';

const Search = ({navigation}) => {
  const inputRef = useRef(null);
  const [selectTab, setSelectTab] = useState('people');

  const handleChangeQuery = text => {
    console.log(text);
  };

  const handleSearchPress = () => {
    inputRef.current.focus();
  };

  const handleSelectTab = res => {
    setSelectTab(res);
  };

  useEffect(() => {
    // console.log('Component did mount');

    const onFocusListener = navigation.addListener('focus', () => {
      // console.log('Component is focused');
      handleSearchPress();
    });

    return () => {
      onFocusListener();
      // console.log('Component will unmount');
    };
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={{padding: 5}}>
            <Icon name="arrowleft" size={25} color={Colors.TEXT} />
          </TouchableOpacity>
          <TextInput
            ref={inputRef}
            style={styles.input}
            onChangeText={handleChangeQuery}
            placeholder="Search"
          />
          <TouchableOpacity onPress={handleSearchPress}>
            <Icon name="search1" size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.toggleSwitch}>
          <TouchableOpacity
            onPress={() => handleSelectTab('people')}
            style={[
              styles.option,
              selectTab === 'people' && styles.selectedOption,
            ]}>
            <Text
              style={[
                styles.optionTxt,
                selectTab === 'people' && styles.selectedOptionTxt,
              ]}>
              People
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectTab('tags')}
            style={[
              styles.option,
              selectTab === 'tags' && styles.selectedOption,
            ]}>
            <Text
              style={[
                styles.optionTxt,
                selectTab === 'tags' && styles.selectedOptionTxt,
              ]}>
              Tags
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList data={[1, 2]} renderItem={() => renderComponent()} />
      </View>
    </GestureHandlerRootView>
  );
};

const renderComponent = () => {
  return (
    <TouchableOpacity style={styles.result}>
      <View style={styles.icon}></View>
      <Text style={styles.resultTxt}>xyz</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  result: {
    height: responsiveHeight(7.5),
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: 5,
    flexDirection: 'row',
    gap: responsiveWidth(2),
  },
  icon: {
    height: '85%',
    aspectRatio: 1,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 50,
  },
  resultTxt: {},
  container: {
    height: '100%',
    backgroundColor: Colors.WHITE,
  },
  top: {
    height: responsiveHeight(7.5),
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: responsiveWidth(3),
    position: 'relative',
    top: 0,
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
  input: {
    flex: 1,
    backgroundColor: 'white', // Adjust the styling as needed
    borderRadius: 5, // Add border radius for better aesthetics
    marginRight: 10, // Add some spacing between the input and search icon
    fontSize: responsiveFontSize(2),
  },
  toggleSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 2,
  },
  option: {
    paddingVertical: 10,
    flex: 1,
  },
  optionTxt: {
    color: Colors.TEXT,
    fontSize: responsiveFontSize(2.21),
    textAlign: 'center',
  },
  selectedOption: {
    borderBottomWidth: 1.2,
    borderBottomColor: Colors.PRIMARY,
  },
  selectedOptionTxt: {
    color: Colors.PRIMARY,
  },
});

export default Search;
