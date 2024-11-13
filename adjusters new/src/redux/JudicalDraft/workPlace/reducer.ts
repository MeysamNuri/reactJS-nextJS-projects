import {
  JUDICAL_DRAFT_WORK_PLACE,
  JUDICAL_DRAFT_WORK_PLACE_SUCCESS,
  JUDICAL_DRAFT_WORK_PLACE_FAILD
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  judicalWorkPlaces: null,
};
 
export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case JUDICAL_DRAFT_WORK_PLACE:
      return { ...state, loading: true };
    case JUDICAL_DRAFT_WORK_PLACE_SUCCESS:
      return { ...state, loading: false, judicalWorkPlaces: action.payload };
    case JUDICAL_DRAFT_WORK_PLACE_FAILD:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
