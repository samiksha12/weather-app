import React, { useEffect, useState } from "react";
import {
  changeTemperature,
  getDate,
  getDateTime,
} from "../common/Helper/helper";
import { useSelector } from "react-redux";
import Chart from "../common/Chart";

function SingleDay(props) {
  const [data, setData] = useState([]);
  const isCelcius = useSelector((state) => state.is_celcius);
  useEffect(() => {
    if (props.weather) {
      const weather = props.weather;
      weather.hourly.time.map((list, index) => {
        const formatedDate = getDateTime(weather.timezone);
        const todaysDate = getDate(formatedDate);
        const listDate = getDate(list);
        if (
          listDate.day === todaysDate.day &&
          listDate.unchangedHours >= todaysDate.unchangedHours
        ) {
          let temp = weather.hourly.temperature_2m[index];
          let icon = '\u00b0C';
          let feelsLike = weather.hourly.apparent_temperature[index];
          if (isCelcius?.is_celcius === "farenhite") {
            temp = changeTemperature(temp, "farenhite");
            feelsLike = changeTemperature(feelsLike,"farenhite");
            icon = '\u00b0F';
          }
          setData((prevData)=>[...prevData,{ time: listDate.hours + "" + listDate.suffix, temp ,feelsLike, icon }]);
        }
      });
    }
  }, [props.weather, isCelcius]);
  return (
    <div className="my-3">
      {props.weather ? (
        data.length > 0 ? (
          <div className="overflow-x-auto">{<Chart data={data}></Chart>}</div>
        ) : (
          <div>No data available for the specified conditions.</div>
        )
      ) : (
        <div className="col-11 col-md-11 m-3 p-3">
          <h1>We are facing some technical error</h1>
        </div>
      )}
    </div>
  );
}

export default SingleDay;
