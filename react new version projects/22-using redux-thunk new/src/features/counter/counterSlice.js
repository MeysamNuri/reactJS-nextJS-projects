import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

//Redux-Thunk
export const incrementAsync = (amount) => (dispath) => {
    setTimeout(() => {
        dispath(incrementByAmount(amount));
    }, 2000);
};
//or
// export const oldIncrementAsync = (amount) => {
//     return async (dispath, getState) => {
//         setTimeout(() => {
//             dispath(incrementByAmount(amount));
//         }, 2000);
//     }
// };

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
