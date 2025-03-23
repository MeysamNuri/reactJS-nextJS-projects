
import { DEFAULT_ACTION } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getCategoryDialog(categorydialog) {
  return {
    type: "SAVE_Dialog",
    categorydialog,
  };
}
export function getDialogTick(id) {
  return {
    type: "SAVE_Dialog_Tick",
    id,
  };
}
export function getItemsCount(count) {
  return {
    type: "SAVE_Items_Count",
    count,
  };
}

