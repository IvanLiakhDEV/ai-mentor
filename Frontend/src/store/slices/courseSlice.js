import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: [],
    isInitialized: false,
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload ?? [];
            state.isInitialized = Boolean(action.payload);
        },
    },
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;
