import React from 'react';
import {NavLink} from "react-router-dom";

//If the page used is not in the current routes this gets executed
const NotFound = () => {
    return (
        <div className="bounds"> 
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            <NavLink to={'/'}> Click Here to go back!</NavLink>
        </div>
    );
};

export default NotFound;