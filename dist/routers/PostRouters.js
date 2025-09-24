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
exports.PostRouter = void 0;
const express_1 = require("express");
const StatusCode_1 = require("../StatusCode");
const auth_1 = require("../auth");
const post_data_access_layer_1 = require("../dataAccessLayer/post-data-access-layer");
exports.PostRouter = (0, express_1.Router)();
exports.PostRouter.get("/", (req, res) => {
    res.status(StatusCode_1.HTTP_STATUS.OK_200).send(post_data_access_layer_1.postAccessLayer.getAllPosts());
});
exports.PostRouter.get('/:id', (req, res) => {
    // const foundPost: PostViewModel | undefined = postsDB.find(v => v.id === req.params.id)
    //
    // if (!foundPost) {
    //   res.status(HTTP_STATUS.NOT_FOUND_404).send("No posts found.")
    // }
    // res.status(200).json(foundPost)
    const postFounded = post_data_access_layer_1.postAccessLayer.getPostById(req.params.id);
    if (!postFounded)
        res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).send("No posts found.");
    res.status(200).json(postFounded);
});
exports.PostRouter.post('/', auth_1.basicAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {title, shortDescription, content, blogId} = req.body
    // const createdPost: PostViewModel = {
    //   id: Math.floor(Math.random() * 1000000).toString(),
    //   title: title!,
    //   shortDescription: shortDescription!,
    //   content: content,
    //   blogId: blogId,
    //   blogName: getBlogNameById(blogId)
    // }
    // addPost(createdPost)
    // res
    //   .status(HTTP_STATUS.CREATED_201)
    //   .json(createdPost)
    const postCreated = yield post_data_access_layer_1.postAccessLayer.createPost(req.body);
    res.status(StatusCode_1.HTTP_STATUS.CREATED_201).json(postCreated);
}));
exports.PostRouter.put('/:id', auth_1.basicAuth, (req, res) => {
    // const postId = postsDB.findIndex(v => +v.id === +req.params.id)
    // const apiErrorMsg: FieldError[] = []
    // if (postId === -1) {
    //   apiErrorMsg.push({message: "ID Not found", field: "id"})
    //   return res.status(HTTP_STATUS.NOT_FOUND_404).json({errorsMessages: apiErrorMsg});
    // }
    // const updatedPost: PostViewModel = {
    //   ...postsDB[postId],
    //   title: req.body.title,
    //   shortDescription: req.body.shortDescription,
    //   content: req.body.content,
    //   blogId: req.body.blogId,
    //   blogName: req.body.blogName,
    // }
    //
    // updatePost(updatedPost, postId)
    // return res.status(HTTP_STATUS.NO_CONTENT_204).send()
    const postIsUpdated = post_data_access_layer_1.postAccessLayer.updatePost(req.params.id, req.body);
    const apiErrorMsg = [];
    if (!postIsUpdated) {
        apiErrorMsg.push({ message: "ID Not found", field: "id" });
        return res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).json({ errorsMessages: apiErrorMsg });
    }
    return res.status(StatusCode_1.HTTP_STATUS.NO_CONTENT_204).send();
});
exports.PostRouter.delete('/:id', auth_1.basicAuth, (req, res) => {
    // const postId = postsDB.findIndex(v => v.id === req.params.id)
    // if (postId === -1) {
    //   res.status(HTTP_STATUS.NOT_FOUND_404).send("Not found")
    // }
    // deleteBlog(req.params.id)
    // res.status(HTTP_STATUS.NO_CONTENT_204).send()
    const post = post_data_access_layer_1.postAccessLayer.deletePost(req.params.id);
    if (!post)
        res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).send("Not found");
    res.status(StatusCode_1.HTTP_STATUS.NO_CONTENT_204).send();
});
