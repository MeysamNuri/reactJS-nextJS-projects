//libraries
import { toast } from "react-toastify";

//redux
import {
  LEGAL_DRAFT_STOCKHOLDER,
  LEGAL_DRAFT_STOCKHOLDER_SUCCESS,
  LEGAL_DRAFT_STOCKHOLDER_FAILD,
} from "../../../constant/legalActionTypes";

import { IStockholder } from "../../../shared/ulitities/Model/draftLegal";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const sendStockholderLegal = (
  draftId: number,
  Stockholder: IStockholder,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_STOCKHOLDER });
    const { data } = await apiRegistrationToken.post(
      `registration/draft/${draftId}/legal/stockholder`,
      Stockholder
    );
    if (data.IsSucceed === true) {
      // toast.success("اطلاعات سهامداران اضافه گردید", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      successFunction();
    } else if (data.IsSucceed === false) {
      toast.error(`${data?.Message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch({
      type: LEGAL_DRAFT_STOCKHOLDER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_STOCKHOLDER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error("به دلیل خطا, اطلاعات اضافه نشد!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const sendStockholderLegalEdit = (
  gotIdForMainEdit: number,
  Stockholder: IStockholder,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({ type: LEGAL_DRAFT_STOCKHOLDER });
    const { data } = await apiRegistrationToken.post(
      `registration/${gotIdForMainEdit}/legal/stockholder`,
      Stockholder
    );
    dispatch({
      type: LEGAL_DRAFT_STOCKHOLDER_SUCCESS,
      payload: data,
    });

    // if (data.IsSucceed === true) {
    //   toast.success("اطلاعات سهامداران اضافه گردید", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    // }else
    if (data.IsSucceed === false) {
      toast.error(`${data?.Message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else successFunction();
  } catch (error: any) {
    dispatch({
      type: LEGAL_DRAFT_STOCKHOLDER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error("به دلیل خطا, اطلاعات اضافه نشد!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
