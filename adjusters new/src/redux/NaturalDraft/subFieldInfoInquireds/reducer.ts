import { EndOfLineState } from "typescript";
import {
  IS_SUBFIELD_INQUIRED_NATURAL_ADD,
  IS_SUBFIELD_INQUIRED_NATURAL_REMOVE,
} from "../../../constant/actionTypes";

const INIT_STATE = {
  isSubFieldInfoInquired: [] as any,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case IS_SUBFIELD_INQUIRED_NATURAL_ADD:
      if (![...state?.isSubFieldInfoInquired].includes(action.payload)) {
        return {
          ...state,
          isSubFieldInfoInquired: [
            ...state?.isSubFieldInfoInquired,
            action.payload,
          ],
        };
      } else {
        return { ...state };
      }
    case IS_SUBFIELD_INQUIRED_NATURAL_REMOVE:
      return { ...state, isSubFieldInfoInquired: action.payload };
    default:
      return { ...state };
  }
};
