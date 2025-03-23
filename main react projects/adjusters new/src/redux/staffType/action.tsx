import {
  STAFF_TYPE,
  STAFF_TYPE_SUCCESS,
  STAFF_TYPE_FAILD,
  CREATE_STAFF,
  CREATE_STAFF_SUCCESS,
  CREATE_STAFF_FAILD,
  SEARCH_USER,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILD,
  USER_GET_FOR_GRID,
  USER_GET_FOR_GRID_SUCCESS,
  USER_GET_FOR_GRID_FAILD,
  REMOVE_USER,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILD
} from "../../constant/actionTypes";
import { api } from "../../httpServices/service";
import { messageError, messageSuccess } from '../../utils/utils';




export const fetchStaffType = () => async (dispatch: any) => {
  try {
    dispatch({
      type: STAFF_TYPE,
    });

    const { data } = await api.get(
      `/user/staff-type`
    );
    dispatch({
      type: STAFF_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: STAFF_TYPE_FAILD,
      payload:
        error.response && error.response.data.Error.Message
          ? error.response.data.Error.Message
          : error.message,
    });
  }
};




export const  createStaff = (createStaff:any,closeModal:any,fetchGrid:any,s1:any) => async (dispatch: any) => {
  try {
    dispatch({
      type: CREATE_STAFF,
    });

    const { data } = await api.post(
      `/user/create-staff`,createStaff
    );
    if(data.IsSucceed===true){
      messageSuccess("سمت با موفقیت ایجاد گردید")
      closeModal()
       fetchGrid()
       s1()
    }else{
      messageError(data.Message)
    }
    dispatch({
      type: CREATE_STAFF_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: CREATE_STAFF_FAILD,
      payload:
        error.response &&error.response.data.Error.Message
          ? error.response.data.Error.Message
          : error.message,
    });
  }
};


export const  searchUser = (keyword:string) => async (dispatch: any) => {
  try {
    dispatch({
      type: SEARCH_USER,
    });

    const { data } = await api.get(
      `/user/search/${keyword}`
    );
    dispatch({
      type: SEARCH_USER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: SEARCH_USER_FAILD,
      payload:
        error.response && error.response.data.Error.Message
          ? error.response.data.Error.Message
          : error.message,
    });
  }
};
export const removeSearchUserList=()=>(dispatch:any)=>{
  dispatch({type:"REMOVE_SEARCH_USER_LIST"})
}


export const  fetchUserGetForGrid = (dataModel:any) => async (dispatch: any) => {
  try {
    dispatch({
      type: USER_GET_FOR_GRID,
    });

    const { data } = await api.post(
      `user/GetForGrid`,dataModel
    );
    dispatch({
      type: USER_GET_FOR_GRID_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: USER_GET_FOR_GRID_FAILD,
      payload:
        error.response && error.response.data.Error.Message
          ? error.response.data.Error.Message
          : error.message,
    });
  }
};

export const  removeUserGetForGrid = (removeModel:any,fetchData:any) => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_USER,
      payload: removeModel.id,
    });

    const { data } = await api.post(
      `/user/delete-staff`,removeModel
    );
    if(data.IsSucceed===true){
      messageSuccess("کاربر با موفقیت حذف گردید")
      fetchData()
     
    }else{
      messageError(data.Message)
    }
    dispatch({
      type: REMOVE_USER_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type:REMOVE_USER_FAILD,
      payload:
        error.response && error.response.data.Error.Message
          ? error.response.data.Error.Message
          : error.message,
    });
  }
};
