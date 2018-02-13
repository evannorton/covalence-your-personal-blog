import * as baseService from "./base";

function getBlogs() {
    return baseService.get("/api/blogs");
}

function getBlog(id) {
    return baseService.get(`/api/blogs/${id}`);
}

function postBlog(data) {
    return baseService.post("/api/blogs", data);
}

function putBlog(id, data) {
    return baseService.put(`/api/blogs/${id}`, data);
}

function deleteBlog(id) {
    return baseService.destroy(`/api/blogs/${id}`);
}

let blogServices = { getBlogs, getBlog, postBlog, putBlog, deleteBlog };
export default blogServices;