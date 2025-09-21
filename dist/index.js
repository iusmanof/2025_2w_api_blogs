"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BlogRouters_1 = require("./routers/BlogRouters");
const PostRouters_1 = require("./routers/PostRouters");
const app = (0, express_1.default)();
const port = process.env.port || 3000;
app.use(express_1.default.json());
app.use('/blogs', BlogRouters_1.BlogRouter);
app.use('/posts', PostRouters_1.PostRouter);
app.get('/', (req, res) => {
    res.send('blogs api');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
