import React from "react";
import useDegree from "../common/Hooks/useDegree";
import Card from "../common/Card";
import MiniWeather from "./MiniWeather";
import { getDate, getDateTime } from "../common/Helper/helper";
import MiniWeekWeather from "./MiniWeekWeather";

function WeekilyCards(props) {
  const customClass = "m-2 col-4 col-md-2";
  const weeksData = props.data;
  if (
    weeksData &&
    typeof weeksData === "object" &&
    Object.keys(weeksData).length > 0
  ) {
    return (
      <>
        <div className="d-flex flex-row overflow-x-auto">
          {weeksData &&
            weeksData.time.map((list, index) => {
              const formatedDate = getDateTime(props.timezone);
              const todaysDate = getDate(formatedDate);
              const listDate = getDate(list);
              if (listDate.day >= todaysDate.day) {
                return (
                  <Card className={customClass} key={index}>
                    <MiniWeekWeather
                      weekday={listDate.weekday}
                      date={listDate.day}
                      tempMax={weeksData.temperature_2m_max[index]}
                      tempMin={weeksData.temperature_2m_min[index]}
                      weathercode={weeksData.weathercode[index]}
                    ></MiniWeekWeather>
                  </Card>
                );
              }
            })}
        </div>
      </>
    );
  }
}

export default WeekilyCards;

// function TodaysCards(props) {
//   const customClass = "m-3 col-3 col-md-1";
//   const todaysData = props.data;
//   if (
//     todaysData &&
//     typeof todaysData === "object" &&
//     Object.keys(todaysData).length > 0
//   ) {
//     return (
//       <>
//         <div className="d-flex flex-row overflow-x-auto">
//           {todaysData &&
//             todaysData.time.map((list, index) => {
//               const result = new Date();
//               const todaysDate = getDate(result);
//               const listDate = getDate(list);
//               if (listDate.day === todaysDate.day && listDate.unchangedHours >= todaysDate.unchangedHours) {
//                 return (
//                   <Card className={customClass} key={index}>
//                     <MiniWeather hours={listDate.hours} suffix={listDate.suffix} temp={todaysData.temperature_2m[index]} weathercode={todaysData.weathercode[index]} is_day={todaysData.is_day[index]}>
//                     </MiniWeather>
//                   </Card>
//                 );
//               }

//             })}
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <div>We are facing some technical error</div>
//       </>
//     );
//   }
// }
