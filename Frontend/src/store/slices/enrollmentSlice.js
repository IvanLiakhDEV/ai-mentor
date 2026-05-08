import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    enrollments: [],
    isInitialized: false,
};

const enrollmentSlice = createSlice({
    name: 'enrollments',
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload ?? [];
            state.isInitialized = Boolean(action.payload);
        },
    },
});

export const { setEnrollments } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
