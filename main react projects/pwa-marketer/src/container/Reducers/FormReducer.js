const initialState = {
  storeName: "",
  receiverLName: "",
  receiverFName: "",
  nationalId: "",
  identificationNumber: "",
  fatherName: "",
  birthdate: "",
  idFrom: "",
  partnerDetail: [],
  categories: [],
  pozList: [],
  selectedPoz: "",
  bankList: [],
  selectedBank: "",
  pozData: "",
  bankId: "",
  pozModalRadio: "",
  terminalNumber: "",
  terminalImg: "",
  pozDetail: [],
  sheba: "",
  fixPoz: 0,
  portablePoz: 0,
  partnerBirthdate: "",
  partnerName: "",
  partnerReceiverFName: "",
  partnerReceiverLName: "",
  partnerNationalId: "",
  partnerIdentification: "",
  partnerIdFrom: "",
  partnerFatherName: "",
  selectedRegion: "",
  refArray: [],
  marketerName: "",
  setRegionId: "",
  selectedPozName: "",
  selectedBankName: "",
};

const FormReducer = (state = initialState, action = {}) => {
  const { type } = action;

  switch (type) {
    case 'SET_MARKETER_NAME':
      return {
        ...state,
        marketerName: action.marketerName,
      };
    case 'SET_STORE_NAME':
      return {
        ...state,
        storeName: action.storeName,
      };
    case 'SET_RECEIVER_FNAME':
      return {
        ...state,
        receiverFName: action.receiverFName,
      };
    case 'SET_RECEIVER_LNAME':
      return {
        ...state,
        receiverLName: action.receiverLName,
      };
    case 'SET_NATIONAL_ID':
      return {
        ...state,
        nationalId: action.nationalId,
      };
    case 'SET_IDENTIFICATION_NUMBER':
      return {
        ...state,
        identificationNumber: action.identificationNumber,
      };
    case 'SET_FATHER_NAME':
      return {
        ...state,
        fatherName: action.fatherName,
      };
    case 'SET_BIRTHDATE':
      return {
        ...state,
        birthdate: action.birthdate,
      };
    case 'SET_ID_FROM':
      return {
        ...state,
        idFrom: action.idFrom,
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.categories,
      };
    case 'SET_REGION_ID':
      return {
        ...state,
        regionId: action.regionId,
      };
    case 'SET_POZES':
      return {
        ...state,
        pozList: action.pozList,
      };
    case 'SET_SELECTED_POZ':
      return {
        ...state,
        selectedPoz: action.selectedPoz,
      };
    case 'SET_SELECTED_POZ_NAME':
      return {
        ...state,
        selectedPozName: action.selectedPozName,
      };
    case 'SET_BANK_LIST':
      return {
        ...state,
        bankList: action.bankList,
      };
    case 'SET_SELECTED_BANK':
      return {
        ...state,
        selectedBank: action.selectedBank,
      };
    case 'SET_SELECTED_BANK_NAME':
      return {
        ...state,
        selectedBankName: action.selectedBankName,
      };
    case 'SET_POZ_DATA':
      return {
        ...state,
        pozData: action.selectedBank,
      };
    case 'SET_BANK_ID':
      return {
        ...state,
        bankId: action.bankId,
      };
    case 'SET_POZ_MODAL_RADIO':
      return {
        ...state,
        pozModalRadio: action.pozModalRadio,
      };
    case 'SET_TERMINAL_NUMBER':
      return {
        ...state,
        terminalNumber: action.terminalNumber,
      };
    case 'SET_TERMINAL_IMG':
      return {
        ...state,
        terminalImg: action.terminalImg,
      };
    case 'SET_SHEBA':
      return {
        ...state,
        sheba: action.sheba,
      };
    case 'SET_FIXPOZ':
      return {
        ...state,
        fixPoz: action.fixPoz,
      };
    case 'SET_PORTABLEPOZ':
      return {
        ...state,
        portablePoz: action.portablePoz,
      };
    case 'ADD_POZ_DETAIL':
      return {
        ...state,
        pozDetail: [
          ...state.pozDetail,
          {
            pos_id: state.selectedPoz,
            pos_name: state.selectedPozName,
            pos_type: state.pozModalRadio,
            terminal_number: state.terminalNumber,
            terminal_image: state.terminalImg,
            bank_id: state.selectedBank,
            bank_name: state.selectedBankName,
            account_number: state.bankId,
            sheba: `IR-${state.sheba}`,
          },
        ],
      };
    case 'REMOVE_POZ_DETAIL':
      return{
        ...state,
        pozDetail: []
      }
    case 'SET_SELECTED_REGION':
      return {
        ...state,
        selectedRegion: action.selectedRegion,
      };
    // ================== partner
    case 'SET_PARTNER_BIRTHDATE':
      return {
        ...state,
        partnerBirthdate: action.partnerBirthdate,
      };
    case 'SET_PARTNER_NAME':
      return {
        ...state,
        partnerName: action.partnerName,
      };
    case 'SET_PARTNER_RECEIVER_FNAME':
      return {
        ...state,
        partnerReceiverFName: action.partnerReceiverFName,
      };
    case 'SET_PARTNER_RECEIVER_LNAME':
      return {
        ...state,
        partnerReceiverLName: action.partnerReceiverLName,
      };
    case 'SET_PARTNER_NATIONAL_ID':
      return {
        ...state,
        partnerNationalId: action.partnerNationalId,
      };
    case 'SET_PARTNER_IDENTIFICATION':
      return {
        ...state,
        partnerIdentification: action.partnerIdentification,
      };
    case 'SET_PARTNER_ID_FROM':
      return {
        ...state,
        partnerIdFrom: action.partnerIdFrom,
      };
    case 'SET_PARTNER_FATHER_NAME':
      return {
        ...state,
        partnerFatherName: action.partnerFatherName,
      };
    case 'SET_REF_ARRAY':
      return {
        ...state,
        refArray: action.refArray,
      };
    case 'SET_PARTNER_DETAIL':
      return {
        ...state,
        partnerDetail: [
          ...state.partnerDetail,
          {
            f_name: state.partnerReceiverFName,
            l_name: state.partnerReceiverLName,
            national_id: state.partnerNationalId,
            birth_certificate_number: state.partnerIdentification,
            father_name: state.partnerFatherName,
            birth_date: state.partnerBirthdate,
            from: state.partnerIdFrom,
          },
        ],
      };
    default:
      return state;
  }
};

export default FormReducer;
