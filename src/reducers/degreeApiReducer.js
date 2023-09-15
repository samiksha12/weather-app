import { SET_TEMP_UNIT } from "../action/type";

function degreeApiReducer(state = { is_celcius: "celcius" }, action) {
  switch (action.type) {
    case SET_TEMP_UNIT:
      return { ...state, is_celcius: action.data };
    default:
      return state;
  }
}
export default degreeApiReducer;
