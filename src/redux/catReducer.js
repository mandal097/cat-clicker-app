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
        },
        incrementCount: (state, action) => {
            state.catList.map((list) => {
                if (list._id === action.payload) {
                    list.clicks += 1
                    state.currentCat = list;
                }
                return 0;
            })
        },
        incCurrentCount: (state) => {
           console.log('k');
        }
    }
});


export const { setCurrentCat,
    setInitialCat,
    setCatList,
    incCurrentCount,
    incrementCount
} = catSlice.actions;

export default catSlice.reducer;