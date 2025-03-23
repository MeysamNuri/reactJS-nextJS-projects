import {
  FIELD_INFO_DETAIL,
  FIELD_INFO_DETAIL_SUCCESS,
  FIELD_INFO_DETAIL_FAILED,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import { messageSuccess, messageError } from "../../../utils/utils";

//لیست رشته ها و زیر رشته های تخصصی
export const getApplicantFieldInterviewerDetail = (applicantId: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: FIELD_INFO_DETAIL,
    });
    const { data } = await api.get(`/applicant/${applicantId}/field-info`);
    dispatch({
      type: FIELD_INFO_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: FIELD_INFO_DETAIL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
