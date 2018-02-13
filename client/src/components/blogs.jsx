import React, { Component } from "react";
import AuthButton from "./auth/authButton";
import BlogForm from "./blogForm";
import BlogList from "./blogList";
import * as userServices from "../services/user";
import blogServices from "../services/blogs";
import "isomorphic-fetch";
import "es6-promise";

class Blogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            tags: [],
            blogtags: []
        }
    }

    componentDidMount() {
        userServices.checkLogin()
            .then(() => {
                return this.getBlogs();
            });
    }

    getBlogs() {
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

    postBlog(title, content, tags) {
        blogServices.postBlog({ title, content, tags })
            .then(() => {
                return this.getBlogs();
            }).catch((err) => {
                console.log(err);
            });
    }

    renderForm() {
        if (userServices.isLoggedIn()) {
            return <BlogForm postBlog={(title, content, tags) => { this.postBlog(title, content, tags); }} />;
        }
        else {
            return <AuthButton />;
        }
    }

    render() {
        return (
            <div className="container-fluid w-75">
                <div className="row">
                    {this.renderForm()}
                    <BlogList blogs={this.state.blogs} />
                </div>
            </div>
        );
    }

}

export default Blogs;