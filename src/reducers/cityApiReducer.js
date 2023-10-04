import * as types from "../action/type";
const initialState = {
  loading:false,
  data:[]
}
export default function cityApiReducer(state = initialState, action) {
  switch (action.type) {
    case types.CITY_API_LOADING:
      return { ...state, loading: true };
    case types.CITY_API_SUCCESS:
      if (action.data === undefined || action.data === null) {
        return state;
      }

      const geoNameId = state.data.some(
        (city) => city.geonameId === action.data.geonameId
      );

      const updatedData = state.data.map((city) => {
        if (city.geonameId === action.data.geonameId) {
          return { ...city, active: true };
        } else {
          return { ...city, active: false };
        }
      });

      if (!geoNameId) {
        action.data.active = true;
        updatedData.push(action.data);
      }

      return { ...state, data: updatedData , loading:false };
    case types.CITY_API_DELETE:
      return {
        ...state,
        data: state.data.filter((city) => city.geonameId !== action.data),
        loading:false
      };
    case types.CITY_API_ERROR:
      return { ...state, data: [...state.data, action.data],loading:false };
    case types.OLD_CITY_API_SUCCESS:
      if (action.data === undefined || action.data === null) {
        return state;
      }
      const geonameId = state.data.some(
        (city) => city.geonameId === action.data.geonameId
      );
      if (!geonameId) {
        return { ...state, data: [...state.data, action.data],loading:false };
      }
      return {...state,loading:false};
    default:
      return state;
  }
}
