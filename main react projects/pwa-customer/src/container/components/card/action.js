import { DEFAULT_ACTION } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getDeleteDialog(deleteDialog) {
  return {
    type: "SAVE_DELETE_DIALOG",
    deleteDialog,
  };
}
export function getVerifyCardDialog(verifyCardDialog) {
  return {
    type: "SAVE_VERIFY_CARD_DIALOG",
    verifyCardDialog,
  };
}

export function setCardId(cardId) {
  return {
    type: "SAVE_CARD_ID",
    cardId,
  };
}

export const setPopUpDialogShow = (showPopUp) => {
  return {
    type: "SET_SHOW_POP_UP",
    showPopUp,
  };
};

export const setCardList = (cardList) => {
  return {
    type: "SET_CARD_LIST",
    cardList,
  };
};
export const setShowTimer = (showTimer) => {
  return {
    type: "SET_SHOW_TIMER",
    showTimer,
  };
};
export const setMin = (min) => {
  return {
    type: "SET_MIN",
    min,
  };
};
export const setSec = (sec) => {
  return {
    type: "SET_SEC",
    sec,
  };
};

export const setActiveCardDialog = (activeCard) => {
  return {
    type: "SET_ACTIVE_CARD_DIALOG",
    activeCard,
  };
};

export const setActiveCard= (activeCardEnable) => {
  return {
    type: "SET_ACTIVE_CARD",
    activeCardEnable,
  };
};
// export const setShowTimer = (cardList) => {
//   return dispatch => {
//     return new Promise((resolve, reject) => {
//       dispatch({
//         type: "SET_CARD_LIST",
//         cardList,
//       });
//       resolve()
//     });
//   }
// }
