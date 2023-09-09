import { useContext, useEffect } from "react";
import MainPage from "./components/MainPage";
import { UserContext } from "./context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { currentApiAction, getCityApiAction, saveCityApiAction } from "./action/cityApiAction";
import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js'

function App() {
  
  const { user,login } = useContext(UserContext);
  const dispatch = useDispatch();
  const cityData = useSelector((state)=>state.city);
  useEffect(() => {
    //init tooltip
    Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
    .forEach(tooltipNode => new Tooltip(tooltipNode,{trigger:'hover'}))
    });
  useEffect(() => {
    try {
      login();
    } catch (error) {
      console.log("there is some error which need to be handled",error);
    }
  }, []);
  useEffect(()=>{
    dispatch(getCityApiAction(user));
  },[user]);
  useEffect(()=>{
    console.log(cityData);
    if(user !==null && cityData.data.length >0){
    // userData[user] =cityData.data;
    const userData = { [user]: cityData.data };
    dispatch(saveCityApiAction(userData,user));
    }
    if(!cityData){
      dispatch(currentApiAction());
    }
  },[cityData]);
  
  return (
    <div className="App">
      <MainPage></MainPage>
    </div>
  );
}

export default App;
