import {
  COLUMN_FILTER_DATA_NATURAL_ADD,
  COLUMN_FILTER_DATA_NATURAL_REMOVE,
  COLUMN_FILTER_DATA_LEGAL_ADD,
  COLUMN_FILTER_DATA_LEGAL_REMOVE,
  COLUMN_FILTER_DATA_JUDICIAL_ADD,
  COLUMN_FILTER_DATA_JUDICIAL_REMOVE,
} from "../../../../constant/cartableActionTypes";

const INIT_STATE = {
  naturalColumnFilter: [],
  legalColumnFilter: [],
  judicialColumnFilter: [],
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case COLUMN_FILTER_DATA_NATURAL_ADD:
      return {
        ...state,
        naturalColumnFilter: [...state?.naturalColumnFilter, action.payload],
      };
    case COLUMN_FILTER_DATA_NATURAL_REMOVE:
      return { ...state, naturalColumnFilter: action.payload };
    case COLUMN_FILTER_DATA_LEGAL_ADD:
      return {
        ...state,
        legalColumnFilter: [...state?.legalColumnFilter, action.payload],
      };
    case COLUMN_FILTER_DATA_LEGAL_REMOVE:
      return { ...state, legalColumnFilter: action.payload };
    case COLUMN_FILTER_DATA_JUDICIAL_ADD:
      return {
        ...state,
        judicialColumnFilter: [...state?.judicialColumnFilter, action.payload],
      };
    case COLUMN_FILTER_DATA_JUDICIAL_REMOVE:
      return { ...state, judicialColumnFilter: action.payload };
    default:
      return { ...state };
  }
};
