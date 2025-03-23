const initialState = {
  full_name: "",
  birth_certificate_number: "",
  father_name: "",
  relationship: "",
  birth_date: "",
  national_id: "",
  notebook_number: "",
  insuranceArr: [],
};
const insuranceReducer = (state = initialState, action = {}) => {
  const { type } = action;
  
  switch (type) {
    case "SET_FNAME_LNAME":
      return {
        ...state,
        full_name: action.full_name,
      };
    case "SET_IDE_NUM":
      return {
        ...state,
        birth_certificate_number: action.birth_certificate_number,
      };
    case "SET_INSURANCE_FATHER_NAME":
      return {
        ...state,
        father_name: action.father_name,
      };
    case "SET_REL":
      return {
        ...state,
        relationship: action.relationship,
      };
    case "SET_INSURANCE_BIRTHDATE":
      return {
        ...state,
        birth_date: action.birth_date,
      };
    case "SET_INSURANCE_NATIONAL_ID":
      return {
        ...state,
        national_id: action.national_id,
      };
    case "SET_INSURANCE_NUM":
      return {
        ...state,
        notebook_number: action.notebook_number,
      };
    case "SET_INSURANCE_ARR":
      return {
        ...state,
        insuranceArr: [
          ...state.insuranceArr,
          {
            full_name: state.full_name,
            national_id: state.national_id,
            father_name: state.father_name,
            relationship: state.relationship,
            birth_date: state.birth_date,
            birth_certificate_number: state.birth_certificate_number,
            notebook_number: state.notebook_number,
          },
        ],
      };
    case "REMOVE_INSURANCE_ARR":
      return {
        ...state,
        insuranceArr: [],
      };
    default:
      return state;
  }
};

export default insuranceReducer;
