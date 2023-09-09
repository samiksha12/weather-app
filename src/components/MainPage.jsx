import Card from "../common/Card";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { useSelector } from "react-redux";
import "./main.css";
function MainPage() {
  const citiesData = useSelector((state) => state.city);
  let className = (citiesData) ? 'left-panel' :'';

  return (
    <Card className="m-2 overflow-x-hidden body-page">
      <div className="main-container">
        <div className="row">
          <div className={`col-12 col-sm-4 ${className}`}>
            <LeftSidebar></LeftSidebar>
          </div>
          <div className="col-12 col-sm-8 right-panel">
            {citiesData && <RightSidebar></RightSidebar>}
          </div>
        </div>
      </div>
    </Card>
  );
}
export default MainPage;
