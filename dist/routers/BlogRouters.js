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
exports.BlogRouter = void 0;
const express_1 = require("express");
const StatusCode_1 = require("../StatusCode");
const auth_1 = require("../auth");
const nameValidation_1 = require("../bodyValidation/nameValidation");
const websiteValidation_1 = require("../bodyValidation/websiteValidation");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const blog_data_access_layer_1 = require("../dataAccessLayer/blog-data-access-layer");
exports.BlogRouter = (0, express_1.Router)();
exports.BlogRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.status(StatusCode_1.HTTP_STATUS.OK_200).send(blog_data_access_layer_1.blogDataAccessLayer.getAllBlogs());
}));
exports.BlogRouter.get('/:id', (req, res) => {
    // const foundBlog: BlogViewModel | undefined = blogsDB.find(v => +v.id === +req.params.id)
    // if (!foundBlog) {
    //   res.status(HTTP_STATUS.NOT_FOUND_404).send("No blogs found.")
    // }
    const blogFounded = blog_data_access_layer_1.blogDataAccessLayer.getBlogById(req.params.id);
    if (!blogFounded)
        res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).send("Blog not found.");
    res.status(200).json(blogFounded);
});
exports.BlogRouter.post('/', auth_1.basicAuth, [
    nameValidation_1.nameValidation,
    websiteValidation_1.websiteValidation,
], input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    // const {name, description, websiteUrl} = req.body;
    // const createdBlog: BlogViewModel = {
    //   id: Math.floor(Math.random() * 1000000).toString(),
    //   name: name!,
    //   description: description!,
    //   websiteUrl: websiteUrl,
    // };
    // addBlog(createdBlog);
    const blogCreated = blog_data_access_layer_1.blogDataAccessLayer.createBlog(req.body);
    return res.status(StatusCode_1.HTTP_STATUS.CREATED_201).json(blogCreated);
});
exports.BlogRouter.put('/:id', auth_1.basicAuth, [
    nameValidation_1.nameValidation,
    websiteValidation_1.websiteValidation,
], input_validation_middleware_1.inputValidationMiddleware, (req, res) => {
    const blogIsUpdated = blog_data_access_layer_1.blogDataAccessLayer.updateBlog(req.params.id, req.body);
    const apiErrorMsg = [];
    if (!blogIsUpdated) {
        apiErrorMsg.push({ message: "ID Not found", field: "id" });
        return res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).json({ errorsMessages: apiErrorMsg });
    }
    return res.status(StatusCode_1.HTTP_STATUS.NO_CONTENT_204).send();
    // const blogId = blogsDB.findIndex(v => +v.id === +req.params.id)
    // if (blogId === -1) {
    //   apiErrorMsg.push({message: "ID Not found", field: "id"})
    //   return res.status(HTTP_STATUS.NOT_FOUND_404).json({errorsMessages: apiErrorMsg});
    // }
    // const updatedBlog: BlogViewModel = {
    //   ...blogsDB[blogId],
    //   name: req.body.name,
    //   description: req.body.description,
    //   websiteUrl: req.body.websiteUrl,
    // }
    //
    // updateBlog(updatedBlog, blogId)
    // return res.status(HTTP_STATUS.NO_CONTENT_204).send()
});
exports.BlogRouter.delete('/:id', auth_1.basicAuth, (req, res) => {
    // const blogId = blogsDB.findIndex(v => v.id === req.params.id)
    // if (blogId === -1) {
    //
    // }
    //
    // deleteBlog(req.params.id)
    // res.status(HTTP_STATUS.NO_CONTENT_204).send()
    const blog = blog_data_access_layer_1.blogDataAccessLayer.deleteBlog(req.params.id);
    if (!blog)
        res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).send("Not found");
    res.status(StatusCode_1.HTTP_STATUS.NO_CONTENT_204).send();
});
