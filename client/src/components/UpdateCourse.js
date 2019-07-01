import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import ValidationErrors from "./ValidationErrors";

//Declaring state to have variables ready
class UpdateCourse extends Component {
    _isMounted = false;
    state = {
        title: null,
        description: null,
        estimatedTime: null,
        materialsNeeded: null,
        name: null,
        errors: null,
        userId: null
    };

    componentDidMount() {
        this._isMounted = true;
        this.getCourse();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

//Getting the information of the course by its id
    getCourse = () => {
        const id = this.props.match.params.id;
        const _id = parseInt(localStorage.getItem('_id'));
        const { history } = this.props;
        axios
            .get(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                if (response.data.course.userId === _id) {
                    if (this._isMounted) {
                        this.setState({
                            title: response.data.course.title,
                            description: response.data.course.description,
                            estimatedTime: response.data.course.estimatedTime,
                            materialsNeeded: response.data.course.materialsNeeded,
                            userId: response.data.course.userId
                        });
                    }
                } else {
                    history.push('/forbidden');
                }
            })
            .catch(err => {
                if (err.response.status === 500) {
                    history.push('/error');
                } else {
                    history.push('/notfound');
                    console.log('Error fetching course', err);
                }
            });
    };
//Updating the course using the api by its id
    updateCourse = e => {
        e.preventDefault();
        const { id } = this.props.match.params;
        const { _id, emailAddress, password } = localStorage;
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        axios
            .put(
                `http://localhost:5000/api/courses/${id}`,
                {
                    user: _id,
                    title: title,
                    description: description,
                    estimatedTime: estimatedTime,
                    materialsNeeded: materialsNeeded
                },
                {
                    auth: {
                        username: emailAddress,
                        password: password
                    }
                }
            )
            .then(() => {
                this.props.history.push(`/courses/${id}`);
            })
            .catch(err => {
                if (err.response.status === 400) {
                    this.setState({
                        errors: err.response.data.message
                    });
                } else {
                    console.log('Error updating course', err);
                }
            });
    };
    handleChange = e => {
        if(e.currentTarget.value === ""){
            this.setState({
                errors: [ e.currentTarget.id + ' field needs to be filled in order to continue']
            })
        } else {
            this.setState({
                [e.currentTarget.name]: e.currentTarget.value
            });
        }
    };
    render() {
        const {
            errors,
            title,
            name,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;

        return (

                    <div>
                        <hr />
                        <div className="bounds course--detail">
                        <ValidationErrors errors={errors}/>
                            <h1>Update Course</h1>
                            <div>
                                <form onSubmit={this.updateCourse}>
                                    <div className="grid-66">
                                        <div className="course--header">
                                            <h4 className="course--label">Course</h4>
                                            <div>
                                                <input
                                                    className="input-title course--title--input"
                                                    id="title"
                                                    name="title"
                                                    type="text"
                                                    placeholder="Course title..."
                                                    onChange={this.handleChange}
                                                    value={title || ''}
                                                />
                                            </div>
                                            <p>By {name}</p>
                                        </div>
                                        <div className="course--description">
                                            <div>
                        <textarea
                            id="description"
                            name="description"
                            className=""
                            placeholder="Course description..."
                            onChange={this.handleChange}
                            value={description || ''}
                        />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid-25 grid-right">
                                        <div className="course--stats">
                                            <ul className="course--stats--list">
                                                <li className="course--stats--list--item">
                                                    <h4>Estimated Time</h4>
                                                    <div>
                                                        <input
                                                            id="estimatedTime"
                                                            name="estimatedTime"
                                                            type="text"
                                                            className="course--time--input"
                                                            placeholder="Hours"
                                                            defaultValue={estimatedTime || ''}
                                                       
                                                        />
                                                    </div>
                                                </li>
                                                <li className="course--stats--list--item">
                                                    <h4>Materials Needed</h4>
                                                    <div>
                            <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                className=""
                                placeholder="List materials..."
                               
                                defaultValue={materialsNeeded || ''}
                            />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="grid-100 pad-bottom">
                                        <button className="button" type="submit">
                                            Update Course
                                        </button>
                                        <NavLink to={`/courses/${this.props.match.params.id}`} className="button button-secondary">
                                            {' '}
                                            Cancel
                                        </NavLink>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        );
    }
}

export default UpdateCourse