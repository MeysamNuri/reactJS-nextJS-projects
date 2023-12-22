import {
  CURRENT_BOARD_MEMBER_LIST,
  CURRENT_BOARD_MEMBER_LIST_SUCCESS,
  CURRENT_BOARD_MEMBER_LIST_FAILD,
  NEW_BOARD_MEMBER_LIST,
  NEW_BOARD_MEMBER_LIST_SUCCESS,
  NEW_BOARD_MEMBER_LIST_FAILD,
  BOARD_MEMBER_END_DATE,
  BOARD_MEMBER_END_DATE_SUCCESS,
  BOARD_MEMBER_END_DATE_FAILD,
  ADJUSTER_LIST,
  ADJUSTER_LIST_SUCCESS,
  ADJUSTER_LIST_FAILD,
  ADD_BOARD_MEMBER,
  ADD_BOARD_MEMBER_SUCCESS,
  ADD_BOARD_MEMBER_FAILD,
  BOARD_MEMBER_REVIEWED,
  BOARD_MEMBER_REVIEWED_SUCCESS,
  BOARD_MEMBER_REVIEWED_FAILD,
  DELET_BOARED_MEMBER,
  DELET_BOARED_MEMBER_SUCCESS,
  DELET_BOARED_MEMBER_FAILD,
  DETAIL_BOARED_MEMBER,
  DETAIL_BOARED_MEMBER_SUCCESS,
  DETAIL_BOARED_MEMBER_FAILD,
  BOARD_MEMBER_NOT_REVIEWED,
  BOARD_MEMBER_NOT_REVIEWED_SUCCESS,
  BOARD_MEMBER_NOT_REVIEWED_FAILD,
} from "../../../constant/desktop";
import { api } from "../../../httpServices/service";
import { IAddBoardMember } from "../../../shared/ulitities/Model/boardMember";
import { toast } from "react-toastify";
import { messageError, messageSuccess } from "../../../utils/utils";
//   لیست اعضای هئیت مدیره فعلی
export const fetchCurrentListBoardMember = (applicantId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: CURRENT_BOARD_MEMBER_LIST,
    });
    const { data } = await api.get(
      `/registration/3/legal/board-member-list-request`
    );
    dispatch({
      type: CURRENT_BOARD_MEMBER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: CURRENT_BOARD_MEMBER_LIST_FAILD,
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

//آپدیت تاریخ پایان اعضای هیئت مدیره فعلی
export const updateBoardMemberEndDate = (
  applicantId: number,
  boardMemberTempId: string,
  cooperationEndDate: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: BOARD_MEMBER_END_DATE,
    });
    const { data } = await api.post(
      `/registration/3/legal/board-member-end-date/${boardMemberTempId}/update`,
      cooperationEndDate
    );
    if (data.IsSucceed == true) {
      dispatch(fetchCurrentListBoardMember(3));
    }
    dispatch({
      type: BOARD_MEMBER_END_DATE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: BOARD_MEMBER_END_DATE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//لیست ارزیابان
export const fetchAdjusterList = () => async (dispatch: any) => {
  try {
    dispatch({
      type: ADJUSTER_LIST,
    });
    const { data } = await api.get(`/board-member-request/natraul-person-list`);

    dispatch({
      type: ADJUSTER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ADJUSTER_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//اضافه کردن عضو هئیت مدیره جدید
export const addBoardMember = (addMember: IAddBoardMember) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: ADD_BOARD_MEMBER,
    });
    const { data } = await api.post(
      `/board-member-request/board-member-natural-to-legal`,
      addMember
    );
    if (data.IsSucceed == true) {
      toast.success("هئیت مدیره به درستی اضافه گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(data.Message, {
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
      type: ADD_BOARD_MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ADD_BOARD_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//اعضای هئیت مدیره بررسی شده
export const fetchBoardMemberReviewed = (
  applicantId: number,
  isView: boolean
) => async (dispatch: any) => {
  try {
    dispatch({
      type: BOARD_MEMBER_REVIEWED,
    });
    const { data } = await api.get(
      `/board-member-request/${applicantId}/list/${true}`
    );

    dispatch({
      type: BOARD_MEMBER_REVIEWED_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: BOARD_MEMBER_REVIEWED_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//اعضای هئیت مدیره بررسی نشده
export const fetchBoardMemberNoReviewed = (
  applicantId: number,
  isView: boolean
) => async (dispatch: any) => {
  try {
    dispatch({
      type: BOARD_MEMBER_NOT_REVIEWED,
    });
    const { data } = await api.get(
      `/board-member-request/${applicantId}/list/${false}`
    );

    dispatch({
      type: BOARD_MEMBER_NOT_REVIEWED_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: BOARD_MEMBER_NOT_REVIEWED_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//حذف اعضای هئیت مدیره
export const removeBoardMember = (applicantRequestId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DELET_BOARED_MEMBER,
    });
    const { data } = await api.delete(
      `/applicant-request/${applicantRequestId}`
    );
    if (data.IsSucceed == true) {
      dispatch(fetchBoardMemberNoReviewed(2, false));
    }

    dispatch({
      type: DELET_BOARED_MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DELET_BOARED_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//جزئیات هئیت مدیره
export const fetchDetailBoardMember = (boardMemberId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: DETAIL_BOARED_MEMBER,
    });
    const { data } = await api.get(
      `/board-member-request/${boardMemberId}/detail`
    );

    dispatch({
      type: DETAIL_BOARED_MEMBER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DETAIL_BOARED_MEMBER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
 // تاریخ پایان همکاری اعضای هیئت مدیره

export const boardMemberCartableManagementEndDate = (
  requestBody: any, s1: any, closeModal: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: "BOARED_MEMBER_END_DATE",
    });
    const { data } = await api.post(`/board-member/EndCoperation`, requestBody);

    dispatch({
      type:"BOARED_MEMBER_END_DATE_SUCCESS",
      payload: data,
    });
    if (data.IsSucceed) {
      messageSuccess("تاریخ پایان همکاری با موفقیت ثبت شد");
      s1()
      closeModal();
   
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: "BOARED_MEMBER_END_DATE_FAILD",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
