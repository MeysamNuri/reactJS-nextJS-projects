import {
    G4B_SEND_MESSAGE,
    G4B_SEND_MESSAGE_SUCCESS,
    G4B_SEND_MESSAGE_FAILD,
    G4B_CHECK_REGISTERATION,
    G4B_CHECK_REGISTERATION_SUCCESS,
    G4B_CHECK_REGISTERATION_FAILD,
    G4B_DOCUMENT_APPROVED,
    G4B_DOCUMENT_APPROVED_SUCCESS,
    G4B_DOCUMENT_APPROVED_FAILD,
    G4B_REGISTER,
    G4B_REGISTER_SUCCESS,
    G4B_REGISTER_FAILD
  } from "../../constant/actionTypes";
  import { api } from "../../httpServices/service";
  import {messageError,messageSuccess} from "../../utils/utils"
  //لیست ارزیابان حقیقی و دادگستری
  export const G4BSendMessage = (requestBody:any) => async (dispatch: any) => {
    try {
        dispatch({ 
          type: G4B_SEND_MESSAGE,
        });
        const { data } = await api.post(
          `/ApplicantG4B/SendMessage`,requestBody
        );
        dispatch({
          type: G4B_SEND_MESSAGE_SUCCESS,
          payload: data,
        });
        if (data.IsSucceed === true) {
          messageSuccess(".عملیات با موفقیت انجام شد")
        } else {
          messageError(data.Message)
        }
      
    } catch (error: any) {
      dispatch({
        type: G4B_SEND_MESSAGE_FAILD,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const G4BCheckRegistration = (requestBody:any) => async (dispatch: any) => {
    try {
        dispatch({ 
          type: G4B_CHECK_REGISTERATION,
        });
        const { data } = await api.post(
          `/ApplicantG4B/CheckRegistration`,requestBody
        );
        dispatch({
          type: G4B_CHECK_REGISTERATION_SUCCESS,
          payload: data,
        });
        if (data.IsSucceed === true) {
          messageSuccess(".عملیات با موفقیت انجام شد")
        } else {
          messageError(data.Message)
        }
      
    } catch (error: any) {
      dispatch({
        type: G4B_CHECK_REGISTERATION_FAILD,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const G4BDocumentApproved = (requestBody:any) => async (dispatch: any) => {
    try {
        dispatch({ 
          type: G4B_DOCUMENT_APPROVED,
        });
        const { data } = await api.post(
          `/ApplicantG4B/DocumentApproved`,requestBody
        );
        dispatch({
          type: G4B_DOCUMENT_APPROVED_SUCCESS,
          payload: data,
        });
        if (data.IsSucceed === true) {
          messageSuccess(".عملیات با موفقیت انجام شد")
        } else {
          messageError(data.Message)
        }
      
    } catch (error: any) {
      dispatch({
        type: G4B_DOCUMENT_APPROVED_FAILD,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  export const G4BRegister = (requestBody:any) => async (dispatch: any) => {
    try {
        dispatch({ 
          type: G4B_REGISTER,
        }); 
        const { data } = await api.post(
          `/ApplicantG4B/Register`,requestBody
        );
        dispatch({
          type: G4B_REGISTER_SUCCESS,
          payload: data,
        });
        if (data.IsSucceed === true) {
          messageSuccess(".عملیات با موفقیت انجام شد")
        } else {
          messageError(data.Message)
        }
      
    } catch (error: any) {
      dispatch({
        type: G4B_REGISTER_FAILD,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  