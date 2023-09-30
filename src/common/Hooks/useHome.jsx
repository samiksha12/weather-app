import { useState } from "react";
import { useSelector } from "react-redux";

function useHome() {
  const savedData = useSelector((state) => state.seeDetails);
  const [home, setHome] = useState(savedData.seeDetails || "home");
  const toggleHome = () => {
    const newData = home === "home" ? "see-detail" : "home";
    setHome(newData);
  };
  return [home, toggleHome];
}
export default useHome;
