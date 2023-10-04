import { airdata } from "../airdata";
import { getAirQualityIndex } from "../api";
import { AIR_QUALITY_LOADING, AIR_QUALITY_SUCCESS } from "./type";

export function airQualitySuccess(data, geonameId) {
  return { type: AIR_QUALITY_SUCCESS, data: data, cityId: geonameId };
}
export function airQualityloading(){
  return {type:AIR_QUALITY_LOADING};
}
export function airQualityApiAction(latitude,longitude,geonameId) {
  return (dispatch, getState) => {
    const state = getState();
    const airQuality = state.airQuality.data.some(
      (item) => item.geonameId === geonameId
    );
    if (!airQuality) {
        dispatch(airQualityloading);
      // dispatch(airQualitySuccess(airdata, geonameId));
      getAirQualityIndex(latitude,longitude).then((data)=>{
        dispatch(airQualitySuccess(data, geonameId));
      }).catch((error)=>{
        console.log(error);
      })
    }
  };
}
