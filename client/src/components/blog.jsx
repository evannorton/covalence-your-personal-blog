import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import BlogTagList from "./blogTagList";
import * as userServices from "../services/user";
import blogServices from "../services/blogs";
import "isomorphic-fetch";
import "es6-promise";

class Blog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        };
    }

    componentDidMount() {
        return fetch(`/api/blogs/${this.props.match.params.id}`)
            .then((response) => {
                return response.json();
            }).then((blog) => {
                let tags = [];
                for (let i = 0; i < blog.tags.length; i++) {
                    let tag = blog.tags[i].name;
                    tags.push(tag);
                }
                tags = tags.sort();
                let tagObjs = [];
                for (let i = 0; i < tags.length; i++) {
                    let obj = {
                        name: tags[i],
                        number: i
                    };
                    tagObjs.push(obj);
                }
                this.setState({
                    id: blog.id,
                    title: blog.title,
                    content: blog.content,
                    date: blog._created,
                    tags: tagObjs
                });
                return blog;
            }).catch((err) => {
                console.log(err);
            });
    }

    deleteBlog(id) {
        blogServices.deleteBlog(id)
            .then(() => {
            }).catch((err) => {
                console.log(err);
            });
    }

    renderTools() {
        if (userServices.isLoggedIn()) {
            return (
                <div className="col-2">
                    <div className="row">

                        <div className="col-6">
                            <Link to="/admin">
                                <img
                                    onClick={() => { this.deleteBlog(this.state.id) }}
                                    className="blog-icon"
                                    src="https://image.flaticon.com/icons/png/512/61/61456.png"
                                    alt="delete" />
                            </Link>
                        </div>

                        <div className="col-6">
                            <Link to="/admin">
                                <img
                                    onClick={() => { this.deleteBlog(this.state.id) }}
                                    className="blog-icon"
                                    src="https://d30y9cdsu7xlg0.cloudfront.net/png/3823-200.png"
                                    alt="delete" />
                            </Link>
                        </div>

                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div id="blog" className="container-fluid w-75">
                <div className="row">
                    <div className="col-10">
                        <h2>{this.state.title}</h2>
                        <h5>{this.state.date}</h5>
                        <p>{this.state.content}</p>
                    </div>
                    {this.renderTools()}
                    <div className="col-12">
                        <BlogTagList tags={this.state.tags} />
                    </div>
                </div>
            </div>
        );
    }

}

export default Blog;