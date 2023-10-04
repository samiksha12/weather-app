import Card from "../common/Card";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { useSelector } from "react-redux";
import SeeDetails from "./SeeDetails";
import clearsky from "../common/image/clearsky.jpg";
import nightsky from "../common/image/nightsky.jpg";
import { useEffect, useState } from "react";
import { weatherCode } from "../plugin/weather";
function MainPage() {
  const citiesData = useSelector((state) => state.city);
  const weatherData = useSelector((state) => state.weather);
  const home = useSelector((state) => state.seeDetails);
  const [activeImage, setActiveImage] = useState(nightsky);
  const [activeCity, setActiveCity] = useState();
  const images = {  nightsky: nightsky ,clearsky: clearsky};
  useEffect(() => {
    const activeList = citiesData.data.filter((city) => city.active === true);
    setActiveCity(activeList);
  }, [citiesData]);
  useEffect(() => {
    let getImage = clearsky;
    if (activeCity && activeCity[0]) {
      const imageName =
        weatherCode[activeCity[0].current_weather.weathercode][
          "background-image"
        ][activeCity[0].current_weather.is_day];
      if (images[imageName]) {
        getImage = images[imageName];
      }
    }
    if (getImage !== "") {
      setActiveImage(getImage);
    } else {
      setActiveImage("");
    }
  }, [activeCity]);
  return (
    <Card className="m-2 overflow-x-hidden body-page">
      <div className="main-container">
        <div className="row">
          <div className="col-12 col-sm-4 left-sidebar">
            <LeftSidebar></LeftSidebar>
          </div>
          <div className="col-12 col-sm-8 right-panel">
            {citiesData.data.length > 0 &&
              weatherData.data.length > 0 &&
              home.seeDetails === "home" && <RightSidebar></RightSidebar>}
            {citiesData.data.length > 0 &&
              weatherData.data.length > 0 &&
              home.seeDetails === "see-detail" && <SeeDetails></SeeDetails>}
            <div
              className="background-blur"
              style={{ backgroundImage: `url(${activeImage})` }}
            ></div>
          </div>
        </div>
      </div>
    </Card>
  );
}
export default MainPage;
