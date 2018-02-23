import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PrivateRoute from "./auth/privateRoute";
import Header from "./header";
import Home from "./home";
import Blogs from "./blogs";
import Blog from "./blog";
import Login from "./auth/login";
import Logout from "./auth/logout";
import Signup from "./auth/signup";
import Admin from "./Admin";

class App extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <Header />
                    <Switch>

                        <Route exact path="/" component={Home} />
                        <Route exact path="/blogs/:id" component={Blog} />

                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/logout" component={Logout} />

                        <PrivateRoute exact path="/admin" component={Blogs} />
                        <PrivateRoute exact path="/admin/blogs/:id" component={Blog} />

                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default App;