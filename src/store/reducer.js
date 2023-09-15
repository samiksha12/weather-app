import { combineReducers } from "redux";
import cityApiReducer from "../reducers/cityApiReducer";
import weatherApiReducer from "../reducers/weatherApiReducer";
import degreeApiReducer from "../reducers/degreeApiReducer";

const rootReducer = combineReducers({
  city: cityApiReducer,
  weather:weatherApiReducer,
  is_celcius:degreeApiReducer
});

export default rootReducer;
