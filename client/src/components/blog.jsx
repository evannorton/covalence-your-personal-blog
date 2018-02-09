import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';

class Blog extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        fetch(`/api/blogs/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(blog => {
                console.log(blog);
                this.setState({
                    id: blog.id,
                    title: blog.title,
                    content: blog.content,
                    date: blog._created,
                    tags: tags
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    deleteBlog(id) {
        console.log("hey");
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
                </div>
            </div>
        );
    }

}

export default Blog;