import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cityApiAction } from "../action/cityApiAction";
import TeleportAutocomplete from "../plugin/autocomplete";

function SearchCities() {
  const dispatch = useDispatch();
  const citiesData = useSelector((state) => state.city);
  let instance;
  useEffect(() => {
    dispatch(cityApiAction());
    instance = new TeleportAutocomplete({ el: ".my-input", maxItems: 5 });
  }, [dispatch]);
  const handleCurrent = () => {
    instance.currentLocation();
  };
  return (
    <React.Fragment>
      <div className="row mx-3 align-items-center">
        <div className="col-11">
          <input
            type="search"
            className="my-input"
            name="field"
            tabIndex="1"
            autoComplete="off"
            placeholder="Search your city"
          />
        </div>
        <div className="col-1">
          <button
            id="current-location"
            className="btn btn-outline-dark rounded-pill"
            title="Current Location"
            onClick={handleCurrent}
          >
            <span>
              <i className="bi bi-geo"></i>
            </span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchCities;
