import { AIR_QUALITY_LOADING, AIR_QUALITY_SUCCESS } from "../action/type";
const initialState = {
  loading: false,
  data: [],
};
function airQualityApiReducer(state = initialState, action) {
  switch (action.type) {
    case AIR_QUALITY_LOADING:
      return { ...state, loading: true };
    case AIR_QUALITY_SUCCESS:
      if (action.data === null || action.data === undefined) {
        return state;
      }
      const updatedData = state.data.map((city) => {
        if (city.geonameId === action.cityId) {
          return { ...city, ...action.data }; // Merge existing city data with new data
        }
        return city;
      });
      const geoNameId = updatedData.some(
        (city) => city.geonameId === action.cityId
      );
      if (!geoNameId) {
        updatedData.push({ ...action.data, geonameId: action.cityId });
      }
      return { ...state, data: updatedData, loading: false };
    default:
      return state;
  }
}
export default airQualityApiReducer;
