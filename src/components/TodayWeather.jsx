import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherCode } from "../plugin/weather";
import { getDate, predictPercipitation } from "../common/Helper/helper";
import { seeDetailApiAction } from "../action/seeDetailApiAction";
import useHome from "../common/Hooks/useHome";

function TodayWeather() {
  const [activeCity, setActiveCity] = useState();
  const [activeWeather, setActiveWeather] = useState();
  const cityData = useSelector((state) => state.city);
  const weatherData = useSelector((state) => state.weather);
  const seeDetails = useSelector((state) => state.seeDetails);
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [home, toggleHome] = useHome();
  const [temperature, setTemperature] = useState(0);
  const [probability,setProbability]=useState();
  const [prob,setProb]=useState();
  let btnName = "See Details";
  btnName = home === "home" ? "See Details" : "Back";
  useEffect(() => {
    const activeList = cityData.data.filter((city) => city.active === true);
    setActiveCity(activeList);
  }, [cityData]);
  useEffect(() => {
    if (activeCity && activeCity.length > 0) {
      const data = weatherData.data.filter(
        (weatherItem) => weatherItem.geonameId === activeCity[0].geonameId
      );
      const current_weather = data[0].current_weather;
      data[0].hourly.time.map((list, index) => {
        if (list === current_weather.time) {
          const prob = predictPercipitation(
            data[0].hourly.precipitation_probability[index],
            data[0].hourly.temperature_2m[index]
          );
          setProbability(prob);
          setProb(data[0].hourly.precipitation_probability[index])
        }
      });
      setActiveWeather(current_weather);
    }
  }, [activeCity, weatherData]);
  let degreeIcon = <span className="degree-icon">&deg;C</span>;
  useEffect(() => {
    dispatch(seeDetailApiAction(home));
  }, [dispatch, home]);

  const handleHome = () => {
    toggleHome();
    const innerHtml = componentRef.current.innerHTML;
    setTemperature(innerHtml);
  };
  useEffect(() => {
    if (activeWeather && activeWeather.temperature !== "") {
      if (seeDetails.seeDetails === "see-detail") {
        const innerHtml = componentRef.current.innerHTML;
        setTemperature(innerHtml);
      } else {
        setTemperature(Math.round(activeWeather.temperature));
      }
    }
  }, [activeWeather, temperature, seeDetails]);

  return (
    activeWeather && (
      <>
        <div className="d-flex flex-column mx-4 today-weather justify-content-center align-items-center">
          <div className="weather-icon">
            <span className="px-2">
              <i
                className={`pe-5x ${
                  weatherCode[activeWeather.weathercode]["weather-icon"][
                    activeWeather.is_day
                  ]
                }`}
              ></i>
            </span>
          </div>
          <div className="temperature-value text-center">
            <span ref={componentRef} className="temperature">
              {temperature}
            </span>
            {degreeIcon}
          </div>
          <div className="today-date">
            {getDate(activeWeather.time).weekday},{" "}
            {getDate(activeWeather.time).hours}{" "}
            {getDate(activeWeather.time).suffix}
          </div>
          <div className="align-self-end p-2">
            <button
              className="btn btn-outline-dark rounded-pill"
              onClick={handleHome}
            >
              {btnName}
            </button>
          </div>
        </div>
        <div className="col-md-12 col-12 hr-line"></div>
        <div className="d-flex flex-column m-4 p-2 justify-content-center">
          <div className="today-date">
            <span className="px-2">
              <i
                className={`pe-lg ${
                  weatherCode[activeWeather.weathercode]["weather-icon"][
                    activeWeather.is_day
                  ]
                }`}
              ></i>
            </span>
            {weatherCode[activeWeather.weathercode]["weather-condition"]}
          </div>
          <div>
            <span className="px-2">{probability} - {prob}%</span>
          </div>
        </div>
      </>
    )
  );
}

export default TodayWeather;
