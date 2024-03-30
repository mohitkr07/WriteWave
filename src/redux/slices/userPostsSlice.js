import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const getUserPosts = createAsyncThunk(
  'user/getUserPosts',
  async thunkAPI => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/user/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch posts: ${errorMessage}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.posts;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userPostsSlice.reducer;
