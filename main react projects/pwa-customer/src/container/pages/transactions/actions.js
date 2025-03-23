import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setTransactionDialog(transactiondialog) {
  return {
    type: "SET_TRANSACTION_DIALOG",
    transactiondialog,
  };
}
export function setTransactionDialogTick(id) {
  return {
    type: "SET_TRANSACTION_DIALOG_TICK",
    id,
  };
}
export function getCardId(id) {
  return {
    type: "SAVE_Card_Id",
    id,
  };
}

export function getSimilarDialog(similarDialog) {
  return {
    type: "SET_SIMILAR_DIALOG",
    similarDialog,
  };
}

export function getAddCardDialog(addCardDialog) {
  return {
    type: "SET_ADD_CARD_DIALOG",
    addCardDialog,
  };
}

