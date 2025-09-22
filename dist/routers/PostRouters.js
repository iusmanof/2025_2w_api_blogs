"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouter = void 0;
const express_1 = require("express");
const StatusCode_1 = require("../StatusCode");
const postsDB_1 = require("../DB/postsDB");
const auth_1 = require("../auth");
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
