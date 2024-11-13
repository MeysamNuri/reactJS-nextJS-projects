import {
  LIST_REQUSET_TYPE,
  LIST_REQUSET_TYPE_SUCCESS,
  LIST_REQUSET_TYPE_FAILD,
  ADD_REQUSET_TYPE,
  ADD_REQUSET_TYPE_SUCCESS,
  ADD_REQUSET_TYPE_FAILD,
  LIST_REQUEST_GRID,
  LIST_REQUEST_GRID_SUCCESS,
  LIST_REQUEST_GRID_FAILD,
  APPLICANT_REQUSET_ID,
  APPLICANT_REQUSET_ID_SUCCESS,
  APPLICANT_REQUSET_ID_FAILD,
  APPLICANTREQUEST_DETERMINE,
  APPLICANTREQUEST_DETERMINE_SUCCESS,
  APPLICANTREQUEST_DETERMINE_FAILD,
  LIST_REQUEST_EXPORT_AWAIT_GRID,
  LIST_REQUEST_EXPORT_AWAIT_GRID_SUCCESS,
  LIST_REQUEST_EXPORT_AWAIT_GRID_FAILD,
  LIST_REQUEST_BOSS_AWAIT_GRID,
  LIST_REQUEST_BOSS_AWAIT_GRID_SUCCESS,
  LIST_REQUEST_BOSS_AWAIT_GRID_FAILD,
  BOSS_DETERMIN,
  BOSS_DETERMIN_SUCCESS,
  BOSS_DETERMIN_FAILD,
  EXPERT_DETERMIN,
  EXPERT_DETERMIN_SUCCESS,
  EXPERT_DETERMIN_FAILD,
  LIST_MY_REQUEST_GRID,
  LIST_MY_REQUEST_GRID_SUCCESS,
  LIST_MY_REQUEST_GRID_FAILD,
  GET_APPLICANT_REQUEST_STATUS,
  GET_APPLICANT_REQUEST_STATUS_FAILD,
  GET_APPLICANT_REQUEST_STATUS_SUCCESS,
  APPLICANT_CURRENT_CEO_INFO,
  APPLICANT_CURRENT_CEO_INFO_SUCCESS,
  APPLICANT_CURRENT_CEO_INFO_FAILD,
  APPLICANT_SEARCH_ADJUSTER,
  APPLICANT_SEARCH_ADJUSTER_SUCCESS,
  APPLICANT_SEARCH_ADJUSTER_FAILD,
  SET_CEO,
  LIST_REQUSET_TYPE_FOR_FILTER,
  LIST_REQUSET_TYPE_FOR_FILTER_SUCCESS,
  LIST_REQUSET_TYPE_FOR_FILTER_FAILD,
  APPLICANT_WORKING_LOCATION_LIST,
  APPLICANT_WORKING_LOCATION_LIST_SUCCESS,
  APPLICANT_WORKING_LOCATION_LIST_FAILD,
  APPLICANT_POSITON_LIST,
  APPLICANT_POSITON_LIST_SUCCESS,
  APPLICANT_POSITON_LIST_FAILD,
  APPLICANT_CURRENT_BOARD_BOSS,
  APPLICANT_CURRENT_BOARD_BOSS_SUCCESS,
  APPLICANT_CURRENT_BOARD_BOSS_FAILD,
  SET_BOARD_MEMEBER_BOSS,
  APPLICANT_BOARD_MEMBER_DEPUTY,
  APPLICANT_BOARD_MEMBER_DEPUTY_SUCCESS,
  APPLICANT_BOARD_MEMBER_DEPUTY_FAILD,
  SET_BOARD_MEMBER_DEPUTY,
  BOARD_MEMBER_END_COOPERATION,
  BOARD_MEMBER_END_COOPERATION_SUCCESS,
  BOARD_MEMBER_END_COOPERATION_FAILD,
  ADJUSTER_PORTFOILO,
  ADJUSTER_PORTFOILO_SUCCESS,
  ADJUSTER_PORTFOILO_FAILD,
  APPLICANT_RQQUEST_TYPE_DOCUMENT_LIST,
  APPLICANT_RQQUEST_TYPE_DOCUMENT_LIST_SUCCESS,
  APPLICANT_RQQUEST_TYPE_DOCUMENT_LIST_FAILD,
  EMPLOYEE_END_COOPERATION,
  EMPLOYEE_END_COOPERATION_SUCCESS,
  EMPLOYEE_END_COOPERATION_FAILD
} from "../../../constant/desktop";
import { api } from "../../../httpServices/service";
import { messageError, messageSuccess } from "../../../utils/utils";

