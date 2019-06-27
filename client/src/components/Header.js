import React from 'react';
import { NavLink } from 'react-router-dom';

import { AuthConsumer } from './Authenticate';

const Header = () => {
    // this header option displays user as we go!
    return (
        <AuthConsumer>
            {({ isAuth, name, signOut }) => (
                <div className="header">
                    <div className="bounds">
                        <NavLink to="/">
                        <svg className="bookico" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M22 24h-17c-1.657 0-3-1.343-3-3v-18c0-1.657 1.343-3 3-3h17v24zm-2-4h-14.505c-1.375 0-1.375 2 0 2h14.505v-2zm0-18h-3v9l-2-1.547-2 1.547v-9h-8v16h15v-16z"/></svg>
                            <h1 className="header--logo">Courses</h1>
                        </NavLink>
                        <nav>
                            {isAuth ? (
                                <div>
                                    <NavLink className="signin" to="signin">
                                        {`Welcome, ${name}`}
                                    </NavLink>
                                    <NavLink className="signout" to="/signout" onClick={signOut}>
                                        Sign Out
                                    </NavLink>
                                </div>
                            ) : (
                                <div>
                                    <NavLink className="signin" to="../signin">
                                        Sign In
                                    </NavLink>
                                    <NavLink className="signup" to="../signup">
                                        Sign Up
                                    </NavLink>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </AuthConsumer>
    );
};

export default Header;