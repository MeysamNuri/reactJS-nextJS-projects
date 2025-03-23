import {
  WORKEXPERIENCE_APPROVE,
  WORKEXPERIENCE_APPROVEE_SUCCESS,
  WORKEXPERIENCE_APPROVE_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";


export const fechListWorkExperienceApprove = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: WORKEXPERIENCE_APPROVE,
    });
    const { data } = await api.get(
      `/admission/cartable/work-experience-approve?applicntId=${applicantId}`
    );
    dispatch({
      type: WORKEXPERIENCE_APPROVEE_SUCCESS,
      payload: data,
    });
  
  } catch (error: any) {
    dispatch({
      type: WORKEXPERIENCE_APPROVE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
