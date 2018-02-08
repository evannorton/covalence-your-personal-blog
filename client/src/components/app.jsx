import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from "./header";
import Blogs from "./blogs";
import Blog from "./blog";

class App extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Blogs} />
                        <Route exact path="/blogs/:id" component={Blog} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default App;