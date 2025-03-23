import {
  ARCHIVED_LIST,
  ARCHIVED_LIST_SUCCESS,
  ARCHIVED_LIST_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import {messageSuccess,messageError} from '../../../utils/utils'


//لیست پرونده های بایگانی شده
export const fetchListArchive = (rejectList: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: ARCHIVED_LIST,
    });
    const { data } = await api.post(
      `/inbox-reject-list`,
      rejectList
    );

    dispatch({
      type: ARCHIVED_LIST_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: ARCHIVED_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


