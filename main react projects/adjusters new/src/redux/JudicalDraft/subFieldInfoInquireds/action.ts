import {
  IS_SUBFIELD_INQUIRED_JUDICIAL_ADD,
  IS_SUBFIELD_INQUIRED_JUDICIAL_REMOVE,
} from "../../../constant/judicalActionTypes";

export const subFieldInfoJudicialInquireds = (add: boolean, idOrArray: any) => (
  dispatch: any
) => {
  if (add) {
    dispatch({ type: IS_SUBFIELD_INQUIRED_JUDICIAL_ADD, payload: idOrArray });
  } else {
    dispatch({
      type: IS_SUBFIELD_INQUIRED_JUDICIAL_REMOVE,
      payload: idOrArray,
    });
  }
};
