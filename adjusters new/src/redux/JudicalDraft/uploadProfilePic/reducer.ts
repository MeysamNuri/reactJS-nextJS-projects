import {
  UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC,
  UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
  UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC_FAILD,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  judicalUploadPic: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC:
      return { ...state, loading: true };
    case UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC_SUCCESS:
      return { ...state, loading: false, judicalUploadPic: action.payload };
    case UPLOAD_JUDICAL_DRAFT_PERSONAL_INFO_PIC_FAILD:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
