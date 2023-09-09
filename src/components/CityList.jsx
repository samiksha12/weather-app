import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteCityApiAction,
  } from "../action/cityApiAction";
import { UserContext } from '../context/UserContext';

function CityList() {
    const dispatch = useDispatch();
    const cityData = useSelector((state) => state.city);
    const { user } = useContext(UserContext);
    const handleDelete = (data,geonameId) => {
        dispatch(deleteCityApiAction(data,geonameId,user));
      };
  return (
    <>
    <ul
            className="list-group list-group-flush"
            id="list-group-city"
          >
            {cityData.data.map((list, index) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-start"
                key={index}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{list.name}</div>
                  Content for list item
                </div>
                <button
                  className="btn"
                  onClick={() => {
                    handleDelete(list,list.geonameId);
                  }}
                >
                  <span>
                    <i className="bi bi-trash"></i>
                  </span>
                </button>
              </li>
            ))}
          </ul>
    </>
  )
}

export default CityList;