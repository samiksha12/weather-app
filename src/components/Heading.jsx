import React, { useEffect, useRef, useState } from "react";
import { getDate } from "../common/Helper/helper";

function Heading(props) {
  const iconRef = useRef();
  const sunrise = getDate(props.sunrise);
  const sunset = getDate(props.sunset);
  const currentT = getDate(props.currentTime);
  const [sunsetTime, setSunsetTime] = useState();
  const [sunriseTime, setSunriseTime] = useState();
  const [currentTime, setCurrentTime] = useState();
  useEffect(() => {
    setSunriseTime(sunrise);
    setSunsetTime(sunset);
    setCurrentTime(currentT);
  }, [props.sunrise, props.sunset, props.currentTime]);
  useEffect(() => {
    if (iconRef.current) {
      const sunIcon = iconRef.current;
      if (
        currentT.unchangedHours <
        parseFloat(`${sunrise.unchangedHours}.${sunrise.minutes}`)
      ) {
        sunIcon.style.transform = `rotate(180deg) translate(45px)`;
      } else if (
        currentT.unchangedHours >
        parseFloat(`${sunset.unchangedHours}.${sunset.minutes}`)
      ) {
        sunIcon.style.transform = `rotate(0deg) translate(45px)`;
      } else {
        const totalDuration =
          parseFloat(`${sunset.unchangedHours}.${sunset.minutes}`) -
          parseFloat(`${sunrise.unchangedHours}.${sunrise.minutes}`);
        const elapsedDuration =
        parseFloat(`${currentT.unchangedHours}.${currentT.minutes}`)
           -
          parseFloat(`${sunrise.unchangedHours}.${sunrise.minutes}`);
        const positionPercentage = elapsedDuration / totalDuration;
        const degree = 180 - positionPercentage * 180;
        sunIcon.style.transform = `rotate(-${degree}deg) translate(45px)`;
      }
    }
  }, [iconRef, sunrise, currentT]);

  return (
    sunriseTime &&
    sunsetTime &&
    currentTime && (
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="m-2 p-2 heading">{props.title}</span>
        <div className="d-flex flex-column align-items-center sun-dial-outerdiv">
          <div className="sun-dial">
            <i ref={iconRef} className="pe-is-w-sun-1 sun-icon1 p-1"></i>
          </div>
          <div className="d-flex flex-row justify-content-between sun-dial-time my-2">
            <span>
              {sunriseTime.hours}:{sunriseTime.minutes} {sunriseTime.suffix}
            </span>
            <span>
              {sunsetTime.hours}:{sunsetTime.minutes} {sunsetTime.suffix}
            </span>
          </div>
        </div>
      </div>
    )
  );
}

export default Heading;
