import {
  LICENSE_ISSUER,
  LICENSE_ISSUER_SUCCESS,
  LICENSE_ISSUER_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import {messageSuccess,messageError} from '../../../utils/utils'


export const fechLicenseIssuer = (applicantId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: LICENSE_ISSUER,
    });
    const { data } = await api.get(
      `/license/applicant/${applicantId}/issuer`
    );
    dispatch({
      type: LICENSE_ISSUER_SUCCESS,
      payload: data,
    });
  
  } catch (error: any) {
    //messageError("خطایی در سمت سرور رخ داده است");
    dispatch({
      type: LICENSE_ISSUER_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
