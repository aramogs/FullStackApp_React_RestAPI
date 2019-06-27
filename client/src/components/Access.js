import React from 'react';
import {NavLink} from "react-router-dom";


const Forbidden = () => {
    return (
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>
                Oh oh! You can't access this page.
            </p>
            <NavLink to={'/'}>
                Click Here to go back!
            </NavLink>
        </div>
    );
};
export default Forbidden;