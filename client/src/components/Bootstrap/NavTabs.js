import React from "react";
import { Link } from "react-router-dom";

function NavTabs() {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link to="/signin" className={window.location.pathname === "/signin" ? "nav-link active" : "nav-link"}>
                    Login
        </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/signup"
                    className={window.location.pathname === "/signup" ? "nav-link active" : "nav-link"}
                >
                    Sign Up
        </Link>
            </li>
        </ul>
    );
}

export default NavTabs;
