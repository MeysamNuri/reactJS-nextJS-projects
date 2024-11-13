import {
  DELET_NATURAL_DRAFT_WORK_EXPERIENCE,
  DELET_NATURAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
  DELET_NATURAL_DRAFT_WORK_EXPERIENCE_FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";
import { messageSuccess, messageError } from "../../../utils/utils";

export const deleteNaturalWorkExperienceActionDraft = (
  draftId: number,
  workExperienceTempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELET_NATURAL_DRAFT_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.delete(
      `/registration/draft/${draftId}/natural/work-experience/${workExperienceTempId}`
    );

    dispatch({
      type: DELET_NATURAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("سابقه کار به درستی حذف گردید ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      successFunction();
    }
    
  } catch (error: any) {
    
    dispatch({
      type: DELET_NATURAL_DRAFT_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteNaturalWorkExperienceActionEdit = (
  gotIdForMainEdit: number,
  workExperienceTempId: string,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DELET_NATURAL_DRAFT_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.delete(
      `applicant/work-experience/${gotIdForMainEdit}/${workExperienceTempId}`
    );

    dispatch({
      type: DELET_NATURAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("سابقه کار به درستی حذف گردید ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      successFunction();
    }
  } catch (error: any) {
    dispatch({
      type: DELET_NATURAL_DRAFT_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const deleteCartableWorkExperience = ( 
 id:any,
 applicnatId:any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: "DELETE_CARTABLE_WORK_EXPERINCE",
    });
    const { data } = await apiRegistrationToken.delete(
      `applicant/work-experience/${applicnatId}/${id}`
    );

    dispatch({
      type: "DELETE_CARTABLE_WORK_EXPERINCE_SUCCESS",
      payload: data,
    });
    if (data.IsSucceed === true) {
      toast.success("سابقه کار به درستی حذف گردید ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     
    }
    
    else{
      messageError(data.Message);
    }
  } catch (error: any) {
    dispatch({
      type: "DELETE_CARTABLE_WORK_EXPERINCE_FAILD",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};