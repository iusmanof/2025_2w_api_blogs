import {Router} from "express";

export const PostRouter = Router();

PostRouter.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json").send("post");
})
