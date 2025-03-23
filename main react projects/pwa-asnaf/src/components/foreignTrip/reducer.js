export const initialstate = {
  open: null,
};
const ExpandReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "EXPAND-PANEL":
      return {
        ...state,
        open: action.open,
      };

    default:
      return state;
      break;
  }
};
export default ExpandReducer;
