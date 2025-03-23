import {
  GET_JUDICAL_EDIT_FEILD_INFO,
  GET_JUDICAL_EDIT_FEILD_INFO_SUCCESS,
  GET_JUDICAL_EDIT_FEILD_INFO_FAILED,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  judicalFeildInfo: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_JUDICAL_EDIT_FEILD_INFO:
      return { ...state, loading: true };
    case GET_JUDICAL_EDIT_FEILD_INFO_SUCCESS:
      return { ...state, loading: false, judicalFeildInfo: action.payload };
    case GET_JUDICAL_EDIT_FEILD_INFO_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
