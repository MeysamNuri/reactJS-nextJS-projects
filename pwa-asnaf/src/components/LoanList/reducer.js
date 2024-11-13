export const initialstate = {
  open: null,
  dialog: false,
};
const ExpandReducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'EXPAND-PANEL':
      return {
        ...state,
        open: action.open,
      };
    case 'SHOW_DIALOG':
      return {
        ...state,
        open: action.dialog,
      };

    default:
      return state;
  }
};
export default ExpandReducer;
