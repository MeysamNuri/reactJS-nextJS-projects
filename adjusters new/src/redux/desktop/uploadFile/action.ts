import {
  UPLOAD_FILES,
  UPLOAD_FILES_SUCCESS,
  UPLOAD_FILES_FAILD,
  REMOVE_FILE,
  REMOVE_FILE_SUCCESS,
  REMOVE_FILE_FAILD,
  DOWNLOAD_FILE,
  DOWNLOAD_FILE_SUCCESS,
  DOWNLOAD_FILE_FAILD,
  REMOVE_FILES,
  NOTIFICATION_AVATAR_FILE,
  NOTIFICATION_AVATAR_FILE_SUCCESS,
  NOTIFICATION_AVATAR_FILE_FAILD

} from "../../../constant/desktop";
import { api } from "../../../httpServices/service";
import { messageError, messageSuccess } from '../../../utils/utils';


//آپلود فایل
export const uploadFileHandler = ( file: any,
) => async (dispatch: any) => {
  // let formData = new FormData();
  // formData.append("file", file);
  try { 
    dispatch({
      type: UPLOAD_FILES,
    });
    const { data } = await api.post(
      `/File`,
      file
    );

    if (data.IsSucceed === true) {
      messageSuccess("فایل با موفقیت بارگذاری گردید")
    } else {
      messageError("بارگذاری فایل با خطا روبه رو گردید")
    }

    dispatch({
      type: UPLOAD_FILES_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: UPLOAD_FILES_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//آپلود آواتار
export const notificationAvatarFileHandler = ( file: any,
) => async (dispatch: any) => {
  // let formData = new FormData();
  // formData.append("file", file);
  try {
    dispatch({
      type: NOTIFICATION_AVATAR_FILE,
    });
    const { data } = await api.post(
      `/File`,
      file
    );

    if (data.IsSucceed === true) {
      messageSuccess("تصویر آواتار با موفقیت بارگذاری گردید")
    } else {
      messageError("بارگذاری تصویر با خطا روبه رو گردید")
    }

    dispatch({
      type: NOTIFICATION_AVATAR_FILE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: NOTIFICATION_AVATAR_FILE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//حذف فایل
export const removeFileHandler = ( documentId: string, newFile:any,s1:any) => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_FILE,
    });
    const { data } = await api.delete(
      `/File/${documentId}`,
    );
    if (data.IsSucceed === true) {
      messageSuccess("فایل با موفقیت حذف گردید")
      s1()
    } else {
      messageError(data.Message)
    }

    dispatch({
      type:REMOVE_FILE_SUCCESS,
      payload: newFile,
    });
  } catch (error: any) {
    dispatch({
      type: REMOVE_FILE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//حذف فایل
export const removeUploadedFile = ( documentId: string) => async (dispatch: any) => {
  try {
    dispatch({
      type: REMOVE_FILE,
    });
    const { data } = await api.delete(
      `/File/${documentId}`,
    );
    if (data.IsSucceed === true) {
      messageSuccess("فایل با موفقیت حذف گردید")
   
    } else {
      messageError(data.Message)
    }

  } catch (error: any) {
    dispatch({
      type: REMOVE_FILE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const dlFileHandler = (
  filId?: number,
) => async (dispatch: any) => {
  try {
    dispatch({
      type: DOWNLOAD_FILE,
      payload: filId,
    });
    const { data } = await api.get(
      `/File/${filId}`
    );
    if (data.IsSucceed === true) {
      messageSuccess("عملیات دانلود با موفقیت انجام شد");
      const linkSource = `data:image;base64,${data?.Result?.Content}`;
      const downloadLink = document.createElement("a");
      const fileName = `${data?.Result?.FileName}`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else {
      messageError(data.Message);
    }
    dispatch({
      type: DOWNLOAD_FILE_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: DOWNLOAD_FILE_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const removeUploadedFiles=()=>(dispatch:any)=>{
  dispatch({
    type:REMOVE_FILES
  })
}
export const updateFileList=(newList:any[])=>(dispatch:any)=>{
  dispatch({
    type:"UPDATE_FILE_LIST",
    payload:newList
  })
}