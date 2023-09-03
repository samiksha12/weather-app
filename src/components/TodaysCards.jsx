import React, { useEffect } from "react";
import useDegree from "../common/Hooks/useDegree";
import Card from "../common/Card";
import MiniWeather from "./MiniWeather";

function TodaysCards() {
  const [degree, toggleDegree] = useDegree();
  const customClass = "m-3 col-3 col-md-1";
  const data = [
    {
      time: "7Am",
      value: "10",
    },
    {
      time: "8Am",
      value: "11",
    },
    {
      time: "9Am",
      value: "12",
    },
    {
      time: "10Am",
      value: "13",
    },
    {
      time: "11Am",
      value: "14",
    },
    {
      time: "12Pm",
      value: "15",
    },
    {
      time: "1Pm",
      value: "18",
    },
    {
      time: "2Pm",
      value: "19",
    },
    {
      time: "3Pm",
      value: "20",
    },
  ];


  return (
    <>
    <div className="d-flex flex-row overflow-x-auto">
      {data.map((point, index) => (
        
          
            <Card className={customClass} key={index}>
              <MiniWeather time={point.time} value={point.value}></MiniWeather>
            </Card>
         
        
      ))}
      </div>
    </>
  );
}

export default TodaysCards;
