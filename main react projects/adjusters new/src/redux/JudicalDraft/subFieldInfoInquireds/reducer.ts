import { EndOfLineState } from "typescript";
import {
  IS_SUBFIELD_INQUIRED_JUDICIAL_ADD,
  IS_SUBFIELD_INQUIRED_JUDICIAL_REMOVE,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  isSubFieldInfoInquired: [] as any,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case IS_SUBFIELD_INQUIRED_JUDICIAL_ADD:
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
    case IS_SUBFIELD_INQUIRED_JUDICIAL_REMOVE:
      return { ...state, isSubFieldInfoInquired: action.payload };
    default:
      return { ...state };
  }
};
