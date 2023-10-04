import React from 'react'
import { weatherCode } from '../plugin/weather';
import { getDate } from '../common/Helper/helper';

function CityDetail(props) {
    const weather=props.weather;
    const icon =
      weatherCode[weather.current_weather.weathercode]["weather-icon"][
        weather.current_weather.is_day
      ];
    const time = getDate(weather.current_weather.time);
  return (
    <div className="m-2 p-2 see-detail-city">
          <span className="px-1">
            <i className={`pe-lg ${icon}`}></i>
          </span>
          <span>{props.title}</span>,
          <span className="px-1">
            {time.month} {time.day}, {time.year} ,{time.hours}:{time.minutes}{" "}
            {time.suffix}
          </span>
        </div>
  )
}

export default CityDetail