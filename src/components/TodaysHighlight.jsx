import React from "react";
import Card from "../common/Card";
import Icon from "../common/Icon";

function TodaysHighlight() {
  const customClass = "m-2 col-10 col-sm-3";
  return (
    <div>
      <h2>Today's Highlight</h2>
      <div className="row p-2">
        <Card className={customClass}>
          <div className="d-flex flex-column justify-content-center text-center m-3">
            <div>UV Index</div>
            <div>
              <div
                className="curve-bar"
                style={{ "--value": 5, "--fill": "#FF3D00" }}
              >
                5
              </div>
            </div>
          </div>
        </Card>
        <Card className={customClass}>
          <div className="d-flex flex-column justify-content-center text-center m-3">
            <div>Wind</div>
            <div>
              <span className="wind-value">7</span>
              <span className="wind-unit">mph</span>
            </div>
            <div>
              <Icon className="wind"></Icon>WSW
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
              <div className="px-2">6:00 AM</div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="sun-icon p-1">
              <Icon className="sunset-fill"></Icon>
              </div>
              <div className="px-2">8:00 PM</div>
            </div>
          </div>
        </Card>
        <Card className={customClass}>
          <div className="d-flex flex-column justify-content-center text-center m-3">
            <div>Humidity</div>
            <div>
              <span className="wind-value">84</span>
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
                  style={{ width: "84%" }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
        <Card className={customClass}>
          <div className="d-flex flex-column justify-content-center text-center m-3">
            <div>Visiblity</div>
            <div>
              <span className="wind-value">6.8</span>
              <span className="wind-unit">miles</span>
            </div>
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
  );
}

export default TodaysHighlight;
