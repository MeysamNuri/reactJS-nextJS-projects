import {
    G4B_SEND_MESSAGE,
    G4B_SEND_MESSAGE_SUCCESS,
    G4B_SEND_MESSAGE_FAILD,
    G4B_CHECK_REGISTERATION,
    G4B_CHECK_REGISTERATION_SUCCESS,
    G4B_CHECK_REGISTERATION_FAILD,
    G4B_DOCUMENT_APPROVED,
    G4B_DOCUMENT_APPROVED_SUCCESS,
    G4B_DOCUMENT_APPROVED_FAILD,
    G4B_REGISTER,
    G4B_REGISTER_SUCCESS,
    G4B_REGISTER_FAILD
} from "../../constant/actionTypes";

const INIT_STATE = {
    g4bSendmessageDetails: null,
    g4bSendmessageDetailsLoading: false,
    g4bCheckRegisterationDetails: null,
    g4bCheckRegisterationLoading: false,
    g4bDocumentApproved:null,
    g4bDocumentApprovedloading:false,
    g4bRegisterDetails:false,
    g4bRegisterLoading:false
};

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case G4B_SEND_MESSAGE:
            return {
                ...state,
                g4bSendmessageDetailsLoading: true,

            };
        case G4B_SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                g4bSendmessageDetailsLoading: false,
                g4bSendmessageDetails: action.payload,
            };
        case G4B_SEND_MESSAGE_FAILD:
            return {
                ...state,
                g4bSendmessageDetailsLoading: false,
                g4bSendmessageDetails: null,
                error: action.payload
            };
        case G4B_CHECK_REGISTERATION:
            return {
                ...state,
                g4bCheckRegisterationLoading: true
            }
            case G4B_CHECK_REGISTERATION_SUCCESS:
                return {
                    ...state,
                    g4bCheckRegisterationLoading: false,
                    g4bCheckRegisterationDetails: action.payload,
                }
            case G4B_CHECK_REGISTERATION_FAILD:
                return {
                    ...state,
                    g4bCheckRegisterationLoading: false,
                    g4bCheckRegisterationDetails: null,
                    error: action.payload
                }
                case G4B_DOCUMENT_APPROVED:
                    return {
                        ...state,
                        g4bDocumentApprovedloading: true
                    }
                case G4B_DOCUMENT_APPROVED_SUCCESS:
                    return {
                        ...state,
                        g4bDocumentApprovedloading: false,
                        g4bDocumentApproved:action.payload
                    }
                case G4B_DOCUMENT_APPROVED_FAILD:
                    return {
                        ...state,
                        g4bDocumentApprovedloading: false,
                        g4bDocumentApproved:null,
                        error: action.payload
                    }
                case G4B_REGISTER:
                    return {
                        ...state,
                        g4bRegisterLoading: true,
                    
                    }
                case G4B_REGISTER_SUCCESS:
                    return {
                        ...state,
                        g4bRegisterLoading: false,
                        g4bRegisterDetails:action.payload
                    
                    }
                case G4B_REGISTER_FAILD:
                    return {
                        ...state,
                        g4bRegisterLoading: false,
                        g4bRegisterDetails: null,
                        error: action.payload
                    
                    }

        default:
            return { ...state };
    }
};
