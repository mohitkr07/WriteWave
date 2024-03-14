import {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../assets/colors/Colors';
import {useSelector} from 'react-redux';

const FollowDetails = ({navigation}) => {
  const user = useSelector(state => state?.userApi?.profile);
  const userId = useSelector(state => state?.userApi?.profile._id);
  const [selectTab, setSelectTab] = useState('followers');
  const handleSelectTab = res => {
    setSelectTab(res);
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.toggleSwitch}>
          <TouchableOpacity
            onPress={() => handleSelectTab('followers')}
            style={[
              styles.option,
              selectTab === 'followers' && styles.selectedOption,
            ]}>
            <Text
              style={[
                styles.optionTxt,
                selectTab === 'followers' && styles.selectedOptionTxt,
              ]}>
              followers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectTab('following')}
            style={[
              styles.option,
              selectTab === 'following' && styles.selectedOption,
            ]}>
            <Text
              style={[
                styles.optionTxt,
                selectTab === 'following' && styles.selectedOptionTxt,
              ]}>
              Following
            </Text>
          </TouchableOpacity>
        </View>
        {selectTab === 'followers' ? (
          <FlatList
            data={user?.followers}
            renderItem={item => renderComponent(navigation, item, userId)}
          />
        ) : (
          <FlatList
            data={user?.following}
            renderItem={item => renderFollowing(navigation, item, userId)}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const renderComponent = (navigation, {item}, userId) => {
  // const handleNavigate = () => {
  //   const data = {id: item?._id};
  //   navigation.navigate('People', {data});
  // };

  const handleNavigate = () => {
    const data = {id: item?._id};
    if (item?._id === userId) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('People', {data});
    }
  };
  return (
    <View style={styles.container1}>
      <TouchableOpacity onPress={handleNavigate} style={styles.result}>
        <View style={styles.icon}></View>
        <Text style={styles.resultTxt}>{item?.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderFollowing = (navigation, {item}) => {
  const handleNavigate = () => {
    const data = {id: item?._id};
    navigation.navigate('People', {data});
  };

  return (
    <View style={styles.container1}>
      <TouchableOpacity onPress={handleNavigate} style={styles.result}>
        <View style={styles.icon}></View>
        <Text style={styles.resultTxt}>{item?.name}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.unfollow}>
        <Text
          style={{
            fontSize: responsiveFontSize(1.69),
            fontWeight: '500',
            color: Colors.TEXT,
          }}>
          Unfollow
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(4),
  },
  unfollow: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#e6e8e6',
    color: Colors.PRIMARY,
    borderRadius: 5,
  },
  result: {
    height: responsiveHeight(7.5),
    alignItems: 'center',
    marginRight: responsiveWidth(3),
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
  resultTxt: {
    color: Colors.TEXT,
  },
  container: {
    height: '100%',
    backgroundColor: Colors.WHITE,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
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

export default FollowDetails;
