import {
    REQUEST_DOCUMENT_TYPES,
    REQUEST_DOCUMENT_TYPES_SUCCESS,
    REQUEST_DOCUMENT_TYPES_FAILD,
} from "../../constant/actionTypes";
  
  const INIT_STATE = {
    requestDocumetsTypeList: null,
    loading: false,
    adjusterTypeList:null,
    adjusterTypeLoading:false,
    requestTypeDoc:null,
    requestTypeDocLoading:false,
    requestTypeDocDetails:null,
    requestTypeDocDetailsLoading:false,
    deleteRequestTypeDoc:null,

  };
  
  export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
      case REQUEST_DOCUMENT_TYPES:
        return {
          ...state,
          loading: true,
          requestDocumetsTypeList: action.payload,
        };
      case REQUEST_DOCUMENT_TYPES_SUCCESS:
        return {
          ...state,
          loading: false,
          requestDocumetsTypeList: action.payload,
        };
      case REQUEST_DOCUMENT_TYPES_FAILD:
        return {
          ...state,
          loading: false,
          requestDocumetsTypeList: action.payload,
        };
      case "ADJUSTER_TYPES":
        return {
          ...state,
          adjusterTypeLoading: true,
        
        };
      case "ADJUSTER_TYPE_SUCCESS":
        return {
          ...state,
          adjusterTypeLoading: false,
          adjusterTypeList:action.payload
        };
      case "ADJUSTER_TYPE_FAILED":
        return {
          ...state,
          adjusterTypeLoading: false,
          adjusterTypeList:action.payload
        };
      case "SUBMIT_REQUEST_DOCUMENT_TYPES":
        return {
          ...state,
          requestTypeDocLoading: true,
        };
      case "SUBMIT_REQUEST_DOCUMENT_TYPES_SUCCESS":
        return {
          ...state,
          requestTypeDocLoading: false,
          requestTypeDoc:action.payload
        };
      case "SUBMIT_REQUEST_DOCUMENT_TYPES_FAILED":
        return {
          ...state,
          requestTypeDocLoading: false,
          requestTypeDoc:action.payload
        };
        case "GET_REQUEST_TYPE_DOCUMENT":
            return {
                ...state,
                requestTypeDocDetailsLoading: true,
            
              };
        case "GET_REQUEST_TYPE_DOCUMENT_SUCCESS":
            return {
                ...state,
                requestTypeDocDetailsLoading: false,
                requestTypeDocDetails:action.payload
              };
        case "GET_REQUEST_TYPE_DOCUMENT_FAILED":
            return {
                ...state,
                requestTypeDocDetailsLoading: false,
                requestTypeDocDetails:action.payload
              };
        case "REMOVE_REQUEST_TYPES":
            return {
                ...state,
              
              };
        case "REMOVE_REQUEST_TYPES_SUCCESS":
            return {
                ...state,
                deleteRequestTypeDoc:action.payload
              };
      default:
        return { ...state };
    }
  };
  