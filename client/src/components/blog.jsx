import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import BlogTagList from "./blogTagList";
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
        fetch(`/api/blogs/${id}`, {
            method: "DELETE",
        }).then(() => {
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div id="blog" className="container-fluid w-75">
                <div className="row">
                    <div className="col-11">
                        <h2>{this.state.title}</h2>
                        <h5>{this.state.date}</h5>
                        <p>{this.state.content}</p>
                    </div>
                    <div className="col-1">
                        <Link to="/">
                            <img
                                onClick={() => { this.deleteBlog(this.state.id) }}
                                className="blog-icon"
                                src="https://d30y9cdsu7xlg0.cloudfront.net/png/3823-200.png"
                                alt="delete" />
                        </Link>
                    </div>
                    <div className="col-12">
                        <BlogTagList tags={this.state.tags} />
                    </div>
                </div>
            </div>
        );
    }

}

export default Blog;