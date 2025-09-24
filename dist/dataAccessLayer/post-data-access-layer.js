"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAccessLayer = void 0;
const blog_data_access_layer_1 = require("./blog-data-access-layer");
let postsDB = [];
exports.postAccessLayer = {
    getAllPosts: () => __awaiter(void 0, void 0, void 0, function* () {
        return postsDB;
    }),
    getPostById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        let postFounded;
        postFounded = postsDB.find(post => post.id === id);
        return postFounded;
    }),
    createPost: (post) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = blog_data_access_layer_1.blogDataAccessLayer.getBlogById(post.id);
        const postCreated = {
            id: Math.floor(Math.random() * 1000000).toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: blog ? blog.name : "Unknown"
        };
        postsDB = [...postsDB, post];
        return postCreated;
    }),
    deletePost: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const postID = postsDB.findIndex(p => p.id === id);
        if (postID !== -1) {
            return false;
        }
        else {
            postsDB.splice(postID, 1);
            return true;
        }
    }),
    updatePost: (id, post) => __awaiter(void 0, void 0, void 0, function* () {
        const postID = postsDB.findIndex(p => p.id === id);
        if (postID !== -1) {
            return false;
        }
        else {
            const blog = blog_data_access_layer_1.blogDataAccessLayer.getBlogById(post.id);
            const postUpdated = Object.assign(Object.assign({}, postsDB[postID]), { title: post.title, shortDescription: post.shortDescription, content: post.content, blogId: post.blogId, blogName: blog ? blog.name : "Unknown" });
            postsDB = [
                ...postsDB.slice(0, postID),
                postUpdated,
                ...postsDB.slice(postID + 1)
            ];
            return true;
        }
    }),
    deleteAllPosts: () => __awaiter(void 0, void 0, void 0, function* () {
        postsDB = [];
    }),
};
