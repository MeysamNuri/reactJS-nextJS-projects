import {
  GET_BIRTH_CITY_PROVINCE_ID_LEGAL,
  GET_BIRTH_CITY_PROVINCE_ID_LEGAL_SUCCESS,
  GET_BIRTH_CITY_PROVINCE_ID_LEGAL_FAILED,
} from "../../../constant/legalActionTypes";

const INIT_STATE = {
  loading: false,
  getBirthCityProvinceIdLegal: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_BIRTH_CITY_PROVINCE_ID_LEGAL:
      return { ...state, loading: true };
    case GET_BIRTH_CITY_PROVINCE_ID_LEGAL_SUCCESS:
      return {
        ...state,
        loading: false,
        getBirthCityProvinceIdLegal: action.payload,
      };
    case GET_BIRTH_CITY_PROVINCE_ID_LEGAL_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
