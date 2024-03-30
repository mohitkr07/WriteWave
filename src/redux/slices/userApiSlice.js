import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

// get user profile
export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (_, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/user/getUser`, {
        method: 'GET',
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

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/user/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

export const updateProfilePic = createAsyncThunk(
  'user/updateProfilePic',
  async (formData, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/user/profilepic`, {
        method: 'PATCH',
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

export const updateCoverPic = createAsyncThunk(
  'user/updateProfilePic',
  async (formData, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/user/coverpic`, {
        method: 'PATCH',
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

const userApiSlice = createSlice({
  name: 'userApi',
  initialState: {
    profile: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.user;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userApiSlice.reducer;
export const {setProfile} = userApiSlice.actions;
