import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const createPost = createAsyncThunk(
  'user/createPost',
  async (formData, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/user/create`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to upload image: ${errorMessage}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    postDetail: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createPost.pending, state => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.postDetail = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
