"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouter = void 0;
const express_1 = require("express");
const StatusCode_1 = require("../StatusCode");
const auth_1 = require("../auth");
const post_data_access_layer_1 = require("../dataAccessLayer/post-data-access-layer");
const titleValidation_1 = require("../bodyValidation/titleValidation");
const contentValidation_1 = require("../bodyValidation/contentValidation");
const shortDescriptionValidation_1 = require("../bodyValidation/shortDescriptionValidation");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
exports.PostRouter = (0, express_1.Router)();
exports.PostRouter.get("/", (req, res) => {
    res.status(StatusCode_1.HTTP_STATUS.OK_200).send(post_data_access_layer_1.postAccessLayer.getAllPosts());
});
exports.PostRouter.get('/:id', (req, res) => {
    const postFounded = post_data_access_layer_1.postAccessLayer.getPostById(req.params.id);
    if (!postFounded)
        res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).send("No posts found.");
    res.status(200).json(postFounded);
});
exports.PostRouter.post('/', auth_1.basicAuth, [titleValidation_1.titleValidation, contentValidation_1.contentValidation, shortDescriptionValidation_1.shortDescriptionValidation], input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const postCreated = post_data_access_layer_1.postAccessLayer.createPost(req.body);
    const apiErrorMsg = [];
    if (!postCreated) {
        apiErrorMsg.push({ message: "ID Not found", field: "id" });
        res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).json({ errorsMessages: apiErrorMsg });
    }
    res.status(StatusCode_1.HTTP_STATUS.CREATED_201).json(postCreated);
});
exports.PostRouter.put('/:id', auth_1.basicAuth, [titleValidation_1.titleValidation, contentValidation_1.contentValidation, shortDescriptionValidation_1.shortDescriptionValidation], input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const postIsUpdated = post_data_access_layer_1.postAccessLayer.updatePost(req.params.id, req.body);
    const apiErrorMsg = [];
    if (!postIsUpdated) {
        apiErrorMsg.push({ message: "ID Not found", field: "id" });
        return res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).json({ errorsMessages: apiErrorMsg });
    }
    return res.status(StatusCode_1.HTTP_STATUS.NO_CONTENT_204).send();
});
exports.PostRouter.delete('/:id', auth_1.basicAuth, (req, res) => {
    const post = post_data_access_layer_1.postAccessLayer.deletePost(req.params.id);
    if (!post)
        res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).send("Not found");
    res.status(StatusCode_1.HTTP_STATUS.NO_CONTENT_204).send();
});
