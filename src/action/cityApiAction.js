import * as types from "./type";
import TeleportAutocomplete from "../plugin/autocomplete";

export function cityApiError(error) {
  return { type: types.CITY_API_ERROR, data: error };
}

export function cityApiLoading() {
  return { type: types.CITY_API_LOADING };
}
export function cityApiSuccess(data) {
  return { type: types.CITY_API_SUCCESS, data: data };
}

export function cityApiAction() {
  return (dispatch) => {
    dispatch(cityApiLoading);
    setTimeout(() => {
      TeleportAutocomplete.init(".my-input").on("change", function (val) {
        dispatch(cityApiSuccess(JSON.stringify(val, null, 2)));
      });
    }, 1000);
  };
}
