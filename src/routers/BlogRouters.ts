import {Router, Request, Response} from "express";
import {HTTP_STATUS} from "../StatusCode";
import {addBlog, blogsDB, deleteBlog, updateBlog} from "../DB/blogsDB";
import {RequestWithBody, RequestWithParams} from "../model_types/RequestTypes";
import {BlogViewModel} from "../model_types/BlogViewModel";
import {basicAuth} from "../auth";
import {BlogInputModel} from "../model_types/BlogInputModel";
import {FieldError} from "../model_types/FieldError";
import {body, validationResult} from "express-validator";

export const BlogRouter = Router();

BlogRouter.get("/", async (req: Request, res: Response) => {
  await res.status(HTTP_STATUS.OK_200).send(blogsDB)
})
BlogRouter.get('/:id', (req: RequestWithParams<{ id: number }>, res: Response) => {
  const foundBlog: BlogViewModel | undefined = blogsDB.find(v => +v.id === +req.params.id)

  if (!foundBlog) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send("No blogs found.")
  }
  res.status(200).json(foundBlog)
})

BlogRouter.post(
  '/',
  basicAuth,
  [
    body('name')
      .isString()
      .isLength({ min: 1, max: 15 }).withMessage('name length must be 1-15 characters'),

    body('websiteUrl')
      .isString()
      .isURL().withMessage('websiteUrl must be a valid URL'),

    body('description')
      .isString()
      .isLength({ max: 500 }).withMessage('description max length 500'),
  ],
  (req: RequestWithBody<BlogInputModel>, res: Response<BlogViewModel | { errorsMessages: FieldError[] }>) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errorsMessages: errors.array().map(err => ({
          message: err.msg,
          field: "body"
        })),
      });
    }
  const {name, description, websiteUrl} = req.body

  const createdBlog: BlogViewModel = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: name!,
    description: description!,
    websiteUrl: websiteUrl,
  }
  addBlog(createdBlog)
  return res
    .status(HTTP_STATUS.CREATED_201)
    .json(createdBlog)
})

BlogRouter.put('/:id', basicAuth ,(req: Request, res: Response<BlogViewModel | {
  errorsMessages: FieldError[]
}>) => {
  const blogId = blogsDB.findIndex(v => +v.id === +req.params.id)
  const apiErrorMsg: FieldError[] = []

  if (blogId === -1) {
    apiErrorMsg.push({ message: "ID Not found", field: "id"})
    return res.status(HTTP_STATUS.NOT_FOUND_404).json({errorsMessages: apiErrorMsg});
  }

  const updatedBlog: BlogViewModel = {
    ...blogsDB[blogId],
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  }

  updateBlog(updatedBlog, blogId)
  return res.status(HTTP_STATUS.NO_CONTENT_204).send()
})

BlogRouter.delete('/:id', basicAuth, (req: RequestWithParams<{ id: string }>, res: Response) => {
  const blogId = blogsDB.findIndex(v => v.id === req.params.id)
  if (blogId === -1) {
    res.status(HTTP_STATUS.NOT_FOUND_404).send("Not found")
  }

  deleteBlog(req.params.id)
  res.status(HTTP_STATUS.NO_CONTENT_204).send()
})
