export function expand(open) {
  return {
    type: 'EXPAND-PANEL',
    open,
  };
}
export function getDialog(dialog) {
  return {
    type: 'SHOW_DIALOG',
    dialog,
  };
}
