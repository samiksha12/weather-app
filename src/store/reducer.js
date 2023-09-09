import { combineReducers } from "redux";
import cityApiReducer from "../reducers/cityApiReducer";

const rootReducer = combineReducers({
  city: cityApiReducer
});

export default rootReducer;
