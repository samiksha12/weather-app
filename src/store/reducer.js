import { combineReducers } from "redux";
import cityApiReducer from "../reducers/cityApiReducer";
import weatherApiReducer from "../reducers/weatherApiReducer";
import degreeApiReducer from "../reducers/degreeApiReducer";
import todaysHighlightApiReducer from "../reducers/todaysHighlightApiReducer";
import seeDetailsApiReducer from "../reducers/seeDetailsApiReducer";

const rootReducer = combineReducers({
  city: cityApiReducer,
  weather:weatherApiReducer,
  is_celcius:degreeApiReducer,
  todaysHighlight: todaysHighlightApiReducer,
  seeDetails: seeDetailsApiReducer
});

export default rootReducer;
