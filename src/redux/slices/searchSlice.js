import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const searchUsers = createAsyncThunk(
  'search/searchUsers',
  async (searchTerm, thunkAPI) => {
    const token = await getToken();
    try {
      const response = await fetch(`${BASE_URL}api/user/search/${searchTerm}`, {
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

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    userHits: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSearchResults: state => {
      state.searchResults = [];
    },
    clearUserHits: state => {
      state.userHits = [];
    },
    setUserHits: (state, action) => {
      state.userHits = state.userHits.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchUsers.pending, state => {
        state.status = 'loading';
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
export const {clearSearchResults, clearUserHits, setUserHits} =
  searchSlice.actions;
