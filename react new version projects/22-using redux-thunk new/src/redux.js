import { configureStore } from "@reduxjs/toolkit";

//Actions
const action01 = { type: "counter/increment", payload: 1 };

//Action Creators
export const increment = (number) => {
    return {
        type: "counter/increment",
        payload: number,
    };
};

//Reducers
(state, action) => newState;

//بسته به پارامترهای دریافتی باید استیت جدید رو محاسبه کنن
//به هیچ عنوان نباید استیت فعلی رو ویرایش یا تغییر بدن
//نباید منطق ناهمزمانی و محاسبه تصادفی انجام بدن یا هرگونه عوارض جانبی دیگر

const initialState = { value: 0 };

const counterReducer = (state = initialState, action) => {
    if (action.type === "counter/increment") {
        const copyState = { ...state };
        return {
            value: (copyState.value += action.payload),
        };
    }

    return state;
};

//Store
export const store = configureStore({ reducer: counterReducer });

// store.getState() نمایش استیت فعلی

//Dispatch
// store.dispatch({ type: "counter/increment"})
// store.dispatch(increment());

//Selectors
const selectCounterValue = (state) => state.value;

export const currentValue = selectCounterValue(store.getState());

console.log(currentValue);
