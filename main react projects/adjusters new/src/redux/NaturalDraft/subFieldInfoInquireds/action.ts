import {
  IS_SUBFIELD_INQUIRED_NATURAL_ADD,
  IS_SUBFIELD_INQUIRED_NATURAL_REMOVE,
} from "../../../constant/actionTypes";

export const subFieldInfoNaturalInquireds = (add: boolean, idOrArray: any) => (
  dispatch: any
) => {
  if (add) {
    dispatch({ type: IS_SUBFIELD_INQUIRED_NATURAL_ADD, payload: idOrArray });
  } else {
    dispatch({ type: IS_SUBFIELD_INQUIRED_NATURAL_REMOVE, payload: idOrArray });
  }
};
