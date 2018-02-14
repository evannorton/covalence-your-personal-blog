import React, { Component } from "react";
import blogServices from "../services/blogs";
import * as userServices from "../services/user";
import AuthButton from "./auth/authButton";
import BlogList from "./blogList";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            blogs: []
        }
    }

    componentDidMount() {
        blogServices.getBlogs()
            .then((blogs) => {
                this.setState({
                    blogs
                });
                return blogs;
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {
        if (userServices.isLoggedIn()) {
            window.location = "/admin";
        } else {
            return (
                <div className="container-fluid w-75">
                    <div className="row">
                        <AuthButton />
                        <BlogList blogs={this.state.blogs} />
                    </div>
                </div>
            );
        }
    }
}

export default Home;