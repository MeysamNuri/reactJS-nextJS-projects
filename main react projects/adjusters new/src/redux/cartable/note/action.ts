import {
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILD,
  NOTE_LIST,
  NOTE_LIST_SUCCESS,
  NOTE_LIST_FAILD,
  NOTE_REMOVE,
  NOTE_REMOVE_SUCCESS,
  NOTE_REMOVE_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import { INote } from "../../../shared/ulitities/Model/note";
import {messageError,messageSuccess} from "../../../utils/utils"

//اضافه کردن یادداشت
export const addNote = (note: INote, successFunction: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: ADD_NOTE,
    });
    const { data } = await api.post(`/note`, note);
    if (data.IsSucceed === true) {
      messageSuccess("یادداشت ها با موفقیت اضافه گردید")
      successFunction();
    }else{
      messageError(data.Message)
    }
    dispatch({
      type: ADD_NOTE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ADD_NOTE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//لیست یادداشت ها
export const fetchNotes = (applicantId?: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: NOTE_LIST,
    });
    const { data } = await api.get(`/note/${applicantId}/list`);
    dispatch({
      type: NOTE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: NOTE_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// حذف یادداشت
export const removeNote = (notId: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: NOTE_REMOVE,
    });
    const { data } = await api.delete(`/note/${notId}`);
    if (data.IsSucceed === true) {
      messageSuccess(".حذف یادداشت با موفقیت انجام شد")
    } else {
      messageError(data.Message)
    }
    dispatch({
      type: NOTE_REMOVE_SUCCESS,
      payload: notId,
    });
  } catch (error: any) {
    dispatch({
      type: NOTE_REMOVE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
