import {
  Justice_NEWID,
  Justice_NEWID_SUCCESS,
  Justice_NEWID_FAILD,
} from "../../constant/actionTypes";

const INIT_STATE = {
  loading: false,
  newId: "",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case Justice_NEWID:
      return { ...state, loading: true };
    case Justice_NEWID_SUCCESS:
      return { ...state, loading: false, newId: action.payload };
    case Justice_NEWID_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
