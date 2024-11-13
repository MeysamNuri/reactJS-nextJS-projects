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

    default:
      return state;
  }
};
export default TabReducer;
