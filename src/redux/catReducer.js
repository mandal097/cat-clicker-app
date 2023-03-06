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
        pushNewCat: (state, action) => {
            state.catList.push(action.payload)
        },
        updateCurrentCat: (state, action) => {
            state.currentCat = action.payload;
            state.catList.map((list) => {
                if (list._id === action.payload._id) {
                    list.catName = action.payload.catName;
                    list.clicks = action.payload.clicks;
                    list.catImage = action.payload.catImage;
                    list.nickNames = action.payload.nickNames;
                }
                return 0;
            })
        },
        deleteCat: (state, action) => {
            // if (state.catList.includes(action.payload)) {
                state.catList.splice(
                    state.catList.findIndex(
                        data => data._id === action.payload
                    ),
                    1
                )
            }
        // }
    }
});


export const { setCurrentCat,
    setInitialCat,
    setCatList,
    incCurrentCount,
    incrementCount,
    pushNewCat,
    updateCurrentCat,
    deleteCat
} = catSlice.actions;

export default catSlice.reducer;