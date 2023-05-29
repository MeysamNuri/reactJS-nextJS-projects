import {
  JUDICAL_DRAFT_INQUIRE_CERTIFICATE80,
  JUDICAL_DRAFT_INQUIRE_CERTIFICATE80_SUCCESS,
  JUDICAL_DRAFT_INQUIRE_CERTIFICATE80_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const inquireJudicalCertificate = (
  judicalDraftId: number,
  certificateNo: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: JUDICAL_DRAFT_INQUIRE_CERTIFICATE80,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${judicalDraftId}/judicial/inquire-80hour-certificate?certificateNo=${certificateNo}`
    );
    dispatch({
      type: JUDICAL_DRAFT_INQUIRE_CERTIFICATE80_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("استعلام موفقیت آمیز گواهینامه", {
        position: "top-right",
        autoClose: 50000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error: any) {
    dispatch({
      type: JUDICAL_DRAFT_INQUIRE_CERTIFICATE80_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
