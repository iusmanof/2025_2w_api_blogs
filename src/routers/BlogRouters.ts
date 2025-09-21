import {Router, Request, Response} from "express";
import {HTTP_STATUS} from "../StatusCode";
import {blogsDB} from "../DB/blogsDB";

export const BlogRouter = Router();

BlogRouter.get("/", async (req: Request, res: Response) => {
  res.send(HTTP_STATUS.OK_200).send(blogsDB)
})
