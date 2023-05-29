import {
  EXCEL_OUTPUT_CARTABLE,
  EXCEL_OUTPUT_CARTABLE_SUCCESS,
  EXCEL_OUTPUT_CARTABLE_FAILD,
} from "../../../constant/cartableActionTypes";
import { api } from "../../../httpServices/service";
import { messageError, messageSuccess } from "../../../utils/utils";

//دانلود فایل اکسل کارتابل
export const excelOutPutHandler = (dataNaturalCartable: any) => async (
  dispatch: any
) => {
  try {
    dispatch({
      type: EXCEL_OUTPUT_CARTABLE,
    });
    const { data } = await api.post(
      `/inbox/export-to-excel`,
      dataNaturalCartable
    );
    if (data.IsSucceed === true) {
      messageSuccess("عملیات دانلود با موفقیت انجام شد");
      const linkSource = `data:${data?.Result?.Content};base64,${data?.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data?.Result?.Title}.${data?.Result?.FileExtension}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: EXCEL_OUTPUT_CARTABLE_SUCCESS,
      payload: data,
    });
  } catch (error:any) {
    dispatch({
      type: EXCEL_OUTPUT_CARTABLE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

