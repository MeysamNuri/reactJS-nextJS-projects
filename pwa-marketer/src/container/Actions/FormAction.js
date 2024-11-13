export const setStoreName = storeName => {
  return {
    type: 'SET_STORE_NAME',
    storeName: storeName
  };
};

export const setReceiverFName = receiverFName => {
  return {
    type: 'SET_RECEIVER_FNAME',
    receiverFName: receiverFName
  };
};

export const setReceiverLName = receiverLName => {
  return {
    type: 'SET_RECEIVER_LNAME',
    receiverLName: receiverLName
  };
};

export const setNationalId = nationalId => {
  return {
    type: 'SET_NATIONAL_ID',
    nationalId: nationalId
  };
};

export const setIdentificationNumber = identificationNumber => {
  return {
    type: 'SET_IDENTIFICATION_NUMBER',
    identificationNumber: identificationNumber
  };
};

export const setFatherName = fatherName => {
  return {
    type: 'SET_FATHER_NAME',
    fatherName: fatherName
  };
};

export const setBirthdate = birthdate => {
  return {
    type: 'SET_BIRTHDATE',
    birthdate: birthdate
  };
};

export const setIdFrom = idFrom => {
  return {
    type: 'SET_ID_FROM',
    idFrom: idFrom
  };
};

export const setPersonDetail = () => {
  return {
    type: 'SET_PERSON_DETAIL'
  };
};

export const setCategories = categories => {
  return {
    type: 'SET_CATEGORIES',
    categories: categories
  };
};

export const setPozes = pozList => {
  return {
    type: 'SET_POZES',
    pozList: pozList
  };
};

export const setSelectedPoz = selectedPoz => {
  return {
    type: 'SET_SELECTED_POZ',
    selectedPoz: selectedPoz
  };
};

export const setSelectedPozName = selectedPozName => {
  return {
    type: 'SET_SELECTED_POZ_NAME',
    selectedPozName: selectedPozName
  };
};

export const setBankList = bankList => {
  return {
    type: 'SET_BANK_LIST',
    bankList: bankList
  };
};

export const setRegionId = regionId => {
  return {
    type: 'SET_REGION_ID',
    regionId: regionId
  };
};

export const setSelectedBank = selectedBank => {
  return {
    type: 'SET_SELECTED_BANK',
    selectedBank: selectedBank
  };
};

export const setSelectedBankName = selectedBankName => {
  return {
    type: 'SET_SELECTED_BANK_NAME',
    selectedBankName: selectedBankName
  };
};

export const setPozData = pozData => {
  return {
    type: 'SET_POZ_DATA',
    pozData: pozData
  };
};

export const setBankId = bankId => {
  return {
    type: 'SET_BANK_ID',
    bankId: bankId
  };
};

// export const setPozArray = () => {
//   return {
//     type: 'SET_POZ_ARRAY'
//   };
// };

export const setPozModalRadio = pozModalRadio => {
  return {
    type: 'SET_POZ_MODAL_RADIO',
    pozModalRadio: pozModalRadio
  };
};

export const setTerminal = terminalNumber => {
  return {
    type: 'SET_TERMINAL_NUMBER',
    terminalNumber: terminalNumber
  };
};

export const addPozDetail = pozDetail => {
  return {
    type: 'ADD_POZ_DETAIL',
    pozDetail: pozDetail
  };
};

export const removePozDetail = () => {
  return {
    type: 'REMOVE_POZ_DETAIL'
  };
};

export const setSheba = sheba => {
  return {
    type: 'SET_SHEBA',
    sheba: sheba
  };
};

export const setFixPoz = fixPoz => {
  return {
    type: 'SET_FIXPOZ',
    fixPoz: fixPoz
  };
};

export const setPortablePoz = portablePoz => {
  return {
    type: 'SET_PORTABLEPOZ',
    portablePoz: portablePoz
  };
};

export const setSelectedRegion = selectedRegion => {
  return {
    type: 'SET_SELECTED_REGION',
    selectedRegion: selectedRegion
  };
};

// ===============================================================

export const setPartnerBirthdate = partnerBirthdate => {
  return {
    type: 'SET_PARTNER_BIRTHDATE',
    partnerBirthdate: partnerBirthdate
  };
};

export const setPartnerName = partnerName => {
  return {
    type: 'SET_PARTNER_NAME',
    partnerName: partnerName
  };
};

export const setPartnerReceiverFName = partnerReceiverFName => {
  return {
    type: 'SET_PARTNER_RECEIVER_FNAME',
    partnerReceiverFName: partnerReceiverFName
  };
};

export const setPartnerReceiverLName = partnerReceiverLName => {
  return {
    type: 'SET_PARTNER_RECEIVER_LNAME',
    partnerReceiverLName: partnerReceiverLName
  };
};

export const setPartnerNationalId = partnerNationalId => {
  return {
    type: 'SET_PARTNER_NATIONAL_ID',
    partnerNationalId: partnerNationalId
  };
};

export const setPartnerIdentificationNumber = partnerIdentification => {
  return {
    type: 'SET_PARTNER_IDENTIFICATION',
    partnerIdentification: partnerIdentification
  };
};

export const setPartnerIdFrom = partnerIdFrom => {
  return {
    type: 'SET_PARTNER_ID_FROM',
    partnerIdFrom: partnerIdFrom
  };
};

export const setPartnerFatherName = partnerFatherName => {
  return {
    type: 'SET_PARTNER_FATHER_NAME',
    partnerFatherName: partnerFatherName
  };
};

export const addPartnerDetail = () => {
  return {
    type: 'SET_PARTNER_DETAIL'
  };
};

export const setRefArray = (refArray) => {
  return {
    type: 'SET_REF_ARRAY',
    refArray: refArray
  };
};

export const setTerminalImg = (terminalImg) => {
  return {
    type: 'SET_TERMINAL_IMG',
    terminalImg: terminalImg
  };
};

export const setMarketerName = (marketerName) => {
  return {
    type: 'SET_MARKETER_NAME',
    marketerName: marketerName
  };
};
