import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getImageLink } from "../api";
import nature from "../common/image/nature.jpg";
import { getDate, getDateTime } from "../common/Helper/helper";
import Icon from "../common/Icon";

function LocationImage() {
  const cityData = useSelector((state) => state.city);
  const [activeImage, setActiveImage] = useState(nature);
  const [activeAlt, setActiveAlt] = useState("Nature Image");
  const [activeTitle, setActiveTitle] = useState();
  const [activeDate, setActiveDate] = useState();
  useEffect(() => {
    if (cityData.data.length > 0) {
      const activeList = cityData.data.filter((city) => city.active === true);
      if (activeList.length > 0) {
        if (activeList[0].imageLink) {
          getImageLink(activeList[0].imageLink)
            .then((data) => {
              const imageLink = data.photos[0].image.web;
              if (imageLink !== "") {
                setActiveImage(imageLink);
                setActiveAlt(activeList[0].title);
                setActiveTitle(activeList[0].name);
              } else {
                setActiveImage(nature);
                setActiveAlt(activeList[0].title);
                setActiveTitle(activeList[0].name);
              }
            })
            .catch((error) => error);
          const dateObject = getDateTime(activeList[0].timezone);
          const date = getDate(dateObject);
          setActiveDate(date.month + " " + date.day + ", " + date.weekday);
        } else {
          setActiveImage(nature);
          setActiveAlt(activeList[0].title);
          setActiveTitle(activeList[0].name);
          const dateObject = getDateTime(activeList[0].timezone);
          const date = getDate(dateObject);
          setActiveDate(date.month + " " + date.day + ", " + date.weekday);
        }
      }
    } else {
      setActiveImage(nature);
      setActiveAlt("");
      setActiveTitle("");
      setActiveDate("");
    }
  }, [cityData]);

  return (
    activeTitle && (
      <div className="image-div p-3 col-md-10 col-10">
        <div className="today-update text-center">
          Today: {activeTitle} <Icon className="circle-fill px-1"></Icon>Date:{" "}
          {activeDate}
        </div>
        <div className="image-container rounded">
          <img className="" src={activeImage} alt={activeAlt} />
        </div>
      </div>
    )
  );
}

export default LocationImage;
