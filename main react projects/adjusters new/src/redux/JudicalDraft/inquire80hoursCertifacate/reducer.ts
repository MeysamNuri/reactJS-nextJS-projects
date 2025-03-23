import {
  JUDICAL_DRAFT_INQUIRE_CERTIFICATE80,
  JUDICAL_DRAFT_INQUIRE_CERTIFICATE80_SUCCESS,
  JUDICAL_DRAFT_INQUIRE_CERTIFICATE80_FAILD,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  judicalCertificate80: null,
};
 
export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case JUDICAL_DRAFT_INQUIRE_CERTIFICATE80:
      return { ...state, loading: true };
    case JUDICAL_DRAFT_INQUIRE_CERTIFICATE80_SUCCESS:
      return { ...state, loading: false, judicalCertificate80: action.payload };
    case JUDICAL_DRAFT_INQUIRE_CERTIFICATE80_FAILD:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
