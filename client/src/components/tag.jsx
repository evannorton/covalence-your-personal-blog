import React, { Component } from "react";

class Tag extends Component {

    render() {
        return (
            <div className="d-flex align-content-center">
                <p className="tag-text">{this.props.name}</p>
            </div>
        );
    }

}

export default Tag;