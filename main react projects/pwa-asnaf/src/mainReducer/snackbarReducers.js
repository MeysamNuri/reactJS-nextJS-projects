import produce from "immer";

export const initialState = {
   open: false,
   msg: "default",
};

/* eslint-disable default-case, no-param-reassign */
const snackbarReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case "OPEN_SNACKBAR":
      return {
        ...state,
        open: true,
      };
    case "CLOSE_SNACKBAR":
      return {
        ...state,
        open: false,
      }
    case "SET_SNACKBAR_MSG":
      return {
        ...state,
        msg: action.msg,
      };
    case 'DEFAULT_ACTION':
      break;
  }
}, initialState);

export default snackbarReducer;
