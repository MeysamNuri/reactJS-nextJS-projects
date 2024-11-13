import {
  NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE,
  NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_SUCCESS,
  NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

// export const sendInquireSubFeildCertificateDraft = (
//   draftId: number,
//   fieldId: number,
//   certificateNo: string,
//   successFunction: () => void
// ) => async (dispatch: any) => {
//   try {
//     dispatch({
//       type: NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE,
//       payload: fieldId,
//     });
//     const { data } = await apiRegistrationToken.post(
//       `/registration/draft/${draftId}/natural/inquire-field-certificate?fieldId=${fieldId}&certificateNo=${certificateNo}`
//     );
//     dispatch({
//       type: NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_SUCCESS,
//       payload: data,
//     });
//     if (data.IsSucceed === true) {
//       toast.success("استعلام زیر رشته موفقیت آمیز بود", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       successFunction();
//     } else {
//       toast.error(data?.Message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   } catch (error: any) {
//     dispatch({
//       type: NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_FAILD,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const sendInquireFeildCertificateEdit = (
  gotIdForMainEdit: number,
  fieldId: number,
  certificateNo: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE,
      payload: fieldId,
    });
    const { data } = await apiRegistrationToken.post(
      `applicant-inquire?id=${gotIdForMainEdit}&fieldId=${fieldId}&certificateNo=${certificateNo}`

    );
    dispatch({
      type: NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success(`استعلام موفقیت آمیز بود`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      successFunction();
    } else {
      toast.error(data?.Message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } catch (error: any) {
    dispatch({
      type: NATURAL_DRAFT_INQUIRE_FIELD_CERTIFICATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
