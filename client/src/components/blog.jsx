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

    handleTitleChange(event) {
        this.setState({ newTitle: event.target.value });
    }

    handleContentChange(event) {
        this.setState({ newContent: event.target.value });
    }

    editBlog(id) {
        $('#modal-blog-edit').modal();
        this.setState({ newTitle: this.state.title })
        this.setState({ newContent: this.state.content })
    }

    updateBlog(id, blog) {
        console.log(id + " " + blog);
        blogServices.putBlog(id, blog)
            .then(() => {
                window.location.reload();
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
                            <img
                                onClick={() => { this.editBlog(this.state.id) }}
                                className="blog-icon"
                                src="https://image.flaticon.com/icons/png/512/61/61456.png"
                                alt="edit"
                            />
                        </div>

                        <div className="col-6">
                            <Link to="/admin">
                                <img
                                    onClick={() => { this.deleteBlog(this.state.id) }}
                                    className="blog-icon"
                                    src="https://d30y9cdsu7xlg0.cloudfront.net/png/3823-200.png"
                                    alt="delete"
                                />
                            </Link>
                        </div>

                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <Fragment>

                <div className="modal fade" id="modal-blog-edit" tabIndex="-1" role="dialog" aria-labelledby="modal-blog-edit" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="modal-blog-edit">Edit blog post</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h5>Title:</h5>
                                <textarea
                                    id="newTitle"
                                    className="w-100"
                                    name="newTitle"
                                    value={this.state.newTitle}
                                    onChange={(value) => { this.handleTitleChange(value) }}
                                    rows="1"
                                ></textarea>
                                <h5>Content:</h5>
                                <textarea
                                    id="newContent"
                                    className="w-100"
                                    name="newContent"
                                    value={this.state.newContent}
                                    onChange={(value) => { this.handleContentChange(value) }}
                                    rows="10"
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        this.updateBlog(
                                            this.state.id,
                                            {
                                                title: $("#newTitle").val(),
                                                content: $("#newContent").val()
                                            }
                                        );
                                    }}
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

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
            </Fragment>
        );
    }

}

export default Blog;