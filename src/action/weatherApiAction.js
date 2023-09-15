import { getWeatherData } from "../api";
import * as types from "./type";
import { someData } from "../data";
export function weatherApiSuccess(data, geonameId) {
  return { type: types.WEATHER_API_SUCCESS, data: data, cityId: geonameId };
}

export function weatherApiAction(latitude, longitude, geonameId) {
  return (dispatch, getState) => {
    const state = getState();
    const weatherExist = state.weather.data.some(
      (item) => item.geonameId === geonameId
    );
    if (!weatherExist) {
      dispatch(weatherApiSuccess(someData, geonameId));
      // getWeatherData(latitude,longitude).then((data)=>{
      //     console.log(data);
      //     dispatch(weatherApiSuccess(data,geonameId));
      // }).catch((error)=>{
      //     console.log(error);
      // })
    }
  };
}
