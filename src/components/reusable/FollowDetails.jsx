import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
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

const FollowDetails = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.userApi?.profile);
  const userId = useSelector(state => state?.userApi?.profile._id);
  const [selectTab, setSelectTab] = useState('followers');

  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    setFollowings(
      user?.following.map(item => {
        return {
          ...item,
          followed: true,
        };
      }),
    );
  }, []);

  const handleSelectTab = res => {
    setSelectTab(res);
  };

  const handleFollowed = id => {
    dispatch(getUserProfile()).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        setFollowings(prevFollowings =>
          prevFollowings.map(item => {
            if (item?._id === id) {
              return {
                ...item,
                followed: !item.followed,
              };
            }
            return item;
          }),
        );
      }
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
            data={user?.followers}
            renderItem={item => renderComponent(navigation, item, userId)}
          />
        ) : (
          <FlatList
            data={followings}
            renderItem={item =>
              renderFollowing(navigation, item, dispatch, handleFollowed)
            }
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const renderComponent = (navigation, {item}, userId) => {
  const handleNavigate = () => {
    const data = {id: item?._id};
    if (item?._id === userId) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('People', {data});
    }
  };

  return (
    <React.Fragment>
      <View style={styles.container1}>
        <TouchableOpacity onPress={handleNavigate} style={styles.result}>
          <View style={styles.icon}></View>
          <Text style={styles.resultTxt}>{item?.name}</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
};

const renderFollowing = (navigation, {item}, dispatch, handleFollowed) => {
  const handleUnfollow = () => {
    dispatch(followAction(item?._id)).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        handleFollowed(item?._id);
      }
      console.log(res.payload.message);
    });
  };

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

      <TouchableOpacity
        onPress={handleUnfollow}
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
    backgroundColor: 'white',
    borderRadius: 5,
    marginRight: 10,
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
