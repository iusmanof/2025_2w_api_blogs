import {Router} from "express";

export const BlogRouter = Router();

BlogRouter.get("/", async (req, res) => {
  res.setHeader("Content-Type", "application/json").send("blog");
})
