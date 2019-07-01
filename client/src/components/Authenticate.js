import React, { Component } from 'react';
import axios from 'axios';

const Authenticate = React.createContext();


class AuthProvider extends Component {
//Declaring state to have all the variables ready
    state = {
        isAuth: false,
        _id: null,
        name: null,
        firstName: null,
        lastName: null,
        emailAddress: null,
        password: null,
        confirmPassword: null,
        errors: null,
        ownsCourse: false,
        errRest: null

    };

    componentDidMount() {
        this.updateUser();
        this.setState({
            errRest: this.errorReset()
        })
    }

    errorReset = () => {
        this.setState({
            errors : null,
        })
    };


    updateStorage = () => {
        return Object.keys(this.state).map(key => {
            return localStorage.setItem(key, this.state[key]);
        });
    };

    updateUser = () => {
        return Object.keys(this.state).map( key => {
            return this.setState({
                [key]: localStorage.getItem(key)
            })
        })
    };

    signIn = e => {
        if (e) e.preventDefault();
        this.errorReset()
        const { emailAddress, password } = this.state;
        axios.get('http://localhost:5000/api/users', {
            auth: {
                username : emailAddress,
                password : password
            }
        }).then( res => {
            this.setState({
                isAuth: true,
                _id: res.data.id,
                emailAddress : emailAddress,
                password: password,
                name: res.data.firstName + ' ' + res.data.lastName
            });
            this.updateStorage();
        }).catch( e => {
            let msg = [e.response.data.message];
            this.setState({
                errors: msg
            })
        });
    };

    signUp = e => {
        e.preventDefault();
        this.errorReset()
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;
        if(password !== confirmPassword){
            let msg = ['Passwords do not match'];
            this.setState({
                errors: msg
            })
        } else
        axios
            .post(`http://localhost:5000/api/users`, {
                firstName,
                lastName,
                emailAddress,
                password,
                confirmPassword
            })
            .then(() => {
                this.signIn();
            })
            .catch(err => {
                if (err.response.status === 400) {   
                    const errors = [err.response.data.Error]
                    this.setState({
                        errors: errors
                    });
                }else if (err.response.status === 500) {   
                    const errors = [err.response.data.Error]
                    this.setState({
                        errors: errors
                    });
                }
                 else {
                    console.log('Error signing up', err);
                }
                
            });
    };

    signOut = () => {
        this.errorReset()
        this.setState({
            isAuth: false,
            name: null,
            emailAddress: null,
            password: null
        });
        localStorage.clear()
    };

    isCourseOwner = courseId => e => {
        if(this.state._id === courseId){
            this.setState({
                ownsCourse: true
            });
        } else {
            this.setState({
                ownsCourse: false
            })
        }
    };

    handleChange = e => {
        this.errorReset()
        if(e.currentTarget.value === ''){
         this.setState({
             [e.currentTarget.name]: null
         })
        } else
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
        localStorage.setItem([e.currentTarget.name], e.currentTarget.value);
    };

    render() {
        const { _id, isAuth, name, errors, ownsCourse } = this.state;

        return (
            <Authenticate.Provider
                value={{
                    id: _id,
                    state: this.state,
                    isAuth,
                    signIn: this.signIn,
                    signUp: this.signUp,
                    signOut: this.signOut,
                    name,
                    handleChange: this.handleChange,
                    errors,
                    isCourseOwner: this.isCourseOwner,
                    ownsCourse
                }}
            >
                {this.props.children}
            </Authenticate.Provider>
        );
    }
}

const AuthConsumer = Authenticate.Consumer;

export  { AuthProvider , AuthConsumer};
