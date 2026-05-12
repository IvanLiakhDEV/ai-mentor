import { createSlice } from '@reduxjs/toolkit';

const getTheme = () => {
    const theme = localStorage.getItem('theme');

    if (theme) return theme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: getTheme(),
    },
    reducers: {
        setTheme: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('theme', action.payload);
        },
        toggleTheme: state => {
            state.value = state.value === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.value);
        },
    },
});
export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
