import {
  GET_BIRTH_CITY_PROVINCE_ID,
  GET_BIRTH_CITY_PROVINCE_ID_SUCCESS,
  GET_BIRTH_CITY_PROVINCE_ID_FAILED,
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  getBirthCityProvinceIdJudicial: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_BIRTH_CITY_PROVINCE_ID:
      return { ...state, loading: true };
    case GET_BIRTH_CITY_PROVINCE_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        getBirthCityProvinceIdJudicial: action.payload,
      };
    case GET_BIRTH_CITY_PROVINCE_ID_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
