import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as userServices from "../services/user";

class Header extends Component {

    renderLink() {
        let path;
        if (userServices.isLoggedIn()) {
            path = "/admin";
        } else {
            path = "/";
        }
        return (
            <Link to={path} style={{ textDecoration: 'none' }}>
                <h1 id="header-text">
                    SkyBlogs.com
                </h1>
            </Link>
        );
    }

    render() {
        return (
            <div className="container-fluid" >
                <div id="header" className="row align-items-center">
                    <div className="col-12 d-flex justify-content-center">
                        {this.renderLink()}
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;