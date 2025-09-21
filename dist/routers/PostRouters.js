"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouter = void 0;
const express_1 = require("express");
exports.PostRouter = (0, express_1.Router)();
exports.PostRouter.get("/", (req, res) => {
    res.setHeader("Content-Type", "application/json").send("post");
});
