import { TODAYS_HIGHLIGHT } from "../action/type";

function todaysHighlightApiReducer(state = { data: [] }, action) {
  switch (action.type) {
    case TODAYS_HIGHLIGHT:
      return { ...state, data: action.data };
    default:
      return state;
  }
}

export default todaysHighlightApiReducer;
