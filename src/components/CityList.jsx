import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCityApiAction, getCustomCity } from "../action/cityApiAction";
import { UserContext } from "../context/UserContext";
import { getDate } from "../common/Helper/helper";
import useDegree from "../common/Hooks/useDegree";
import { weatherCode } from "../plugin/weather";

function CityList() {
  const dispatch = useDispatch();
  const cityData = useSelector((state) => state.city);
  const { user, instance } = useContext(UserContext);
  const [sortedData, setSortedData] = useState();
  let degreeIcon = <span className="degree-icon">&deg;C</span>;
  const handleDelete = (data, geonameId) => {
    dispatch(deleteCityApiAction(data, geonameId, user));
  };
  const handleClick = (data) => {
    dispatch(getCustomCity(data, instance));
  };
  useEffect(() => {
    const updatedData = cityData.data.slice().sort((a, b) => {
      if (a.active === true && b.active === false) {
        return -1;
      } else if (a.active === false && b.active === true) {
        return 1;
      } else {
        return 0;
      }
    });
    setSortedData(updatedData);
  }, [cityData]);

  return (
    <>
      <ul className="list-group list-group-flush" id="list-group-city">
        {cityData.data &&
          sortedData &&
          sortedData.map((list, index) => {
            const { year, month, day, hours, minutes, suffix } = getDate(
              list.current_weather?.time
            );
            const weatherIcon = (list.current_weather!== undefined)? weatherCode[list.current_weather?.weathercode]['weather-icon'][list.current_weather?.is_day] : "pe-is-w-sun-1";
            return (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(list);
                }}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-start link-underline link-underline-opacity-0"
                key={index}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold p-2">{list.name}</div>
                  <div className="last-update">
                    Last updated : {month} {year} {day} , {hours}:{minutes}
                    {suffix}
                  </div>
                </div>
                <span className="px-2"><i className={`pe-2x ${weatherIcon}`}></i></span>
                <span className="temperature">
                  {Math.round(list.current_weather?.temperature)}
                </span>
                {degreeIcon}
                <button
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(list, list.geonameId);
                  }}
                >
                  <span>
                    <i className="bi bi-trash"></i>
                  </span>
                </button>
              </a>
            );
          })}
      </ul>
    </>
  );
}

export default CityList;
