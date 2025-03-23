import {
  ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST,
  ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST_SUCCESS,
  ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST_FAILD,
} from "../../constant/actionTypes";
import { apiRegistrationToken } from "../../httpServices/service";

//لیست ارزیابان حقیقی و دادگستری
export const fetchNaturalJudicalPesonalList = (requestBody:any) => async (dispatch: any) => {
  try {
      dispatch({ 
        type: ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST,
      });
      const { data } = await apiRegistrationToken.post(
        `/adjuster/SearchAdjuster`,requestBody
      );
      dispatch({
        type: ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST_SUCCESS,
        payload: data,
      });
    
  } catch (error: any) {
    dispatch({
      type: ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const emptySerachedAdjuster=()=>(dispatch:any)=>{
  dispatch({
    type: ADJUSTER_NATURAL_JUDICAL_PERSONAL_LIST_SUCCESS,
    payload: null,
  });
}
