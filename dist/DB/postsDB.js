"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsDB = void 0;
exports.deleteAllPosts = deleteAllPosts;
exports.addPost = addPost;
exports.postsDB = [];
function deleteAllPosts() {
    exports.postsDB = [];
}
function addPost(post) {
    exports.postsDB = [...exports.postsDB, post];
}
