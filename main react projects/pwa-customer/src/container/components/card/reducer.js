export const initialState = {
  deleteDialog: false,
  cardId: "",
  verifyCardDialog: false,
  showPopUp: false,
  cardList:[],
  showTimer: false,
  min: 3,
  sec: 0,
  activeCard: false,
  activeCardEnable: false,
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_DELETE_DIALOG":
      return {
        ...state,
        deleteDialog: action.deleteDialog,
      };
    case "SET_CARD_LIST":
      return {
        ...state,
        cardList: action.cardList,
      };
    case "SAVE_VERIFY_CARD_DIALOG":
      return {
        ...state,
        verifyCardDialog: action.verifyCardDialog,
      };
    case "SAVE_CARD_ID":
      return {
        ...state,
        cardId: action.cardId,
      };
    case "SET_SHOW_POP_UP":
      return {
        ...state,
        showPopUp: action.showPopUp,
      };
    case "SET_SHOW_TIMER":
      return {
        ...state,
        showTimer: action.showTimer,
      };
    case "SET_MIN":
      return {
        ...state,
        min: action.min,
      };
    case "SET_SEC":
      return {
        ...state,
        sec: action.sec,
      };
    case "SET_ACTIVE_CARD_DIALOG":
      return {
        ...state,
        activeCard: action.activeCard,
      };
    case "SET_ACTIVE_CARD":
      return {
        ...state,
        activeCardEnable: action.activeCardEnable,
      };
    default:
      return state;
  }
};
export default cardReducer;
