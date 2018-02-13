import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from "./header";
import Blogs from "./blogs";
import Blog from "./blog";
import Login from "./auth/login";
import Logout from "./auth/logout";
import AuthButton from "./auth/authButton";

class App extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <AuthButton />
                    <Header />
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Route exact path="/" component={Blogs} />

                        <Route exact path="/blogs/:id" component={Blog} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default App;