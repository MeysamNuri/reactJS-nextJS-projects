import {
  NATURAL_PERSON_ALL,
  NATURAL_PERSON_ALL_SUCCESS,
  NATURAL_PERSON_ALL_FAILD,
} from "../../../constant/actionTypes";
 
const INIT_STATE = {
  loading: false,
  naturalPersonalAll: [],
};
 
export default (state = INIT_STATE, action:any) => {
  switch (action.type) {
    case NATURAL_PERSON_ALL:
      return { ...state, loading: true };
    case NATURAL_PERSON_ALL_SUCCESS:
      return { ...state, loading: false, naturalPersonalAll: action.payload };
    case NATURAL_PERSON_ALL_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
