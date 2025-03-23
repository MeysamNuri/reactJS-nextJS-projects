import { DEFAULT_ACTION } from './constant';

export const initialState = {
    phoneNumber: ''
};

const signInReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PHONE_NUMBER":
            return {
                ...state,
                phoneNumber: action.phoneNumber
            };
        case DEFAULT_ACTION:
            break;
        default: return state;
    }
}
export default signInReducer;