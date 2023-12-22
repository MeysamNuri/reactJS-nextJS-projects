import {
  ALL_ADMISION_EXPERT,
  ALL_ADMISION_EXPERT_SUCCESS,
  ALL_ADMISION_EXPERT_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  listAdmision: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ALL_ADMISION_EXPERT:
      return { ...state, loading: true };
    case ALL_ADMISION_EXPERT_SUCCESS:
      return { ...state, loading: false, listAdmision: action.payload };
    case ALL_ADMISION_EXPERT_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
