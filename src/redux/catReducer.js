import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentCat: null,
    catList: []
}

const catSlice = createSlice({
    name: 'catReducer',
    initialState: initialState,
    reducers: {
        setInitialCat: (state, action) => {
            state.currentCat = action.payload;
        },
        setCurrentCat: (state, action) => {
            state.currentCat = action.payload;
        },
        setCatList: (state, action) => {
            state.catList = action.payload;
        }
    }
});


export const { setCurrentCat, setInitialCat, setCatList } = catSlice.actions;

export default catSlice.reducer;