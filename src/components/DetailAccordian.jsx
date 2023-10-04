import React, { useEffect, useState } from "react";
import {
  airIndexQuality,
  airIndexQualityLabel,
  changeTemperature,
  getDate,
  getDateTime,
  getWindAbervDirection,
  getWindDirection,
} from "../common/Helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { airQualityApiAction } from "../action/airQualityApiAction";

function DetailAccordian(props) {
  const uvIndex = Math.round(props.currentHighlight.uvIndex);
  const humidity = props.currentHighlight.humidity;
  const aqi = 30;
  const isCelcius = useSelector((state) => state.is_celcius);
  const airQuality = useSelector((state) => state.airQuality);
  const isLoadingAir = useSelector((state)=> state.airQuality.loading);
  const dispatch = useDispatch();
  const weather = props.weather;
  const [temp, setTemp] = useState();
  const [tempFeels, setTempFeels] = useState();
  const [icon, setIcon] = useState();
  const [activeAirQuality, setActiveAirQuality] = useState();
  const [airQualityLabel, setAirQualityLabel] = useState();
  useEffect(() => {
    if (isCelcius && isCelcius.is_celcius === "farenhite") {
      setTempFeels(
        changeTemperature(props.currentHighlight.feelsLike, "farenhite")
      );
      setTemp(changeTemperature(props.currentHighlight.temp, "farenhite"));
      setIcon("\u00b0F");
    } else {
      setTempFeels(props.currentHighlight.feelsLike);
      setTemp(props.currentHighlight.temp);
      setIcon("\u00b0C");
    }
  }, [props, isCelcius]);
  useEffect(() => {
    if (weather && Object.keys(weather).length > 0) {
      dispatch(
        airQualityApiAction(
          weather.latitude,
          weather.longitude,
          weather.geonameId
        )
      );
    }
  }, [weather]);
  useEffect(() => {
    if (
      weather &&
      Object.keys(weather).length > 0 &&
      airQuality &&
      airQuality.data.length > 0 && !isLoadingAir
    ) {
      const data = airQuality.data.filter(
        (item) => item.geonameId === weather.geonameId
      );
      if (data.length > 0 ) {
        const formatedDate = getDateTime(weather.timezone);
        const todaysDate = getDate(formatedDate);
        data[0].hourly.time.map((list, index) => {
          const listDate = getDate(list);
          if (
            listDate.day === todaysDate.day &&
            listDate.unchangedHours === todaysDate.unchangedHours
          ) {
            const usaqi = data[0].hourly.us_aqi[index];
            const usaqi25 = data[0].hourly.us_aqi_pm2_5[index];
            const usaqi10 = data[0].hourly.us_aqi_pm10[index];
            const indexQuality = airIndexQuality(usaqi);
            const label = airIndexQualityLabel(usaqi, usaqi25, usaqi10);
            setActiveAirQuality({ ...indexQuality, usaqi });
            setAirQualityLabel(label);
          }
        });
      }
    }
  }, [weather, airQuality,isLoadingAir]);
  return (
    <div className="m-2 p-2">
      <div className="accordion accordion-flush" id="seeDetailAccordian">
        {activeAirQuality && Object.keys(activeAirQuality).length > 0 && !isLoadingAir && (
          <div className="accordion-item">
            <div
              className="accordion-button collapsed d-flex"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#airQuality"
              aria-expanded="false"
              aria-controls="airQuality"
            >
              <span className="me-auto">Air Quality Index</span>
              <span className="p-2">{activeAirQuality.usaqi}</span>
            </div>
            <div
              id="airQuality"
              className="accordion-collapse collapse"
              data-bs-parent="#seeDetailAccordian"
            >
              <div className="accordion-body">
                <div className="d-flex justify-content-center accordian-detail">
                  <div className="col-md-3 col-5 text-center">
                    <span style={{ color: activeAirQuality.color }}>
                      {activeAirQuality.quality}
                    </span>
                    <div
                      className="wind-value text-center"
                      style={{ color: activeAirQuality.color }}
                    >
                      {activeAirQuality.usaqi}
                    </div>
                    <span className="today-update">
                      Primary pollutant: {airQualityLabel}
                    </span>
                  </div>
                  <div className="col-md-9 col-12">
                    <p className="p-body p-2">
                      The Air Quality Index (AQI) is a numerical scale that
                      provides information about the quality of the air in a
                      specific location. It takes into account various
                      pollutants such as particulate matter (PM2.5 and PM10),
                      ground-level ozone, carbon monoxide, sulfur dioxide, and
                      nitrogen dioxide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="accordion-item">
          <div
            className="accordion-button collapsed d-flex"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#feelsLike"
            aria-expanded="false"
            aria-controls="feelsLike"
          >
            <span className="me-auto">Feels Like</span>
            <span className="">{tempFeels}</span>
            <span className="pe-2">{icon}</span>
          </div>
          <div
            id="feelsLike"
            className="accordion-collapse collapse"
            data-bs-parent="#seeDetailAccordian"
          >
            <div className="accordion-body">
              <p className="p-body">
                The "feels like" temperature is a vital weather indicator that
                goes beyond a simple thermometer reading. It considers factors
                like humidity, wind, and sunlight angle to provide a more
                accurate sense of what the weather actually feels like.
              </p>
              <span className="text-bg-warning p-1">
                Todays temperature - {temp}
                {icon}
              </span>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <div
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#uvIndex"
            aria-expanded="false"
            aria-controls="uvIndex"
          >
            <span className="me-auto">UV Index</span>
            <span className="p-2">{uvIndex} out of 15</span>
          </div>
          <div
            id="uvIndex"
            className="accordion-collapse collapse"
            data-bs-parent="#seeDetailAccordian"
          >
            <div className="accordion-body">
              <div className="d-flex justify-content-center accordian-detail">
                <div
                  className="curve-bar col-md-3 col-12"
                  style={{ "--value": uvIndex, "--fill": "#FF3D00" }}
                >
                  {isNaN(uvIndex) ? "N/A" : uvIndex}
                </div>
                <div className="col-md-9 col-12">
                  <p className="p-body p-2">
                    The UV (Ultraviolet) Index is a measure of the intensity of
                    ultraviolet radiation from the sun that reaches the Earth's
                    surface. The UV Index typically ranges from 0 (low) to 11+
                    (extremely high), with higher values indicating greater UV
                    intensity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <div
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#humidity"
            aria-expanded="false"
            aria-controls="humidity"
          >
            <span className="me-auto">Humidity</span>
            <span className="p-2">{humidity}%</span>
          </div>
          <div
            id="humidity"
            className="accordion-collapse collapse"
            data-bs-parent="#seeDetailAccordian"
          >
            <div className="accordion-body">
              <div className="d-flex justify-content-center accordian-detail">
                <div className="col-md-3 col-12 text-center px-2">
                  <div>
                    <span className="wind-value">
                      {isNaN(humidity) ? "N/A" : humidity}
                    </span>
                    <span className="wind-unit">%</span>
                  </div>
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
                <div className="col-md-9 col-12 ">
                  <p className="p-body p-2">
                    Humidity is a measure of the amount of moisture present in
                    the air. It indicates how saturated the air is with water
                    vapor. High humidity means the air contains a significant
                    amount of moisture, while low humidity indicates drier
                    conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <div
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#wind"
            aria-expanded="false"
            aria-controls="wind"
          >
            <span className="me-auto">Wind</span>
            <span className="p-2">
              {Math.round(props.currentHighlight.windSpeed)}km/hr{" "}
              {getWindAbervDirection(props.currentHighlight.winddirection)}
            </span>
          </div>
          <div
            id="wind"
            className="accordion-collapse collapse"
            data-bs-parent="#seeDetailAccordian"
          >
            <div className="accordion-body">
              <p className="p-body">
                Wind is the movement of air from one place to another. It is
                caused by differences in air pressure and is a fundamental
                component of weather. Wind direction is the compass direction
                from which the wind is blowing. It's typically expressed in
                cardinal directions like north, south, east, and west.
              </p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <div
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#rainAmount"
            aria-expanded="false"
            aria-controls="rainAmount"
          >
            <span className="me-auto">Rain</span>
            <span className="p-2">
              {props.currentHighlight.predict}-{props.currentHighlight.prob}%
            </span>
          </div>
          <div
            id="rainAmount"
            className="accordion-collapse collapse"
            data-bs-parent="#seeDetailAccordian"
          >
            <div className="accordion-body">
              <p className="p-body">
                Precipitation probability is a numerical estimate of the
                likelihood that an area will experience rain, snow, or other
                forms of precipitation during a specified time period. It is
                typically expressed as a percentage, where a higher probability
                indicates a greater chance of precipitation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailAccordian;
