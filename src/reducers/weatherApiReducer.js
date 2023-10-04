import * as types from "../action/type";
const initialState = {
  data: [],
  loading: false, // Add the loading state
};

export default function weatherApiReducer(state = initialState, action) {
  switch (action.type) {
    case types.WEATHER_IS_LOADING:
      return { ...state,loading: true };
    case types.WEATHER_API_SUCCESS:
      if (action.data === null || action.data === undefined) {
        return state;
      }
      const updatedData = state.data.map((city) => {
        if (city.geonameId === action.cityId) {
          return { ...city, ...action.data }; // Merge existing city data with new data
        }
        return city;
      });
      // Check if the city is already in state.data
      const geoNameId = updatedData.some(
        (city) => city.geonameId === action.cityId
      );

      // If the city is not in state.data, add it
      if (!geoNameId) {
        updatedData.push({ ...action.data, geonameId: action.cityId });
      }
      // Return a new state object with the updated data
      return { ...state, data: updatedData ,loading:false};
    default:
      return state;
  }
}
