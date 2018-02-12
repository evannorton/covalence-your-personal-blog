import React, { Component, Fragment } from "react";
import Tag from "./tag";

class BlogTagList extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div id="tags-container" className="row">
                {
                    this.props.tags.map((tag) => {
                        return (
                            <Tag key={tag.number} name={tag.name} />
                        );
                    })
                }
            </div>
        );
    }

}

export default BlogTagList;