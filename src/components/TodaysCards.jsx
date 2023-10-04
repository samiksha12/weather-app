import React from "react";
import Card from "../common/Card";
import MiniWeather from "./MiniWeather";
import { getDate, getDateTime, getTodaysHighlight } from "../common/Helper/helper";
import { useDispatch } from "react-redux";
import { todaysHighlightApiAction } from "../action/todaysHighlightApiAction";

function TodaysCards(props) {
  const customOuterClass = "m-3 col-3 col-md-1 clickable";
  const customClass = "col-12 col-md-12";
  const dispatch = useDispatch();
  const todaysData = props.hourlyData;
  const dailyData = props.dailyData;
  const handleClick = (time,date) => {
    const todaysHighlight = getTodaysHighlight(todaysData,dailyData,props.timezone,time,date);
    todaysHighlight && Object.keys(todaysHighlight).length > 0 && dispatch(todaysHighlightApiAction(todaysHighlight));
  };
  if (
    todaysData &&
    typeof todaysData === "object" &&
    Object.keys(todaysData).length > 0
  ) {
    return (
      <>
        <div className="d-flex flex-row overflow-x-auto">
          {todaysData &&
            todaysData.time.map((list, index) => {
              const formatedDate = getDateTime(props.timezone);
              const todaysDate = getDate(formatedDate);
              const listDate = getDate(list);
              if (
                (listDate.monthNum === todaysDate.monthNum && listDate.day === todaysDate.day) &&
                listDate.unchangedHours >= todaysDate.unchangedHours
              ) {
                return (
                  <div className={customOuterClass} key={index} onClick={()=>{handleClick(listDate.unchangedHours, listDate.day)}}>
                    <Card className={customClass}>
                      <MiniWeather
                        hours={listDate.hours}
                        suffix={listDate.suffix}
                        temp={todaysData.temperature_2m[index]}
                        weathercode={todaysData.weathercode[index]}
                        is_day={todaysData.is_day[index]}
                        now = {listDate.unchangedHours === todaysDate.unchangedHours ? true : false}
                      ></MiniWeather>
                    </Card>
                  </div>
                );
              }
              return null;
            })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>We are facing some technical error</div>
      </>
    );
  }
}

export default TodaysCards;
