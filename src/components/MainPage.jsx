import Card from "../common/Card";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import "./main.css";
function MainPage() {
  return (
    <Card className='m-2'>
      <div className="main-container">
        <div className="row">
          <div className="col-12 col-sm-4 left-panel">
            <LeftSidebar></LeftSidebar>
          </div>
          <div className="col-12 col-sm-8 right-panel">
            <RightSidebar></RightSidebar>
          </div>
        </div>
      </div>
    </Card>
  );
}
export default MainPage;
