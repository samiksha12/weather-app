import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { weatherCode } from "../plugin/weather";
import Heading from "./Heading";
import { getDate } from "../common/Helper/helper";
import SingleDay from "./SingleDay";

function SeeDetails() {
  const [activeCity, setActiveCity] = useState();
  const [activeWeather, setActiveWeather] = useState();
  const cityData = useSelector((state) => state.city);
  const weatherData = useSelector((state) => state.weather);
  useEffect(() => {
    const activeList = cityData.data.filter((city) => city.active === true);
    setActiveCity(activeList);
  }, [cityData]);
  useEffect(() => {
    if (activeCity && activeCity.length > 0) {
      const data = weatherData.data.filter(
        (weatherItem) => weatherItem.geonameId === activeCity[0].geonameId
      );
      setActiveWeather(data);
    }
  }, [activeCity, weatherData]);

  if (
    activeWeather &&
    activeWeather.length > 0 &&
    activeCity &&
    activeCity.length > 0
  ) {
    const title =
      weatherCode[activeWeather[0].current_weather.weathercode][
        "weather-condition"
      ];
    const icon =
      weatherCode[activeWeather[0].current_weather.weathercode]["weather-icon"][
        activeWeather[0].current_weather.is_day
      ];
    const time = getDate(activeCity[0].current_weather.time);
    return (
      <div className="col-11 col-md-11 m-3 p-3 right-sidebar">
        <Heading title={title}></Heading>
        <div className="m-2 p-2 see-detail-city">
          <span className="px-1">
            <i className={`pe-lg ${icon}`}></i>
          </span>
          <span className="px-1">{activeCity[0].title}</span>,
          <span className="px-1">
            {time.month} {time.day}, {time.year} ,{time.hours}:{time.minutes}{" "}
            {time.suffix}
          </span>
        </div>
        <SingleDay weather={activeWeather[0]}></SingleDay>
      </div>
    );
  } else {
    return (
      <>
        <div className="col-11 col-md-11 m-3 p-3 right-sidebar">
          <h1>We are facing some technical error</h1>
        </div>
      </>
    );
  }
}

export default SeeDetails;
