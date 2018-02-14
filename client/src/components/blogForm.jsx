import React, { Component } from "react";
import userServices from "../services/user";

class blogForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            content: "",
            tags: ""
        }
    }

    handleTitleChange(title) {
        this.setState({ title });
    }

    handleContentChange(content) {
        this.setState({ content });
    }

    handleTagsChange(tags) {
        this.setState({ tags });
    }

    convertTags() {
        let tags = this.state.tags.split(";");
        let hash = {};

        tags = tags.filter((tag) => {
            tag = tag.toLowerCase();
            tag = tag.trim();

            if (tag.length === 0) {
                return false;
            }

            if (!!hash[tag]) {
                return false;
            }

            hash[tag] = true;

            return true;
        })

        return tags;
    }

    render() {
        return (
            <div className="col-8">
                <h2>Create a Blog</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="blogTitle">Title</label>
                        <textarea
                            value={this.state.title}
                            onChange={(event) => this.handleTitleChange(event.target.value)}
                            id="blogTitle"
                            className="form-control"
                            placeholder="Add a title to your blog post."
                            rows="1">
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="blogContent">Body</label>
                        <textarea
                            value={this.state.content}
                            onChange={(event) => this.handleContentChange(event.target.value)}
                            id="blogContent"
                            className="form-control"
                            placeholder="What would you like to say?"
                            rows="10">
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="blogTags">Tags</label>
                        <textarea
                            value={this.state.tags}
                            onChange={(event) => this.handleTagsChange(event.target.value)}
                            id="blogTags"
                            className="form-control"
                            placeholder="Insert tags seperated by semicolons ( ; )"
                            rows="1">
                        </textarea>
                    </div>
                    <button
                        onClick={() => {
                            if (this.state.title && this.state.content && this.state.tags) {
                                if (this.convertTags().length > 0) {
                                    this.props.postBlog(this.state.title, this.state.content, this.convertTags());
                                } else {
                                    alert("You must enter a title, body text and tags.");
                                }
                            } else {
                                alert("You must enter a title, body text and tags.");
                            }
                        }}
                        type="button"
                        className="btn btn-primary btn-lg btn-block"
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default blogForm;