import React, { useEffect, useState } from "react";
import {
  changeTemperature,
  getDate,
  getDateTime,
} from "../common/Helper/helper";
import { useSelector } from "react-redux";

function SingleDay(props) {
  const [data, setData] = useState();
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
          if (isCelcius?.is_celcius === "farenhite") {
            temp = changeTemperature(temp, "farenhite");
          }
          setData({ time: listDate.hours + "" + listDate.suffix, temp: temp });
        }
      });
    }
  }, [props.weather, isCelcius]);
  if (props.weather) {
    return <div>{}</div>;
  } else {
    return (
      <>
        <div className="col-11 col-md-11 m-3 p-3">
          <h1>We are facing some technical error</h1>
        </div>
      </>
    );
  }
}

export default SingleDay;
