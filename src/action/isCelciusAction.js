import { SET_TEMP_UNIT } from "./type";
export function isCelciusSuccess(data) {
  return { type: SET_TEMP_UNIT, data: data };
}
export function isCeciusAction(value) {
  return (dispatch) => {
    dispatch(isCelciusSuccess(value));
  };
}
