import React, { Component } from "react";
import BlogPreview from "./blogPreview";

class BlogList extends Component {

    render() {
        return (
            <div className="col-4">
                <h2>Blog Posts</h2>
                <div id="scroll-div">
                    {
                        this.props.blogs.map((blog) => {
                            return (
                                <BlogPreview key={blog.id} id={blog.id} title={blog.title} date={blog._created} />
                            );
                        })
                    }
                </div>
            </div>
        );
    }

}

export default BlogList;