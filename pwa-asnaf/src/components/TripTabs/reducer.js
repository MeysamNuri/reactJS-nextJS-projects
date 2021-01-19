export const initialstate = {
  tab: null,
};

const TabTripReducer = (state = [], action) => {
  switch (action.type) {
    case "CHANGE-TAB":
      return {
        ...state,
        tab: action.tab,
      }
    default:
      return state;
  }
};
export default TabTripReducer;
