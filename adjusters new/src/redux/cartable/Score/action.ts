import {
  INTERVIEW_SESSION,
  INTERVIEW_SESSION_SUCCESS,
  INTERVIEW_SESSION_FAILD,
  CALCULATE_SCORE,
  CALCULATE_SCORE_SUCCESS,
  CALCULATE_SCORE_FAILD,
  ADD_FIELD_INTERVIEWER,
  ADD_FIELD_INTERVIEWER_SUCCESS,
  ADD_FIELD_INTERVIEWER_FAILD,
  FIELD_INTERVIEWER,
  FIELD_INTERVIEWER_SUCCESS,
  FIELD_INTERVIEWER_FAILD,
  COURS80_SCORE,
  COURS80_SCORE_SUCCESS,
  COURS80_SCORE_FAILD,
  INTERVIEW_MINUTES,
  INTERVIEW_MINUTES_SUCCESS,
  INTERVIEW_MINUTES_FAILD,
  INVITATION_INTERVIEW,
  INVITATION_INTERVIEW_SUCCESS,
  INVITATION_INTERVIEW_FAILD,
  INTERVIEW_MINUTES_UPLOAD,
  INTERVIEW_MINUTES_UPLOAD_SUCCESS,
  INTERVIEW_MINUTES_UPLOAD_FAILD,
  INTERVIEW_MINUTES_DOCUMENT_FILE,
  INTERVIEW_MINUTES_DOCUMENT_FILE_SUCCESS,
  INTERVIEW_MINUTES_DOCUMENT_FILE_FAILD

} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import {
  ICalculateAverage,
  IFieldInterviewer,
} from "../../../shared/ulitities/Model/score";
import { messageSuccess, messageError } from "../../../utils/utils";

