import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Colors from '../../assets/colors/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {followAction} from '../../redux/slices/general';
import {getUserProfile} from '../../redux/slices/userApiSlice';

const PeopleFollowDetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.userApi?.profile);
  const userId = useSelector(state => state?.userApi?.profile._id);
  const followers = route?.params?.data?.followers;
  const following = route?.params?.data?.following;
  const [selectTab, setSelectTab] = useState('followers');

  const [followings, setFollowings] = useState([]);

  const handleSelectTab = res => {
    setSelectTab(res);
  };

  useEffect(() => {
    setFollowings(
      following?.map(item => {
        const isFollowed = user?.following?.some(obj => obj._id === item._id);
        if (isFollowed) {
          return {
            ...item,
            followed: true,
          };
        }
        return {
          ...item,
          followed: false,
        };
      }),
    );
  }, [user]);

  const handleFollowed = () => {
    dispatch(getUserProfile()).then(res => {
      console.log('res', res.payload);
    });
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
            data={followers}
            renderItem={item => renderComponent(navigation, item, userId)}
          />
        ) : (
          <FlatList
            data={followings}
            renderItem={item =>
              renderFollowing(
                navigation,
                item,
                userId,
                user,
                dispatch,
                handleFollowed,
              )
            }
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const renderComponent = (navigation, {item}, userId) => {
  const handleNavigate = () => {
    console.log('id', userId);
    const data = {id: item?._id};
    if (item?._id === userId) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('People', {data});
    }
  };

  //   console.log(item?._id === userId);

  return (
    <View style={styles.container1}>
      <TouchableOpacity onPress={handleNavigate} style={styles.result}>
        <View style={styles.icon}></View>
        <Text style={styles.resultTxt}>{item?.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderFollowing = (
  navigation,
  {item},
  userId,
  user,
  dispatch,
  handleFollowed,
) => {
  const handleNavigate = () => {
    const data = {id: item?._id};
    if (item?._id === userId) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('People', {data});
    }
  };

  const handleFollow = () => {
    dispatch(followAction(item?._id)).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        handleFollowed(item?._id);
      }
      console.log(res.payload);
    });
  };

  return (
    <View style={styles.container1}>
      <TouchableOpacity onPress={handleNavigate} style={styles.result}>
        <View style={styles.icon}>
          {item?.profiePicture && (
            <Image style={{}} source={{uri: item?.profiePicture}} />
          )}
        </View>
        <Text style={styles.resultTxt}>{item?.name}</Text>
      </TouchableOpacity>

      {userId !== item._id && (
        <TouchableOpacity
          onPress={handleFollow}
          style={{
            ...styles.unfollow,
            backgroundColor: item?.followed ? Colors.BG3 : Colors.LIGHT_PURPLE,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(1.69),
              fontWeight: '500',
              color: item?.followed ? Colors.TEXT : Colors.WHITE,
            }}>
            {item?.followed ? 'Unfollow' : 'Follow'}
          </Text>
        </TouchableOpacity>
      )}
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
    color: Colors.PRIMARY,
    borderRadius: 5,
    width: responsiveWidth(20),
    alignItems: 'center',
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

export default PeopleFollowDetails;
