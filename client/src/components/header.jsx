import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="container-fluid" >
                <div id="header" className="row align-items-center">
                    <div className="col-12 d-flex justify-content-center">
                        <Link to={"/"} style={{ textDecoration: 'none' }}>
                            <h1 id="header-text">
                                SkyBlogs.com
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;