import { createSlice } from "@reduxjs/toolkit";

const defaultTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

const initialState = {
    currentTheme: defaultTheme
}

const themeSlice = createSlice({
    name: 'themeReducer',
    initialState: initialState,
    reducers: {
        setCurrentTheme: (state, action) => {
            state.currentTheme = action.payload;
            // console.log(action.payload);
        }
    }
});


export const { setCurrentTheme } = themeSlice.actions;

export default themeSlice.reducer;