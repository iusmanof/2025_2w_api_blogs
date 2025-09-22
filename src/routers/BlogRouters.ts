import {Router, Request, Response} from "express";
import {HTTP_STATUS} from "../StatusCode";
import {addBlog, blogsDB, deleteBlog, updateBlog} from "../DB/blogsDB";
import {RequestWithBody, RequestWithParams} from "../model_types/RequestTypes";
import {BlogViewModel} from "../model_types/BlogViewModel";
import {APIErrorResult} from "../model_types/APIErrorResult";

export const BlogRouter = Router();

BlogRouter.get("/", async (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK_200).send(blogsDB)
})

BlogRouter.get('/:id', (req: RequestWithParams<{ id: number }>, res: Response) => {
  const foundBlog: BlogViewModel | undefined = blogsDB.find(v => +v.id === +req.params.id)

  if (!foundBlog) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send("No video found.")
  }
  res.status(200).json(foundBlog)
})

BlogRouter.post('/', (req: RequestWithBody<BlogViewModel>, res: Response<BlogViewModel | {
  errorsMessages: APIErrorResult[]
}>) => {
  const {name, description, websiteUrl} = req.body

  const createdBlog: BlogViewModel = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: name!,
    description: description!,
    websiteUrl: websiteUrl,
  }
  addBlog(createdBlog)
  res
    .status(HTTP_STATUS.CREATED_201)
    .json(createdBlog)
})

BlogRouter.put('/:id', (req: Request, res: Response<BlogViewModel | {
  errorsMessages: APIErrorResult[]
}>) => {
  const blogId = blogsDB.findIndex(v => +v.id === +req.params.id)

  const updatedBlog: BlogViewModel = {
    ...blogsDB[blogId],
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  }

  updateBlog(updatedBlog, blogId)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
})

BlogRouter.delete('/:id', (req: RequestWithParams<{ id: string }>, res: Response) => {
  deleteBlog(req.params.id)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
})
