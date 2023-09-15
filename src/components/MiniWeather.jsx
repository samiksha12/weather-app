import React from "react";
import { weatherCode } from "../plugin/weather";

function MiniWeather(props) {
  let degreeIcon = <span className="degree-icon">&deg;C</span>;
  const temperature = isNaN(props.temp) ? "N/A" : Math.round(props.temp);
  return (
    <div className="d-flex flex-column justify-content-center text-center">
      <div>
        {props.hours} {props.suffix}
      </div>
      <div>
      <i className={`pe-2x ${weatherCode[props.weathercode]['weather-icon'][props.is_day]}`}></i>
      </div>
      <div>
        <span className="temperature">{temperature}</span>
        {degreeIcon}
      </div>
    </div>
  );
}

export default MiniWeather;
// ${weatherCode[props.weathercode]['weather-icon'][props.is_day]}