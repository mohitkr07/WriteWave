import {createSlice} from '@reduxjs/toolkit';

const sliceName = 'createQuote';

const initialState = {
  content: '',
};

const createQuoteSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const {setContent} = createQuoteSlice.actions;
export default createQuoteSlice.reducer;
