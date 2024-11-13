export const initialstate = {
  tab: true,
};

const TabReducer = (state = initialstate, action) => {
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
