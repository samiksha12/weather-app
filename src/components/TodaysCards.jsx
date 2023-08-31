import React from "react";
import useDegree from "../common/Hooks/useDegree";
import Card from "../common/Card";
import MiniWeather from "./MiniWeather";

function TodaysCards() {
  const [degree, toggleDegree] = useDegree();
  const customClass = "m-2 col-3 col-md-1";
  return (
    <div className="d-flex flex-row overflow-x-auto">
      <Card className={customClass}>
        <MiniWeather></MiniWeather>
      </Card>
      <Card className={customClass}>
        <MiniWeather></MiniWeather>
      </Card>
      <Card className={customClass}>
        <MiniWeather></MiniWeather>
      </Card>
      <Card className={customClass}>
        <MiniWeather></MiniWeather>
      </Card>
      <Card className={customClass}>
        <MiniWeather></MiniWeather>
      </Card>
      <Card className={customClass}>
        <MiniWeather></MiniWeather>
      </Card>
      <Card className={customClass}>
        <MiniWeather></MiniWeather>
      </Card>
      <Card className={customClass}>
        <MiniWeather></MiniWeather>
      </Card>
    </div>
  );
}

export default TodaysCards;
