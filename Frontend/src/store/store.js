import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
export default configureStore({
    reducer: { auth: authReducer, courses: courseReducer },
});
