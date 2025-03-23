//libraries
import { toast } from "react-toastify";

//redux
import {
  GET_BIRTH_CITY_PROVINCE_ID_LEGAL,
  GET_BIRTH_CITY_PROVINCE_ID_LEGAL_SUCCESS,
  GET_BIRTH_CITY_PROVINCE_ID_LEGAL_FAILED,
} from "../../../constant/legalActionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getBirthCityProvinceIdLegal = (provinceId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: GET_BIRTH_CITY_PROVINCE_ID_LEGAL });
    const { data } = await apiRegistrationToken.get(
      `/registration/natural/base-info/city/${provinceId}`
    );
    dispatch({
      type: GET_BIRTH_CITY_PROVINCE_ID_LEGAL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_BIRTH_CITY_PROVINCE_ID_LEGAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
