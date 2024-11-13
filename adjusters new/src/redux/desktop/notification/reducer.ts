import {
    NOTIFICATIONS_LIST,
    NOTIFICATIONS_LIST_SUCCESS,
    NOTIFICATIONS_LIST_FAILD,
    SUBMIT_NOTIFICATIONS,
    SUBMIT_NOTIFICATIONS_SUCCESS,
    SUBMIT_NOTIFICATIONS_FAILD,
    NOTIFICATIONS_DETAILS,
    NOTIFICATIONS_DETAILS_SUCCESS,
    NOTIFICATIONS_DETAILS_FAILD
} from "../../../constant/desktop";

const INIT_STATE = {
    notificationLoading: false,
    notificationsList: null,
    notificationResult: null,
    submitNotificationLoading: false,
    notificationDetailsLoading: false,
    notificationDetailsInfo: null
}

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case "REMOVE_NOTIFICTION":
            return { ...state, notificationDetailsInfo: null };
        case NOTIFICATIONS_LIST:
            return { ...state, notificationLoading: true };

        case NOTIFICATIONS_LIST_SUCCESS:
            return { ...state, notificationLoading: false, notificationsList: action.payload };

        case NOTIFICATIONS_LIST_FAILD:
            return { ...state, notificationLoading: false, notificationsList: null, error: action.payload, };
        case SUBMIT_NOTIFICATIONS:
            return { ...state, submitNotificationLoading: true };

        case SUBMIT_NOTIFICATIONS_SUCCESS:
            return { ...state, submitNotificationLoading: false, notificationResult: action.payload };

        case SUBMIT_NOTIFICATIONS_FAILD:
            return { ...state, submitNotificationLoading: false, notificationResult: null, error: action.payload };
        case NOTIFICATIONS_DETAILS:
            return { ...state, notificationDetailsLoading: true };
        case NOTIFICATIONS_DETAILS_SUCCESS:
            return { ...state, notificationDetailsLoading: false, notificationDetailsInfo: action.payload };
        case NOTIFICATIONS_DETAILS_FAILD:
            return { ...state, notificationDetailsLoading: false, notificationDetailsInfo: null, error: action.payload };


        default:
            return { ...state };
    }
};
