import {
  SUB_FIELD,
  SUB_FIELD_SUCCESS,
  SUB_FIELD_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  subFields: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case SUB_FIELD:
      return { ...state, loading: true };
    case SUB_FIELD_SUCCESS:
      return { ...state, loading: false, subFields: action.payload };
    case SUB_FIELD_FAILD:
      return { ...state, loading: false, error: action.payload };
   
    default:
      return { ...state };
  }
};
