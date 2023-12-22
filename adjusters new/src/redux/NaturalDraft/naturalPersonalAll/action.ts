import {
  NATURAL_PERSON_ALL,
  NATURAL_PERSON_ALL_SUCCESS,
  NATURAL_PERSON_ALL_FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken, api } from "../../../httpServices/service";

export const fetchNaturalPersonalAll = () => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: NATURAL_PERSON_ALL,
    });
    const { data } = await apiRegistrationToken.get(
      `/adjuster/natural-person-all`
    );
    dispatch({
      type: NATURAL_PERSON_ALL_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: NATURAL_PERSON_ALL_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

