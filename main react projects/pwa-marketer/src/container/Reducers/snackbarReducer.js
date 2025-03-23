const initialState = {
   open: false,
   msg: "default",
};
const snackbarReducer = (state = initialState, action = {}) => {
  const { type } = action;

  switch (type) {
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
    default:
      return state;
  }
};

export default snackbarReducer;
