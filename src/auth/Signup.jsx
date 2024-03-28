import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../assets/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {loginUser, postUserData} from '../redux/slices/userSlice';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    try {
      dispatch(postUserData(formData)).then(response => {
        if (response?.payload?.message === 'User created successfully') {
          console.log('User created successfully');
          dispatch(loginUser(formData)).then(response => {
            if (response?.payload?.token) {
              AsyncStorage.setItem('token', response?.payload?.token);
              navigation.replace('BottomTabs');
            }
          });
        }
      });
    } catch (error) {
      console.log('error', error.message);
    }
  };

  // const Login = async () => {
  //   try {
  //     const res = await fetch(`${BASE_URL}api/auth/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!res.ok) {
  //       throw new Error(`HTTP error! Status: ${res.status}`);
  //     }

  //     const data = await res.json();
  //     await AsyncStorage.setItem('token', data.token);
  //     navigation.replace('BottomTabs');
  //     console.log(data.token);
  //   } catch (error) {
  //     console.error('Error during login:', error.message);
  //   }
  // };

  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
    console.log(formData);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text
            style={{
              fontSize: responsiveFontSize(3),
              fontWeight: '600',
              color: Colors.PRIMARY,
            }}>
            Signup
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={text => handleChange('name', text)}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
              placeholder="Email"
            />
            <TextInput
              style={styles.input}
              value={formData.password}
              onChangeText={text => handleChange('password', text)}
              placeholder="Create Password"
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
              <Text style={styles.btnTxt}>Signup</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.TEXT}}>or</Text>
          </View>

          <View style={styles.otherAuths}>
            <TouchableOpacity style={styles.loginWGoogle}>
              <Text style={styles.googleAuthTxt}>Signup with Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.loginOption}>
            <Text style={{color: Colors.TEXT}}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{color: Colors.TEXT, fontWeight: '500'}}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(5),
    backgroundColor: Colors.WHITE,
  },
  form: {
    gap: 15,
  },
  inputContainer: {
    gap: 5,
  },
  input: {
    height: responsiveHeight(7),
    // backgroundColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    textAlignVertical: 'bottom',
  },
  submitBtn: {
    height: responsiveHeight(5.8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    marginTop: responsiveHeight(4),
  },
  btnTxt: {
    color: Colors.WHITE,
    fontSize: responsiveFontSize(2.7),
    fontWeight: '500',
  },
  loginWGoogle: {
    backgroundColor: '#F4B400',
    height: responsiveHeight(5.8),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  googleAuthTxt: {
    color: Colors.WHITE,
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },
  loginOption: {
    flexDirection: 'row',
    gap: 3,
  },
});

export default SignUp;
