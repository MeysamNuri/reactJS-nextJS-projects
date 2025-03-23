/*
 *
 * Main reducer
 *
 */
import produce from "immer";

export const initialState = {
  fname: "",
  lname: "",
  nationalId: "",
  email: "",
  sheba: "",
  storeName: "",
  category: "",
  tel: "",
  address: "",
  description: "",
};

/* eslint-disable default-case, no-param-reassign */
const personDataReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case "SET_SELECTED_CITY":
        return {
          ...state,
          RegionId: action.RegionId,
        };
      case "SET_FNAME":
        return {
          ...state,
          fname: action.fname,
        };
      case "SET_MOBILE":
        return {
          ...state,
          userMobile: action.userMobile,
        };
      case "SET_LINK":
        return {
          ...state,
          link: action.link,
        };
      case "SET_LNAME":
        return {
          ...state,
          lname: action.lname,
        };
      case "SET_NATIONAL_ID":
        return {
          ...state,
          nationalId: action.nationalId,
        };
      case "SET_EMAIL":
        return {
          ...state,
          email: action.email,
        };
      case "SET_SHEBA":
        return {
          ...state,
          sheba: action.sheba,
        };
      case "SET_STORE_NAME":
        return {
          ...state,
          storeName: action.storeName,
        };
      case "SET_CATEGORY":
        return {
          ...state,
          category: action.category,
        };
      case "SET_SELECTED_CITY":
        return {
          ...state,
          selectedCity: action.selectedCity,
        };
      case "SET_TEL":
        return {
          ...state,
          tel: action.tel,
        };
      case "SET_ADDRESS":
        return {
          ...state,
          address: action.address,
        };
      case "SET_DESCRIPTION":
        return {
          ...state,
          description: action.description,
        };
      case "DEFAULT_ACTION":
        break;
    }
  });

export default personDataReducer;
