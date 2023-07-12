import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import userSlice from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: [thunkMiddleware],
});

export default store;