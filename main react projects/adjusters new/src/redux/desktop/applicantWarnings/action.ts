import {
    APPLICANT_WARNINGS_LIST,
    APPLICANT_WARNINGS_LIST_SUCCESS,
    APPLICANT_WARNINGS_LIST_FAILD
} from "../../../constant/desktop";
import { api } from "../../../httpServices/service";
import { messageError, messageSuccess } from "../../../utils/utils";

//لیست اخطار ها
export const fetchApplicantWarninsList = (modelApplicantWarnings: any, isManagmentCartable: any) => async (
    dispatch: any
) => {
    try {
        dispatch({
            type: APPLICANT_WARNINGS_LIST,
        });
        if (!isManagmentCartable) {
            const { data } = await api.post(
                `/ApplicantWarning/GetMyApplicantWarningForGrid`,
                modelApplicantWarnings
            );
            dispatch({
                type: APPLICANT_WARNINGS_LIST_SUCCESS,
                payload: data,
            });
            if (data.IsSucceed) {
            } else {
                messageError(data.Message);
            }
        }
        else{
            const { data } = await api.post(
                `/ApplicantWarning/GetForGrid`,
                modelApplicantWarnings
            );
            dispatch({
                type: APPLICANT_WARNINGS_LIST_SUCCESS,
                payload: data,
            });
            if (data.IsSucceed) {
            } else {
                messageError(data.Message);
            }
        }
    }


    catch (error: any) {
        messageError("خطایی در سرور رخ داده است");
        dispatch({
            type: APPLICANT_WARNINGS_LIST_FAILD,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
