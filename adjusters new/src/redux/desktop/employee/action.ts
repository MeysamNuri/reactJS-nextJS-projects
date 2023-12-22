import {
  ADD_EMPLOYEE,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILD,
  VIEW_EMPLOYEE,
  VIEW_EMPLOYEE_SUCCESS,
  VIEW_EMPLOYEE_FAILD,
  EMPLOYEE_ID,
  EMPLOYEE_ID_SUCCESS,
  EMPLOYEE_ID_FAILD,
  EDIT_EMPLOYEE,
  EDIT_EMPLOYEE_SUCCESS,
  EDIT_EMPLOYEE_FAILD,
  VIEW_MY_EMPLOYEE,
  VIEW_MY_EMPLOYEE_SUCCESS,
  VIEW_MY_EMPLOYEE_FAILD
} from "../../../constant/desktop";
import { api } from "../../../httpServices/service";
import { messageError, messageSuccess } from "../../../utils/utils";
import { IAddEmployee } from "../../../shared/ulitities/Model/desktop/employee";

//ایجاد کارکنان
export const addEmployee = (
  employee: IAddEmployee,
   closeModal: () => void,
   fetchEmployee:any,
   test:any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: ADD_EMPLOYEE,
    });
    const { data } = await api.post(`/Employee `, employee);
    dispatch({
      type: ADD_EMPLOYEE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      messageSuccess("افزودن کارمند با موفقیت انجام شد.");
       closeModal();
      fetchEmployee()
      test()
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: ADD_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//مشاهده کارکنان
export const fetchEmployee = (modelEmployee: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: VIEW_EMPLOYEE,
    });
    const { data } = await api.post(
      `/Employee/GetForGrid`,
      modelEmployee
    );

    dispatch({
      type: VIEW_EMPLOYEE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError("خطایی در سرور رخ داده است");
    dispatch({
      type: VIEW_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



//مشاهده هر کارکنان
export const fetchMyEmployee = (modelEmployee: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: VIEW_MY_EMPLOYEE,
    });
    const { data } = await api.post(
      `Employee/GetMyEmployeeForGrid`,
      modelEmployee
    );

    dispatch({
      type: VIEW_MY_EMPLOYEE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError("خطایی در سرور رخ داده است");
    dispatch({
      type: VIEW_MY_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};






//هرکارمند
export const fetchEmployeeId = (id: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: EMPLOYEE_ID,
      payload: id,
    });
    const { data } = await api.get(`/Employee/${id}`);

    dispatch({
      type: EMPLOYEE_ID_SUCCESS,
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
      type: EMPLOYEE_ID_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//ویرایش کارکنان
export const editEmploye = (
  editEmployee: IAddEmployee,
  closeModal: () => void,
  fetchEmployee: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: EDIT_EMPLOYEE,
    });
    const { data } = await api.post(`/Employee/Update`, editEmployee);

    dispatch({
      type: EDIT_EMPLOYEE_SUCCESS,
      payload: data,
    });
    if (data.IsSucceed) {
      messageSuccess("کارمند با موفقیت ویرایش گردید");
      closeModal();
      fetchEmployee()
    } else {
      messageError(data.Message);
    }
  } catch (error:any) {
    messageError(error.response.data.Error.Message)
    dispatch({
      type: EDIT_EMPLOYEE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// تاریخ پایان همکاری کارکنان

export const employeeEndDate = (
  requestBody: any, s1: any, closeModal: any
) => async (dispatch: any) => {
  try {
    dispatch({
      type: "EMPLOYEE_END_DATE",
    });
    const { data } = await api.post(`/Employee/EndDate`, requestBody);

    dispatch({
      type:"EMPLOYEE_END_DATE_SUCCESS",
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
      type: "EMPLOYEE_END_DATE_FAILD",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
