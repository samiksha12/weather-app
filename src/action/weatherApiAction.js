import { getWeatherData } from "../api";
import * as types from "./type";
import { someData } from "../data";
export function weatherApiSuccess(data, geonameId) {
  return { type: types.WEATHER_API_SUCCESS, data: data, cityId: geonameId };
}

export function weatherApiAction(latitude, longitude, timezone, geonameId) {
  return (dispatch, getState) => {
    const state = getState();
    const weatherExist = state.weather.data.some(
      (item) => item.geonameId === geonameId
    );
    const parts = timezone.split("/");
    const encodedParts = parts.map(encodeURIComponent);
    const encodedTimezone = encodedParts.join("%2F");
    // console.log(encodedTimezone);
    if (!weatherExist) {
      // dispatch(weatherApiSuccess(someData, geonameId));
      getWeatherData(latitude, longitude, encodedTimezone)
        .then((data) => {
          // console.log(data);
          dispatch(weatherApiSuccess(data, geonameId));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
}
