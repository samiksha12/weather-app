import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCityApiAction, getCustomCity } from "../action/cityApiAction";
import { UserContext } from "../context/UserContext";

function CityList() {
  const dispatch = useDispatch();
  const cityData = useSelector((state) => state.city);
  const { user } = useContext(UserContext);
  const handleDelete = (data, geonameId) => {
    dispatch(deleteCityApiAction(data, geonameId, user));
  };
  const handleClick = (data) => {
    dispatch(getCustomCity(data));
  };
  const sortedData = cityData.data.slice().sort((a, b) => {
    if (a.active === true && b.active === false) {
      return -1;
    } else if (a.active === false && b.active === true) {
      return 1;
    } else {
      return 0;
    }
  });
  return (
    <>
      <ul className="list-group list-group-flush" id="list-group-city">
        {cityData.data &&
          sortedData.map((list, index) => (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick(list);
              }}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-start link-underline link-underline-opacity-0"
              key={index}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{list.name}</div>
                Content for list item
              </div>
              <button
                className="btn"
                onClick={() => {
                  handleDelete(list, list.geonameId);
                }}
              >
                <span>
                  <i className="bi bi-trash"></i>
                </span>
              </button>
            </a>
          ))}
      </ul>
    </>
  );
}

export default CityList;
