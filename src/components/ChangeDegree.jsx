import React from "react";
import useDegree from "../common/Hooks/useDegree";

function ChangeDegree() {
  const [degree, toggleDegree] = useDegree();
  let degreeIcon = <span>&deg;F</span>;
  if (degree === "celcius") {
    degreeIcon = <span>&deg;C</span>;
  }
  if (degree === "farenhite") {
    degreeIcon = <span>&deg;F</span>;
  }
  return (
    <div className="d-flex justify-content-end px-3">
      <div className="col-1">
        <button
          className="btn btn-outline-dark rounded-pill"
          onClick={toggleDegree}
        >
          {degreeIcon}
        </button>
      </div>
    </div>
  );
}

export default ChangeDegree;
