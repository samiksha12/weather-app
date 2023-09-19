import React, { useEffect, useState } from "react";
import TodaysCards from "./TodaysCards";
import WeekilyCards from "./WeekilyCards";
import { useSelector } from "react-redux";

function WeatherTabs() {
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
    <div className="row mb-2">
      <nav>
        <div
          className="nav nav-tabs sm-border-bottom"
          id="nav-tab"
          role="tablist"
        >
          <button
            className="nav-link active"
            id="today-tab"
            data-bs-toggle="tab"
            data-bs-target="#today"
            type="button"
            role="tab"
            aria-controls="today"
            aria-selected="true"
          >
            Today
          </button>
          <button
            className="nav-link"
            id="week-tab"
            data-bs-toggle="tab"
            data-bs-target="#week"
            type="button"
            role="tab"
            aria-controls="week"
            aria-selected="false"
          >
            Week
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active overflow-x-auto"
          id="today"
          role="tabpanel"
          aria-labelledby="today-tab"
          tabIndex="0"
        >
          {activeWeather && (activeWeather.length>0) && (<TodaysCards timezone={activeCity[0].timezone} hourlyData={activeWeather[0].hourly} dailyData={activeWeather[0].daily}></TodaysCards>)}
        </div>
        <div
          className="tab-pane fade"
          id="week"
          role="tabpanel"
          aria-labelledby="week-tab"
          tabIndex="0"
        >
          {activeWeather && (activeWeather.length>0) && (<WeekilyCards timezone={activeCity[0].timezone} hourlyData={activeWeather[0].hourly} dailyData={activeWeather[0].daily}></WeekilyCards>)}
        </div>
      </div>
    </div>
  );
}

export default WeatherTabs;
