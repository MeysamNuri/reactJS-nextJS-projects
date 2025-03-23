import {
    REQUEST_DOCUMENT_TYPES,
    REQUEST_DOCUMENT_TYPES_SUCCESS,
    REQUEST_DOCUMENT_TYPES_FAILD,
} from "../../constant/actionTypes";
import { messageSuccess, messageError } from "../../utils/utils";
import { apiRegistrationToken } from "../../httpServices/service";
import { toast } from "react-toastify";

export const fetchRequestDocTypes = (requestBody:any) => async (
    dispatch:any
) => {
    try {
        dispatch({
            type: REQUEST_DOCUMENT_TYPES,
         
        });
        const { data } = await apiRegistrationToken.post(
            `/ApplicantRequestTypeDocument/GetForGrid`,requestBody
           
        );
        dispatch({
            type: REQUEST_DOCUMENT_TYPES_SUCCESS,
            payload: data,
        });
        if(!data.IsSucceed){
            messageError(data.Message);
        }
    } catch (error: any) {
        dispatch({
            type: REQUEST_DOCUMENT_TYPES_FAILD,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const submitRequestDocTypes = (requestBody:any,closeModal:any) => async (
    dispatch:any
) => {
    try {
        dispatch({
            type: "SUBMIT_REQUEST_DOCUMENT_TYPES",
         
        });
        const { data } = await apiRegistrationToken.post(
            `/ApplicantRequestTypeDocument`,requestBody
           
        );
        dispatch({
            type: "SUBMIT_REQUEST_DOCUMENT_TYPES_SUCCESS",
            payload: data,
        });
      
          if(data?.IsSucceed){
            toast.success("نوع درخواست مستندات با موفقیت ثبت شد", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false, 
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            closeModal()
          }
          if(!data?.IsSucceed){
            messageError(data?.Message)
          }

    } catch (error: any) {
        dispatch({
            type: "SUBMIT_REQUEST_DOCUMENT_TYPES_FAILED",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const editRequestDocTypes = (requestBody:any,closeModal:any) => async (
    dispatch:any
) => {
    try {
        dispatch({
            type: "SUBMIT_REQUEST_DOCUMENT_TYPES",
         
        });
        const { data } = await apiRegistrationToken.put(
            `/ApplicantRequestTypeDocument`,requestBody
           
        );
        dispatch({
            type: "SUBMIT_REQUEST_DOCUMENT_TYPES_SUCCESS",
            payload: data,
        });
      
          if(data?.IsSucceed){
            toast.success("نوع درخواست مستندات با موفقیت ویرایش شد", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            closeModal()
          }
          if(!data.IsSucceed){
            messageError(data.Message);
        }
    } catch (error: any) {
        dispatch({
            type: "SUBMIT_REQUEST_DOCUMENT_TYPES_FAILED",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const fetchAdjusterTypes = () => async (
    dispatch:any
) => {
    try {
        dispatch({
            type: "ADJUSTER_TYPES",
         
        });
        const { data } = await apiRegistrationToken.get(
            `/adjuster-type/all`
           
        );
        dispatch({
            type: "ADJUSTER_TYPE_SUCCESS",
            payload: data,
        });
    } catch (error: any) {
        dispatch({
            type: "ADJUSTER_TYPE_FAILED",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const deleteRequestTypes = (id:number) => async (
    dispatch:any
) => {
    try {
        dispatch({
            type: "REMOVE_REQUEST_TYPES",
         
        });
        const { data } = await apiRegistrationToken.delete(
            `/ApplicantRequestTypeDocument/${id}`
           
        );
        dispatch({
            type: "REMOVE_REQUEST_TYPES_SUCCESS",
            payload: data,
        });
        if(data.IsSucceed){
            messageSuccess("مستند با موفقیت حذف شد");
        }
        if(!data.IsSucceed){
            messageError(data.Message);
        }
    } catch (error: any) {
        dispatch({
            type: "REMOVE_REQUEST_TYPES_FAILED",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getRequestTypeDocById = (id:number) => async (
    dispatch:any
) => {
    try {
        dispatch({
            type: "GET_REQUEST_TYPE_DOCUMENT",
         
        });
        const { data } = await apiRegistrationToken.get(
            `/ApplicantRequestTypeDocument/${id}`
           
        );
        dispatch({
            type: "GET_REQUEST_TYPE_DOCUMENT_SUCCESS",
            payload: data,
        });
    } catch (error: any) {
        dispatch({
            type: "GET_REQUEST_TYPE_DOCUMENT_FAILED",
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};