import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../assets/colors/Colors';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {searchUsers} from '../redux/slices/searchSlice';

const Search = ({navigation}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const userId = useSelector(state => state?.userApi?.profile?._id);
  const [selectTab, setSelectTab] = useState('people');
  const results = useSelector(state => state?.search?.searchResults);

  const handleChangeQuery = debounce(text => {
    handleSearch(text);
  }, 500); // Debounce time set to .5 second

  const handleSearchPress = () => {
    inputRef.current.focus();
  };

  const handleSelectTab = res => {
    setSelectTab(res);
  };

  useEffect(() => {
    const onFocusListener = navigation.addListener('focus', () => {
      handleSearchPress();
    });

    return () => {
      onFocusListener();
    };
  }, []);

  const handleSearch = query => {
    dispatch(searchUsers(query)).then(() => {
      // console.log(response.payload);
    });
  };

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
        {results.length === 0 && (
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Text>No Such User</Text>
          </View>
        )}
        {selectTab === 'people' ? (
          <FlatList
            data={results}
            renderItem={item => renderComponent(navigation, item, userId)}
          />
        ) : null}
      </View>
    </GestureHandlerRootView>
  );
};

const renderComponent = (navigation, {item}, userId) => {
  const handleNavigate = () => {
    const data = {id: item?._id};
    // navigation.navigate('People', {data});
    if (item?._id === userId) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('People', {data});
    }
  };

  console.log(item);
  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.result}>
      <View style={styles.icon}>
        {item?.profilePicture && (
          <Image
            source={item?.profilePicture ? {uri: item?.profilePicture} : null}
            style={{height: '100%', width: '100%', borderRadius: 50}}
          />
        )}
      </View>
      <Text style={styles.resultTxt}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
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
