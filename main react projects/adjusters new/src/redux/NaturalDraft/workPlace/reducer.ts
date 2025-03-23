import {
  NATURAL_DRAFT_WORK_PLACE,
  NATURAL_DRAFT_WORK_PLACE_SUCCESS,
  NATURAL_DRAFT_WORK_PLACE_FAILD
} from "../../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  workPlaces: null,
};
 
export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case NATURAL_DRAFT_WORK_PLACE:
      return { ...state, loading: true };
    case NATURAL_DRAFT_WORK_PLACE_SUCCESS:
      return { ...state, loading: false, workPlaces: action.payload };
    case NATURAL_DRAFT_WORK_PLACE_FAILD:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
