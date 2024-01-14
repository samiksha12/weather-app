import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import {
  cityApiLoading,
  currentApiAction
} from "../action/cityApiAction";
import CityList from "./CityList";
import Icon from "../common/Icon";
import { UserContext } from "../context/UserContext";

function SearchCities() {
  const dispatch = useDispatch();
  const {instance } = useContext(UserContext);
  const cityData = useSelector((state)=> state.city);
  const handleCurrent = () => {
    dispatch(cityApiLoading());
    dispatch(currentApiAction(instance));
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
            title="Current location"
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
