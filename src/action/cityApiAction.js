import * as types from "./type";
import TeleportAutocomplete from "../plugin/autocomplete";
import { deleteData, getData, getDataById, postData } from "../api";
import { DELETE_DATA, GET_DATA, POST_DATA } from "../api/url";

export function cityApiError(error) {
  return { type: types.CITY_API_ERROR, data: error };
}

export function cityApiLoading() {
  return { type: types.CITY_API_LOADING };
}
export function cityApiSuccess(data) {
  return { type: types.CITY_API_SUCCESS, data: data };
}
export function oldCityApiSuccess(data) {
  return { type: types.OLD_CITY_API_SUCCESS, data: data };
}
export function cityApiDelete(data) {
  return { type: types.CITY_API_DELETE, data: data };
}

export function cityApiAction() {
  return (dispatch) => {
    setTimeout(() => {
      TeleportAutocomplete.init(".my-input").on("change", function (val) {
        dispatch(cityApiSuccess(val));
      });
    }, 1000);
  };
}
export function currentApiAction() {
  return (dispatch) => {
    const instance = new TeleportAutocomplete({ el: ".my-input" });
    instance.currentLocation();
    instance.on("change", function (val) {
      dispatch(cityApiSuccess(val));
    });
  };
}

export function deleteCityApiAction(citydata, geoNameId, user) {
  return (dispatch) => {
    dispatch(cityApiDelete(geoNameId));
    deleteData(DELETE_DATA, citydata, user)
      .then((data) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function saveCityApiAction(userData, user) {
  return (dispatch) => {
    if (
      typeof userData === "object" &&
      userData !== null &&
      userData !== undefined &&
      user !== null
    ) {
      postData(POST_DATA, userData, user)
        .then((data) => {
          // console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
}

export function getCityApiAction(user) {
  return (dispatch) => {
    if (user !== null && user !== undefined && user !== "") {
      getDataById(GET_DATA, user)
        .then((data) => {
          const userData = data.data;
          if (userData) {
            userData.forEach((item) => {
              dispatch(oldCityApiSuccess(item));
              if(item.active === true){
                const instance = new TeleportAutocomplete({ el: ".my-input" ,value:item});
                instance.on("change", function (val) {
                  dispatch(cityApiSuccess(val));
                });
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
}
