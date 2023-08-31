import React from 'react'
import useDegree from "../common/Hooks/useDegree";
import Card from "../common/Card";
import MiniWeather from "./MiniWeather";

function WeekilyCards() {
  const [degree, toggleDegree] = useDegree();
  const customClass = "m-3 col-3 col-md-1";
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
    </div>
  );
}

export default WeekilyCards