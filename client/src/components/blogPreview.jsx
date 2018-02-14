import React, { Component } from "react";
import { Link } from 'react-router-dom';
import * as userServices from "../services/user";

class BlogPreview extends Component {

    renderLink() {
        if (userServices.isLoggedIn()) {
            return (
                <Link to={"admin/blogs/" + this.props.id}><p className="card-link">See details</p></Link>
            );
        } else {
            return (
                <Link to={"blogs/" + this.props.id}><p className="card-link">Read more</p></Link>
            );
        }
    }

    render() {
        return (
            <div id="blog-card" className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.date}</h6>
                    {this.renderLink()}
                </div>
            </div >
        );
    }

}

export default BlogPreview;