//لیست  انواع درخواست ها
export const fetchListRequestTypes = () => async (dispatch: any) => {
  try {
    dispatch({
      type: LIST_REQUSET_TYPE,
    });
    const { data } = await api.get(`/ApplicantRequest/ApplicantRequestType`);

    dispatch({
      type: LIST_REQUSET_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_REQUSET_TYPE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//لیست  انواع درخواست ها برای فیلترها
export const fetchListRequestTypesForFilters = () => async (dispatch: any) => {
  try {
    dispatch({
      type: LIST_REQUSET_TYPE_FOR_FILTER,
    });
    const { data } = await api.get(`/ApplicantRequest/ApplicantRequestTypeForFilter`);

    dispatch({
      type: LIST_REQUSET_TYPE_FOR_FILTER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: LIST_REQUSET_TYPE_FOR_FILTER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//لیست  انواع وضعیت ها
export const fetchListApplicantRequestStatus = () => async (dispatch: any) => {
  try {
    dispatch({
      type: GET_APPLICANT_REQUEST_STATUS,
    });
    const { data } = await api.get(`/ApplicantRequest/ApplicantRequestStatus`);

    dispatch({
      type: GET_APPLICANT_REQUEST_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_APPLICANT_REQUEST_STATUS_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//ایجاد درخواست
export const addRequestTypes = (
  addRequstType: any,
  fetchListRequest: any,
  closeModal: () => void,
  test: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: ADD_REQUSET_TYPE,
    });
    const { data } = await api.post(`/ApplicantRequest`, addRequstType);
    if (data.IsSucceed === true) {
      messageSuccess("درخواست با موفقیت ایجاد شد");
      fetchListRequest();
      closeModal();
      test();
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: ADD_REQUSET_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message);
    dispatch({
      type: ADD_REQUSET_TYPE_FAILD,
      payload: error.response && error.response.data.IsSucceed,
    });
  }
};

//لیست درخواست ها
export const fetchListRequest = (page: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: LIST_REQUEST_GRID,
    });
    const { data } = await api.post(`/ApplicantRequest/GetForGrid`, page);
    dispatch({
      type: LIST_REQUEST_GRID_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError("خطای سمت سرور");
    dispatch({
      type: LIST_REQUEST_GRID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//لیست درخواست های هر ارزیاب
export const fetchListMyRequest = (page: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: LIST_MY_REQUEST_GRID,
    });
    const { data } = await api.post(`/ApplicantRequest/GetMyRequestForGrid`, page);
    dispatch({
      type: LIST_MY_REQUEST_GRID_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError("خطای سمت سرور");
    dispatch({
      type: LIST_MY_REQUEST_GRID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



//لیست درخواست های کارشناس
export const fetchListExpertAwaitRequest = (page: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: LIST_REQUEST_EXPORT_AWAIT_GRID,
    });
    const { data } = await api.post(`/ApplicantRequest/GetExportAwaitForGrid`, page);
    dispatch({
      type: LIST_REQUEST_EXPORT_AWAIT_GRID_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError("خطای سمت سرور");
    dispatch({
      type: LIST_REQUEST_EXPORT_AWAIT_GRID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



//لیست درخواست های رییس
export const fetchListBossAwaitRequest = (page: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: LIST_REQUEST_BOSS_AWAIT_GRID,
    });
    const { data } = await api.post(`/ApplicantRequest/GetBossAwaitForGrid`, page);
    dispatch({
      type: LIST_REQUEST_BOSS_AWAIT_GRID_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError("خطای سمت سرور");
    dispatch({
      type: LIST_REQUEST_BOSS_AWAIT_GRID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//جزییات درخواست
export const detailRequesById = (id: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: APPLICANT_REQUSET_ID,
    });
    const { data } = await api.get(`/ApplicantRequest/${id}`);

    dispatch({
      type: APPLICANT_REQUSET_ID_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANT_REQUSET_ID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//دریافت لیس مدارک مورد نیاز هر درخواست
export const getRequestTypeDocumentList = (RequestTypeId:any) => async (dispatch: any) => {
  try {
    dispatch({
      type: APPLICANT_RQQUEST_TYPE_DOCUMENT_LIST,
    });
    const { data } = await api.get(`/ApplicantRequest/GetByRequestType/${RequestTypeId}`);

    dispatch({
      type: APPLICANT_RQQUEST_TYPE_DOCUMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANT_RQQUEST_TYPE_DOCUMENT_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//دریافت اطلاعات مدیر عامل فعلی
export const CurrentCEOInfo = () => async (dispatch: any) => {
  try {
    dispatch({
      type: APPLICANT_CURRENT_CEO_INFO,
    });
    const { data } = await api.get(`/AdjusterDesktop/GetCEO`);

    dispatch({
      type: APPLICANT_CURRENT_CEO_INFO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANT_CURRENT_CEO_INFO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//دریافت اطلاعات رئیس هیئت مدیره فعلی
export const fetchCurrentBoardMemberBoss = () => async (dispatch: any) => {
  try {
    dispatch({
      type: APPLICANT_CURRENT_BOARD_BOSS,
    });
    const { data } = await api.get(`/AdjusterDesktop/BoardMemberBoss`);

    dispatch({
      type: APPLICANT_CURRENT_BOARD_BOSS_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANT_CURRENT_BOARD_BOSS_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//دریافت اطلاعات نایب رئیس هیئت مدیره فعلی
export const fetchBoardMemberDeputy = () => async (dispatch: any) => {
  try {
    dispatch({
      type: APPLICANT_BOARD_MEMBER_DEPUTY,
    });
    const { data } = await api.get(`/AdjusterDesktop/BoardMemberDeputy`);

    dispatch({
      type: APPLICANT_BOARD_MEMBER_DEPUTY_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANT_BOARD_MEMBER_DEPUTY_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//جستجوی ارزیاب
export const searchAdjuster = (body: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: APPLICANT_SEARCH_ADJUSTER,
    });
    const { data } = await api.post(`/AdjusterDesktop/SearchAsjuster`, body);

    dispatch({
      type: APPLICANT_SEARCH_ADJUSTER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANT_SEARCH_ADJUSTER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// اطلاعات مدیر عامل فعلی و جدید CEO
export const applicantCEODetails = (data: any) => (dispatch: any) => {
  dispatch({
    type: SET_CEO,
    payload: data,
  })
}
// اطلاعات نایب رئیس هیئت مدیره فعلی و Detailsجدید boardMemberDeputy
export const applicantBoardMemberDeputyDetails = (data: any) => (dispatch: any) => {
  dispatch({
    type: SET_BOARD_MEMBER_DEPUTY,
    payload: data,
  })
}
// اطلاعات رئیس هیئت مدیره فعلی و جدید boardmemberBoss
export const applicantBoardMemeberBoss = (data: any) => (dispatch: any) => {
  dispatch({
    type: SET_BOARD_MEMEBER_BOSS,
    payload: data,
  })
}
//تغییر استیت
export const requestDeterminHandler = (bodyDetermin: any, s1: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: APPLICANTREQUEST_DETERMINE,
    });
    const { data } = await api.post(
      `/ApplicantRequest/Determine`,
      bodyDetermin
    );
    if (data.IsSucceed === true) {
      messageSuccess("بررسی در خواست با موفقیت انجام شد");
      s1()
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: APPLICANTREQUEST_DETERMINE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANTREQUEST_DETERMINE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//تغییر استیت توسط کارشناس
export const requestDeterminExpertHandler = (bodyDetermin: any, s1: any, closeModal: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: EXPERT_DETERMIN,
    });
    const { data } = await api.post(
      `/ApplicantRequest/ExpertDetermine`,
      bodyDetermin
    );
    if (data.IsSucceed === true) {
      messageSuccess("عملیات بررسی درخواست توسط کارشناس انجام شد");
      closeModal()
      s1()
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: EXPERT_DETERMIN_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: EXPERT_DETERMIN_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//تغییر استیت توسط رییس
export const requestDetermiBossHandler = (bodyDetermin: any, s1: any, closeModal: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: BOSS_DETERMIN,
    });
    const { data } = await api.post(
      `/ApplicantRequest/BossDetermine`,
      bodyDetermin
    );
    if (data.IsSucceed === true) {
      messageSuccess("عملیات بررسی درخواست توسط رئیس انجام شد");
      closeModal()
      s1()
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: BOSS_DETERMIN_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: BOSS_DETERMIN_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//گرفتن لیست اطلاعات محل فعالیت عضو هیئت مدیره
export const fetchWorkingLocationList = () => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: APPLICANT_WORKING_LOCATION_LIST,
    });
    const { data } = await api.get(
      `/AdjusterDesktop/ApplicantWorkLocationInfo`,

    );

    dispatch({
      type: APPLICANT_WORKING_LOCATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANT_WORKING_LOCATION_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//گرفتن لیست اطلاعات سمت عضو هیئت مدیره
export const fetchApplcantPosition = () => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: APPLICANT_POSITON_LIST,
    });
    const { data } = await api.get(
      `/AdjusterDesktop/PositionForAddMember`,

    );

    dispatch({
      type: APPLICANT_POSITON_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: APPLICANT_POSITON_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//تاریخ پایان همکاری عضو هیئت مدیره
export const boardMemberEndCooperation = (requestBody: any, s1: any, closeModal: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: BOARD_MEMBER_END_COOPERATION,
    });
    const { data } = await api.post(
      `/AdjusterDesktop/EndCoperation`, requestBody

    );
    if (data.IsSucceed === true) {
      messageSuccess("تاریخ پایان همکاری با موفقیت ثبت شد");
      s1()
      closeModal()
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: BOARD_MEMBER_END_COOPERATION_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: BOARD_MEMBER_END_COOPERATION_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//تاریخ پایان همکاری سهامدار
export const stockHolderEndCooperation = (requestBody: any, s1: any, closeModal: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: BOARD_MEMBER_END_COOPERATION,
    });
    const { data } = await api.post(
      `/AdjusterDesktop/StockHolderEndDate`, requestBody

    );
    if (data.IsSucceed === true) {
      messageSuccess("تاریخ پایان همکاری با موفقیت ثبت شد");
      s1()
      closeModal()
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: BOARD_MEMBER_END_COOPERATION_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: BOARD_MEMBER_END_COOPERATION_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// پایان همکاری سهامداران کارتابل مدیریت

export const stockHolderEndDateManagmentCartable = (requestBody: any, s1: any, closeModal: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: "STOCK_HOLDER_END_DATE",
    });
    const { data } = await api.post(
      `/StockHolder/EndDate`, requestBody

    );
    if (data.IsSucceed === true) {
      messageSuccess("تاریخ پایان همکاری با موفقیت ثبت شد");
      s1()
      closeModal()
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: "STOCK_HOLDER_END_DATE_SUCCESS",
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: "STOCK_HOLDER_END_DATE_FAILD",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//تاریخ پایان همکاری کارکنان
export const employeeEndCooperation = (requestBody: any, s1: any, closeModal: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: EMPLOYEE_END_COOPERATION,
    });
    const { data } = await api.post(
      `/AdjusterDesktop/EmployeeEndDate`, requestBody

    );
    if (data.IsSucceed === true) {
      messageSuccess("تاریخ پایان همکاری با موفقیت ثبت شد");
      s1()
      closeModal()
    } else {
      messageError(data.Message);
    }

    dispatch({
      type: EMPLOYEE_END_COOPERATION_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: EMPLOYEE_END_COOPERATION_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//گرفتن اطاعات کارهای انجام شده توسط ارزیاب
export const fetchAdjusterPortfoilo = () => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: ADJUSTER_PORTFOILO,
    });
    const { data } = await api.get(
      `/AdjusterDesktop/Portfo`,

    );

    dispatch({
      type: ADJUSTER_PORTFOILO_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ADJUSTER_PORTFOILO_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};