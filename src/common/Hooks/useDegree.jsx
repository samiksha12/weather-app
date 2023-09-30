import React, { useEffect, useState } from "react";
import { changeTemperature } from "../Helper/helper";

function useDegree() {
  const savedDegree = localStorage.getItem("degree");
  const [degree, setDegree] = useState(savedDegree || "celcius");
  const toggleDegree = () => {
    const newDegree = degree === "celcius" ? "farenhite" : "celcius";
    setDegree(newDegree);
    const temperatureElements = document.querySelectorAll(".temperature");
      temperatureElements.forEach((element) => {
        const temp = element.innerHTML;
        if (newDegree === "celcius") {
          const updatedTemp = changeTemperature(temp, newDegree);
          element.innerHTML = updatedTemp;
        }
      });
      const degreeIconElements= document.querySelectorAll('.degree-icon');
      degreeIconElements.forEach((element)=>{
        if (newDegree === "celcius") {
          element.innerHTML = '&deg;C';
        }
      });
    localStorage.setItem("degree", newDegree);
  };
  return [degree, toggleDegree];
}

export default useDegree;

