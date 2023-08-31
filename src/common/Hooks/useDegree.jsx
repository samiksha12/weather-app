import React, { useEffect, useState } from "react";

function useDegree() {
  const savedDegree = localStorage.getItem("degree");
  const [degree, setDegree] = useState(savedDegree || "farenhite");
  const toggleDegree = () => {
    const newDegree = degree === "farenhite" ? "celcius" : "farenhite";
    setDegree(newDegree);
    localStorage.setItem("degree", newDegree);
  };
  return [degree, toggleDegree];
}

export default useDegree;
