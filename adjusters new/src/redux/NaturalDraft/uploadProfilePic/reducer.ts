import {
  UPLOAD_DRAFT_PERSONAL_INFO_PIC,
  UPLOAD_DRAFT_PERSONAL_INFO_PIC_SUCCESS,
  UPLOAD_DRAFT_PERSONAL_INFO_PIC__FAILD,
  } from "../../../constant/actionTypes";
  
  const INIT_STATE = {
    loading: false,
    uploadPic: null,
  }; 
  
  export default (state = INIT_STATE, action:any) => {
    switch (action.type) {
      case UPLOAD_DRAFT_PERSONAL_INFO_PIC:
        return { ...state, loading: true };
      case UPLOAD_DRAFT_PERSONAL_INFO_PIC_SUCCESS:
        return { ...state, loading: false, uploadPic: action.payload };
      case UPLOAD_DRAFT_PERSONAL_INFO_PIC__FAILD:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return { ...state };
    }
  };
  