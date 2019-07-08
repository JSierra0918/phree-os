import React from "react";
// import "./style.css";

// This file exports both the List and ListItem components

export function NavTab(props) {
    return (
        <React.Fragment>
            <ul className={`nav ${props.extraClass}`} >{props.children}</ul>
        </React.Fragment>
    );
}

export function NavItem(props) {
    return (
        <React.Fragment>
            <li className={`nav-item ${props.extraClass}`}>{props.children}</li>
        </React.Fragment>);
}