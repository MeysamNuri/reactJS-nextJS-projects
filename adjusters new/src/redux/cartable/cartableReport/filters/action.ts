import {
  COLUMN_FILTER_DATA_NATURAL_ADD,
  COLUMN_FILTER_DATA_NATURAL_REMOVE,
  COLUMN_FILTER_DATA_LEGAL_ADD,
  COLUMN_FILTER_DATA_LEGAL_REMOVE,
  COLUMN_FILTER_DATA_JUDICIAL_ADD,
  COLUMN_FILTER_DATA_JUDICIAL_REMOVE,
} from "../../../../constant/cartableActionTypes";

export const cartableReportFilterNatural = (
  filter: any,
  method: string
) => async (dispatch: any) => {
  switch (method) {
    case "add":
      dispatch({
        type: COLUMN_FILTER_DATA_NATURAL_ADD,
        payload: filter,
      });
      break;
    case "remove":
      dispatch({
        type: COLUMN_FILTER_DATA_NATURAL_REMOVE,
        payload: filter,
      });
      break;
  }
};

export const cartableReportFilterLegal = (
  filter: any,
  method: string
) => async (dispatch: any) => {
  switch (method) {
    case "add":
      dispatch({
        type: COLUMN_FILTER_DATA_LEGAL_ADD,
        payload: filter,
      });
      break;
    case "remove":
      dispatch({
        type: COLUMN_FILTER_DATA_LEGAL_REMOVE,
        payload: filter,
      });
      break;
  }
};

export const cartableReportFilterJudicial = (
  filter: any,
  method: string
) => async (dispatch: any) => {
  switch (method) {
    case "add":
      dispatch({
        type: COLUMN_FILTER_DATA_JUDICIAL_ADD,
        payload: filter,
      });
      break;
    case "remove":
      dispatch({
        type: COLUMN_FILTER_DATA_JUDICIAL_REMOVE,
        payload: filter,
      });
      break;
  }
};
