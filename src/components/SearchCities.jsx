import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  cityApiAction,
  currentApiAction,
  deleteCityApiAction,
} from "../action/cityApiAction";
import CityList from "./CityList";
import Icon from "../common/Icon";

function SearchCities() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cityApiAction());
  }, []);

  const handleCurrent = () => {
    dispatch(currentApiAction());
  };

  return (
    <React.Fragment>
      <div className="row mx-1 align-items-center">
        <div className="col-8">
          <input
            type="search"
            className="my-input"
            name="field"
            tabIndex="1"
            autoComplete="off"
            placeholder="Search your city"
          />
        </div>
        <div className="col-2">
          <button
            id="current-location"
            className="btn btn-outline-dark rounded-circle geolocate"
            data-bs-toggle="tooltip"
            data-bs-title="Current location"
            onClick={handleCurrent}
          >
            <Icon className="geo"></Icon>
          </button>
        </div>
        <div
          className="col-2 toggle-class"
          id="toggle-button"
          data-bs-toggle="collapse"
          data-bs-target="#cityList"
          aria-expanded="false"
          aria-controls="cityList"
        >
          <button
            id="add-location"
            className="btn btn-outline-dark rounded-circle"
            data-bs-toggle="tooltip"
            data-bs-title="Manage Locations"
            // onClick={handleCurrent}
          >
            <Icon className="sliders2-vertical"></Icon>
          </button>
        </div>
        <div className="collapse list-city-div overflow-auto shadow bg-body-tertiary rounded p-0" id="cityList">
          <CityList></CityList>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchCities;
