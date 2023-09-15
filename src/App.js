import { useContext, useEffect } from "react";
import MainPage from "./components/MainPage";
import { UserContext } from "./context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import {
  cityApiSuccess,
  getCityApiAction,
  saveCityApiAction,
} from "./action/cityApiAction";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";
import { weatherApiAction } from "./action/weatherApiAction";
import { isCeciusAction } from "./action/isCelciusAction";
import { changeTemperature } from "./common/Helper/helper";

function App() {
  const { user, login, instance } = useContext(UserContext);
  const dispatch = useDispatch();
  const cityData = useSelector((state) => state.city);
  const weatherData = useSelector((state) => state.weather);
  const isCelcius = useSelector((state) => state.is_celcius);
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
    setTimeout(() => {
      const temperatureElements = document.querySelectorAll(".temperature");
      temperatureElements.forEach((element) => {
        const temp = element.innerHTML;
        if (isCelcius.is_celcius === "farenhite") {
          const updatedTemp = changeTemperature(temp, isCelcius.is_celcius);
          element.innerHTML = updatedTemp;
        }
      });
      const degreeIconElements= document.querySelectorAll('.degree-icon');
      degreeIconElements.forEach((element)=>{
        if (isCelcius.is_celcius === "farenhite") {
          element.innerHTML = "&deg;F";
        }
      });
    },0);
  }, [isCelcius]);
  useEffect(() => {
    if (
      user !== null &&
      user !== "" &&
      cityData.data.length > 0 &&
      weatherData.data.length > 0
    ) {
      const updateCityData = cityData.data.map((city) => {
        if (city.active === true) {
          const weatherCurrent = weatherData.data.filter(
            (weather) => weather.geonameId === city.geonameId
          );
          city.current_weather = weatherCurrent[0].current_weather;
          return city;
        }
        return city;
      });
      const userData = { [user]: updateCityData };
      dispatch(saveCityApiAction(userData, user));
    }
    // console.log(weatherData);
  }, [cityData, weatherData]);
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
              weatherApiAction(val.latitude, val.longitude, val.geonameId)
            );
        }
      });
    }
  }, [dispatch, instance]);
  return (
    <div className="App">
      <MainPage></MainPage>
    </div>
  );
}

export default App;
