"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsDB = void 0;
exports.deleteAllBlogs = deleteAllBlogs;
exports.addBlog = addBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
exports.getBlogNameById = getBlogNameById;
exports.blogsDB = [];
function deleteAllBlogs() {
    exports.blogsDB = [];
}
function addBlog(blog) {
    exports.blogsDB = [...exports.blogsDB, blog];
}
function updateBlog(blog, blogId) {
    exports.blogsDB = [
        ...exports.blogsDB.slice(0, blogId),
        blog,
        ...exports.blogsDB.slice(blogId + 1)
    ];
}
function deleteBlog(blogId) {
    exports.blogsDB = exports.blogsDB.filter(v => v.id !== blogId);
}
function getBlogNameById(blogId) {
    const blog = exports.blogsDB.find(b => b.id === blogId);
    return blog ? blog.name : "";
}
