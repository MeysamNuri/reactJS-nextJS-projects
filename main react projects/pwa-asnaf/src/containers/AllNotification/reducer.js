import produce from "immer";

export const initialState = {
   notiNumber: 0
};

/* eslint-disable default-case, no-param-reassign */
const notificationReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case "SET_NOTI_NUMBER":
      return {
        ...state,
        notiNumber: action.notiNumber,
      };
      case 'DEFAULT_ACTION':
        break;
    }
  });

export default notificationReducer;
