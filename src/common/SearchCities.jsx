import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cityApiAction } from "../action/cityApiAction";


function SearchCities() {
  const dispatch =useDispatch();
  const citiesData = useSelector((state)=>state.city);
  useEffect(() => {
    dispatch(cityApiAction());
  },[]);
  // console.log(citiesData);
  
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
        <div className="col-1 p-0">
        <span className="">
          <i className="bi-search"></i>
        </span>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SearchCities;
