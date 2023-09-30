import { SEE_DETAILS } from "../action/type";

function seeDetailsApiReducer(state = { seeDetails:"home" }, action) {
  switch (action.type) {
    case SEE_DETAILS:
      return { ...state, seeDetails: action.data };
    default:
      return state;
  }
}
export default seeDetailsApiReducer;
