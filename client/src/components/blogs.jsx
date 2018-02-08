import React, { Component } from "react";
import BlogForm from "./blogForm";
import BlogList from "./blogList";
import "isomorphic-fetch";
import "es6-promise";

class Blogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            tags: []
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
        }).then((blogs) => {
            this.postTags(tags, blogs);
        }).catch((err) => {
            console.log(err);
        });
    }

    getTags() {
        return fetch("/api/tags/")
            .then((response) => {
                return response.json();
            }).then((tags) => {
                console.log(tags);
                this.setState({
                    tags
                });
                return tags;
            }).catch((err) => {
                console.log(err);
            });
    }

    postTags(tags, blogs) {
        tags = tags.split(";");
        for (let i = 0; i < tags.length; i++) {
            fetch("/api/tags/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: tags[i]
                })
            }).then(() => {
                    console.log("Tag posted!");
                    return this.getTags();
                }).then(() => {
                    this.postBlogTags(tags, blogs);
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div className="container-fluid w-75">
                <div className="row">
                    <BlogForm postBlog={(title, content, tags) => { this.postBlog(title, content, tags); }} />
                    <BlogList blogs={this.state.blogs} />
                </div>
            </div>
        );
    }

}

export default Blogs;