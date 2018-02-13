import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { isLoggedIn } from '../../services/user';

const AuthButton = withRouter(
    ({ history }) => {
        if (isLoggedIn()) {
            return (
                <div className="col-8">
                    <Link to="/logout">
                        <button className="btn btn-primary">
                            Log out
                    </button>
                    </Link>
                </div>
            );
        } else {
            return (
                <div className="col-8 login-box d-flex justify-content-center">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <h1>
                                Log in to SkyBlogs.com
                            </h1>
                        </div>
                        <div className="col-12 d-flex justify-content-center align-items-center">
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