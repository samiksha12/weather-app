import Card from "../common/Card";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { useSelector } from "react-redux";
import "./main.css";
function MainPage() {
  const citiesData = useSelector((state) => state.city);
  const weatherData = useSelector((state) => state.weather);

  return (
    <Card className="m-2 overflow-x-hidden body-page">
      <div className="main-container">
        <div className="row">
          <div className="col-12 col-sm-4">
            <LeftSidebar></LeftSidebar>
          </div>
          <div className="col-12 col-sm-8 right-panel">
            {citiesData.data.length > 0 && weatherData.data.length > 0 && (
              <RightSidebar></RightSidebar>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
export default MainPage;
