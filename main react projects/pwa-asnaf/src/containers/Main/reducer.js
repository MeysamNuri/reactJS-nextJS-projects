/*
 *
 * Main reducer
 *
 */
import produce from "immer";
import { DEFAULT_ACTION } from "./constants";

export const initialState = {
  dialog: false,
  catMsgDialog: false,
  catTitle: "",
  showNotification: "none",
  latlng: ''
};

/* eslint-disable default-case, no-param-reassign */
const mainReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case "SAVE_Dialog":
        return {
          ...state,
          dialog: action.dialog,
        };
      case "CAT_MSG_DIALOG":
        return {
          ...state,
          catMsgDialog: action.catMsgDialog,
        }
      case "CAT_TITLE":
        return {
          ...state,
          catTitle: action.catTitle,
        }
      case "SET_SHOW_NOTIFICATIONS":
        return {
          ...state,
          showNotification: action.showNotification,
        };
      case "SET_LATLNG":
        return {
          ...state,
          latlng: action.latlng,
        };
      case DEFAULT_ACTION:
        break;
    }
  });

export default mainReducer;
