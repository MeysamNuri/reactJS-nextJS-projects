import {
  GET_WORK_CITY_PROVINCE_ID,
  GET_WORK_CITY_PROVINCE_ID_SUCCESS,
  GET_WORK_CITY_PROVINCE_ID_FAILED,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  getWorkCityProvinceIdNatural: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_WORK_CITY_PROVINCE_ID:
      return { ...state, loading: true };
    case GET_WORK_CITY_PROVINCE_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        getWorkCityProvinceIdNatural: action.payload,
      };
    case GET_WORK_CITY_PROVINCE_ID_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
