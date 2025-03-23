import {
  LIST_BOARD_MEMBER,
  LIST_BOARD_MEMBER_SUCCESS,
  LIST_BOARD_MEMBER_FAILD,
  DESCRIPTION_BOARD_MEMBER,
  DESCRIPTION_BOARD_MEMBER_SUCCESS,
  DESCRIPTION_BOARD_MEMBER_FAILD,
  APPLICANT_WORK_LOCATION_INFO,
  APPLICANT_WORK_LOCATION_INFO_SUCCESS,
  APPLICANT_WORK_LOCATION_INFO_FAILD,
  APPLICANT_WORK_BRANCH_LIST,
  APPLICANT_WORK_BRANCH_LIST_SUCCESS,
  APPLICANT_WORK_BRANCH_LIST_FAILD

} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import { IDescriptionBoardMember } from "../../../shared/ulitities/Model/boardMember";

//لیست اعضای هیئت مدیره
export const fetchListBoardMember = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LIST_BOARD_MEMBER,
    });
    const { data } = await api.get(
      `/board-member-list/applicnt?id=${applicantId}`
    );
    dispatch({
      type: LIST_BOARD_MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_BOARD_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//اطلاعات محل فعالیت و شعبه ها
export const fetchApplicantWorkLocation = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: APPLICANT_WORK_LOCATION_INFO,
    });
    const { data } = await api.get(
      `/ApplicantWorkLocationInfo/Applicant/${applicantId}`
    );
    dispatch({
      type: APPLICANT_WORK_LOCATION_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANT_WORK_LOCATION_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// branch details

export const applicantWorkLocationList = (requestBody:any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: APPLICANT_WORK_BRANCH_LIST,
    });
    const { data } = await api.post(
      `/ApplicantWorkLocationInfo/GetForGrid`,requestBody
    );
    dispatch({
      type: APPLICANT_WORK_BRANCH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANT_WORK_BRANCH_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//برای میزکار ارزیاب محل فعالیت
export const adjusterDesckTopApplicantWorkLocation = () => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: APPLICANT_WORK_LOCATION_INFO,
    });
    const { data } = await api.get(
      `/AdjusterDesktop/ApplicantWorkLocationInfo`
    );
    dispatch({
      type: APPLICANT_WORK_LOCATION_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANT_WORK_LOCATION_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



/**
 * 
 * @param { Todo:  method post for update is change} param0 
 */

export const sendDescriptionBoardMember = (
  desBoardMember: IDescriptionBoardMember
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DESCRIPTION_BOARD_MEMBER,
    });
    const { data } = await api.post(
      `/board-member/update1`,
      desBoardMember
    );
    /*  if (data.IsSucceed) {
      dispatch(fetchListBoardMember(desBoardMember.applicantId));
    } */

    dispatch({
      type: DESCRIPTION_BOARD_MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DESCRIPTION_BOARD_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
