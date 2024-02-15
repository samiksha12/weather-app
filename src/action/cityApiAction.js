import * as types from "./type";
import { deleteData, getData, getDataById, postData } from "../api";
import { DELETE_DATA, GET_DATA, POST_DATA } from "../api/url";
import { weatherApiAction } from "./weatherApiAction";

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

// export function cityApiAction(instance) {
//   return (dispatch) => {
//     setTimeout(() => {
//       instance.on("change", function (val) {
//         dispatch(cityApiSuccess(val));
//         typeof val !== undefined &&
//           typeof val === "object" &&
//           dispatch(
//             weatherApiAction(val.latitude, val.longitude, val.geonameId)
//           );
//       });
//     }, 1000);
//   };
// }
export function currentApiAction(instance) {
  return (dispatch) => {
    instance
      .currentLocation()
      .then((locationData) => {
        
        dispatch(cityApiSuccess(locationData));
        typeof locationData !== undefined &&
          typeof locationData === "object" &&
          dispatch(
            weatherApiAction(
              locationData.lat,
              locationData.lng,
              locationData.timezone,
              locationData.geonameId
            )
          );
      })
      .catch((error) => {
        console.error("Error fetching location:", error);
      });
  };
}

export function deleteCityApiAction(citydata, geoNameId, user, instance) {
  return (dispatch) => {
    dispatch(cityApiLoading());
    dispatch(cityApiDelete(geoNameId));
    if (citydata.active === true) {
      dispatch(currentApiAction(instance));
    }
    deleteData(DELETE_DATA, citydata, user)
      .then((data) => {})
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

export function getCityApiAction(user, instance) {
  return (dispatch) => {
    if (user !== null && user !== undefined && user !== "") {
      getDataById(GET_DATA, user)
        .then((data) => {
          const userData = data.data;
          if (userData.length > 0) {
            userData.forEach((item) => {
              if (item.active === true) {
                dispatch(getCustomCity(item, instance));
              }
              dispatch(cityApiLoading());
              dispatch(oldCityApiSuccess(item));
            });
          } else {
            dispatch(cityApiLoading());
            dispatch(currentApiAction(instance));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
}
export function getCustomCity(item, instance) {
  return (dispatch) => {
    if (instance) {
      const inputElement = document.querySelector(".my-input");
      if (inputElement) {
        inputElement.value = item.title;
        instance.emit("change", item);
      }
    }
  };
}
