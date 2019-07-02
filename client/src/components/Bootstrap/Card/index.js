import React from "react";

function Card(props) {
  return (
    <div className="card card-signin my-5">
      <div>
        <h5  className="card-title text-center">{props.heading}</h5>
      </div>
      <div className="card-body">{props.children}</div>
    </div>
  );
}

export default Card;
