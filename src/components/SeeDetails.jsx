import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { weatherCode } from "../plugin/weather";
import Heading from "./Heading";
import {
  getDate,
  getDateTime,
  getTodaysHighlight,
} from "../common/Helper/helper";
import SingleDay from "./SingleDay";
import CityDetail from "./CityDetail";
import DetailAccordian from "./DetailAccordian";

function SeeDetails() {
  const [activeCity, setActiveCity] = useState();
  const [activeWeather, setActiveWeather] = useState();
  const cityData = useSelector((state) => state.city);
  const weatherData = useSelector((state) => state.weather);
  const [currentHighlight, setCurrentHighlight] = useState();
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
  useEffect(() => {
    if (
      activeWeather &&
      activeWeather.length > 0 &&
      activeCity &&
      activeCity.length > 0
    ) {
      let todaysData = {};
      let sunrise = "";
      let sunset = "";
      const formatedDate = getDateTime(activeCity[0].timezone);
      const todaysDate = getDate(formatedDate);
      const current_time = getDate(activeWeather[0].current_weather.time);
      activeCity[0] &&
        activeWeather[0] &&
        (todaysData = getTodaysHighlight(
          activeWeather[0].hourly,
          activeWeather[0].daily,
          activeCity[0].timezone,
          current_time.unchangedHours,
          current_time.day
        ));
      activeWeather[0].daily.time.map((list, index) => {
        const listDate = getDate(list);
        if (listDate.day === todaysDate.day) {
          sunrise = activeWeather[0].daily.sunrise[index];
          sunset = activeWeather[0].daily.sunset[index];
        }
      });
      todaysData.sunrise = sunrise;
      todaysData.sunset = sunset;
      todaysData.currentTime = formatedDate;
      setCurrentHighlight(todaysData);
    }
  }, [activeCity, activeWeather]);
  if (
    activeWeather &&
    activeWeather.length > 0 &&
    activeCity &&
    activeCity.length > 0 &&
    currentHighlight &&
    Object.keys(currentHighlight).length > 0
  ) {
    const title =
      weatherCode[activeWeather[0].current_weather.weathercode][
        "weather-condition"
      ];
    // console.log(currentHighlight);
    return (
      <div className="col-11 col-md-11 m-3 p-3 right-sidebar">
        <Heading
          title={title}
          sunrise={currentHighlight.sunrise}
          sunset={currentHighlight.sunset}
          currentTime={currentHighlight.currentTime}
        ></Heading>
        <CityDetail
          weather={activeWeather[0]}
          title={activeCity[0].title}
        ></CityDetail>
        <SingleDay weather={activeWeather[0]}></SingleDay>
        <DetailAccordian currentHighlight={currentHighlight} weather={activeWeather[0]}></DetailAccordian>
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
