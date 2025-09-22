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
const blogsDB_1 = require("../DB/blogsDB");
const auth_1 = require("../auth");
const express_validator_1 = require("express-validator");
exports.BlogRouter = (0, express_1.Router)();
exports.BlogRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.status(StatusCode_1.HTTP_STATUS.OK_200).send(blogsDB_1.blogsDB);
}));
exports.BlogRouter.get('/:id', (req, res) => {
    const foundBlog = blogsDB_1.blogsDB.find(v => +v.id === +req.params.id);
    if (!foundBlog) {
        res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).send("No blogs found.");
    }
    res.status(200).json(foundBlog);
});
exports.BlogRouter.post('/', auth_1.basicAuth, [
    (0, express_validator_1.body)('name')
        .exists().withMessage("name is required")
        .isString().withMessage("Must be string")
        .isLength({ min: 1, max: 15 }).withMessage("name length must be 1-15 characters"),
    (0, express_validator_1.body)('websiteUrl')
        .exists().withMessage("websiteUrl is required")
        .isString().withMessage("Must be string")
        .isURL().withMessage("websiteUrl must be a valid URL"),
], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errorsMessages: errors.array().map(err => ({
                message: err.msg,
                field: err.msg.field, // вот здесь должно быть правильное поле, например "name" или "websiteUrl"
            })),
        });
    }
    const { name, description, websiteUrl } = req.body;
    const createdBlog = {
        id: Math.floor(Math.random() * 1000000).toString(),
        name: name,
        description: description,
        websiteUrl: websiteUrl,
    };
    (0, blogsDB_1.addBlog)(createdBlog);
    return res
        .status(StatusCode_1.HTTP_STATUS.CREATED_201)
        .json(createdBlog);
});
exports.BlogRouter.put('/:id', auth_1.basicAuth, (req, res) => {
    const blogId = blogsDB_1.blogsDB.findIndex(v => +v.id === +req.params.id);
    const apiErrorMsg = [];
    if (blogId === -1) {
        apiErrorMsg.push({ message: "ID Not found", field: "id" });
        return res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).json({ errorsMessages: apiErrorMsg });
    }
    const updatedBlog = Object.assign(Object.assign({}, blogsDB_1.blogsDB[blogId]), { name: req.body.name, description: req.body.description, websiteUrl: req.body.websiteUrl });
    (0, blogsDB_1.updateBlog)(updatedBlog, blogId);
    return res.status(StatusCode_1.HTTP_STATUS.NO_CONTENT_204).send();
});
exports.BlogRouter.delete('/:id', auth_1.basicAuth, (req, res) => {
    const blogId = blogsDB_1.blogsDB.findIndex(v => v.id === req.params.id);
    if (blogId === -1) {
        res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).send("Not found");
    }
    (0, blogsDB_1.deleteBlog)(req.params.id);
    res.status(StatusCode_1.HTTP_STATUS.NO_CONTENT_204).send();
});
