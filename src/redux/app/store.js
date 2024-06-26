import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import userApiReducer from '../slices/userApiSlice';
import generalReducer from '../slices/general';
import postReducer from '../slices/postSlice';
import userPostsReducer from '../slices/userPostsSlice';
import searchReducer from '../slices/searchSlice';
import feedReducer from '../slices/feedSlice';
import commentReducer from '../slices/commentSlice';

const rootReducer = combineReducers({
  user: userReducer,
  userApi: userApiReducer,
  general: generalReducer,
  post: postReducer,
  userPosts: userPostsReducer,
  search: searchReducer,
  feed: feedReducer,
  comment: commentReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
