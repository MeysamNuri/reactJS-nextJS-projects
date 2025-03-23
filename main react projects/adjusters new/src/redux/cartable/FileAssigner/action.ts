import {
  BASKET_NATURAL_JUDICAL_LIST,
  BASKET_NATURAL_JUDICAL_LIST_SUCCESS,
  BASKET_NATURAL_JUDICAL_LIST_FAILED,
  BASKET_LEGAL_LIST,
  BASKET_LEGAL_LIST_SUCCESS,
  BASKET_LEGAL_LIST_FAILED,
  ADMISSTON_LIST,
  ADMISSTON_LIST_SUCCESS,
  ADMISSTON_LIST_FAILED,
  BASKET_ASSIGN_ADMISSTION,
  BASKET_ASSIGN_ADMISSTION_SUCCESS,
  BASKET_ASSIGN_ADMISSTION_FAILED,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import {messageSuccess,messageError} from '../../../utils/utils'

//Basket List Natural Judical
export const fetchBasketListNaturalJudical = (basketList: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: BASKET_NATURAL_JUDICAL_LIST,
    });
    const { data } = await api.post(
      `/basket/natural-judicial-list`,
      basketList
    );

    dispatch({
      type: BASKET_NATURAL_JUDICAL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: BASKET_LEGAL_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//Basket List legal
export const fetchBasketListLegal = (basketLegalList: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: BASKET_LEGAL_LIST,
    });
    const { data } = await api.post(`/basket/legal-list`, basketLegalList);

    dispatch({
      type: BASKET_LEGAL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: BASKET_NATURAL_JUDICAL_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Basket List AdmitionList
export const fetchAdmistionListExpert = () => async (dispatch: any) => {
  try {
    dispatch({
      type: ADMISSTON_LIST,
    });
    const { data } = await api.get(`/user/admission-expert-list`);

    dispatch({
      type: ADMISSTON_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ADMISSTON_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// asigner File
export const asignerFileHandler = (
  applicantId: number,
  assignTo: number,
  successFunction: () => void
) => async (dispatch: any) => {
  try {
    dispatch({
      type: BASKET_ASSIGN_ADMISSTION,
    });
    const { data } = await api.get(`/basket/${applicantId}/assign/${assignTo}`);
    if (data.IsSucceed === true) {
      messageSuccess("پرونده ارجاع شد")
      successFunction();
    }else{
      messageError(data.Message)
    }

    dispatch({
      type: BASKET_ASSIGN_ADMISSTION_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    //messageError("خطای سرور")
    dispatch({
      type: BASKET_ASSIGN_ADMISSTION_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
