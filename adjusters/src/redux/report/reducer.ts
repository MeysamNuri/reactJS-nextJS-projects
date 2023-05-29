
import {
    ACTIVE_ADJUSTERS,
    ACTIVE_ADJUSTERS_SUCCESS,
    ACTIVE_ADJUSTERS_FAILD,
    ACTIVE_ADJUSTER_EXCEL,
    ACTIVE_ADJUSTER_EXCEL_SUCCESS,
    ACTIVE_ADJUSTER_EXCEL_FAILED
} from "../../constant/actionTypes";

const INIT_STATE = {
    activeAdjustersLoading: false,
    activeAdjusterLists: null,
};

export default (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ACTIVE_ADJUSTERS:
            return { ...state, activeAdjustersLoading: true };
        case ACTIVE_ADJUSTERS_SUCCESS:
            return { ...state, activeAdjustersLoading: false, activeAdjusterLists: action.payload };
        case ACTIVE_ADJUSTERS_FAILD:
            return { ...state, activeAdjustersLoading: false, error: action.payload, activeAdjusterLists: null };
        default:
            return { ...state };
    }
};