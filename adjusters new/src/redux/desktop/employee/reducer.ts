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
  VIEW_MY_EMPLOYEE_FAILD,
} from "../../../constant/desktop";

const INIT_STATE = {
  loadingAddEmployee: false,
  addEmployee: null,
  loadingViewEmployee: false,
  viewEmployee: null,
  viewEmployeeId: null,
  loadingViewEmployeeId: false,
  editEmployee: null,
  loadingEditEmployee: false,
  loadingViewMyEmployee: false,
  viewMyEmployee: null,
  employeeEndDate:null,
  employeeEndDateLoading:false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      return { ...state, loadingAddEmployee: true };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loadingAddEmployee: false,
        addEmployee: action.payload,
      };
    case ADD_EMPLOYEE_FAILD:
      return {
        ...state,
        loadingAddEmployee: false,
        error: action.payload,
      };

    case VIEW_EMPLOYEE:
      return { ...state, loadingViewEmployee: true };
    case VIEW_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loadingViewEmployee: false,
        viewEmployee: action.payload,
      };
    case VIEW_EMPLOYEE_FAILD:
      return {
        ...state,
        loadingViewEmployee: false,
        error: action.payload,
      };

    case VIEW_MY_EMPLOYEE:
      return { ...state, loadingViewMyEmployee: true };
    case VIEW_MY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loadingViewMyEmployee: false,
        viewMyEmployee: action.payload,
      };
    case VIEW_MY_EMPLOYEE_FAILD:
      return {
        ...state,
        loadingViewMyEmployee: false,
        error: action.payload,
      };

    case EMPLOYEE_ID:
      return { ...state, loadingViewEmployeeId: action.payload };
    case EMPLOYEE_ID_SUCCESS:
      return {
        ...state,
        loadingViewEmployeeId: null,
        viewEmployeeId: action.payload,
      };
    case EMPLOYEE_ID_FAILD:
      return {
        ...state,
        loadingViewEmployeeId: null,
        error: action.payload,
      };

    case EDIT_EMPLOYEE:
      return { ...state, loadingEditEmployee: true };
    case EDIT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loadingEditEmployee: false,
        editEmployee: action.payload,
      };
    case EDIT_EMPLOYEE_FAILD:
      return {
        ...state,
        loadingEditEmployee: false,
        error: action.payload,
      };
      case "EMPLOYEE_END_DATE":
        return { ...state, employeeEndDateLoading: true };
      case "EMPLOYEE_END_DATE_SUCCESS":
        return { ...state, employeeEndDateLoading: false ,employeeEndDate:action.payload};
      case "EMPLOYEE_END_DATE_FAILD":
        return { ...state, employeeEndDateLoading: false ,employeeEndDate:null,error: action.payload,};
    default:
      return { ...state };
  }
};
