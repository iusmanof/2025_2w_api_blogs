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
exports.BlogRouter = (0, express_1.Router)();
exports.BlogRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(StatusCode_1.HTTP_STATUS.OK_200).send(blogsDB_1.blogsDB);
}));
exports.BlogRouter.get('/:id', (req, res) => {
    const foundBlog = blogsDB_1.blogsDB.find(v => +v.id === +req.params.id);
    if (!foundBlog) {
        res.status(StatusCode_1.HTTP_STATUS.NOT_FOUND_404).send("No video found.");
    }
    res.status(200).json(foundBlog);
});
exports.BlogRouter.post('/', (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const createdBlog = {
        id: Math.floor(Math.random() * 1000000).toString(),
        name: name,
        description: description,
        websiteUrl: websiteUrl,
    };
    (0, blogsDB_1.addBlog)(createdBlog);
    res
        .status(StatusCode_1.HTTP_STATUS.CREATED_201)
        .json(createdBlog);
});
exports.BlogRouter.put('/:id', (req, res) => {
    const blogId = blogsDB_1.blogsDB.findIndex(v => +v.id === +req.params.id);
    const updatedBlog = Object.assign(Object.assign({}, blogsDB_1.blogsDB[blogId]), { name: req.body.name, description: req.body.description, websiteUrl: req.body.websiteUrl });
    (0, blogsDB_1.updateBlog)(updatedBlog, blogId);
    res.status(StatusCode_1.HTTP_STATUS.NO_CONTENT_204).send();
});
exports.BlogRouter.delete('/:id', (req, res) => {
    (0, blogsDB_1.deleteBlog)(req.params.id);
    res.status(StatusCode_1.HTTP_STATUS.NO_CONTENT_204).send();
});
