"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsDB = void 0;
exports.deleteAllPosts = deleteAllPosts;
exports.addPost = addPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.postsDB = [];
function deleteAllPosts() {
    exports.postsDB = [];
}
function addPost(post) {
    exports.postsDB = [...exports.postsDB, post];
}
function updatePost(blog, postId) {
    exports.postsDB = [
        ...exports.postsDB.slice(0, postId),
        blog,
        ...exports.postsDB.slice(postId + 1)
    ];
}
function deletePost(postId) {
    exports.postsDB = exports.postsDB.filter(v => v.id !== postId);
}
