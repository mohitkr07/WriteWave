import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const hitLike = createAsyncThunk(
  'like/hitLike',
  async (postId, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/user/like/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({liked: true}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

export const getFollowers = createAsyncThunk(
  'followers/getFollowers',
  async (userId, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/user/followers/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

export const getFollowing = createAsyncThunk(
  'following/getFollowing',
  async (userId, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/user/following/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

export const getPeople = createAsyncThunk(
  'people/getPeople',
  async (userId, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/user/people/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

export const getPeoplePosts = createAsyncThunk(
  'peoplePosts/getPeoplePosts',
  async (userId, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(
        `${BASE_URL}api/user/peoplePosts/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

export const followAction = createAsyncThunk(
  'follow/followAction',
  async (userId, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/user/follow/${userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

const editUserSlice = createSlice({
  name: 'editUser',
  initialState: {
    formData: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export default editUserSlice.reducer;

export const {setUser} = editUserSlice.actions;
