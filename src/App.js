import { useContext, useEffect } from "react";
import MainPage from "./components/MainPage";
import { UserContext } from "./context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import {
  cityApiSuccess,
  getCityApiAction,
  saveCityApiAction,
} from "./action/cityApiAction";
// import Tooltip from 'bootstrap/dist/js/bootstrap.bundle';
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";
import { weatherApiAction } from "./action/weatherApiAction";
import {
  changeTemperature,
  getDailyHighlight,
  getDate,
  getDateTime,
} from "./common/Helper/helper";
import { todaysHighlightApiAction } from "./action/todaysHighlightApiAction";
import { seeDetailApiAction } from "./action/seeDetailApiAction";

function App() {
  const { user, login, instance } = useContext(UserContext);
  const dispatch = useDispatch();
  const cityData = useSelector((state) => state.city);
  const weatherData = useSelector((state) => state.weather);
  const isLoading = useSelector((state) => state.weather.loading);
  const isLoadingCity = useSelector((state) => state.city.loading);
  const isCelcius = useSelector((state) => state.is_celcius);
  // const todaysHighlightData = useSelector((state) => state.todaysHighlight);
  useEffect(() => {
    //init tooltip
    Array.from(
      document.querySelectorAll('button[data-bs-toggle="tooltip"]')
    ).forEach((tooltipNode) => new Tooltip(tooltipNode, { trigger: "hover" }));
  });
  useEffect(() => {
    try {
      login();
    } catch (error) {
      console.log("there is some error which need to be handled", error);
    }
  }, []);
  useEffect(() => {
    if (user !== null && user !== undefined && instance) {
      dispatch(getCityApiAction(user, instance));
    }
  }, [user, dispatch]);
  useEffect(() => {
    if (instance) {
      instance.on("change", function (val) {
        if (val && val.geonameId) {
          typeof val !== undefined &&
            typeof val === "object" &&
            dispatch(cityApiSuccess(val));
          typeof val !== undefined &&
            typeof val === "object" &&
            dispatch(
              weatherApiAction(
                val.latitude,
                val.longitude,
                val.timezone,
                val.geonameId
              )
            );
          dispatch(seeDetailApiAction("home"));
        }
      });
    }
  }, [dispatch, instance]);
  useEffect(() => {
    setTimeout(() => {
      const temperatureElements = document.querySelectorAll(".temperature");
      const degreeIconElements = document.querySelectorAll(".degree-icon");
      temperatureElements.forEach((element) => {
        const temp = element.innerHTML;
        if (isCelcius.is_celcius === "farenhite") {
          const updatedTemp = changeTemperature(temp, isCelcius.is_celcius);
          element.innerHTML = updatedTemp;
        }
      });
      degreeIconElements.forEach((element) => {
        if (isCelcius.is_celcius === "farenhite") {
          element.innerHTML = "&deg;F";
        }
      });
    }, 100);
  }, [isCelcius]);
  useEffect(() => {
    if (
      user !== null &&
      user !== "" &&
      cityData.data.length > 0 &&
      !isLoading
    ) {
      const updateCityData = cityData.data.map((city) => {
        if (city.active === true) {
          const weatherCurrent = weatherData.data.filter(
            (weather) => weather.geonameId === city.geonameId
          );
          if(weatherCurrent && weatherCurrent.length >0){
            city.current_weather = weatherCurrent[0].current_weather;
          }
          
          return city;
        }
        return city;
      });
      const userData = { [user]: updateCityData };
      dispatch(saveCityApiAction(userData, user));
    }
  }, [cityData, weatherData, user, isLoading]);

  useEffect(() => {
    if (cityData.data.length > 0 && weatherData.data.length > 0) {
      const activeCity = cityData.data.filter((city) => city.active === true);
      const activeWeather = weatherData.data.filter(
        (weatherItem) => weatherItem.geonameId === activeCity[0].geonameId
      );
      let todaysData = {};
      const formatedDate = getDateTime(activeCity[0].timezone);
      const todaysDate = getDate(formatedDate);
      activeCity[0] &&
        activeWeather[0] &&
        (todaysData = getDailyHighlight(
          activeWeather[0].hourly,
          activeWeather[0].daily,
          activeCity[0].timezone,
          "",
          todaysDate.day
        ));

      Object.keys(todaysData).length > 0 &&
        dispatch(todaysHighlightApiAction(todaysData));
    }
  }, [weatherData, cityData]);

  return (
    <div className="App">
      {isLoadingCity ? <div className="m-auto">Loading...</div> : <MainPage />}
    </div>
  );
}

export default App;
