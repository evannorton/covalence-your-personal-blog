import React, { Component, Fragment } from "react";

class Blog extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        fetch(`/api/blogs/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(blog => {
                this.setState({
                    id: blog.id,
                    title: blog.title,
                    content: blog.content,
                    date: blog._created
                });
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
                        <img class="blog-icon" src="https://d30y9cdsu7xlg0.cloudfront.net/png/3823-200.png" alt="" />
                    </div>
                </div>
            </div>
        );
    }

}

export default Blog;