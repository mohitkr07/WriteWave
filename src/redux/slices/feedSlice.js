import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const getFeedPosts = createAsyncThunk(
  'feed/getFeedPosts',
  async (_, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/feed/feedPosts`, {
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

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFeedPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getFeedPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.posts;
      })
      .addCase(getFeedPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default feedSlice.reducer;
