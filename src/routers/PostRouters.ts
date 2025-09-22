import {Response, Router} from "express";
import {HTTP_STATUS} from "../StatusCode";
import {addPost, postsDB} from "../DB/postsDB";
import {RequestWithBody, RequestWithParams} from "../model_types/RequestTypes";
import {PostViewModel} from "../model_types/PostViewModel";
import {basicAuth} from "../auth";
import {APIErrorResult} from "../model_types/APIErrorResult";

export const PostRouter = Router();

PostRouter.get("/", (req, res) => {
  res.status(HTTP_STATUS.OK_200).send(postsDB)
})
PostRouter.get('/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
  const foundPost: PostViewModel | undefined = postsDB.find(v => v.id === req.params.id)

  if (!foundPost) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send("No posts found.")
  }
  res.status(200).json(foundPost)
})
PostRouter.post('/',basicAuth ,(req: RequestWithBody<PostViewModel>, res: Response<PostViewModel | { errorsMessages: APIErrorResult[] }>) => {
  const {title, shortDescription, content, blogId, blogName} = req.body

  const createdPost: PostViewModel = {
    id: Math.floor(Math.random() * 1000000).toString(),
    title: title!,
    shortDescription: shortDescription!,
    content: content,
    blogId: blogId,
    blogName: blogName
  }
  addPost(createdPost)
  res
    .status(HTTP_STATUS.CREATED_201)
    .json(createdPost)
})
