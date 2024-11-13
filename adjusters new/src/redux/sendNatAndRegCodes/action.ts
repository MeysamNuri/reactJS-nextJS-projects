import { toast } from "react-toastify";

import {
  SEND_NAT_AND_REG_CODES,
  SEND_NAT_AND_REG_CODES_SUCCESS,
  SEND_NAT_AND_REG_CODES_FAILED,
} from "../../constant/commonTypes";

import { adjusterType } from "../../shared/ulitities/Enums/adjusterTypeId";

import { api } from "../../httpServices/service";

//

export const postNatAndRegCodesForApplicantEdit = (
  natAndRegCodes: any,
  successFunction: (i: number) => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: SEND_NAT_AND_REG_CODES,
    });
    const { data } = await api.post(`/registration/login`, natAndRegCodes);
    dispatch({
      type: SEND_NAT_AND_REG_CODES_SUCCESS,
      payload: data,
    });

    if (data.IsSucceed === true) {
      successFunction(data?.Result?.CourseTypeId);
      localStorage.setItem("registrationToken", data.Result.Token);

      switch (data?.Result?.CourseTypeId) {
        case adjusterType.natural:
          localStorage.setItem("naturalEditId", JSON.stringify(data.Result.Id));
          break;

        case adjusterType.legal:
          localStorage.setItem("legalEditId", JSON.stringify(data.Result.Id));
          break;

        case adjusterType.judical:
          localStorage.setItem(
            "judicialEditId",
            JSON.stringify(data.Result.Id)
          );
          break;
      }
    } else {
      toast.error(`${data.Message}  `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // dispatch({
    //   type: JUDICIAL_PERSONAL_INFO_SUCCESS,
    //   payload: await api.get(
    //     `registration/${data.Result.Id}/judicial/personal-info`
    //   ),
    // });
  } catch (error: any) {
    dispatch({
      type: SEND_NAT_AND_REG_CODES_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const sendNatAndRegCodesLegal = (
//   natAndRegCodes: any,
//   successFunction: () => void
// ) => async (dispatch: any) => {
//   try {
//     dispatch({
//       type: SEND_NAT_AND_REG_CODES,
//     });
//     const { data } = await api.post(`/registration/login`, natAndRegCodes);
//     dispatch({
//       type: SEND_NAT_AND_REG_CODES_SUCCESS,
//       payload: data,
//     });

//     if (data.IsSucceed === true) {
//       successFunction();
//     } else {
//       toast.error(`${data.Message}`, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }

//     localStorage.setItem("legalEditId", JSON.stringify(data.Result.Id));
//     localStorage.setItem("registrationToken", data.Result.Token);
//   } catch (error: any) {
//     dispatch({
//       type: SEND_NAT_AND_REG_CODES_FAILED,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

// export const sendNatAndRegCodesNatural = (
//   natAndRegCodes: any,
//   successFunction: () => void
// ) => async (dispatch: any) => {
//   try {
//     dispatch({
//       type: SEND_NAT_AND_REG_CODES,
//     });
//     const { data } = await api.post(`/registration/login`, natAndRegCodes);
//     dispatch({
//       type: SEND_NAT_AND_REG_CODES_SUCCESS,
//       payload: data,
//     });

//     if (data.IsSucceed === true) {
//       successFunction();
//     } else {
//       toast.error(`${data.Message} خطا `, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//     localStorage.setItem("naturalEditId", JSON.stringify(data.Result.Id));
//     localStorage.setItem("registrationToken", data.Result.Token);
//     // dispatch({
//     //   type: NATURAL_DRAFT_PERSONAL_INFO_GET_SUCCESS,
//     //   payload: await api.get(
//     //     `registration/${data.Result.Id}/natural/personal-info`
//     //   ),
//     // });
//   } catch (error: any) {
//     dispatch({
//       type: SEND_NAT_AND_REG_CODES_FAILED,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
