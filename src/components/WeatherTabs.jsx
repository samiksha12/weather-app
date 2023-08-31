import React from 'react'
import TodaysCards from "./TodaysCards";
import WeekilyCards from "./WeekilyCards";

function WeatherTabs() {
  return (
    <div className="row mb-2">
        <nav>
          <div className="nav nav-tabs sm-border-bottom" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="today-tab"
              data-bs-toggle="tab"
              data-bs-target="#today"
              type="button"
              role="tab"
              aria-controls="today"
              aria-selected="true"
            >
              Today
            </button>
            <button
              className="nav-link"
              id="week-tab"
              data-bs-toggle="tab"
              data-bs-target="#week"
              type="button"
              role="tab"
              aria-controls="week"
              aria-selected="false"
            >
              Week
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="today"
            role="tabpanel"
            aria-labelledby="today-tab"
            tabIndex="0"
          >
            <TodaysCards></TodaysCards>
          </div>
          <div
            className="tab-pane fade"
            id="week"
            role="tabpanel"
            aria-labelledby="week-tab"
            tabIndex="0"
          >
            <WeekilyCards></WeekilyCards>
          </div>
        </div>
      </div>
  )
}

export default WeatherTabs