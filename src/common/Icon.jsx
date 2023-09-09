import React from "react";

function Icon(props) {
  return (
    <span>
      <i className={`bi bi-${props.className}`}></i>
    </span>
  );
}

export default Icon;
