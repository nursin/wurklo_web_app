import { createSlice } from "@reduxjs/toolkit";

// change the state based on the called function
export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchParams: null
    },
    reducers: {
        setSearchParams: (state, action) => {
            state.searchParams = action.payload;
        },
    },
})

//action creators are generated for each case reducer function
export const { setSearchParams } = searchSlice.actions;

export default searchSlice.reducer;