//زمان مصاحبه
export const fetchInterviewSession = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: INTERVIEW_SESSION,
    });
    const { data } = await api.get(
      `/admission/cartable/applicant-interview-session/${applicantId}`
    );
    dispatch({
      type: INTERVIEW_SESSION_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: INTERVIEW_SESSION_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//محاسبه میانگین نمره
export const averageScore = (calculateAverage: ICalculateAverage) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: CALCULATE_SCORE,
    });
    const { data } = await api.post(
      `/admission/cartable/interviewer/calculate-average`,
      calculateAverage
    );
    dispatch({
      type: CALCULATE_SCORE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      // toast.error(data.Message, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    } else if (data.IsSucceed === false) {
      // toast.error(data.Message, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
    }
  } catch (error: any) {
    dispatch({
      type: CALCULATE_SCORE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//ثبت زمینه تخصصی
export const applicantFieldInterviewer = (
  applicantId?:number,
  feildInterviewer?: IFieldInterviewer,
  sucessFunction?: () => void,
  closeModal?: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: ADD_FIELD_INTERVIEWER,
    });
   const  {data} = await api.post(
      `/applicant/${applicantId}/field-info-list/update`,
      feildInterviewer
    );  
    if (data.IsSucceed === true) {
      messageSuccess("ثبت زمینه تخصصی با موفقیت انجام شد");
      sucessFunction && sucessFunction();
      closeModal && closeModal();
      // dispatch(fetchFieldInterviewer(feildInterviewer.applicantId));
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: ADD_FIELD_INTERVIEWER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: ADD_FIELD_INTERVIEWER_FAILD,
      payload:
        error.response && error.response.data.Error.Message
          ? error.response.data.Error.Message
          : error.message,
    });
  }
};
//ویرایش زمینه تخصصی
export const editApplicantFieldInterviewer=(
  fieldInfoOBJ:any,
  closeModal?: () => any,
  sucessFunction?: () => void

)=>async (dispatch:any)=>{
  try {
    dispatch({
      type: ADD_FIELD_INTERVIEWER,
    });
   const  {data} = await api.post(
      `/applicant/EditFielInfo`,
      fieldInfoOBJ
    );   
    dispatch({
      type: ADD_FIELD_INTERVIEWER_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed === true) {
      messageSuccess("ویرایش زمینه تخصصی با موفقیت انجام شد");
      sucessFunction && sucessFunction();
      closeModal&& closeModal();
     
      // dispatch(fetchFieldInterviewer(feildInterviewer.applicantId));
    } else {
      messageError(data.Message);
    }
  
  } catch (error: any) {
    // messageError(error.response.data.Error.Message)
    // dispatch({
    //   type: ADD_FIELD_INTERVIEWER_FAILD,
    //   payload:
    //     error.response && error.response.data.Error.Message
    //       ? error.response.data.Error.Message
    //       : error.message,
    // });
  }

}

// گرفتن زمینه تخصصی و زیر زمینه تخصصی
export const fetchFieldInterviewer = (
  applicantId?: number,
  success?: (e: number) => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: FIELD_INTERVIEWER,
    });
    const { data } = await api.get(
      `/applicant/${applicantId}/field-info`
    );
    if (data.IsSucceed === true) {
      success && success(data?.Result?.SpecializedFieldDto.AdjustmentFieldId);
    } else {
      // messageError(data.Message);
    }
    dispatch({
      type: FIELD_INTERVIEWER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError("خطا در نمایش زمینه تخصصی");
    dispatch({
      type: FIELD_INTERVIEWER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// گواهی 80 ساعته
export const fetchCourses80Score = (applicantId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: COURS80_SCORE,
    });
    const { data } = await api.get(
      `/applicant-courses80-score?id=${applicantId}`
    );
    dispatch({
      type: COURS80_SCORE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: COURS80_SCORE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//دانلود فرم مصاحبه
export const dlIntervieweMinutes = (applicantId?: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: INTERVIEW_MINUTES,
    });
    const { data } = await api.get(
      `admission/cartable/Interview-Minutes?applicantId=${applicantId}`
    );
    if (data.IsSucceed === true) {
      messageSuccess("عملیات دانلود با موفقیت انجام شد");
      const linkSource = `data:image${data?.Result?.FileExtension};base64,${data?.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data?.Result?.Title}.${data?.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: INTERVIEW_MINUTES_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: INTERVIEW_MINUTES_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//دعوت به مصاحبه
export const invitionInterviewOperation = (
  invitionInterview: any,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: INVITATION_INTERVIEW,
    });
    const { data } = await api.post(
      `/admission/cartable/Refer`,
      invitionInterview
    );
    if (data.IsSucceed === true) {
      messageSuccess("ارجاع به دعوت به مصاحبه موفقیت آمیز بود");
      successFunction();
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: INVITATION_INTERVIEW_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: INVITATION_INTERVIEW_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//آپلود فایل مصاحبه
export const  interviewMinutesUploader = (
  applicantId?:number,
   interviewUpLoad?: any,
   test?:any,
   s1?:any
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("DocumentTypeId", "1B7E2395-47C7-4C9A-8117-0120DCD6831F");
  formData.append("interviewminutes", interviewUpLoad);
  formData.append("Description", "hh");
   formData.append("fileName", test);
  try {
    dispatch({
      type: INTERVIEW_MINUTES_UPLOAD,
    });
    const { data } = await api.post(
      `/document/interview-minutes?id=${applicantId}`,
      formData
    );
    if (data.IsSucceed === true) {
      messageSuccess("فرم صورتجلسه با موفقیت بارگذاری گردید");
      s1()
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: INTERVIEW_MINUTES_UPLOAD_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: INTERVIEW_MINUTES_UPLOAD_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



//آی دی فابل آپلود شده صورتجلسه
export const fetchDocumentFileInterview = (
  applicantId?:number,
  //sucessFunction: () => void,
  //closeModal: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: INTERVIEW_MINUTES_DOCUMENT_FILE,
    });
   const  {data} = await api.get(
      `/document/interview-GetDocumentFileInterview/${applicantId}` );  
    if (data.IsSucceed === true) {
      // messageSuccess("ثبت زمینه تخصصی با موفقیت انجام شد");
      // sucessFunction();
      // closeModal();
      // dispatch(fetchFieldInterviewer(feildInterviewer.applicantId));
    } else {
      // messageError(data.Message);
    }
    dispatch({
      type: INTERVIEW_MINUTES_DOCUMENT_FILE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type:  INTERVIEW_MINUTES_DOCUMENT_FILE_FAILD,
      payload:
        error.response && error.response.data.Error.Message
          ? error.response.data.Error.Message
          : error.message,
    });
  }
};