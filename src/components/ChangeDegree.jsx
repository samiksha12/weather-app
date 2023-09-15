import React, { useEffect } from "react";
import useDegree from "../common/Hooks/useDegree";
import { useDispatch } from "react-redux";
import { isCeciusAction } from "../action/isCelciusAction";

function ChangeDegree() {
  const dispatch = useDispatch();
  const [degree, toggleDegree] = useDegree();
  let degreeIcon = <span className="degree-icon">&deg;C</span>;
  useEffect(()=>{
    dispatch(isCeciusAction(degree));
  },[dispatch,degree])
  const handleClick=()=>{
    toggleDegree();
    
  }
  return (
    <div className="d-flex justify-content-end px-3">
      <div className="col-1">
        <button
          className="btn btn-outline-dark rounded-pill"
          onClick={handleClick}
        >
          {degreeIcon}
        </button>
      </div>
    </div>
  );
}

export default ChangeDegree;
