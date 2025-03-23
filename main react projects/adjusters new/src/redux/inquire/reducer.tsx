import {
  INQUIRE,
  INQUIRE_SUCCESS,
  INQUIRE_FAILD,
} from "../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  inquire: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case INQUIRE:
      return { ...state, loading: true };
    case INQUIRE_SUCCESS:
      return { ...state, loading: false, inquire: action.payload };
    case INQUIRE_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
