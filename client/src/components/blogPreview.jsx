import React, { Component } from "react";
import { Link } from 'react-router-dom';

class BlogPreview extends Component {

    render() {
        return (
            <div id="blog-card" className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{this.props.date}</h6>
                    <Link to={"blogs/" + this.props.id}><p className="card-link">Read more</p></Link>
                </div>
            </div >
        );
    }

}

export default BlogPreview;