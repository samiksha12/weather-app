import React, { useEffect } from "react";
import Card from "../common/Card";
import Icon from "../common/Icon";
import { useSelector } from "react-redux";
import { getDate, getWindDirection } from "../common/Helper/helper";

function TodaysHighlight() {
  const customClass = "m-2 col-10 col-sm-3";
  let title = "Today's Highlight";
  const todaysHighlightData = useSelector((state) => state.todaysHighlight);
  let uvIndex = 0;
  let sunrise = "";
  let sunset = "";
  let humidity = 0;
  let visibility = 0;
  let visibilityMiles = 0;
  let windSpeed =0;
  let winddirection="";
  if (Object.keys(todaysHighlightData).length > 0) {
    uvIndex = Math.round(todaysHighlightData.data.uvIndex);
    const date = getDate(todaysHighlightData.data.sunrise);
    sunrise = date.hours + " : " + date.minutes + " " + date.suffix;
    const date1 = getDate(todaysHighlightData.data.sunset);
    sunset = date1.hours + " : " + date1.minutes + " " + date1.suffix;
    humidity = todaysHighlightData.data.humidity;
    windSpeed= Math.round(todaysHighlightData.data.windSpeed);
    winddirection = getWindDirection(todaysHighlightData.data.winddirection);
    visibility = parseFloat(todaysHighlightData.data.visibility);
    if (!isNaN(visibility)) {
      visibilityMiles = Math.round(visibility * 0.000621371);
    } else {
      visibilityMiles = "N/A"; // Set a default value if visibility is not a valid number
    }
    title = (todaysHighlightData.data.weatherDate) ? todaysHighlightData.data.weatherDate : todaysHighlightData.data.weatherTime;
    title += " Highlight"
  }

  return (
    Object.keys(todaysHighlightData).length > 0 && (
      <div>
        <h2>{title}</h2>
        <div className="row p-2">
          <Card className={customClass}>
            <div className="d-flex flex-column justify-content-center text-center m-3">
              <div>UV Index</div>
              <div>
                <div
                  className="curve-bar"
                  style={{ "--value": uvIndex, "--fill": "#FF3D00" }}
                >
                  {isNaN(uvIndex) ? "N/A" : uvIndex}
                </div>
              </div>
            </div>
          </Card>
          <Card className={customClass}>
            <div className="d-flex flex-column justify-content-center text-center m-3">
              <div>Wind</div>
              <div>
                <span className="wind-value">
                {isNaN(windSpeed) ? "N/A" :windSpeed}
                </span>
                <span className="wind-unit">km/h</span>
              </div>
              <div>
                <Icon className="wind"></Icon>
                <span className="last-update px-1">
                {winddirection}
                </span>
              </div>
            </div>
          </Card>
          <Card className={customClass}>
            <div className="d-flex flex-column justify-content-center text-center m-3">
              <div>Sunrise & Sunset</div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="sun-icon p-1">
                  <Icon className="sunrise-fill"></Icon>
                </div>
                <div className="px-2">{ sunrise}</div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div className="sun-icon p-1">
                  <Icon className="sunset-fill"></Icon>
                </div>
                <div className="px-2">{ sunset}</div>
              </div>
            </div>
          </Card>
          <Card className={customClass}>
            <div className="d-flex flex-column justify-content-center text-center m-3">
              <div>Humidity</div>
              <div>
                <span className="wind-value">{isNaN(humidity) ? "N/A" : humidity}</span>
                <span className="wind-unit">%</span>
              </div>
              <div>
                <div className="d-flex flex-row justify-content-between align-items-end">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>

                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Warning example"
                  aria-valuenow="84"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ height: 5 + "px" }}
                >
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: `${humidity}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>
          <Card className={customClass}>
            <div className="d-flex flex-column justify-content-center text-center m-3">
              <div>Visiblity</div>
              <div>
                <span className="wind-value">{visibilityMiles}</span>
                <span className="wind-unit">miles</span>
              </div>
              <span className="last-update">{visibility} meters</span>
            </div>
          </Card>
          <Card className={customClass}>
            <div className="d-flex flex-column justify-content-center text-center m-3">
              <div>Air Pressure</div>
              <div>
                <span className="wind-value">998</span>
                <span className="wind-unit">mb</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  );
}

export default TodaysHighlight;
