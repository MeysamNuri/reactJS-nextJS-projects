import produce from "immer";

export const initialState = {
   open: false,
};

/* eslint-disable default-case, no-param-reassign */
const logoutReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case "SHOW_LOGOUT_DIALOG":
      return {
        ...state,
        open: true,
      };
    case 'DEFAULT_ACTION':
      break;
  }
}, initialState);

export default logoutReducer;
