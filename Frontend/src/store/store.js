import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import courseReducer from './slices/courseSlice';
import enrollmentReducer from './slices/enrollmentSlice';
export default configureStore({
    reducer: { auth: authReducer, courses: courseReducer, enrollment: enrollmentReducer },
});
