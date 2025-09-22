"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsDB = void 0;
exports.dalateAllPosts = dalateAllPosts;
exports.addPost = addPost;
exports.postsDB = [];
function dalateAllPosts() {
    exports.postsDB = [];
}
function addPost(post) {
    exports.postsDB = [...exports.postsDB, post];
}
