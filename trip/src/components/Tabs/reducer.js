export const initialstate = {
  tab: null,
};

const TabReducer = (state = [], action) => {
  switch (action.type) {
    case "CHANGE-TAB":
      return {
        ...state,
        tab: action.tab,
      };

      break;

    default:
      return state;
      break;
  }
};
export default TabReducer;
