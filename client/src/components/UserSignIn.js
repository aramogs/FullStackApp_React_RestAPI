import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import ValidationErrors from "./ValidationErrors";
import  { AuthConsumer } from './Authenticate';


//Rendering the page for user signin
class UserSignIn extends Component {
    render() {
       
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        return (
            <AuthConsumer>
                {({ isAuth, handleChange, signIn ,errors}) =>
                    isAuth ? (
                        <Redirect to={from} />
                    ) : (
                                <div className="bounds">
                                
                                    <div className="grid-33 centered signin">
                                    
                                        <h1>Sign In</h1>
                                        <ValidationErrors errors={errors}/>
                                        <div>
                                            <form onSubmit={signIn}>
                                                <div>
                                                    <input
                                                        id="emailAddress"
                                                        name="emailAddress"
                                                        type="text"
                                                        className=""
                                                        autoComplete="username"
                                                        placeholder="Email Address"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        className=""
                                                        autoComplete="current-password"
                                                        placeholder="Password"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="grid-100 pad-bottom">
                                                    <button className="button" type="submit">
                                                        Sign In
                                                    </button>
                                                    <NavLink className="button button-secondary" to="/">
                                                        Cancel
                                                    </NavLink>
                                                </div>
                                            </form>
                                        </div>
                                        <p>&nbsp;</p>
                                        <p>
                                            Don't have a user account?
                                            <NavLink to="/signup"> Click here</NavLink> to sign up!
                                        </p>
                                    </div>
                                        </div>
                    )}
            </AuthConsumer>
        );
    }
}
export default UserSignIn;