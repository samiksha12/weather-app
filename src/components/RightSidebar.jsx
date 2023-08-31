import React from "react";
import ChangeDegree from "./ChangeDegree";
import WeatherTabs from "./WeatherTabs";
import TodaysHighlight from "./TodaysHighlight";

function RightSidebar() {
  return (
    <div className="left-sidebar m-2 p-2">
      <ChangeDegree></ChangeDegree>
      <WeatherTabs></WeatherTabs>
      <TodaysHighlight></TodaysHighlight>
    </div>
  );
}

export default RightSidebar;
