import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group" >
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{
      backgroundColor: "#3fc29d",
      border: "none",
      width: "75%",
      padding: "5px",
      borderRadius: "7px",
      margin: "1%",
      color: "white",
      transition: "all .2s",
      alignSelf: "center",
      boxShadow: "0 10px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      fontFamily: "News Cycle, Arial Narrow Bold, sans-serif",
      fontWeight: 700,
      "&:hover": {
        backgroundColor: "#0A5B99"
      },
               }}
      className="loginBtn"
      >
      {props.children}
    </button>
  );
}
