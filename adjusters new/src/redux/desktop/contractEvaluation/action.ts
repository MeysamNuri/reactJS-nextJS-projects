import {
  ADD_CONTRACTEVALUATION,
  ADD_CONTRACTEVALUATION_SUCCESS,
  ADD_CONTRACTEVALUATION_FAILD,
  VIEW_CONTRACTEVALUATION,
  VIEW_CONTRACTEVALUATION_SUCCESS,
  VIEW_CONTRACTEVALUATION_FAILD,
  CONTRACTEVALUATION_ID,
  CONTRACTEVALUATION_ID_SUCCESS,
  CONTRACTEVALUATION_ID_FAILD,
  EDIT_CONTRACTEVALUATION,
  EDIT_CONTRACTEVALUATION_SUCCESS,
  EDIT_CONTRACTEVALUATION_FAILD,
  VIEW_MY_CONTRACTEVALUATION,
  VIEW_MY_CONTRACTEVALUATION_SUCCESS,
  VIEW_MY_CONTRACTEVALUATION_FAILD,
  REMOVE_CONTRACTEVALUATION,
  REMOVE_CONTRACTEVALUATION_SUCCESS,
  REMOVE_CONTRACTEVALUATION_FAILD
} from "../../../constant/desktop";
import { api } from "../../../httpServices/service";
import { messageError, messageSuccess } from "../../../utils/utils";
import { IAddContractEvaluation } from "../../../shared/ulitities/Model/desktop/contractEvaluation";


//ایجاد ثبت قرارداد
export const addContactEvaluation = (
   contractEvaluation: IAddContractEvaluation,
   closeModal: () => void,
   modelcontractEvaluation: IAddContractEvaluation 
) => async (dispatch: any) => {
  try {
    dispatch({
      type: ADD_CONTRACTEVALUATION,
    });
    const { data } = await api.post(`/ContractEvaluation`, contractEvaluation);

    dispatch({
      type: ADD_CONTRACTEVALUATION_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      messageSuccess("قرارداد با موفقیت ثبت گردید");
       closeModal();
       dispatch(fetchMyContactEvaluation(modelcontractEvaluation)); 
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError("خطایی در سرور رخ داده است");
    dispatch({
      type: ADD_CONTRACTEVALUATION_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//مشاهده قراردادها
export const fetchContactEvaluation  = (modelContactEvaluation: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: VIEW_CONTRACTEVALUATION,
    });
    const { data } = await api.post(
      `/ContractEvaluation/GetForGrid`,
      modelContactEvaluation
    );

    dispatch({
      type: VIEW_CONTRACTEVALUATION_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      // messageSuccess("عملکرد با موفقیت ثبت گردید.")
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError("خطایی در سرور رخ داده است");
    dispatch({
      type: VIEW_CONTRACTEVALUATION_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



//مشاهده قراردادهای من
export const fetchMyContactEvaluation  = (modelContactEvaluation: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: VIEW_MY_CONTRACTEVALUATION,
    });
    const { data } = await api.post(
      `/ContractEvaluation/GetMyContractEvaluationForGrid`,
      modelContactEvaluation
    );

    dispatch({
      type: VIEW_MY_CONTRACTEVALUATION_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      // messageSuccess("عملکرد با موفقیت ثبت گردید.")
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError("خطایی در سرور رخ داده است");
    dispatch({
      type: VIEW_MY_CONTRACTEVALUATION_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//هر قرارداد ثبت شده
export const fetchContactEvaluationId  = (id: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: CONTRACTEVALUATION_ID,
      payload: id,
    });
    const { data } = await api.get(
      `/ContractEvaluation/${id}`,
    );

    dispatch({
      type: CONTRACTEVALUATION_ID_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      // messageSuccess("عملکرد با موفقیت ثبت گردید.")
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError("خطایی در سرور رخ داده است");
    dispatch({
      type: CONTRACTEVALUATION_ID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//ویرایش ثبت قرارداد
export const editContactEvaluation = (
  contractEvaluation: IAddContractEvaluation,
  closeModal: () => void,
  modelcontractEvaluation: IAddContractEvaluation 
) => async (dispatch: any) => {
 try {
   dispatch({
     type: EDIT_CONTRACTEVALUATION,
   });
   const { data } = await api.post(`/ContractEvaluation/Update`, contractEvaluation);

   dispatch({
     type: EDIT_CONTRACTEVALUATION_SUCCESS,
     payload: data,
   });
   if (data.IsSucceed) {
     messageSuccess("قرارداد با موفقیت ویرایش گردید");
      closeModal();
      dispatch(fetchMyContactEvaluation(modelcontractEvaluation)); 
   } else {
     messageError(data.Message);
   }
 } catch (error:any) {
   messageError("خطایی در سرور رخ داده است");
   dispatch({
     type: EDIT_CONTRACTEVALUATION_FAILD,
     payload:
       error.response && error.response.data.message
         ? error.response.data.message
         : error.message,
   });
 }
};


//حذف ثبت قرارداد
export const removeContactEvaluation = (
  id: number,

) => async (dispatch: any) => {
 try {
   dispatch({
     type: REMOVE_CONTRACTEVALUATION,
   });
   const { data } = await api.post(`/ContractEvaluation/Delete/${id}`);

   dispatch({
     type: REMOVE_CONTRACTEVALUATION_SUCCESS,
     payload: data,
   });
   if (data.IsSucceed) {
     messageSuccess("قرارداد با موفقیت حذف گردید");
   } else {
     messageError(data.Message);
   }
 } catch (error:any) {
   messageError("خطایی در سرور رخ داده است");
   dispatch({
     type: REMOVE_CONTRACTEVALUATION_FAILD,
     payload:
       error.response && error.response.data.message
         ? error.response.data.message
         : error.message,
   });
 }
};