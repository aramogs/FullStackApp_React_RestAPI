import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import { AuthConsumer } from "./Authenticate";

class Course extends  Component {
    render() {
        const { id, title, courseUserId } = this.props;
        return (
            <AuthConsumer>
                {({ isCourseOwner }) => (
                    <div className="bounds">
                    <div className="grid-33">
                        <NavLink
                            to={`courses/${id}`}
                            className="course--module course--link"
                            onClick={isCourseOwner(courseUserId)}
                        >
                            <h4 className="course--label">Course {id}</h4>
                            <h3 className="course--title">{title}</h3>
                        </NavLink>
                    </div>
                    </div>
                )}
            </AuthConsumer>
        );
                 }
} 
export default  React.memo(Course)