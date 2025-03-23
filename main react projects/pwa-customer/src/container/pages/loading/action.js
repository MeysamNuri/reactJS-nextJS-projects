/*
 *
 * Login actions
 *
 */

import { DEFAULT_ACTION } from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getLoading(loading) {
  return {
    type: "SAVE_Loading",
    loading,
  };
}
