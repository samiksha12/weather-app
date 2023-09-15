import React, { useEffect, useState } from "react";
import ChangeDegree from "./ChangeDegree";
import WeatherTabs from "./WeatherTabs";
import TodaysHighlight from "./TodaysHighlight";
import { useSelector } from "react-redux";

function RightSidebar() {
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
  return (
    <div className="left-sidebar m-2 p-2">
      <ChangeDegree></ChangeDegree>
      <WeatherTabs></WeatherTabs>
      <TodaysHighlight></TodaysHighlight>
    </div>
  );
}

export default RightSidebar;
