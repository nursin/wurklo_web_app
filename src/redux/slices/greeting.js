import { createSlice } from "@reduxjs/toolkit";

// change the state based on the called function
export const greetingSlice = createSlice({
    name: 'greeting',
    initialState: {
        greeting: null
    },
    reducers: {
        setHello: (state) => {
            state.greeting = 'Hello World!';
            
        },
        setBye: (state) => {
            state.greeting = 'Bye Bye!';

        },
    },
})

//action creators are generated for each case reducer function
export const { setHello, setBye } = greetingSlice.actions;

export default greetingSlice.reducer;