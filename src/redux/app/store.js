import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import userApiReducer from '../slices/userApiSlice';
import generalReducer from '../slices/general';
import postReducer from '../slices/postSlice';
import userPostsReducer from '../slices/userPostsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  userApi: userApiReducer,
  general: generalReducer,
  post: postReducer,
  userPosts: userPostsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
