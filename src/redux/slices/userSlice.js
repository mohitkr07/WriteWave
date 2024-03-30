import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../constants/api';

export const postUserData = createAsyncThunk(
  'user/postUserData',
  async userData => {
    const response = await fetch(`${BASE_URL}api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  },
);

export const loginUser = createAsyncThunk('user/loginUser', async userData => {
  const response = await fetch(`${BASE_URL}api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    usersData: {},
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.usersData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postUserData.pending, state => {
        state.status = 'loading';
      })
      .addCase(postUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usersData = action.payload;
      })
      .addCase(postUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usersData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const {setToken} = userSlice.actions;
