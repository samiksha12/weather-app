import React, { useEffect, useState } from "react";
import ChangeDegree from "./ChangeDegree";
import WeatherTabs from "./WeatherTabs";
import TodaysHighlight from "./TodaysHighlight";
import { useSelector } from "react-redux";

function RightSidebar() {
  return (
    <div className="m-2 p-2">
      <ChangeDegree></ChangeDegree>
      <WeatherTabs></WeatherTabs>
      <TodaysHighlight></TodaysHighlight>
    </div>
  );
}

export default RightSidebar;
