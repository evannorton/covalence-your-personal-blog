import React, { Component } from "react";
import BlogForm from "./blogForm";
import BlogList from "./blogList";
import "isomorphic-fetch";
import "es6-promise";

class Blogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogs: []
        }
    }

    componentDidMount() {
        this.getBlogs();
    }

    getBlogs() {
        return fetch("/api/blogs/")
            .then((response) => {
                return response.json();
            }).then((blogs) => {
                console.log(blogs);
                this.setState({
                    blogs
                });
                return blogs;
            }).catch((err) => {
                console.log(err);
            });
    }

    postBlog(title, content, tags) {
        fetch("/api/blogs/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                content
            })
        }).then(() => {
            console.log("Blog posted!")
            return this.getBlogs();
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="container-fluid w-75">
                <div className="row">
                    <BlogForm postBlog={(title, content) => { this.postBlog(title, content); }} />
                    <BlogList blogs={this.state.blogs} />
                </div>
            </div>
        );
    }

}

export default Blogs;