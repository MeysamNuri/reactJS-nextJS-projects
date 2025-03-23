import {
  LIST_JUDICAL_DRAFT_WORK_EXPERIENCE,
  LIST_JUDICAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
  LIST_JUDICAL_DRAFT_WORK_EXPERIENCE_FAILD,
} from "../../../constant/judicalActionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";

export const fetchJudicalWorkExperienceDraft = (
  judicialDraftId: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: LIST_JUDICAL_DRAFT_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.get(
      `registration/draft/${judicialDraftId}/judicial/work-experience-list`
    );
    dispatch({
      type: LIST_JUDICAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_JUDICAL_DRAFT_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Progressive Web App
//rainbow table

export const fetchJudicalWorkExperienceEdit = (
  gotIdForMainEdit: number
) => async (dispatch: any) => {
  try {
    dispatch({
      type: LIST_JUDICAL_DRAFT_WORK_EXPERIENCE,
    });
    const { data } = await apiRegistrationToken.get(
      `applicant/work-experience-list?id=${gotIdForMainEdit}`
    );
    dispatch({
      type: LIST_JUDICAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_JUDICAL_DRAFT_WORK_EXPERIENCE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const fetchJudicalWorkExperienceDocListEdit = (docList: any) => async (
//   dispatch: any
// ) => {
//   try {
//     dispatch({
//       type: LIST_JUDICAL_DRAFT_WORK_EXPERIENCE,
//     });
//     const { data } = await apiRegistrationToken.post(
//       `applicant/work-experience/4b24da1d-3f78-4d3b-9ff8-dbab80735ad2/certificate-info-list?id=26`,
//       docList
//     );
//     dispatch({
//       type: LIST_JUDICAL_DRAFT_WORK_EXPERIENCE_SUCCESS,
//       payload: data,
//     });
//   } catch (error : any) {
//     dispatch({
//       type: LIST_JUDICAL_DRAFT_WORK_EXPERIENCE_FAILD,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
