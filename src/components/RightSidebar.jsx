import React from "react";
import ChangeDegree from "./ChangeDegree";
import WeatherTabs from "./WeatherTabs";
import TodaysHighlight from "./TodaysHighlight";

function RightSidebar() {
  return (
    <div className="col-11 col-md-11 m-3 p-3 right-sidebar">
      <ChangeDegree></ChangeDegree>
      <WeatherTabs></WeatherTabs>
      <TodaysHighlight></TodaysHighlight>
    </div>
  );
}

export default RightSidebar;
