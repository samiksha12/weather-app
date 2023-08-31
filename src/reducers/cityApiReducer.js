import * as types from "../action/type";

export default function cityApiReducer(state = {}, action) {
  switch (action.type) {
    case types.CITY_API_LOADING:
      return { loading: true };
    case types.CITY_API_SUCCESS:
      return action.data ? action.data : state;
    case types.CITY_API_ERROR:
      return action.data ? action.data : state;
    default:
      return state;
  }
}
