import React from 'react';

import './app.css';
import Courses from "./components/Courses";
import { Route, Switch, Redirect } from 'react-router-dom';
import CourseDetail from './components/Course2'
import { AuthProvider } from "./components/Authenticate";
import Header from "./components/Header";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import PrivateRoute from "./components/PrivateRoute"
import Forbidden from "./components/Access";
import UnhandledError from "./components/Error"
import NotFound from './components/404'

function App() {
  return (
    <div>

      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses/:id" component={CourseDetail} />
          <PrivateRoute exact path="/courses/create" component={CreateCourse} />
          <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
          <Route exact path="/signin" component={UserSignIn} />
          <Route exact path="/signup" component={UserSignUp} />
          <Route exact path="/signout" component={UserSignOut} />
          <Route exact path="/forbidden" component={Forbidden} />
          <Route exact path="/notfound" component={NotFound} />
          <Route exact path="/error" component={UnhandledError} />
          <Route render={() => <Redirect to="/notfound" />} />
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
