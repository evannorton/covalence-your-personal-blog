import React, { Component } from "react";
import BlogPreview from "./blogPreview";
import AuthButton from "./auth/authButton";
import * as userServices from "../services/user";

class BlogList extends Component {

    renderLogout() {
        if (userServices.isLoggedIn()) {
            return <AuthButton />;
        }
    }

    render() {
        return (
            <div className="col-4">
                <div className="row">
                    <div className="col-6">
                        <h2>Blog Posts</h2>
                    </div>
                    <div className="col-6">
                        {this.renderLogout()}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
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
                </div>
            </div>
        );
    }

}

export default BlogList;