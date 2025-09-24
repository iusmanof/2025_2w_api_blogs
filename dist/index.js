"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlogRouters_1 = require("./routers/BlogRouters");
const PostRouters_1 = require("./routers/PostRouters");
const blog_data_access_layer_1 = require("./dataAccessLayer/blog-data-access-layer");
const post_data_access_layer_1 = require("./dataAccessLayer/post-data-access-layer");
const app = (0, express_1.default)();
const port = process.env.port || 3000;
app.use(express_1.default.json());
app.use('/blogs', BlogRouters_1.BlogRouter);
app.use('/posts', PostRouters_1.PostRouter);
app.get('/', (req, res) => {
    res.send('blogs api');
});
app.delete('/testing/all-data', (req, res) => {
    blog_data_access_layer_1.blogDataAccessLayer.deleteAllBlogs();
    post_data_access_layer_1.postAccessLayer.deleteAllPosts();
    res.status(204).send("All data is deleted");
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
