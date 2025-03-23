import {
  GET_RESIDENCE_CITY_PROVINCE_ID,
  GET_RESIDENCE_CITY_PROVINCE_ID_SUCCESS,
  GET_RESIDENCE_CITY_PROVINCE_ID_FAILED,
  GET_BIRTHDAY_CITY_PROVINCE_ID,
  GET_BIRTHDAY_CITY_PROVINCE_ID_SUCCESS,
  GET_BIRTHDAY_CITY_PROVINCE_ID_FAILED
} from "../../../constant/judicalActionTypes";

const INIT_STATE = {
  loading: false,
  getResidenceCityProvinceIdJudicial: null,
  listBirthdayCityId:null,
  birthdayCityIdLoading:false
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_BIRTHDAY_CITY_PROVINCE_ID:
      return { ...state, birthdayCityIdLoading: true };
    case GET_BIRTHDAY_CITY_PROVINCE_ID_SUCCESS:
      return { ...state, birthdayCityIdLoading: false,listBirthdayCityId:action.payload };
    case GET_BIRTHDAY_CITY_PROVINCE_ID_FAILED:
      return { ...state, birthdayCityIdLoading: false,listBirthdayCityId:null,error: action.payload  };


    case GET_RESIDENCE_CITY_PROVINCE_ID:
      return { ...state, loading: true };
    case GET_RESIDENCE_CITY_PROVINCE_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        getResidenceCityProvinceIdJudicial: action.payload,
      };
    case GET_RESIDENCE_CITY_PROVINCE_ID_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
