import React from "react";
// import "./style.css";

// This file exports both the List and ListItem components

export function NavTab({ children }) {
    return (
        <React.Fragment>
            <ul className="nav nav-tabs">{children}</ul>
        </React.Fragment>
    );
}

export function NavItem({ children }) {
    return (
        <React.Fragment>
            <li className="nav-item">{children}</li>
        </React.Fragment>);
}