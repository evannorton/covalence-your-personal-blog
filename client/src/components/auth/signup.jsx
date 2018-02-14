import React, { Component, Fragment } from 'react';
import * as userService from '../../services/user';
import { Redirect } from 'react-router-dom';
import IndeterminateProgress from '../utilities/indeterminateProgress';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: '',
            password: '',
            feedbackMessage: '',
        };
    }

    signup(e) {
        e.preventDefault();
        userService.signup(this.state.email, this.state.password)
            .then((isSuccessful) => {
                if (isSuccessful) {
                    this.setState({ redirectToReferrer: true });
                } else {
                    this.setState({ feedbackMessage: `User with email address "${this.state.email}" already exists.` });
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    handleEmailChange(value) {
        this.setState({ email: value });
    }

    handlePasswordChange(value) {
        this.setState({ password: value });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            );
        }

        return (
            <div className="container-fluid w-75">
                <form onSubmit={(e) => this.signup(e)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" className="form-control" type="email" onChange={(e) => this.handleEmailChange(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" className="form-control" type="password" onChange={(e) => this.handlePasswordChange(e.target.value)} required />
                    </div>
                    {this.state.feedbackMessage ? (
                        <p>{this.state.feedbackMessage}</p>
                    ) : null}
                    <input type="submit" value="Sign up" className="btn btn-primary" />
                </form>
            </div>
        );
    }
}

export default Login;