import React, { Component } from 'react';
import axios from 'axios';
import { AuthConsumer } from "./Authenticate";
import { NavLink } from "react-router-dom";
import ReactMarkDown from "react-markdown"


class CourseDetail extends Component {
    state = {};
    componentDidMount() {
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
            .then(
                res => {
                    this.setState({
                        title: res.data.course.title,
                        description: res.data.course.description,
                        materialsNeeded: res.data.course.materialsNeeded,
                        estimatedTime: res.data.course.estimatedTime,
                        userId: res.data.course.userId,
                    })
                }
            ).then(this.getUser)
    }
    getUser = () => {
        // gets users
        axios.get('http://localhost:5000/api/users/allusers')
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id === this.state.userId) {
                        this.setState({
                            name: res.data[i].firstName + ' ' + res.data[i].lastName
                        })
                    }

                }
            })
    };

    deleteCourse = e => {
        // deletes course
        e.preventDefault();
        const { emailAddress, password } = localStorage;
        const { _id } = localStorage;
        const { history } = this.props


        axios.delete(`http://localhost:5000/api/courses/${this.props.match.params.id}`, {
            auth: {
                username: emailAddress,
                password: password
            }
        },
            {
                user: _id
            })
            .then(() => {
                history.push('/');
            }).catch(err => {
                if (err.response.status === 500) {
                    history.push('/error');
                } else {
                    console.log('Error deleting data', err);
                }
            })
    };


    render() {
        return (
            // this displays the buttons + course desc and so on.
            <div>
                <AuthConsumer>
                    {({ isAuth, ownsCourse }) => (
                        <div className="actions--bar">
                            <div className="bounds">
                                <div className="grid-100">
                                    {isAuth && ownsCourse ? (
                                        <span>
                                            <NavLink to={`${this.props.match.params.id}/update`} className="button">
                                                Update Course
                                             </NavLink>
                                            <button className="button" onClick={this.deleteCourse}>
                                                Delete Course
                                            </button>
                                        </span>
                                    ) : null}
                                    <NavLink className="button button-secondary" to="/">
                                        Return to List
                                </NavLink>
                                </div>
                            </div>
                        </div>
                    )}

                </AuthConsumer>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{this.state.title}</h3>
                            <p>By {this.state.name}</p>
                        </div>
                        <ReactMarkDown className="course--description">
                            {this.state.description}


                        </ReactMarkDown>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkDown>
                                        {this.state.materialsNeeded}
                                    </ReactMarkDown>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CourseDetail