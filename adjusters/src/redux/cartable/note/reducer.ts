import {
  ADD_NOTE,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILD,
  NOTE_LIST,
  NOTE_LIST_SUCCESS,
  NOTE_LIST_FAILD,
  NOTE_REMOVE,
  NOTE_REMOVE_SUCCESS,
  NOTE_REMOVE_FAILD,
} from "../../../constant/cartableActionTypes";

const INIT_STATE = {
  loading: false,
  addNote: null,
  listNote: { Result: [] },
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ADD_NOTE:
      return { ...state, loading: true };
    case ADD_NOTE_SUCCESS:
      return { ...state, loading: false, addNote: action.payload };
    case ADD_NOTE_FAILD:
      return { ...state, loading: false, error: action.payload };
    case NOTE_LIST:
      return { ...state, loading: true };
    case NOTE_LIST_SUCCESS:
      return { ...state, loading: false, listNote: action.payload };
    case NOTE_LIST_FAILD:
      return { ...state, loading: false, error: action.payload };
    case NOTE_REMOVE_SUCCESS:
      const newList = state.listNote.Result.filter(
        (el: any) => el.Id !== action.payload
      );
      return {
        ...state,
        listNote: { ...state.listNote, Result: newList },
      };

    default:
      return { ...state };
  }
};
