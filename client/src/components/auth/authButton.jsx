import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { isLoggedIn } from '../../services/user';

const AuthButton = withRouter(
    ({ history }) => {
        if (isLoggedIn()) {
            return (
                <div className="col-12">
                    <Link to="/logout">
                        <button className="btn btn-danger btn-lg btn-block">
                            Log out
                    </button>
                    </Link>
                </div>
            );
        } else {
            return (
                <div id="welcome" className="col-8 login-box d-flex justify-content-center">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <h1>
                                Welcome to SkyBlogs
                            </h1>
                        </div>
                        <div className="col-6 d-flex justify-content-center align-items-start">
                            <Link to="/signup">
                                <button type="button" className="btn btn-dark btn-lg btn-block">
                                    Sign up
                                </button>
                            </Link>
                        </div>
                        <div className="col-6 d-flex justify-content-center align-items-start">
                            <Link to="/login">
                                <button type="button" className="btn btn-dark btn-lg btn-block">
                                    Log in
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
    }
);

export default AuthButton;