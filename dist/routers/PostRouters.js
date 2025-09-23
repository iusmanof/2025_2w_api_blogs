"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouter = void 0;
const express_1 = require("express");
const StatusCode_1 = require("../StatusCode");
const postsDB_1 = require("../DB/postsDB");
const auth_1 = require("../auth");
const blogsDB_1 = require("../DB/blogsDB");
exports.PostRouter = (0, express_1.Router)();
exports.PostRouter.get("/", (req, res) => {
    res.status(StatusCode_1.HTTP_STATUS.OK_200).send(postsDB_1.postsDB);
});
exports.PostRouter.get('/:id', (req, res) => {
    const foundPost = postsDB_1.postsDB.find(v => v.id === req.params.id);
    if (!foundPost) {
        res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).send("No posts found.");
    }
    res.status(200).json(foundPost);
});
exports.PostRouter.post('/', auth_1.basicAuth, (req, res) => {
    const { title, shortDescription, content, blogId, blogName } = req.body;
    const createdPost = {
        id: Math.floor(Math.random() * 1000000).toString(),
        title: title,
        shortDescription: shortDescription,
        content: content,
        blogId: blogId,
        blogName: blogName
    };
    (0, postsDB_1.addPost)(createdPost);
    res
        .status(StatusCode_1.HTTP_STATUS.CREATED_201)
        .json(createdPost);
});
exports.PostRouter.put('/:id', auth_1.basicAuth, (req, res) => {
    const postId = postsDB_1.postsDB.findIndex(v => +v.id === +req.params.id);
    const apiErrorMsg = [];
    if (postId === -1) {
        apiErrorMsg.push({ message: "ID Not found", field: "id" });
        return res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).json({ errorsMessages: apiErrorMsg });
    }
    const updatedPost = Object.assign(Object.assign({}, postsDB_1.postsDB[postId]), { title: req.body.title, shortDescription: req.body.shortDescription, content: req.body.content, blogId: req.body.blogId, blogName: req.body.blogName });
    (0, postsDB_1.updatePost)(updatedPost, postId);
    return res.status(StatusCode_1.HTTP_STATUS.NO_CONTENT_204).send();
});
exports.PostRouter.delete('/:id', auth_1.basicAuth, (req, res) => {
    const postId = postsDB_1.postsDB.findIndex(v => v.id === req.params.id);
    if (postId === -1) {
        res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).send("Not found");
    }
    (0, blogsDB_1.deleteBlog)(req.params.id);
    res.status(StatusCode_1.HTTP_STATUS.NO_CONTENT_204).send();
});
