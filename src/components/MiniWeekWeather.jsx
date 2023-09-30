import React from "react";
import { weatherCode } from "../plugin/weather";

function MiniWeekWeather(props) {
  let degreeIcon = <span className="degree-icon">&deg;C</span>;
  const temperature_max = isNaN(props.tempMax) ? "N/A" : Math.round(props.tempMax);
  const temperature_min = isNaN(props.tempMin) ? "N/A" : Math.round(props.tempMin);
  return (
    <div className="d-flex flex-column justify-content-center text-center">
      <div>
        {props.weekday} {props.date}
      </div>
      <div>
      <i className={`pe-2x ${weatherCode[props.weathercode]['weather-icon'][1]}`}></i>
      </div>
      <div>
        <span className="temperature">{temperature_min}</span>
        {degreeIcon} -  <span className="temperature">{temperature_max}</span>
        {degreeIcon}
      </div>
    </div>
  );
}

export default MiniWeekWeather;
// ${weatherCode[props.weathercode]['weather-icon'][props.is_day]}