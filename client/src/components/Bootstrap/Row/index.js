import React from "react";

function Row(props) {
  console.log(props.cl)
  return <div className={`row${props.fluid ? "-fluid" : ""}`}>{props.children}</div>;
}

export default Row;
